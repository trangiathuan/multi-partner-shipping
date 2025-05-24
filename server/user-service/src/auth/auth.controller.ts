import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        const response = await this.authService.register(body);
        if (response) {
            return {
                EC: 0,
                message: 'Đăng ký thành công',
                data: response,
            };
        }
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const response = await this.authService.login(body.email, body.password);
        if (response) {
            return {
                EC: 0,
                message: 'Đăng nhập thành công',
                data: response,
            };
        }
    }
}
