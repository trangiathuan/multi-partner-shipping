// shipment/shipment.module.ts
import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { GHTKStrategy } from './strategy/GHTK.strategy';
import { HttpModule } from '@nestjs/axios';
import { VIETTELPOSTStrategy } from './strategy/VIETTELPOST.stratery';
import { ShipmentStrategyFactory } from './strategy/shipment.streategy.factory';
import { PollingService } from './polling.service';

@Module({
  imports: [HttpModule],
  controllers: [ShipmentController],
  providers: [ShipmentService, PollingService, GHTKStrategy, VIETTELPOSTStrategy, ShipmentStrategyFactory],
  exports: [ShipmentStrategyFactory]
})
export class ShipmentModule { }
