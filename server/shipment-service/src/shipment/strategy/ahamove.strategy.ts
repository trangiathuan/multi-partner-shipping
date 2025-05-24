import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ShipmentStrategy } from './shipment.strategy.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';

@Injectable()
export class AhamoveStrategy implements ShipmentStrategy {
    constructor(private httpService: HttpService) { }

    async createOrder(dto: CreateShipmentDto): Promise<any> {
        const url = 'https://apiv3.ahamove.com/v1/order'; // URL mẫu, cần thay bằng URL thật của Ahamove
        const token = 'YOUR_AHAMOVE_TOKEN'; // Đặt token vào biến môi trường thực tế

        const payload = {
            sender: {
                name: dto.senderName,
                address: dto.senderAddress,
            },
            receiver: {
                name: dto.receiverName,
                address: dto.receiverAddress,
            },
            weight: dto.weight,
            dimension: dto.dimension,
            // Thêm các trường khác nếu Ahamove yêu cầu
        };

        const res = await this.httpService.axiosRef.post(url, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    }
}
