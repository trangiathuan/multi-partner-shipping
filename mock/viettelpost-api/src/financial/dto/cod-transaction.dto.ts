import { ApiProperty } from '@nestjs/swagger';

export class CodTransactionDto {
    @ApiProperty({ example: 'shop-001' })
    shop_id: string;

    @ApiProperty({ example: 100000 })
    amount: number;

    @ApiProperty({ example: '2024-05-26T10:00:00.000Z' })
    time?: string;
}
