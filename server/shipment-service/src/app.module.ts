import { Module } from '@nestjs/common';

import { ShipmentModule } from './shipment/shipment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ShipmentModule, PrismaModule],
})
export class AppModule { }
