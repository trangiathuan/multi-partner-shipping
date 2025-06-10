import { BadRequestException, Injectable } from "@nestjs/common";
import { PaymentFactory } from "./payment.factory";
import { CreatePaymentDTO } from "./dto/createPayment.dto";
import { ShipmentStrategyFactory } from "src/shipment/strategy/shipment.streategy.factory";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";
import { CreateShipmentDto } from "src/shipment/dto/create-shipment.dto";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";

@Injectable()
export class PaymentService {
    constructor(private paymentFactory: PaymentFactory,
        private shipmentStrategyFactory: ShipmentStrategyFactory,
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly rabbitmqService: RabbitMQService,
    ) { }

    async createPayment(data: CreatePaymentDTO) {
        const method = await this.paymentFactory.getPaymentMethod({ method: data.method } as CreatePaymentDTO)
        const result = await method.createPayment(data)
        return result
    }

    async updatePaymentStatus(data: any) {
        const order = await this.prisma.shipments.findUnique({
            where: {
                id: data.orderId
            }
        })
        if (!order?.partner_id) {
            throw new Error('Không tồn tại partner_id')
        }
        if (!order) {
            throw new Error('Không tồn tại order')
        }
        if (!order.customer_id) {
            throw new Error('Không tồn tại customer_id')
        }
        if (!order.status) {
            throw new Error('Không tồn tại status')
        }

        const user = await this.prisma.users.findUnique({ where: { id: order.customer_id } });
        if (!user) {
            const allUsers = await this.prisma.users.findMany({ select: { id: true, full_name: true, email: true } });
            console.error('customerId không tồn tại:', order.customer_id, 'Danh sách user:', allUsers);
            throw new BadRequestException('customerId không tồn tại');
        }
        if (data.resultCode === 0) {


            await this.rabbitmqService.emitEvent('shipment.create_order', {
                orderId: order.id,
                partnerId: order.partner_id,
                senderName: order.sender_name,
                senderAddress: order.sender_address,
                receiverName: order.receiver_name,
                receiverAddress: order.receiver_address,
                senderPhone: order.sender_phone,
                receiverPhone: order.receiver_phone,
                description: order.description,
                price: order.price,
                status: order.status,
                userEmail: user.email,
            });

            await this.prisma.shipments.update({
                where: { id: order.id },
                data: {
                    payment_status: 'paid',
                }
            });

            console.log('✅ Đã emit event shipment.create_order');
        } else {
            await this.prisma.shipments.update({
                where: {
                    id: order.id
                },
                data: {
                    payment_status: 'faild'
                }
            })

            console.log({
                message: 'Thanh toán thất bại'
            });
        }
    }
} 