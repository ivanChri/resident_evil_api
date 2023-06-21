/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
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
  imports:[AuthModule]
})
export class CharsModule {};