import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        return user;
    }

    async login(user: any) {
        const payload = { sub: user.id, role: user.role, email: user.email };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
