import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserInterface } from '@/interface/user.interface';

@Injectable()
export class localSerializer extends PassportSerializer {
  constructor(private readonly db: MongodbService) {
    super();
  }
  serializeUser(user: UserInterface, done: Function) {
    console.log('serialize user:', user);
    return done(null, user.user_id);
  }
  async deserializeUser(user_id: string, done: Function) {
    console.log('deserialize user:', user_id);
    try {
      const res = await this.db.getOneUser(user_id);
      return done(null, res);
    } catch (e) {
      return done(e, null);
    }
  }
}
