/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { AuthModule } from "../auth/auth.module";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { PrismaClientService } from "src/utils/PrismaClient/prismaClient.service";
@Module({
  controllers:[GamesController],
  providers:[
    GamesRepository,
    GamesService,
    PrismaClientService
  ],
  imports:[AuthModule]
})
export class GamesModule {};
