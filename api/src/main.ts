import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prevent requests getting blocked by
  // CORS Policy by allowing every domain (origin)
  app.enableCors({ origin: "*" })
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
