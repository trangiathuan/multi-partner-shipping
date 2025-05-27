export class ShipmentEntity {
    id: string;
    customerId: string;
    senderName: string;
    senderAddress: string;
    senderPhone: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone?: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    partnerId?: string;
    orderCode?: string;
    status: string;
    createdAt: Date;

    constructor(partial: Partial<ShipmentEntity>) {
        Object.assign(this, partial);
    }

    static fromDb(record: any): ShipmentEntity {
        return new ShipmentEntity({
            id: record.id,
            customerId: record.customer_id,
            senderName: record.sender_name,
            senderAddress: record.sender_address,
            senderPhone: record.sender_phone,
            receiverName: record.receiver_name,
            receiverAddress: record.receiver_address,
            receiverPhone: record.receiver_phone,
            weight: record.weight,
            length: record.length,
            width: record.width,
            height: record.height,
            partnerId: record.partner_id,
            orderCode: record.order_code,
            status: record.status,
            createdAt: record.created_at,
        });
    }

    changeStatus(newStatus: string) {
        // Có thể bổ sung kiểm tra hợp lệ nếu muốn
        this.status = newStatus;
    }
}
