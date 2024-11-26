import { Module } from '@nestjs/common';
import {
  PROFILE_REPO_TOKEN,
  ROLE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { PrismaDataSourcesImpl } from './data/datasources/local/prisma.datasources';
import { RolePrismaDataSourcesImpl } from './data/datasources/local/role.prisma.datasources';
import { AuthController } from './presentation/controllers/auth/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleUsecase } from './domain/usecases/role/create.usecase';
import { RoleController } from './presentation/controllers/role/role.controller';
import { GetAllRoleUsecase } from './domain/usecases/role/get.all.usecase';
import { UpdateRoleUsecase } from './domain/usecases/role/update.usecase';
import { DeleteRoleUsecase } from './domain/usecases/role/delete.usecase';
import { SignupUsecase } from './domain/usecases/auth/signup.usecase';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './services/password.service';
import { DataService } from './services/data.service';
import { RefreshTokenStrategy } from './strategies/refresh.token.strategy';
import refreshConfig from './config/refresh.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt.auth.guard';
import { UpdateUsecase } from './domain/usecases/auth/update.usecase';
import { DeleteUsecase } from './domain/usecases/auth/delete.usecase';
import { ProfileDatasourcesImpl } from './data/datasources/local/profile.datasources';
import { ProfileController } from './presentation/controllers/profile/profile.controller';
import { GetAllProfileUsecase } from './domain/usecases/profile/get.all.usecase';
import { GetProfileUsecase } from './domain/usecases/profile/get.usecase';
import { CreateProfileUsecase } from './domain/usecases/profile/create.usecase';
import { UpdateProfileUsecase } from './domain/usecases/profile/update.usecase';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController, RoleController, ProfileController],
  providers: [
    SignupUsecase,
    UpdateUsecase,
    DeleteUsecase,
    CreateRoleUsecase,
    GetAllRoleUsecase,
    UpdateRoleUsecase,
    DeleteRoleUsecase,
    GetProfileUsecase,
    GetAllProfileUsecase,
    CreateProfileUsecase,
    UpdateProfileUsecase,
    AuthService,
    PasswordService,
    DataService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    Logger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: USER_REPO_TOKEN,
      useClass: PrismaDataSourcesImpl,
    },
    {
      provide: ROLE_REPO_TOKEN,
      useClass: RolePrismaDataSourcesImpl,
    },
    {
      provide: PROFILE_REPO_TOKEN,
      useClass: ProfileDatasourcesImpl,
    },
  ],
})
export class AuthModule {}