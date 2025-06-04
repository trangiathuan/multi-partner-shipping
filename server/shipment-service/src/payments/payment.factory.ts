import { Injectable } from "@nestjs/common";
import { CreatePaymentDTO } from "./dto/createPayment.dto";
import { Momo } from "./momo/momo.payment.method";

@Injectable()
export class PaymentFactory {
    constructor(private MOMO: Momo) { }

    getPaymentMethod(dto: CreatePaymentDTO) {
        switch (dto.method) {
            case 'MOMO': return this.MOMO
            default: throw new Error(`Không tồn tại phương thức: ${dto.method}`)
        }
    }
}