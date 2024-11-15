import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name); // Logger NestJS

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
