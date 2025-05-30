// shipment/strategy/shipment.strategy.interface.ts
import { CalculateFreightDto } from '../dto/calculate-freight.dto';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { GetStatusDto } from '../dto/get-status.dto';

export interface ShipmentStrategy {
    createOrder(dto: CreateShipmentDto): Promise<any>;
    calculateFreight(dto: CalculateFreightDto): Promise<any>;
    getStatus(dto: GetStatusDto): Promise<any>;

}


