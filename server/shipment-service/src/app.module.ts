import { Module } from '@nestjs/common';

import { ShipmentModule } from './shipment/shipment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payments/payment.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot(), ShipmentModule, PrismaModule, PaymentModule, RabbitMQModule],
})
export class AppModule { }
