/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { AuthModule } from "../auth/auth.module";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { PrismaClientModule } from "src/utils/prismaClient/prismaClient.module";
@Module({
  controllers:[GamesController],
  providers:[
    GamesRepository,
    GamesService,
  ],
  imports:[AuthModule,PrismaClientModule]
})
export class GamesModule {};
