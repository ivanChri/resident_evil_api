/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PrismaClientModule } from "src/utils/PrismaClient/prisma.module";
import { CharsController } from "./chars.controller";
import { CharsService } from "./chars.service";
import { AuthModule } from "../auth/auth.module";
import { CharsRepository } from "./chars.repository";
@Module({
  controllers:[CharsController],
  providers:[
   CharsService,
   CharsRepository,
  ],
  imports:[AuthModule,PrismaClientModule]
})
export class CharsModule {};