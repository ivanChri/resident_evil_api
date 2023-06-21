/* eslint-disable prettier/prettier */
import { Module,Global } from "@nestjs/common";
import { PrismaClientService } from "./prisma.service";
@Global()
@Module({
    providers:[PrismaClientService],
    exports:[PrismaClientService]
})
export class PrismaClientModule{}
