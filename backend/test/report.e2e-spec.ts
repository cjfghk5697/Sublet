import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import {
  postExportStub,
  userCreateStub,
  postCreateStub,
  reportPostDtoStub,
  reportExportInterfaceStub,
  userStub,
} from '@/stubs/mongodb.stub';
import { join } from 'path';
import { unlink, readdir } from 'fs/promises';
import { PostExportInterface } from '@/interface/post.interface';
import { UserCreateDto } from '@/dto/user.dto';

import * as bodyParser from 'body-parser';
import * as _FileStore from 'session-file-store';
import * as session from 'express-session';

describe('ReportController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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

    const FileStore = _FileStore(session);
    const passportSession = session({
      secret: process.env.SESSION_SECRET || 'development',
      resave: false,
      saveUninitialized: false,
      store: new FileStore(),
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passportSession);

    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  const deleteAllFilesInDir = async (dir: string) => {
    try {
      const files = await readdir(dir);
      for (const file of files) {
        if (file === '.placeholder') continue;
        await unlink(join(dir, file));
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const postWithCookie = async (
    cookie: string,
  ): Promise<PostExportInterface | undefined> => {
    let post: PostExportInterface | undefined = undefined;
    await request(app.getHttpServer())
      .post('/post')
      .set('Cookie', cookie)
      .attach('images', './test_image/test_room1.jpg')
      .field({ ...postCreateStub() } as {
        [key: string]: string | number | boolean;
      })
      .expect(201)
      .expect(({ body }) => {
        post = {
          ...postExportStub(),
          image_id: body.image_id,
          key: body.key,
          post_date: body.post_date,
        };
        expect(body).toStrictEqual(post);
      });
    return post;
  };

  const registerLoginCookie = async (createStub: UserCreateDto) => {
    await request(app.getHttpServer())
      .post('/user')
      .send(createStub)
      .expect(201);

    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: createStub.user_id,
        password: createStub.password,
      })
      .expect(201)
      .expect({ ok: true });

    const cookie = resp.header['set-cookie'];

    return cookie;
  };

  beforeEach(async () => {
    await prisma.clearDatabase();
    await deleteAllFilesInDir('./sessions');
    await deleteAllFilesInDir('./public');
  });

  afterAll(async () => {
    await prisma.clearDatabase();
    await deleteAllFilesInDir('./sessions');
    await deleteAllFilesInDir('./public');
  });

  describe('Testing ReportController', () => {
    describe('Endpoint POST /report', () => {
      it('Not logined user should fail', async () => {
        await request(app.getHttpServer())
          .post('/report')
          .send(reportPostDtoStub(1))
          .expect(403)
          .expect({
            message: 'Forbidden resource',
            error: 'Forbidden',
            statusCode: 403,
          });
      });
      it('Logined, but lack of info should fail', async () => {
        const cookie = await registerLoginCookie(userCreateStub());
        await request(app.getHttpServer())
          .post('/report')
          .set('Cookie', cookie)
          .send({})
          .expect(400)
          .expect({
            message: [
              'post_key must be a positive number',
              'post_key must be a number conforming to the specified constraints',
              'reason must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
      });
      it('Logined, but not existing post_key', async () => {
        const cookie = await registerLoginCookie(userCreateStub());
        await request(app.getHttpServer())
          .post('/report')
          .set('Cookie', cookie)
          .send(reportPostDtoStub(1000)) // Not existing post_key
          .expect(400)
          .expect({ message: 'Bad Request', statusCode: 400 });
      });
      it('Passing normal input', async () => {
        const cookie = await registerLoginCookie(userCreateStub());
        const post = await postWithCookie(cookie);

        if (!post) return;

        await request(app.getHttpServer())
          .post('/report')
          .set('Cookie', cookie)
          .send(reportPostDtoStub(post.key))
          .expect(201)
          .expect(reportExportInterfaceStub(userStub().user_id));
      });
    });
  });
});
