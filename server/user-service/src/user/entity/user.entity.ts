import * as bcrypt from 'bcrypt';

export class UserEntity {
    public id: string;
    public email: string;
    public password: string;
    public role: string;
    public fullName: string;
    public phone: string;
    public createdAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    // Hàm tạo đối tượng UserEntity từ dữ liệu đầu vào
    static fromDb(record: any): UserEntity {
        return new UserEntity({
            id: record.id,
            email: record.email,
            password: record.password,
            role: record.role,
            fullName: record.full_name,
            phone: record.phone,
            createdAt: record.created_at,
        });
    }

    // Hàm băm mật khẩu
    static async hashPassword(password: string): Promise<string> {
        const password_hash = await bcrypt.hash(password, 10);
        return password_hash;
    }

    // Hàm so sánh mật khẩu
    static async isPasswordMatch(password: string, password_hash: string): Promise<boolean> {
        const isPasswordMatch = await bcrypt.compare(password, password_hash);
        return isPasswordMatch;
    }

}