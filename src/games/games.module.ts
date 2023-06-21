/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { AuthModule } from "../auth/auth.module";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
@Module({
  controllers:[GamesController],
  providers:[
    GamesRepository,
    GamesService,
  ],
  imports:[AuthModule]
})
export class GamesModule {};
