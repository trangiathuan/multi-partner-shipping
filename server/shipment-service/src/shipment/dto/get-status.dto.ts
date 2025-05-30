import { IsString, IsUUID } from "class-validator";

export class GetStatusDto {
    @IsString()
    @IsUUID()
    partner_id: string;

    @IsString()
    order_code: string;
}