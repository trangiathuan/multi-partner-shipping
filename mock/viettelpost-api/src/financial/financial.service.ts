import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class FinancialService {
    constructor(private readonly sb: SupabaseService) { }

    async getFinancial(shop_id: string) {
        const { data, error } = await this.sb.getClient().from('cod_transactions').select('*').eq('shop_id', shop_id);
        if (error) return { success: false, list: [] };
        return { success: true, cod_history: data };
    }
}