/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatureRepository } from './creature.repository';
@Injectable()
export class CreatureService {
  constructor(private creatureRepository:CreatureRepository){}
   async getCreature(
      query:{
        name:string,
        based:string,
        game:string,
        page:number
      }
    ){
     const {name,based,game,page} = query;
     if(name||based||game) return this.filterCreature(name,based,game);
     if(page > 8) throw new NotFoundException(
       `the available pages of this route are only 8 pages`
     );
     try {
        const creatures = await this.creatureRepository.getCreature({
         take:20,
         skip:page > 1 ? 1 : 0,
         cursor:{
            id:page > 1 ? (page - 1) * 20 : 1
          },
        select:{
            id:true,
            name:true,
            img:true,
          }
        })
        return {
            data:creatures,
            page:{
               size:creatures.length,
               current_page:page || "1",
               total_Page:8,
               result_count:await this.creatureRepository.getTotalCreature()
            }
        };
     } catch (error) {
        throw error;
     }
   }
   async filterCreature (
     name?:string,
     based?:string,
     game?:string,
    ){
     try {
        const filterCreature = await this.creatureRepository.getCreature({
            where:{
                AND:[
                  {
                    name:{
                        equals:name
                    }
                  },
                  {
                    creature_basecreation:{
                        based:{
                            equals:based
                        }
                    }
                  },
                  {
                    games_gamestocreature:{
                        some:{
                            title:{
                                equals:game
                            }
                        }
                    }
                  }
                ]
              },
            select:{
                id:true,
                name:true,
                img:true
            }
        });
        if(!filterCreature.length) throw new NotFoundException (
          `cannot find creature from given query`
        );
        return filterCreature;
     } catch (error) {
         throw error;
     }
   }
   async getDetailCreature (id:number) {
     try {
        const creature = await this.creatureRepository.getCreature({
            where:{
                id:{
                    equals:id
                }
            },
            select:{
                id:true,
                name:true,
                img:true,
                desc:true,
                creature_basecreation:{
                  select:{
                      id:true,
                      based:true,
                  }
              },
                creature_variants:{
                    select:{
                        id:true,
                        name:true,
                        img:true,
                        desc:true
                    }
                },
                creature_mutations:{
                    select:{
                        id:true,
                        name:true,
                        img:true,
                        desc:true,
                    }
                },
                games_gamestocreature:{
                    select:{
                        title:true
                    }
                },
            }
        });
        if(!creature.length) throw new NotFoundException(
          `cannot find creature with id ${id}`
        );
        return {
            data:creature
        };
     } catch (error) {
        throw error;
     }
   }
}