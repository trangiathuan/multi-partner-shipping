// shipment/shipment.service.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { GHTKStrategy } from './strategy/ghtk.strategy';
import { ShipmentStrategy } from './strategy/shipment.strategy.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentEntity } from './entity/shipment.entity';
import { CalculateFreightDto } from './dto/calculate-freight.dto';

@Injectable()
export class ShipmentService {
    private strategies: Record<string, ShipmentStrategy>;

    constructor(
        private readonly ghtk: GHTKStrategy,
        private readonly prisma: PrismaService
    ) {
        this.strategies = {
            '5d5245fe-900e-4680-8705-62b6e334e2c2': this.ghtk,
        };
    }

    async createShipment(dto: CreateShipmentDto) {
        const strategy = dto.partnerId ? this.strategies[dto.partnerId] : this.ghtk;
        if (!strategy || typeof strategy.createOrder !== 'function') {
            throw new BadRequestException('Invalid or unsupported partnerId: ' + dto.partnerId);
        }

        const result = await strategy.createOrder(dto);

        // Kiểm tra partnerId hợp lệ nếu có
        let validPartnerId: string | null = null;
        if (dto.partnerId) {
            // Kiểm tra partnerId là id UUID thực tế trong bảng partners
            let partner = await this.prisma.partners.findUnique({ where: { id: dto.partnerId } });
            if (!partner) {
                // Log danh sách partner để debug
                const allPartners = await this.prisma.partners.findMany({ select: { id: true, name: true } });
                console.error('partnerId không tồn tại:', dto.partnerId, 'Danh sách partner:', allPartners);
                throw new BadRequestException('partnerId không tồn tại');
            }
            validPartnerId = partner.id;
            console.log('Valid partnerId:', validPartnerId);
        }

        // Kiểm tra customerId hợp lệ
        const user = await this.prisma.users.findUnique({ where: { id: dto.customerId } });
        if (!user) {
            const allUsers = await this.prisma.users.findMany({ select: { id: true, full_name: true, email: true } });
            console.error('customerId không tồn tại:', dto.customerId, 'Danh sách user:', allUsers);
            throw new BadRequestException('customerId không tồn tại');
        }

        // Lưu vào DB shipment, gán status = 'created'
        const shipmentRecord = await this.prisma.shipments.create({
            data: {
                customer_id: dto.customerId,
                sender_name: dto.senderName,
                sender_address: dto.senderAddress,
                receiver_name: dto.receiverName,
                receiver_address: dto.receiverAddress,
                weight: Number(dto.weight),
                width: Number(dto.width),
                length: Number(dto.length),
                height: Number(dto.height),
                partner_id: validPartnerId,
                price: Number(dto.price),
                description: dto.description || '',
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

    async calculateFreight(dto: CalculateFreightDto) {
        const strategy = dto.partnerId ? this.strategies[dto.partnerId] : this.ghtk;
        const result = await strategy.calculateFreight(dto);
        return {
            message: 'Freight calculated successfully',
            freight: result.fee
        }
    }
}
