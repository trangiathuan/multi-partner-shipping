// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { GHTKStrategy } from './strategy/GHTK.strategy';
import { HttpModule } from '@nestjs/axios';
import { VIETTELPOSTStrategy } from './strategy/VIETTELPOST.stratery';

@Module({
  imports: [HttpModule],
  controllers: [ShipmentController],
  providers: [ShipmentService, GHTKStrategy, VIETTELPOSTStrategy],
})
export class ShipmentModule { }
