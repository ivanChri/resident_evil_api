/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../utils/prismaClient/prismaClient.service';
import { Prisma,chars } from '@prisma/client';
@Injectable()
export class CharsRepository {
    constructor(private prisma:PrismaClientService){}
    async getChars(
      param:{
      skip?:number,
      take?:number,
      cursor?:Prisma.charsWhereUniqueInput,
      where?:Prisma.charsWhereInput,
      select?:Prisma.charsSelect,
    }):Promise<chars[] | any[]>{
       const {skip,take,cursor,where,select} = param;
       return await this.prisma.chars.findMany({
           skip,
           take,
           cursor,
           where,
           select,
       });
    }
    async getCharsLength():Promise<number>{
      return await this.prisma.chars.count()
    }
}
