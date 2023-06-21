/* eslint-disable prettier/prettier */
import {INestApplication,Injectable,OnModuleInit} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit{
  PrismaClientKnownRequestError: any;
  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}