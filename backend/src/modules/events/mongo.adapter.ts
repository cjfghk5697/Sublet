import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';

export class MongoIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToMongo(): Promise<void> {
    const mongoClient = new MongoClient(process.env.DATABASE_URL as string);
    await mongoClient.connect();
    try {
      await mongoClient
        .db(process.env.WS_DB as string)
        .createCollection(process.env.WS_COLLECTION as string, {
          capped: true,
          size: 1e6,
        });
    } catch (e) {}

    const mongoCollection = mongoClient
      .db(process.env.WS_DB as string)
      .collection(process.env.WS_COLLECTION as string);
    this.adapterConstructor = createAdapter(mongoCollection);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
