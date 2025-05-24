import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProxyService } from './proxy/proxy.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AppController } from './app.controller';
import { MulterMiddleware } from './multer.middleware';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [ProxyService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware, AuthMiddleware) // multer trước, auth sau
      .exclude(
        // trừ cácr route không cần auth
        { path: 'api/auth/login', method: RequestMethod.POST },
        { path: 'api/auth/register', method: RequestMethod.POST }
      )
      .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
  }
}

