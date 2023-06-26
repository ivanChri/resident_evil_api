/* eslint-disable prettier/prettier */
import { Injectable,ForbiddenException} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid'
import { userDto } from './user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailService } from '../utils/MailService/mail.service';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class UserService {
  constructor(
    private userRepository:UserRepository,
    private mailService:MailService,
    private jwtService:JwtService,
  ){}
  async register(dto:userDto){
     try {
     const key = await uuidv4().toString();
     const user = await this.userRepository.createUser({
       data:{
        email:dto.email,
        apiKey:key
       }
     });
     const payload = {sub:user.id,email:user.email};
     const token = await this.jwtService.signAsync(payload);
     await this.mailService.sendApiKey(dto.email,key,token);
     return {
       message:`successful registration we will send a token to your email`
     };
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
         if(error.code === "P2002"){
          throw new ForbiddenException (
            `This email is already registered, please use another email!`
          );
        }
      }
      throw error;
    };
   }
  async findApiKey(key:string){
      return await this.userRepository.getUser({
        where:{
          apiKey:key
        }
      });
  }
  async resendEmail(dto:userDto){
    try {
      const user =  await this.userRepository.getUser({
        where:{
          email:dto.email
        }
      });
      if(!user) return await this.register(dto);
      const payload = {sub:user.id,email:user.email};
      const token = await this.jwtService.signAsync(payload);
      await this.mailService.sendApiKey(user.email,user.apiKey,token);
      return {
        message:`we will try again to send token to your email`
      }
    } catch (error) {
       throw error;
    }
  }
}
