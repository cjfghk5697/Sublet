import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserInterface } from '@/interface/user.interface';
import { MongodbUserService } from '../mongodb/mongodb.user.service';

@Injectable()
export class localSerializer extends PassportSerializer {
  constructor(private readonly db: MongodbUserService) {
    super();
  }

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  serializeUser(user: UserInterface, done: Function) {
    return done(null, user.user_id);
  }

  /* eslint-disable-next-line @typescript-eslint/ban-types */
  async deserializeUser(user_id: string, done: Function) {
    try {
      const res = await this.db.getOneUser(user_id);
      return done(null, res);
    } catch (e) {
      return done(e, null);
    }
  }
}
