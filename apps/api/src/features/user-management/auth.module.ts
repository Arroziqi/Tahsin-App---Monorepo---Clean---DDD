import { Module } from '@nestjs/common';
import { SignupUsecase } from './domain/usecases/signup.usecase';
import { ROLE_REPO_TOKEN, USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { PrismaDataSourcesImpl } from './data/datasources/local/prisma.datasources';
import { RolePrismaDataSourcesImpl } from './data/datasources/local/role.prisma.datasources';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleUsecase } from './domain/usecases/role/create.usecase';
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
    {
      provide: ROLE_REPO_TOKEN,
      useClass: RolePrismaDataSourcesImpl,
    },
  ],
})
export class AuthModule {}
