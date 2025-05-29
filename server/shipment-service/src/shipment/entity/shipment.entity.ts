export class ShipmentEntity {
    id: string;
    customer_id: string;
    sender_name: string;
    sender_address: string;
    sender_phone: string;
    receiver_name: string;
    receiver_address: string;
    receiver_phone: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    partner_id: string;
    order_code: string;
    status: string;
    createdAt: Date;

    constructor(partial: Partial<ShipmentEntity>) {
        Object.assign(this, partial);
    }

    static fromDb(record: any): ShipmentEntity {
        return new ShipmentEntity({
            id: record.id,
            customer_id: record.customer_id,
            sender_name: record.sender_name,
            sender_address: record.sender_address,
            sender_phone: record.sender_phone,
            receiver_name: record.receiver_name,
            receiver_address: record.receiver_address,
            receiver_phone: record.receiver_phone,
            weight: record.weight,
            length: record.length,
            width: record.width,
            height: record.height,
            partner_id: record.partner_id,
            order_code: record.order_code,
            status: record.status,
            createdAt: record.created_at,
        });
    }
}
