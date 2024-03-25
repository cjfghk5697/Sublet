import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { INestApplication } from '@nestjs/common';
import { RequestHandler } from 'express';
import * as passport from 'passport';

export class MongoIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private session: RequestHandler;

  constructor(app: INestApplication, session: RequestHandler) {
    super(app);
    this.session = session;
  }

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
    } catch (e) {
      console.log('mongoAdaptor: error', e);
    }

    const mongoCollection = mongoClient
      .db(process.env.WS_DB as string)
      .collection(process.env.WS_COLLECTION as string);
    this.adapterConstructor = createAdapter(mongoCollection);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);

    server.use((socket: any, next: any) => {
      socket.data.username = 'test'; //passing random property to see if use method is working
      console.log('testing!');
      next();
    });

    server.engine.use(this.session);
    server.engine.use(passport.initialize());
    server.engine.use(passport.session());
    return server;
  }
}
