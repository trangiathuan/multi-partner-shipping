// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { GHTKStrategy } from './strategy/ghtk.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ShipmentController],
  providers: [ShipmentService, GHTKStrategy],
})
export class ShipmentModule { }
