import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
    constructor(private readonly sb: SupabaseService) { }

    async createOrder(data: any) {
        // order_code là chuỗi 15 số ngẫu nhiên, đảm bảo không trùng
        let order_code: string;
        let isDuplicate = true;
        let tryCount = 0;
        do {
            order_code = 'GHTK' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
            const { data: existed } = await this.sb.getClient().from('orders').select('order_code').eq('order_code', order_code).single();
            isDuplicate = !!existed;
            tryCount++;
        } while (isDuplicate && tryCount < 100);
        // Nếu vẫn trùng sau 100 lần, thêm hậu tố thời gian để đảm bảo duy nhất
        if (isDuplicate) {
            order_code = order_code.slice(0, 10) + Date.now().toString().slice(-5);
        }
        const newOrder = {
            order_code,
            sender_name: data.sender_name,
            sender_address: data.sender_address,
            sender_phone: data.sender_phone,
            receiver_name: data.receiver_name,
            receiver_address: data.receiver_address,
            receiver_phone: data.receiver_phone,
            description: data.description || '',
            fee: data.price,
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

    async orderTracking(data: any) {

        const order_code = await this.sb.getClient().from('orders').select('order_code').eq('order_code', data.order_code).single();
        if (!order_code.data) {
            throw new NotFoundException(`Mã đơn hàng ${data.order_code} không tồn tại`);
        }


        const post_office_id = await this.sb.getClient().from('post_offices').select('post_office_id').eq('post_office_id', data.post_office_id).single();
        console.log(post_office_id);

        if (!post_office_id.data) {
            throw new NotFoundException(`Mã bưu cục ${data.post_office_id} không tồn tại`);
        }

        const newData = {
            order_code: data.order_code,
            status: data.status,
            post_office_id: data.post_office_id,
            description: data.description,
            updated_by: 'staff_' + data.post_office_id,
        }

        const res = await this.sb.getClient().from('order_tracking').insert([newData]);
        if (res.status !== 201) {
            throw new Error('Không thể chèn dữ liệu theo dõi đơn hàng');
        }
        return {
            success: true,
            message: 'Đã cập nhật trạng thái theo dõi đơn hàng',
            data: newData,
        };
    }

    async getOrderTracking(order: any) {
        const { data, error } = await this.sb.getClient()
            .from('order_tracking')
            .select(`*, post_offices(lat,lng)`)
            .eq('order_code', order.order_code)
            .order('timestamp', { ascending: false });
        if (error || !data || data.length === 0) return { success: false, message: 'Không tìm thấy thông tin theo dõi đơn hàng' };
        return { success: true, message: 'Lấy thông tin theo dõi đơn hàng thành công', tracking_info: data };
    }
}