import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './features/auth/auth.module';
import { CommonModule } from './common/common.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './core/filter/error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommonModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
