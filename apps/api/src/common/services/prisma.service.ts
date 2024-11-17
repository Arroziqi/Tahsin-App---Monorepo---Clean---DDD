import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name); // Logger NestJS

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
