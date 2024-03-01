import { MongodbTestDBService } from '@/modules/mongodb/mongodb.testdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(private readonly testdb: MongodbTestDBService) {}

  async getDB(name: string) {
    switch (name) {
      case 'Chat':
        return await this.testdb.getChatDB();
      case 'ChatRoom':
        return await this.testdb.getChatRoomDB();
      case 'Image':
        return await this.testdb.getImageDB();
      case 'Post':
        return await this.testdb.getPostDB();
      case 'ProfileImage':
        return await this.testdb.getProfileImageDB();
      case 'RequestForm':
        return await this.testdb.getRequestFormDB();
      case 'Reservation':
        return await this.testdb.getReservationDB();
      case 'User':
        return await this.testdb.getUserDB();
      default:
        throw Error('TestService invalid name');
    }
  }

  async removeDB(name: string, id: string) {
    switch (name) {
      case 'Chat':
        return await this.testdb.deleteChatDB(id);
      case 'ChatRoom':
        return await this.testdb.deleteChatRoomDB(id);
      case 'Image':
        return await this.testdb.deleteImageDB(id);
      case 'Post':
        return await this.testdb.deletePostDB(id);
      case 'ProfileImage':
        return await this.testdb.deleteProfileImageDB(id);
      case 'RequestForm':
        return await this.testdb.deleteRequestFormDB(id);
      case 'Reservation':
        return await this.testdb.deleteReservationDB(id);
      case 'User':
        return await this.testdb.deleteUserDB(id);
      default:
        throw Error('TestService invalid name');
    }
  }
}
