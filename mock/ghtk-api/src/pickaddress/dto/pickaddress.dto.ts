import { ApiProperty } from '@nestjs/swagger';

export class PickAddressDto {
    @ApiProperty({ example: 'shop-001' })
    shop_id: string;

    @ApiProperty({ example: '123 Đường ABC' })
    address: string;

    @ApiProperty({ example: 'Hà Nội' })
    province: string;
}