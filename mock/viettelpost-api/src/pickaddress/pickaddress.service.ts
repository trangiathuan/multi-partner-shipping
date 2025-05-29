import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PickAddressService {
    constructor(private readonly sb: SupabaseService) { }

    async getList(shop_id: string) {
        const { data, error } = await this.sb.getClient().from('pick_addresses').select('*').eq('shop_id', shop_id);
        if (error) return { success: false, list: [] };
        return { success: true, list: data };
    }

    async add(data: any) {
        const id = uuidv4();
        await this.sb.getClient().from('pick_addresses').insert([{ ...data, id }]);
        return { success: true, id, message: 'Thêm địa chỉ lấy hàng thành công (mock)' };
    }
}