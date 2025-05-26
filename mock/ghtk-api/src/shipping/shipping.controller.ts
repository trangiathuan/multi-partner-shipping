import { Controller, Post, Body } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ApiTags, ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { CalculateFeeDto } from './dto/calculate-fee.dto';

@ApiTags('Shipping')
@ApiSecurity('x-api-key')
@Controller('services/shipment')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) { }

    @Post('fee')
    @ApiBody({ type: CalculateFeeDto })
    @ApiResponse({ status: 200, description: 'Kết quả tính phí vận chuyển.' })
    async calculateFee(@Body() body: CalculateFeeDto) {
        return this.shippingService.calculateFee(body);
    }
}