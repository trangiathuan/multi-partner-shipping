import { IsString, IsUUID } from "class-validator";

export class GetStatusDto {
    @IsString()
    @IsUUID()
    customer_id: string;

    @IsString()
    @IsUUID()
    partner_id: string;

    @IsString()
    order_code: string;
}