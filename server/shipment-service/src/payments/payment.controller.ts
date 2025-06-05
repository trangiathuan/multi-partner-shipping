import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post('createPayment')
    async createPayment(@Body() body: any) {
        return this.paymentService.createPayment(body)
    }

    @Post('callback')
    async callback(@Body() body: any) {
        const result = this.paymentService.updatePaymentStatus(body)
        return result
    }
}
