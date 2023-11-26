import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserInterface } from '@/interface/user.interface';

@Injectable()
export class localSerializer extends PassportSerializer {
  constructor(private readonly db: MongodbService) {
    super();
  }

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  serializeUser(user: UserInterface, done: Function) {
    console.log('[localSerializer:serializeUser] user:', user);
    return done(null, user.user_id);
  }

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  async deserializeUser(user_id: string, done: Function) {
    console.log('[localSerializer:deserializeUser] user_id:', user_id);
    try {
      const res = await this.db.getOneUser(user_id);
      return done(null, res);
    } catch (e) {
      console.log('[localSerializer:deserializeUser] error: ', e);
      return done(e, null);
    }
  }
}
