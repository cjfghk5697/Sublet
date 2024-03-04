import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { localSerializer } from './localSerializer';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    MongodbModule,
  ],
  providers: [AuthService, LocalStrategy, localSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
