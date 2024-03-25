import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    if (context.getType() == 'http') {
      const req = context.switchToHttp().getRequest();
      const result = req.isAuthenticated();
      return result;
    } else if (context.getType() == 'ws') {
      const req = context.switchToWs().getClient();
      const client_request = req.request;
      const result = client_request.isAuthenticated();
      return result;
    } else {
      return null;
    }
  }
}
