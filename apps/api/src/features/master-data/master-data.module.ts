import { Module } from '@nestjs/common';
import { LEVEL_REPO_TOKEN } from 'src/core/const/provider.token';
import { LevelPrismaDataSourcesImpl } from './data/datasources/level.prisma.datasources';
import { AddLevelUsecase } from './domain/usecases/add-level.usecase';
import { UpdateLevelUsecase } from './domain/usecases/update-level.usecase';
import { DeleteLevelUsecase } from './domain/usecases/delete-level.usecase';
import { GetAllLevelUsecase } from './domain/usecases/getAll-level.usecase';
import { PrismaService } from 'src/common/services/prisma.service';
import { LevelController } from './presentation/controllers/level/level.controller';

@Module({
  controllers: [LevelController],
  providers: [
    AddLevelUsecase,
    UpdateLevelUsecase,
    DeleteLevelUsecase,
    GetAllLevelUsecase,
    PrismaService,
    {
      provide: LEVEL_REPO_TOKEN,
      useClass: LevelPrismaDataSourcesImpl,
    },
  ],
})
export class MasterDataModule {}
