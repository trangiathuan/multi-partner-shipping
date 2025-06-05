// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { GHTKStrategy } from './strategy/GHTK.strategy';
import { HttpModule } from '@nestjs/axios';
import { VIETTELPOSTStrategy } from './strategy/VIETTELPOST.stratery';
import { ShipmentStrategyFactory } from './strategy/shipment.streategy.factory';
import { PollingService } from './polling.service';
import { MailModule } from 'src/mail/mail.module';
import { PaymentService } from 'src/payments/payment.service';
import { PaymentModule } from 'src/payments/payment.module';

@Module({
  imports: [HttpModule, MailModule, PaymentModule],
  controllers: [ShipmentController],
  providers: [ShipmentService, PollingService, GHTKStrategy, VIETTELPOSTStrategy, ShipmentStrategyFactory, PaymentService],
  exports: [ShipmentStrategyFactory]
})
export class ShipmentModule { }
