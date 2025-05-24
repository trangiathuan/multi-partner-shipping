// shipment/strategy/shipment.strategy.interface.ts
import { CreateShipmentDto } from '../dto/create-shipment.dto';
export interface ShipmentStrategy {
    createOrder(dto: CreateShipmentDto): Promise<any>;
}


