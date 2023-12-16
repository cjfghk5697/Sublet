import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { MongodbService } from '@/modules/mongodb/mongodb.service';
import { userCreateStub } from '@/modules/mongodb/__mocks__/stubs/mongodb.stub';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mongodb: MongodbService;
  const _tempService = 'Hello World!12';
  beforeEach(async () => {
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
    await prisma.clearDatabase();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('about making user', () => {
    it('get not existing user should fail', async () => {
      await request(app.getHttpServer())
        .get('/user/mocked-user_id')
        .expect(404);
    });

    it('create user, and get user information', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      await request(app.getHttpServer())
        .get('/user/mocked-user_id')
        .expect(200);
    });

    it('cannot login to non-existing user', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: 'mocked-user_id',
          password: 'mocked-password',
        })
        .expect(401);
    });

    it('can login to existing user', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: 'mocked-user_id',
          password: 'Mocked-password1)',
        })
        .expect(201)
        .expect({ ok: true });
    });

    it('cannot logout if not logged in', async () => {
      await request(app.getHttpServer()).post('/auth/logout').expect(403);
    });
  });
});
