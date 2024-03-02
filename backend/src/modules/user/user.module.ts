import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongodbModule } from '../mongodb/mongodb.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [MongodbModule, CacheModule.register()],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
