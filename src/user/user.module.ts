/* eslint-disable prettier/prettier */
import { Module} from "@nestjs/common";
import { UserContoller } from "./user.contoller";
import { UserService } from "./user.service";
import { MailModule } from "../utils/MailService/mail.module";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PrismaClientService } from "../utils/PrismaClient/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config/dist";
@Module({
 controllers:[UserContoller],
 providers:[
  UserService,
  UserRepository,
  PrismaClientService
],
 exports:[UserService],
 imports:[
     MailModule,
     JwtModule.registerAsync({
      imports:[ConfigModule],
      global:true,
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_CONSTRAINT'),
      }),
      inject: [ConfigService],
    }),
]
})
export class UserModule {};