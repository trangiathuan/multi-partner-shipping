// shipment/strategy/ghtk.strategy.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ShipmentStrategy } from './shipment.strategy.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';

@Injectable()
export class GHTKStrategy implements ShipmentStrategy {
    constructor(private httpService: HttpService) { }


    async createOrder(dto: CreateShipmentDto): Promise<any> {
        const url = process.env.GHTK_API_URL || '';
        const API_KEY = process.env.GHTK_API_KEY;

        // Tạo order_code là chuỗi 15 số ngẫu nhiên
        const order_code = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
        const payload = {
            order_code,
            sender_name: dto.senderName,
            sender_address: dto.senderAddress,
            sender_phone: dto.senderPhone,
            receiver_name: dto.receiverName,
            receiver_address: dto.receiverAddress,
            receiver_phone: dto.receiverPhone,
            fee: dto.fee, // bạn cần truyền fee từ logic tính phí bên ngoài
            status: 'created',
            // created_at sẽ do DB tự động sinh
        };

        const res = await this.httpService.axiosRef.post(url, payload, {
            headers: { 'x-api-key': API_KEY },
        });

        return res.data;
    }
}
