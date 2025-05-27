import { IsNotEmpty, IsUUID } from "class-validator";

export class GetOrderDto {
    @IsNotEmpty()
    @IsUUID()
    customer_id: string;
}