import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { TimeHelper } from 'src/common/helper/time.helper';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService, TimeHelper],
  exports: [PrismaService, TimeHelper],
})
export class CommonModule {}
