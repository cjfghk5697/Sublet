import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { MongodbModule } from '@/modules/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
