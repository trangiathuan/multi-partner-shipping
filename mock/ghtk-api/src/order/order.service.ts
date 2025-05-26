import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
    constructor(private readonly sb: SupabaseService) { }

    async createOrder(data: any) {
        const order_code = uuidv4();
        const newOrder = {
            order_code,
            sender_name: data.sender.name,
            sender_address: data.sender.address,
            sender_phone: data.sender.phone,
            receiver_name: data.receiver.name,
            receiver_address: data.receiver.address,
            receiver_phone: data.receiver.phone,
            fee: data.fee,
            status: 'created',
            created_at: new Date().toISOString(),
        };
        await this.sb.getClient().from('orders').insert([newOrder]);
        await this.sb.getClient().from('order_status_logs').insert([{
            order_code,
            status: 'created',
            updated_at: new Date().toISOString(),
        }]);
        return { success: true, order_code, fee: newOrder.fee, message: 'Đơn hàng đã được tạo (mock)' };
    }

    async cancelOrder(order_code: string) {
        await this.sb.getClient().from('orders').update({ status: 'cancelled' }).eq('order_code', order_code);
        await this.sb.getClient().from('order_status_logs').insert([{
            order_code,
            status: 'cancelled',
            updated_at: new Date().toISOString(),
        }]);
        return { success: true, message: 'Đã hủy đơn hàng (mock)' };
    }

    async getOrderInfo(order_code: string) {
        const { data, error } = await this.sb.getClient().from('orders').select('*').eq('order_code', order_code).single();
        if (error || !data) return { success: false, message: 'Không tìm thấy đơn hàng' };
        return { success: true, order: data };
    }

    async getOrderStatus(order_code: string) {
        const { data, error } = await this.sb.getClient().from('order_status_logs').select('*').eq('order_code', order_code).order('updated_at', { ascending: false }).limit(1);
        if (error || !data || data.length === 0) return { status: 'unknown' };
        return { status: data[0].status, updated_at: data[0].updated_at };
    }
}