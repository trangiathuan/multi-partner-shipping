// shipment/strategy/ghtk.strategy.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ShipmentStrategy } from './shipment.strategy.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';

@Injectable()
export class GHTKStrategy implements ShipmentStrategy {
    constructor(private httpService: HttpService) { }

    async createOrder(dto: CreateShipmentDto): Promise<any> {
        const url = 'https://services.giaohangtietkiem.vn/services/shipment/order';
        const token = 'YOUR_GHTK_TOKEN';

        const payload = {
            pick_name: dto.senderName,
            pick_address: dto.senderAddress,
            name: dto.receiverName,
            address: dto.receiverAddress,
            weight: dto.weight,
            products: [{ name: 'Hàng hóa', weight: dto.weight }],
        };

        const res = await this.httpService.axiosRef.post(url, payload, {
            headers: { Token: token },
        });

        return res.data;
    }
}
