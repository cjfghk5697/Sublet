import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { MongodbService } from '@/modules/mongodb/mongodb.service';
import { userCreateStub } from '@/modules/mongodb/__mocks__/stubs/mongodb.stub';

describe('AppController (e2e)', () => {
  const time = 20000;
  let app: INestApplication;
  let prisma: PrismaService;
  let mongodb: MongodbService;
  const _tempService = 'Hello World!12';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(PrismaService)
      // .useValue(tempService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    mongodb = moduleFixture.get(MongodbService);
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  /*beforeEach(async () => {
    console.log('clearing start');
    // await prisma.clearDatabase();
    console.log('clearing end');
  });*/

  it(
    '/ (GET)',
    () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    },
    time,
  );

  describe('about making user', () => {
    it(
      'get not existing user should fail',
      async () => {
        return request(app.getHttpServer())
          .get('/user/mocked-user_id')
          .expect(404);
      },
      time,
    );

    it(
      'create user, and get user information',
      async () => {
        await request(app.getHttpServer())
          .post('/user')
          .send(userCreateStub())
          .expect(201);

        return request(app.getHttpServer())
          .get('/user/mocked-user_id')
          .expect(200);
      },
      time,
    );

    it(
      'cannot login to non-existing user',
      async () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            id: 'mocked-user_id',
            password: 'mocked-password',
          })
          .expect(401);
      },
      time,
    );

    it(
      'can login to existing user',
      async () => {
        await request(app.getHttpServer())
          .post('/user')
          .send(userCreateStub())
          .expect(201);

        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            id: 'mocked-user_id',
            password: 'Mocked-password1)',
          })
          .expect(201)
          .expect({ ok: true });
      },
      time,
    );

    it(
      'cannot logout if not logged in',
      async () => {
        return request(app.getHttpServer()).post('/auth/logout').expect(403);
      },
      time,
    );
  });
});
