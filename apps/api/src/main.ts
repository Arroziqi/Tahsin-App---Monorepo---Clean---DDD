import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);

  const primaryPort = appService.getPort() ?? 5000;
  const fallbackPort = 8080;

  try {
    await app.listen(primaryPort);
    console.log(`Application is running on port ${primaryPort}`);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${primaryPort} is already in use. Trying fallback port ${fallbackPort}...`);
      try {
        await app.listen(fallbackPort);
        console.log(`Application is running on fallback port ${fallbackPort}`);
      } catch (fallbackError) {
        console.error(`Failed to start on fallback port ${fallbackPort}:`, fallbackError);
        process.exit(1);
      }
    } else {
      console.error('Failed to start the application:', error);
      process.exit(1);
    }
  }
}
bootstrap();
