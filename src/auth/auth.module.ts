/* eslint-disable prettier/prettier */
import { Module} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";
@Module({
 imports:[UserModule,ConfigModule],
 providers:[AuthGuard,AuthService],
 exports:[AuthGuard,AuthService]
})
export class AuthModule{};