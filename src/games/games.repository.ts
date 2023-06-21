/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../utils/prismaClient/prismaClient.service';
import { Prisma,games } from '@prisma/client';
@Injectable()
export class GamesRepository {
  constructor(private prisma:PrismaClientService){}
    async getGames(
      param:{
      where?:Prisma.gamesWhereInput,
      select?:Prisma.gamesSelect
    }):Promise<games[] | any[]>{
       const {where,select} = param;
       return await this.prisma.games.findMany({
        where,
        select,
       });
    }
    async getTotalGames():Promise<number>{
      return await this.prisma.games.count();
    }
}