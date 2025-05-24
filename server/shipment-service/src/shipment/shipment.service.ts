// shipment/shipment.service.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { GHTKStrategy } from './strategy/ghtk.strategy';
import { AhamoveStrategy } from './strategy/ahamove.strategy';
import { ShipmentStrategy } from './strategy/shipment.strategy.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentEntity } from './entity/shipment.entity';

@Injectable()
export class ShipmentService {
    private strategies: Record<string, ShipmentStrategy>;

    constructor(
        private readonly ghtk: GHTKStrategy,
        private readonly ahamove: AhamoveStrategy,
        private readonly prisma: PrismaService
    ) {
        this.strategies = {
            'ghtk': this.ghtk,
            'ahamove': this.ahamove,
        };
    }

    async createShipment(dto: CreateShipmentDto) {
        const strategy = dto.partnerId ? this.strategies[dto.partnerId] : this.ahamove;
        const result = await strategy.createOrder(dto);

        // Lưu vào DB shipment, gán status = 'created'
        const shipmentRecord = await this.prisma.shipments.create({
            data: {
                customer_id: dto.customerId,
                sender_name: dto.senderName,
                sender_address: dto.senderAddress,
                receiver_name: dto.receiverName,
                receiver_address: dto.receiverAddress,
                weight: dto.weight,
                dimension: dto.dimension, // Nếu là JSON thì cần parse
                partner_id: dto.partnerId ?? null,
                status: 'created',
            },
        });

        // Chuyển đổi record DB sang entity rõ ràng
        const shipment = ShipmentEntity.fromDb(shipmentRecord);

        return {
            message: 'Shipment created successfully',
            tracking: result.order?.label,
            shipment,
        };
    }

    // TODO: cập nhật trạng thái từ webhook hoặc polling
}
