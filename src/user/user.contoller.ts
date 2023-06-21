/* eslint-disable prettier/prettier */
import { Controller,Post,Body,UsePipes,ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './user.dto';
@Controller('user')
@UsePipes(new ValidationPipe({
  whitelist:true
}))
export class UserContoller {
  constructor(private userServive: UserService) {}
  @Post('register')
  async register(@Body() UserDto:userDto):Promise<any>{
    return await this.userServive.register(UserDto);
  }
  @Post('resend')
  async resendEmail(@Body() UserDto:userDto):Promise<any>{
    return await this.userServive.resendEmail(UserDto);
  }
}