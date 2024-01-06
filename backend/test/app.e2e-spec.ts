import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { MongodbService } from '@/modules/mongodb/mongodb.service';
import {
  postExportStub,
  userCreateStub,
  userExportStub,
  userStub,
  postCreateStub,
} from '@/modules/mongodb/__mocks__/stubs/mongodb.stub';
import { join } from 'path';
import { unlink, readdir } from 'fs/promises';

describe('AppController (e2e)', () => {
  const time = 5000;
  let app: INestApplication;
  let _prisma: PrismaService;
  let _mongodb: MongodbService;
  const _tempService = 'Hello World!12';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

    _mongodb = moduleFixture.get(MongodbService);
    _prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  const deleteAllFilesInDir = async (dir: string) => {
    try {
      const files = await readdir(dir);
      for (const file of files) {
        console.log(file);
        if (file === '.placeholder') continue;
        await unlink(join(dir, file));
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  beforeEach(async () => {
    await _prisma.clearDatabase();
    await deleteAllFilesInDir('./sessions');
    await deleteAllFilesInDir('./public');
  });

  afterAll(async () => {
    await _prisma.clearDatabase();
    await deleteAllFilesInDir('./sessions');
    await deleteAllFilesInDir('./public');
  });

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
    it('get non-existing user should fail', async () => {
      return request(app.getHttpServer())
        .get('/user/mocked-user_id')
        .expect(404);
    });

    it('create user, and get user information', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201)
        .expect(({ body }) => {
          expect(body).toStrictEqual({ ...userExportStub(), id: body.id });
        });

      return request(app.getHttpServer())
        .get(`/user/${userCreateStub().user_id}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toStrictEqual({ ...userExportStub(), id: body.id });
        });
    });

    it('cannot login to non-existing user', async () => {
      await request(app.getHttpServer())
        .get(`/user/${userCreateStub().user_id}`)
        .expect(({ body }) => {
          console.log(body);
        })
        .expect(404);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(401);
    });

    it('can login to existing user', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });
    });

    it('cannot logout if not logged in', async () => {
      return request(app.getHttpServer()).post('/auth/logout').expect(403);
    });

    it('can logout if logged in', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Cookie', cookie)
        .expect(201)
        .expect({ ok: true });
    });

    it('can delete user if logged in', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      return request(app.getHttpServer())
        .delete(`/user/${userStub().user_id}`)
        .set('Cookie', cookie)
        .expect(200)
        .expect({ ok: true });
    });

    it('cannot delete user if not logged in', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      return request(app.getHttpServer())
        .delete(`/user/${userStub().user_id}`)
        .expect(403);
    });

    it("can't delete other user", async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      await request(app.getHttpServer())
        .post('/user')
        .send({
          ...userCreateStub(),
          user_id: 'other-user',
        })
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      return request(app.getHttpServer())
        .delete(`/user/other-user`)
        .set('Cookie', cookie)
        .expect(401)
        .expect({ message: 'Unauthorized', statusCode: 401 });
    });

    it("can't delete non-existing user", async () => {
      return request(app.getHttpServer())
        .delete(`/user/non-existing-user`)
        .expect(403)
        .expect({
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });

    it('cannot delete deleted user', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      await request(app.getHttpServer())
        .delete(`/user/${userStub().user_id}`)
        .set('Cookie', cookie)
        .expect(200)
        .expect({ ok: true });

      return request(app.getHttpServer())
        .delete(`/user/${userStub().user_id}`)
        .set('Cookie', cookie)
        .expect(403)
        .expect({
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });

    it("cannot logout with deleted user's cookie", async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      await request(app.getHttpServer())
        .delete(`/user/${userStub().user_id}`)
        .set('Cookie', cookie)
        .expect(200)
        .expect({ ok: true });

      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Cookie', cookie)
        .expect(403)
        .expect({
          message: 'Forbidden resource',
          error: 'Forbidden',
          statusCode: 403,
        });
    });

    it('cannot login with logout cookie', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Cookie', cookie)
        .expect(201)
        .expect({ ok: true });

      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Cookie', cookie)
        .expect(401)
        .expect({
          message: 'Unauthorized',
          statusCode: 401,
        });
    });
  });

  describe('about posting', () => {
    it('can post if logged in', async () => {
      await request(app.getHttpServer())
        .post('/user')
        .send(userCreateStub())
        .expect(201);

      const resp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          id: userStub().user_id,
          password: userStub().password,
        })
        .expect(201)
        .expect({ ok: true });

      const cookie = resp.header['set-cookie'];

      let req = request(app.getHttpServer())
        .post('/post')
        .set('Cookie', cookie)
        .attach('images', './test_image/test_room1.jpg');

      const createStub = postCreateStub();
      for (const [key, value] of Object.entries(createStub)) {
        req = req.field(key, value as string | number | boolean);
      }
      await req.expect(201).expect(({ body }) => {
        expect(body).toStrictEqual({
          ...postExportStub(),
          image_id: body.image_id,
          key: body.key,
          post_date: body.post_date,
          postuser_id: body.postuser_id,
        });
      });
    });
    it.todo('cannot post if not logged in');
    it.todo('cannot post if deleted user');
  });
});
