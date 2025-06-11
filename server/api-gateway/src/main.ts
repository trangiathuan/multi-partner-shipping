import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: '*', // Cho phép tất cả origin
    methods: '*', // Cho phép tất cả method như GET, POST, PUT...
    allowedHeaders: '*', // Cho phép tất cả header
  });
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);

}
bootstrap();
