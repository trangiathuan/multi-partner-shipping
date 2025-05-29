// shipment/strategy/ghtk.strategy.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ShipmentStrategy } from './shipment.strategy.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { CalculateFreightDto } from '../dto/calculate-freight.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VIETTELPOSTStrategy implements ShipmentStrategy {
    constructor(
        private httpService: HttpService,
        private prisma: PrismaService
    ) { }


    async getAPIKey(dto): Promise<any> {
        const API_KEY = await this.prisma.partners.findFirst({
            where: { id: dto.partnerId },
        });
        return API_KEY?.api_key || ''
        //this.API_KEY = API_Key 
    }
    async createOrder(dto: CreateShipmentDto): Promise<any> {
        const API_KEY = await this.getAPIKey(dto);

        const url = process.env.VIETTELPOST_CREATE_ORDER_API || '';
        // Tạo order_code là chuỗi 15 số ngẫu nhiên
        const payload = {
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
                headers: { 'x-api-key': API_KEY },
            });
            return res.data;
        } catch (error) {
            console.error('VIETTEL POST API error:', error?.response?.data || error.message || error);
            throw error;
        }
    }
    async calculateFreight(dto: CalculateFreightDto): Promise<any> {
        const API_KEY = await this.getAPIKey(dto);

        const url = process.env.VIETTELPOST_CAL_FEE_API || '';
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
                headers: { 'x-api-key': API_KEY },
            });
            return res.data;
        } catch (error) {
            console.log('GHTK API error:', error?.response?.data || error.message || error);
        }
    }
}
