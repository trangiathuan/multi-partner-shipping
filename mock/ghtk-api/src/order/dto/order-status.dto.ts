import { ApiProperty } from '@nestjs/swagger';

export class OrderStatusDto {
    @ApiProperty({ example: 'abc-123-xyz' })
    order_code: string;
}