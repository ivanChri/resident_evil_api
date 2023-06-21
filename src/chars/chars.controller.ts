/* eslint-disable prettier/prettier */
import { 
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CharsService } from "./chars.service";
import { AuthGuard } from "../auth/auth.guard";
@Controller('chars')
@UseGuards(AuthGuard)
export class CharsController {
    constructor(private charService:CharsService){}
    @Get()
    async getChars (
     @Query('name') name?:string,
     @Query('game') game?:string,
     @Query('gender') gender?:string,
     @Query('page') page?:number,
     @Query('status') status?:string
    ):Promise<any>{
      return await this.charService.getChars({page,name,game,gender,status});
    }
    @Get('/:id')
    async getOne(@Param('id',ParseIntPipe) id:number):Promise<any>{
      return await this.charService.getDetailChar(id)
    }
}