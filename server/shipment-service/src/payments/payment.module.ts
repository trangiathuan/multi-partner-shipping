// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './payment.factory';
import { Momo } from './momo/momo.payment.method';
import { HttpModule } from '@nestjs/axios';
import { ShipmentModule } from 'src/shipment/shipment.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShipmentStrategyFactory } from 'src/shipment/strategy/shipment.streategy.factory';
import { MailService } from 'src/mail/mail.service';
import { GHTKStrategy } from 'src/shipment/strategy/GHTK.strategy';
import { VIETTELPOSTStrategy } from 'src/shipment/strategy/VIETTELPOST.stratery';


@Module({
    imports: [HttpModule],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentFactory, Momo, ShipmentStrategyFactory, MailService, GHTKStrategy, VIETTELPOSTStrategy],
    exports: [PaymentFactory]
})
export class PaymentModule { }
