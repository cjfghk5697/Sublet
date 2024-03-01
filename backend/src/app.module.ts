import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as session from 'express-session';
import * as passport from 'passport';
import * as _FileStore from 'session-file-store';
import * as bodyParser from 'body-parser';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './modules/reservation/reservation.module';
import { RequestModule } from './modules/request/request.module';
import { EventsModule } from './modules/events/events.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    AppModule,
    UserModule,
    AuthModule,
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public_user'),
      serveRoot: '/public_user',
    }),
    ConfigModule.forRoot(),
    ReservationModule,
    RequestModule,
    EventsModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const FileStore = _FileStore(session);
    consumer
      .apply(
        bodyParser.urlencoded({ extended: true }),
        session({
          secret: process.env.SESSION_SECRET || 'development',
          resave: false,
          saveUninitialized: false,
          store: new FileStore(),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
