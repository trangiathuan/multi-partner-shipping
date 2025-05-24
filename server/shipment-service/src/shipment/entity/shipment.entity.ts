export class ShipmentEntity {
    id: string;
    customerId: string;
    senderName: string;
    senderAddress: string;
    receiverName: string;
    receiverAddress: string;
    weight: number;
    dimension: any;
    partnerId?: string;
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
            receiverName: record.receiver_name,
            receiverAddress: record.receiver_address,
            weight: record.weight,
            dimension: record.dimension,
            partnerId: record.partner_id,
            status: record.status,
            createdAt: record.created_at,
        });
    }

    changeStatus(newStatus: string) {
        // Có thể bổ sung kiểm tra hợp lệ nếu muốn
        this.status = newStatus;
    }
}
