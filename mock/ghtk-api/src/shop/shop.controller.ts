import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ShopDto } from './dto/shop.dto';

@ApiTags('Shop')
@Controller('services/shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Get('info/:shop_id')
    @ApiParam({ name: 'shop_id', required: true })
    @ApiResponse({ status: 200, description: 'Thông tin shop.' })
    async getShopInfo(@Param('shop_id') shop_id: string) {
        return this.shopService.getShopInfo(shop_id);
    }

    @Post('create')
    @ApiBody({ type: ShopDto })
    @ApiResponse({ status: 200, description: 'Tạo shop thành công.' })
    async createShop(@Body() body: ShopDto) {
        return this.shopService.createShop(body);
    }
}