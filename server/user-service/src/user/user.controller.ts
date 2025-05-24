import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Post('/update')
    async updateUser(@Body() body: any) {
        // Logic to update user information
        // This is a placeholder; actual implementation will depend on your service logic
        return {
            EC: 0,
            message: 'User updated successfully',
            data: body, // Return the updated user data
        };

    }
}
