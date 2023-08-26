import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log('req user', req.user);
    console.log('req session', req.session);
    const result = req.isAuthenticated();
    console.log('can activate result:', result);
    return result;
  }
}
