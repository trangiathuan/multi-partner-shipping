import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async updateUser(body) {
        const { id, password, role, fullName, phone } = body;

        // Kiểm tra xem người dùng có quyền cập nhật không
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('Tài khỏan không tồn tại');

        // Mã hóa mật khẩu nếu có thay đổi
        const data: any = {};
        if (password && password !== "") {
            data.password_hash = await UserEntity.hashPassword(password);
        }
        if (role && role !== "") {
            data.role = role;
        }
        if (fullName && fullName !== "") {
            data.full_name = fullName;
        }
        if (phone && phone !== "") {
            data.phone = phone;
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                ...data,
            },
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
