import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PickAddressService } from './pickaddress.service';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PickAddressDto } from './dto/pickaddress.dto';

@ApiTags('PickAddress')
@Controller('services/pickaddress')
export class PickAddressController {
    constructor(private readonly pickAddressService: PickAddressService) { }

    @Get('list/:shop_id')
    @ApiParam({ name: 'shop_id', required: true })
    @ApiResponse({ status: 200, description: 'Danh sách địa chỉ lấy hàng.' })
    async getList(@Param('shop_id') shop_id: string) {
        return this.pickAddressService.getList(shop_id);
    }

    @Post('add')
    @ApiBody({ type: PickAddressDto })
    @ApiResponse({ status: 200, description: 'Thêm địa chỉ lấy hàng.' })
    async add(@Body() body: PickAddressDto) {
        return this.pickAddressService.add(body);
    }
}