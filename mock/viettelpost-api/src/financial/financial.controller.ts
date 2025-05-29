import { Controller, Get, Param } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Financial')
@Controller('services/shipment')
export class FinancialController {
    constructor(private readonly financialService: FinancialService) { }

    @Get('financial/:shop_id')
    @ApiParam({ name: 'shop_id', required: true })
    @ApiResponse({ status: 200, description: 'Lấy lịch sử đối soát COD của shop.' })
    async getFinancial(@Param('shop_id') shop_id: string) {
        return this.financialService.getFinancial(shop_id);
    }
}