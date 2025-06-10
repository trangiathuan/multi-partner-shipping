import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentStrategyFactory } from './strategy/shipment.streategy.factory';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class ShipmentConsumer {
    constructor(
        private readonly strategyFactory: ShipmentStrategyFactory,
        private readonly mailService: MailService,
        private readonly prisma: PrismaService
    ) { }

    @EventPattern('shipment.create_order')
    async handleCreateOrder(@Payload() data: any) {
        console.log('📦 Nhận event shipment.create_order:', data);

        const {
            orderId,
            partnerId,
            senderName,
            senderAddress,
            receiverName,
            receiverAddress,
            senderPhone,
            receiverPhone,
            description,
            price,
            status,
            userEmail,
        } = data;

        const strategy = this.strategyFactory.getStrategy(partnerId);

        const createOrderResult = await strategy.createOrder({
            senderName,
            senderAddress,
            receiverName,
            receiverAddress,
            senderPhone,
            receiverPhone,
            description,
            price,
            partnerId,
        } as CreateShipmentDto);

        await this.mailService.sendEmailUpdateStatus(
            userEmail,
            status,
            createOrderResult.order_code
        );

        await this.prisma.shipments.update({
            where: { id: orderId },
            data: {
                order_code: createOrderResult.order_code,
            },
        });

        console.log('✅ Đã xử lý xong createOrder và gửi mail.');
    }
}
