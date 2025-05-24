import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [UserModule, ShipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
