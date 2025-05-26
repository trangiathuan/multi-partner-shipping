import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ShippingService {
    constructor(private readonly sb: SupabaseService) { }

    async calculateFee(body: any) {
        // Tách từng trường riêng biệt
        const sender_province = body.sender_province;
        const receiver_province = body.receiver_province;
        const weight = Number(body.weight) || 0;
        const length = Number(body.length) || 0;
        const width = Number(body.width) || 0;
        const height = Number(body.height) || 0;

        // Tính trọng lượng quy đổi
        let volumetricWeight = 0;
        if (length > 0 && width > 0 && height > 0) {
            volumetricWeight = (length * width * height) / 5000;
        }
        const chargeableWeight = Math.max(weight, volumetricWeight);

        // Xác định khu vực cước phí
        let region = '';
        if (sender_province && receiver_province) {
            if (sender_province.trim() === receiver_province.trim()) {
                region = 'noi-thanh';
            } else {
                region = 'lien-tinh';
            }
        } else {
            return { fee: null, message: 'Thiếu thông tin tỉnh/thành.' };
        }

        // Bổ sung: xác định zone (miền) dựa trên tỉnh
        const provinceToZone = {
            // Miền Bắc
            'Hà Nội': 'mien-bac', 'Hải Phòng': 'mien-bac', 'Quảng Ninh': 'mien-bac',
            'Bắc Ninh': 'mien-bac', 'Bắc Giang': 'mien-bac', 'Nam Định': 'mien-bac',
            'Thái Bình': 'mien-bac', 'Hà Nam': 'mien-bac', 'Ninh Bình': 'mien-bac',
            'Vĩnh Phúc': 'mien-bac', 'Phú Thọ': 'mien-bac', 'Hưng Yên': 'mien-bac',
            'Lào Cai': 'mien-bac', 'Yên Bái': 'mien-bac', 'Sơn La': 'mien-bac',
            'Lai Châu': 'mien-bac', 'Điện Biên': 'mien-bac', 'Hà Giang': 'mien-bac',
            'Tuyên Quang': 'mien-bac', 'Cao Bằng': 'mien-bac', 'Bắc Kạn': 'mien-bac',
            'Thái Nguyên': 'mien-bac', 'Lạng Sơn': 'mien-bac',
            // Miền Trung
            'Thanh Hóa': 'mien-trung', 'Nghệ An': 'mien-trung', 'Hà Tĩnh': 'mien-trung',
            'Quảng Bình': 'mien-trung', 'Quảng Trị': 'mien-trung', 'Thừa Thiên Huế': 'mien-trung',
            'Đà Nẵng': 'mien-trung', 'Quảng Nam': 'mien-trung', 'Quảng Ngãi': 'mien-trung',
            'Bình Định': 'mien-trung', 'Phú Yên': 'mien-trung', 'Khánh Hòa': 'mien-trung',
            'Ninh Thuận': 'mien-trung', 'Bình Thuận': 'mien-trung',
            // Miền Nam
            'TP Hồ Chí Minh': 'mien-nam', 'Bình Dương': 'mien-nam', 'Đồng Nai': 'mien-nam',
            'Bà Rịa - Vũng Tàu': 'mien-nam', 'Tây Ninh': 'mien-nam', 'Bình Phước': 'mien-nam',
            'Đồng Tháp': 'mien-nam', 'Long An': 'mien-nam',
            'Tiền Giang': 'mien-nam', 'An Giang': 'mien-nam', 'Bến Tre': 'mien-nam',
            'Vĩnh Long': 'mien-nam', 'Trà Vinh': 'mien-nam', 'Cần Thơ': 'mien-nam',
            'Hậu Giang': 'mien-nam', 'Sóc Trăng': 'mien-nam', 'Bạc Liêu': 'mien-nam',
            'Cà Mau': 'mien-nam',
        };
        const senderZone = provinceToZone[sender_province] || null;
        const receiverZone = provinceToZone[receiver_province] || null;
        let zone = null;
        if (region === 'noi-thanh') {
            zone = senderZone; // cùng tỉnh thì cùng miền
        } else if (region === 'lien-tinh') {
            // Nếu khác miền thì tính là liên miền
            zone = senderZone === receiverZone ? senderZone : 'lien-mien';
        }
        // Truy vấn bảng giá theo region + zone nếu có
        let { data: rates, error } = await this.sb
            .getClient()
            .from('shipping_rates')
            .select('*')
            .eq('region', region)
            .eq('zone', zone)
            .gte('max_weight', chargeableWeight)
            .order('max_weight', { ascending: true })
            .limit(1);
        if (error) {
            return { fee: null, message: 'Lỗi truy vấn bảng giá.', details: error.message };
        }
        let fee, maxWeight, baseRate;
        if (!rates || rates.length === 0) {
            // Fallback: lấy bảng giá có max_weight lớn nhất cho region + zone này
            const { data: fallbackRates, error: fallbackError } = await this.sb
                .getClient()
                .from('shipping_rates')
                .select('*')
                .eq('region', region)
                .eq('zone', zone)
                .order('max_weight', { ascending: false })
                .limit(1);
            if (fallbackError) {
                return { fee: null, message: 'Lỗi truy vấn bảng giá (fallback).', details: fallbackError.message };
            }
            if (!fallbackRates || fallbackRates.length === 0) {
                // Gợi ý cập nhật bảng giá
                return {
                    fee: null,
                    message: `Không tìm thấy bảng giá cho region: ${region}, zone: ${zone}. Hãy thêm dòng dữ liệu vào bảng shipping_rates với region='${region}', zone='${zone}', max_weight, price.`
                };
            }
            // Tính phí dựa trên bảng giá lớn nhất + phụ phí vượt cân
            fee = fallbackRates[0].price;
            maxWeight = fallbackRates[0].max_weight;
            const extraKg = Math.ceil(chargeableWeight - maxWeight);
            fee += extraKg * 5000;
            return {
                fee,
                region: fallbackRates[0].region,
                zone: fallbackRates[0].zone,
                chargeable_weight: chargeableWeight,
                fallback: true
            };
        } else {
            baseRate = rates[0];
            fee = baseRate.price;
            maxWeight = baseRate.max_weight;
            if (chargeableWeight > maxWeight) {
                const extraKg = Math.ceil(chargeableWeight - maxWeight);
                fee += extraKg * 5000;
            }
        }

        return {
            fee,
            region: baseRate.region,
            zone: baseRate.zone,
            chargeable_weight: chargeableWeight,
            max_weight: maxWeight
        };
    }
}