/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/utils/PrismaClient/prisma.service';
import { Prisma,user } from '@prisma/client';
@Injectable()
export class UserRepository {
  constructor(private prisma:PrismaClientService){}
  async createUser(params: { data: Prisma.userCreateInput }): Promise<user> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }
  async getUser(Params:{where:Prisma.userWhereUniqueInput}):Promise<user> {
    const {where} = Params;
    return this.prisma.user.findUnique({where})
  }
  async delete () {
    return await this.prisma.user.deleteMany();
  }
}