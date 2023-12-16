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

  clearDatabase() {
    console.log('CLEAR DATABASE');
    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key != 'symbol' && key[0] !== '_' && key[0] != '$',
    ) as string[];

    return Promise.all(
      // @ts-expect-error TS7053
      models.map((modelKey: string) => this[modelKey].deleteMany()),
    );
  }
}
