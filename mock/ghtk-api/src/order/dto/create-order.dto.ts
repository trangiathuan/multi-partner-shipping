import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'Nguyễn Văn A' })
    sender_name: string;

    @ApiProperty({ example: '123 Đường ABC' })
    sender_address: string;

    @ApiProperty({ example: '0123456789' })
    sender_phone: string;

    @ApiProperty({ example: 'Trần Thị B' })
    receiver_name: string;

    @ApiProperty({ example: '456 Đường XYZ' })
    receiver_address: string;

    @ApiProperty({ example: '0987654321' })
    receiver_phone: string;

    @ApiProperty({ example: 'Mô tả đơn hàng' })
    description: string;

    @ApiProperty({ example: 45000 })
    price: number;

    @ApiProperty({ example: 'created' })
    status: string;
}