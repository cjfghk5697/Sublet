import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get('dblist')
  getDBList() {
    const dblist = [
      'Chat',
      'ChatRoom',
      'Image',
      'Post',
      'ProfileImage',
      'RequestForm',
      'Reservation',
      'User',
    ];
    return dblist;
  }

  @Get('db/:name')
  async getDB(@Param('name') name: string) {
    try {
      const res = await this.testService.getDB(name);
      return res;
    } catch (e) {
      console.log('test getDB error', e);
      throw new NotFoundException();
    }
  }

  @Delete('db/:name/:id')
  async removeDB(@Param('name') name: string, @Param('id') id: string) {
    try {
      const res = await this.testService.removeDB(name, id);
      return res;
    } catch (e) {
      console.log('test removeDB error', e);
      throw new NotFoundException();
    }
  }
}
