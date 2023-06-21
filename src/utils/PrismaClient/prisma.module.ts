/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PrismaClientService } from "./prisma.service";
@Module({
    providers:[PrismaClientService],
    exports:[PrismaClientService]
})
export class PrismaClientModule{}
