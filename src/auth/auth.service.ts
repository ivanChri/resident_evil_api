/* eslint-disable prettier/prettier */
import { UserService } from '../user/user.service';
import { Injectable,UnauthorizedException,NotAcceptableException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService{
  constructor(
    private jwtService:JwtService,
    private config:ConfigService,
    private userService:UserService,
  ){}
    async validateUser(key:string):Promise<boolean>{
      try {
       const user = await this.userService.findApiKey(key);
       if (!user) throw new UnauthorizedException('apiKey is not valid');
       return true;
      } catch(error) {
        throw error;
      }
    }
    async validateToken(token:string):Promise<boolean>{
      if (!token) {
        throw new NotAcceptableException('authorization header is not valid');
      }
      try {
        await this.jwtService.verifyAsync(
          token,
          {
            secret: await this.config.get('JWT_CONSTRAINT')
          }
        );
      } catch {
        throw new UnauthorizedException('jwt token is not valid');
      }
      return true;
    }
  }
