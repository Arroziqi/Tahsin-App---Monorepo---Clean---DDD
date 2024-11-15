import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './core/filter/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);

  await app.listen(appService.getPort() ?? 8080);
}
bootstrap();
