/* eslint-disable prettier/prettier */
import { Module,Global } from "@nestjs/common";
import { PrismaClientService } from "./prismaClient.service";
@Global()
@Module({
  providers:[PrismaClientService],
  exports:[PrismaClientService]
})
export class PrismaClientModule {};