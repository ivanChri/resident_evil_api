/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CharsController } from "./chars.controller";
import { CharsService } from "./chars.service";
import { AuthModule } from "../auth/auth.module";
import { CharsRepository } from "./chars.repository";
import { PrismaClientModule } from "../utils/prismaClient/prismaClient.module";
@Module({
  controllers:[CharsController],
  providers:[
   CharsService,
   CharsRepository,
  ],
  imports:[AuthModule,PrismaClientModule]
})
export class CharsModule {};