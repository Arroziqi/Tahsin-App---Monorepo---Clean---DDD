import { Module } from '@nestjs/common';
import { ROLE_REPO_TOKEN, USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { PrismaDataSourcesImpl } from './data/datasources/local/prisma.datasources';
import { RolePrismaDataSourcesImpl } from './data/datasources/local/role.prisma.datasources';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleUsecase } from './domain/usecases/role/create.usecase';
import { RoleController } from './presentation/controllers/role.controller';
import { GetAllRoleUsecase } from './domain/usecases/role/get.all.usecase';
import { UpdateRoleUsecase } from './domain/usecases/role/update.usecase';
import { DeleteRoleUsecase } from './domain/usecases/role/delete.usecase';
import { SignupUsecase } from './domain/usecases/auth/signup.usecase';

@Module({
  controllers: [AuthController, RoleController],
  providers: [
    SignupUsecase,
    CreateRoleUsecase,
    GetAllRoleUsecase,
    UpdateRoleUsecase,
    DeleteRoleUsecase,
    AuthService,
    PrismaService,
    {
      provide: USER_REPO_TOKEN,
      useClass: PrismaDataSourcesImpl,
    },
    {
      provide: ROLE_REPO_TOKEN,
      useClass: RolePrismaDataSourcesImpl,
    },
  ],
})
export class AuthModule { }
