import { ApiProperty } from '@nestjs/swagger';

export class ShopDto {
    @ApiProperty({ example: 'shop-001' })
    shop_id?: string;

    @ApiProperty({ example: 'Shop A' })
    name: string;

    @ApiProperty({ example: '123 Đường ABC' })
    address: string;

    @ApiProperty({ example: 'Hà Nội' })
    province: string;
}