// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './payment.factory';
import { Momo } from './momo/momo.payment.method';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [HttpModule],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentFactory, Momo],
    exports: [PaymentFactory]
})
export class PaymentModule { }
