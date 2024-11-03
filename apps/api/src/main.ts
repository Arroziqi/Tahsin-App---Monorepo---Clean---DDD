import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);

  await app.listen(appService.getPort() ?? 8080);
}
bootstrap();
