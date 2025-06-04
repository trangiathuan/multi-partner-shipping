import { Injectable } from "@nestjs/common";
import { PaymentFactory } from "./payment.factory";
import { CreatePaymentDTO } from "./dto/createPayment.dto";

@Injectable()
export class PaymentService {
    constructor(private paymentFactory: PaymentFactory) { }

    async createPayment(data: CreatePaymentDTO) {
        const method = await this.paymentFactory.getPaymentMethod({ method: data.method } as CreatePaymentDTO)
        const result = await method.createPayment(data)
        return result
    }
} 