// shipment/shipment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipments')
export class ShipmentController {
    constructor(private shipmentService: ShipmentService) { }

    @Post('createOrder')
    async createShipment(@Body() body: CreateShipmentDto) {
        return this.shipmentService.createShipment(body);
    }
}
