import { ApiProperty } from '@nestjs/swagger';

export class CalculateFeeDto {
    @ApiProperty({ example: 'Hà Nội' })
    sender_province: string;

    @ApiProperty({ example: '123 Đường ABC' })
    sender_address: string;

    @ApiProperty({ example: '0123456789' })
    sender_phone: string;

    @ApiProperty({ example: 'Nguyễn Văn A' })
    sender_name: string;

    @ApiProperty({ example: 'Hồ Chí Minh' })
    receiver_province: string;

    @ApiProperty({ example: '456 Đường XYZ' })
    receiver_address: string;

    @ApiProperty({ example: '0987654321' })
    receiver_phone: string;

    @ApiProperty({ example: 'Trần Thị B' })
    receiver_name: string;

    @ApiProperty({ example: 2 })
    weight: number;

    @ApiProperty({ example: 30 })
    length: number;

    @ApiProperty({ example: 20 })
    width: number;

    @ApiProperty({ example: 15 })
    height: number;
}
