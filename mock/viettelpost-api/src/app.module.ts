import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingService } from './shipping/shipping.service';
import { SupabaseService } from './supabase/supabase.service';
import { OrderController } from './order/order.controller';
import { ShopController } from './shop/shop.controller';
import { PickAddressController } from './pickaddress/pickaddress.controller';
import { FinancialController } from './financial/financial.controller';
import { OrderService } from './order/order.service';
import { ShopService } from './shop/shop.service';
import { PickAddressService } from './pickaddress/pickaddress.service';
import { FinancialService } from './financial/financial.service';
import { ApiKeyMiddleware } from './api-key.middleware';


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    ShippingController,
    OrderController,
    ShopController,
    PickAddressController,
    FinancialController,
  ],
  providers: [
    ShippingService,
    SupabaseService,
    OrderService,
    ShopService,
    PickAddressService,
    FinancialService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude(
        { path: 'api', method: RequestMethod.ALL },
        { path: 'api/:path', method: RequestMethod.ALL }
      )
      .forRoutes('*');
  }
}