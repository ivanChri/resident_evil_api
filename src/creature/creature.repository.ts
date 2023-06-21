/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaClientService } from "src/utils/PrismaClient/prisma.service";
import { Prisma,creature } from "@prisma/client";
@Injectable()
export class CreatureRepository {
    constructor(private prisma:PrismaClientService){}
    async getCreature(
        param:{
        skip?:number,
        take?:number,
        cursor?:Prisma.creatureWhereUniqueInput,
        where?:Prisma.creatureWhereInput,
        select?:Prisma.creatureSelect,
        }):Promise<creature[] | any[]>{
        const {skip,take,cursor,where,select} = param;
        return await this.prisma.creature.findMany({
          skip,
          take,
          cursor,
          where,
          select
        });
    }
    async getTotalCreature ():Promise<number>{
     return await this.prisma.creature.count();
    }
}