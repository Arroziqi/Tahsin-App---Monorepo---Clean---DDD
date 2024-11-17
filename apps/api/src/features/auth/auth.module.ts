import { Module } from '@nestjs/common';
import { SignupUsecase } from './domain/usecases/signup.usecase';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { PrismaDataSourcesImpl } from './data/datasources/local/prisma.datasources';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    SignupUsecase,
    AuthService,
    PrismaService,
    {
      provide: USER_REPO_TOKEN,
      useClass: PrismaDataSourcesImpl, // Pastikan ini adalah implementasi dari UserRepository
    },
  ],
})
export class AuthModule {}
