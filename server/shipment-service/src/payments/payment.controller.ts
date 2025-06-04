import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post('createPayment')
    async createMomo(@Body() body: any) {
        return this.paymentService.createPayment(body)
    }
}
