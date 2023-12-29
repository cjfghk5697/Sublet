import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async clearDatabase() {
    console.log('CLEAR DATABASE');

    return this.$runCommandRaw({
      delte: 'Sublet',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
      writeConcern: {
        w: 'majority',
        wtimeout: 10000,
      },
    });
  }
}
