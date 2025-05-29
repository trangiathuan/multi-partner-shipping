import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShopService {
    constructor(private readonly sb: SupabaseService) { }

    async getShopInfo(shop_id: string) {
        const { data, error } = await this.sb.getClient().from('shops').select('*').eq('shop_id', shop_id).single();
        if (error || !data) return { success: false, message: 'Không tìm thấy shop' };
        return { success: true, shop: data };
    }

    async createShop(data: any) {
        const shop_id = uuidv4();
        await this.sb.getClient().from('shops').insert([{ ...data, shop_id }]);
        return { success: true, shop_id, message: 'Tạo shop thành công (mock)' };
    }
}