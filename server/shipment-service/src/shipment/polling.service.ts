import { BadRequestException, Injectable } from "@nestjs/common";
import nodeCron from "node-cron";
import { PrismaService } from "src/prisma/prisma.service";
import { ShipmentStrategyFactory } from "./strategy/shipment.streategy.factory";
import { GetStatusDto } from "./dto/get-status.dto";
import { ShipmentService } from "./shipment.service";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class PollingService {
    constructor(
        private prisma: PrismaService,
        private factory: ShipmentStrategyFactory,
        private shipmentService: ShipmentService,
        private mailService: MailService
    ) {
        nodeCron.schedule('*/2 * * * *', async () => {
            this.pollingShipments();
        })
    }
    async pollingShipments() {
        console.log(`[${new Date().toLocaleString()}] Bắt đầu polling trạng thái đơn hàng`);
        const orders = await this.getPendingShipments();
        for (const order of orders) {
            if (order.partner_id === null) {
                throw new BadRequestException('partner_id không được null');
            }
            const strategy = this.factory.getStrategy(order.partner_id);

            const status = await strategy.getStatus({
                partner_id: order.partner_id,
                order_code: order.order_code,
            } as GetStatusDto);

            if (status !== order.status && status !== 'unknown') {
                if (!order.customer_id) {
                    throw new BadRequestException('customer_id không được null');
                }
                const user = await this.prisma.users.findUnique({
                    where: { id: order.customer_id },
                    select: { email: true, full_name: true }
                })
                if (!user) {
                    throw new BadRequestException('Không tìm thấy user với customer_id: ' + order.customer_id);
                }
                if (!order.order_code) {
                    throw new BadRequestException('order_code không được null');
                }

                console.log('có thay đổi trạng thái của đơn hàng', order.order_code, 'Status:', status);
                await this.shipmentService.updateStatus(order.id, status);
                await this.mailService.sendEmailUpdateStatus(user.email, status, order.order_code);
            }
        }
    }

    async getPendingShipments() {
        const res = await this.prisma.shipments.findMany({
            where: {
                status: {
                    in: ['created', 'accepted', 'shipping']
                }
            },
            select: {
                id: true,
                customer_id: true,
                partner_id: true,
                order_code: true,
                status: true,
            }
        })
        return res;
    }



}