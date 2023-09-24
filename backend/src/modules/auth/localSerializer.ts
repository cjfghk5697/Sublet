import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class localSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function): any {
    console.log('serialize user:', user);
    return done(null, user);
  }
  deserializeUser(payload: any, done: Function): any {
    console.log('deserialize user:', payload);
    return done(null, payload);
  }
}
