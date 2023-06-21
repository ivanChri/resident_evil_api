/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CreatureRepository } from "./creature.repository";
import { AuthModule } from "../auth/auth.module";
import { CreatureController } from "./creature.controller";
import { CreatureService } from "./creature.service";
import { PrismaClientModule } from "src/utils/prismaClient/prismaClient.module";
@Module({
    providers:[
     CreatureRepository,
     CreatureService,
    ],
    controllers:[CreatureController],
    imports:[AuthModule,PrismaClientModule]
})
export class CreatureModule {}