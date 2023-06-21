/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext,ForbiddenException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService){}
   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      if(request.query.apiKey){
       return await this.authService.validateUser(request.query.apiKey);
      }else if(request.headers.authorization){
        const token = this.extractTokenFromHeader(request);
        return this.authService.validateToken(token);
      }else{
        throw new ForbiddenException('you do not have access to this service!!');
      }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }