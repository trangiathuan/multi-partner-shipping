import { BadRequestException, Injectable } from "@nestjs/common";
import nodeCron from "node-cron";
import { PrismaService } from "src/prisma/prisma.service";
import { ShipmentStrategyFactory } from "./strategy/shipment.streategy.factory";
import { GetStatusDto } from "./dto/get-status.dto";
import { shipment_status } from "@prisma/client";
import { get } from "http";

@Injectable()
export class PollingService {
    constructor(
        private prisma: PrismaService,
        private factory: ShipmentStrategyFactory
    ) {
        nodeCron.schedule('*/10 * * * * *', async () => {
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
                console.log('có thay đổi trạng thái của đơn hàng', order.order_code, 'Status:', status);
                await this.updateStatus(order.id, status);
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
                partner_id: true,
                order_code: true,
                status: true,
            }
        })
        return res;
    }

    async updateStatus(id: string, status: string) {
        if (!id || !status) {
            throw new BadRequestException('id và status không được để trống');
        }
        if (!Object.values(shipment_status).includes(status as shipment_status)) {
            throw new BadRequestException(`Status không hợp lệ: ${status}`);
        }
        const res = await this.prisma.shipments.update({
            where: {
                id: id
            },
            data: {
                status: status as shipment_status
            }
        });
        return { message: 'Cập nhật trạng thái thành công', shipment: res };
    }

}