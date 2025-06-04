import { CreatePaymentDTO } from "./dto/createPayment.dto";

export interface PaymentsInterface {
    createPayment(dto: CreatePaymentDTO)
}