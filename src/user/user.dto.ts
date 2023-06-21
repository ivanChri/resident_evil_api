/* eslint-disable prettier/prettier */
import { IsEmail } from "class-validator";
export class userDto {
  @IsEmail()
  email:string;
}