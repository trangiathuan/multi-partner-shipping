import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async register(data: {
        email: string; password: string; full_name: string; phone?: string; role?: 'customer' | 'shipper' | 'admin' | 'partner';
    }) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ForbiddenException('Email đã được đăng ký');
        }

        const password_hash = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password_hash,
                full_name: data.full_name,
                phone: data.phone,
                role: data.role || 'customer',
            },
        });
        return user;
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) return null;

        return user;
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
