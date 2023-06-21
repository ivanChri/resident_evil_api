/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '../auth/auth.guard';
@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private gamesService:GamesService){}
  @Get()
  async getAllGames(
   @Query('title') title?:string,
   @Query('platfrom') platfrom?:string,
   ):Promise<any>{
   return await this.gamesService.getGames({title,platfrom})
  }
  @Get('/:id')
  async getDetailGames(@Param('id',ParseIntPipe) id:number):Promise<any>{
     return await this.gamesService.getGameDetail(id);
  }
}