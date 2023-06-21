/* eslint-disable prettier/prettier */
import {
    Controller,
    UseGuards,
    Get,
    Param,
    Query,
    ParseIntPipe
} from '@nestjs/common';
import { CreatureService } from './creature.service';
import { AuthGuard } from '../auth/auth.guard';
@Controller('creature')
@UseGuards(AuthGuard)
export class CreatureController {
  constructor(private creatureService:CreatureService){}
   @Get()
   async getCreature (
    @Query('page') page?:number,
    @Query('name') name?:string,
    @Query('based') based?:string,
    @Query('game') game?:string
   ):Promise<any>{
     return await this.creatureService.getCreature({page,name,based,game});
   }
   @Get('/:id')
   async getCreatureDetail (@Param('id',ParseIntPipe) id:number):Promise<any>{
     return await this.creatureService.getDetailCreature(id)
   }
}