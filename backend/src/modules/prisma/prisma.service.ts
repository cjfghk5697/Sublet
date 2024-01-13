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
    const collectionResult = await this.$runCommandRaw({
      listCollections: 1,
      nameOnly: true,
    });

    const collectionList: { name: string; type: string }[] = (
      collectionResult?.cursor as { firstBatch: any[] }
    )['firstBatch'];

    for (let i = 0; i < collectionList.length; i++) {
      const ele = collectionList[i];
      if (ele.type !== 'collection') continue;
      await this.$runCommandRaw({
        delete: ele.name,
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
}
