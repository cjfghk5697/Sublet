import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { localSerializer } from './localSerializer';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MongodbModule } from '../mongodb/mongodb.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongodbModule,
  ],
  providers: [AuthService, LocalStrategy, localSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
