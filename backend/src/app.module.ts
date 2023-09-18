import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as session from 'express-session';
import * as passport from 'passport';
import * as _FileStore from 'session-file-store';
const FileStore = _FileStore(session);
import * as bodyParser from 'body-parser';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostController } from './modules/post/post.controller';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [AppModule, UserModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
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
