/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CharsModule } from './chars/chars.module';
import { PrismaClientModule } from 'src/utils/prismaClient/prismaClient.module';
import { MailModule } from './utils/MailService/mail.module';
import { GamesModule } from './games/games.module';
import { CreatureModule } from './creature/creature.module';
@Module({
  imports: [
   ThrottlerModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
   ConfigModule.forRoot({
     isGlobal:true,
   }),
   UserModule,
   PrismaClientModule,
   AuthModule,
   MailModule,
   CharsModule,
   GamesModule,
   CreatureModule
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
  }
  ]
})
export class AppModule {};
