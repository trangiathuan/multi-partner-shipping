import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusDto } from './dto/order-status.dto';
import { OrderTrackingDto } from './dto/order-tracking.dto';

@ApiTags('Order')
@Controller('ghtk/order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('createOrder')
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({ status: 200, description: 'Tạo đơn hàng thành công.' })
    async createOrder(@Body() body: CreateOrderDto) {
        return this.orderService.createOrder(body);
    }

    @Post('cancel')
    @ApiBody({ schema: { example: { order_code: 'abc-123-xyz' } } })
    @ApiResponse({ status: 200, description: 'Hủy đơn hàng.' })
    async cancelOrder(@Body() body: OrderStatusDto) {
        return this.orderService.cancelOrder(body.order_code);
    }

    @Get('v2/:order_code')
    @ApiParam({ name: 'order_code', required: true })
    @ApiResponse({ status: 200, description: 'Lấy thông tin đơn hàng.' })
    async getOrderInfo(@Param('order_code') order_code: string) {
        return this.orderService.getOrderInfo(order_code);
    }

    @Post('status')
    @ApiBody({ schema: { example: { order_code: 'abc-123-xyz' } } })
    @ApiResponse({ status: 200, description: 'Lấy trạng thái đơn hàng.' })
    async getOrderStatus(@Body() body: OrderStatusDto) {
        return this.orderService.getOrderStatus(body.order_code);
    }

    @Post('tracking')
    @ApiBody({ schema: { example: { order_code: '' } } })
    @ApiResponse({ status: 200, description: 'Thêm theo dõi đơn hàng' })
    async orderTracking(@Body() body: OrderTrackingDto) {
        return this.orderService.orderTracking(body);
    }

    @Post('get-order-tracking')
    @ApiBody({ schema: { example: { order_code: 'abc-123-xyz' } } })
    @ApiResponse({ status: 200, description: 'Lấy trạng thái đơn hàng.' })
    async getOrderTracking(@Body() body: OrderTrackingDto) {
        return this.orderService.getOrderTracking(body);
    }
}