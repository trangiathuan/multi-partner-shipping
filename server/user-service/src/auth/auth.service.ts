import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async register(data: { email: string; password: string; full_name: string; phone?: string; role?: 'customer' | 'shipper' | 'admin' | 'partner'; }) {
        try {
            const existingUser = await this.prisma.users.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new ForbiddenException('Email đã được đăng ký');
            }
            const password_hash = await UserEntity.hashPassword(data.password);
            const user = await this.prisma.users.create({
                data: {
                    email: data.email,
                    password_hash,
                    full_name: data.full_name,
                    phone: data.phone,
                    role: data.role || 'customer',
                },
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await this.prisma.users.findUnique({ where: { email } });
            if (!user) {
                return {
                    EC: -1,
                    message: 'Tài khoản không tồn tại',
                    data: null
                }
            }

            const isPasswordMatch = await UserEntity.isPasswordMatch(password, user.password_hash);

            if (!isPasswordMatch) {
                return {
                    EC: -1,
                    message: 'Mật khẩu không chính xác',
                    data: null
                }
            }

            const payload = { sub: user.id, role: user.role, email: user.email };
            const { password_hash, ...result } = user;
            return {
                EC: 0,
                data: result,
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw error;
        }
    }
}
