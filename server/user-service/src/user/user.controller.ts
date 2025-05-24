import { Body, Controller, Post, Put, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService, // Inject the UserService
    ) { }

    @Put('/update')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Body() body: UpdateUserDto, @Req() req) {
        const userId = req.user?.id;
        const data = await this.userService.updateUser({ ...body, id: userId });
        if (!data) {
            return {
                EC: -1,
                message: 'Cập nhật tài khoản thất bại',
                response: null,
            };
        }
        return {
            EC: 0,
            message: 'User updated successfully',
            response: data,
        };
    }
}
