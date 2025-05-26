// shipment/strategy/ghtk.strategy.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ShipmentStrategy } from './shipment.strategy.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { CalculateFreightDto } from '../dto/calculate-freight.dto';

@Injectable()
export class GHTKStrategy implements ShipmentStrategy {
    private readonly API_KEY: string;
    constructor(private httpService: HttpService) {
        this.API_KEY = process.env.API_KEY || '';
    }

    async createOrder(dto: CreateShipmentDto): Promise<any> {
        const url = process.env.GHTK_CREATE_ORDER_API || '';
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
            description: dto.description || '',
            price: dto.price,
            status: 'created',
            length: dto.length,
            width: dto.width,
            height: dto.height,
            weight: dto.weight,
            // created_at sẽ do DB tự động sinh
        };
        try {
            const res = await this.httpService.axiosRef.post(url, payload, {
                headers: { 'x-api-key': this.API_KEY },
            });
            return res.data;
        } catch (error) {
            console.error('GHTK API error:', error?.response?.data || error.message || error);
            throw error;
        }
    }
    async calculateFreight(dto: CalculateFreightDto): Promise<any> {
        const url = process.env.GHTK_CAL_FEE_API || '';
        const payload = {
            sender_province: dto.sender_province,
            sender_address: dto.sender_address,
            sender_phone: dto.sender_phone,
            sender_name: dto.sender_name,
            receiver_province: dto.receiver_province,
            receiver_address: dto.receiver_address,
            receiver_phone: dto.receiver_phone,
            receiver_name: dto.receiver_name,
            weight: dto.weight,
            length: dto.length,
            width: dto.width,
            height: dto.height,
        };
        try {
            const res = await this.httpService.axiosRef.post(url, payload, {
                headers: { 'x-api-key': this.API_KEY },
            });
            return res.data;
        } catch (error) {
            console.log('GHTK API error:', error?.response?.data || error.message || error);
        }
    }
}
