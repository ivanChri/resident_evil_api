/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import { GamesRepository } from './games.repository';
@Injectable()
export class GamesService {
  constructor(private gamesRepository:GamesRepository){}
  async getGames(query:{
    title:string,
    platfrom:string
  }){
    const {title,platfrom} = query;
    if(title||platfrom) return this.filterGames(title,platfrom);
     try {
        const games = await this.gamesRepository.getGames({
          select:{
            id:true,
            title:true,
            poster:true,
          }
        });
        return {
           data:games,
           size:games.length,
           total_result:await this.gamesRepository.getTotalGames()
        };
     } catch (error) {
        throw error;
     }
  }
  async getGameDetail(id:number){
    try {
        const game = await this.gamesRepository.getGames({
          where:{
            id:{
              equals:id
            }
          },
          select:{
            id:true,
            title:true,
            poster:true,
            releaseYear:true,
            gameDesc:true,
            platfrom:{
              select:{
                 name:true
              }
            },
            chars_chartogames:{
                select:{
                    id:true,
                    name:true
                }
            },
            creature_gamestocreature:{
                select:{
                    id:true,
                    name:true
                }
            },
            creature_creturebosstogames:{
              select:{
                id:true,
                name:true
              }
            },
            chars_bosschartogames:{
              select:{
                id:true,
                name:true
              }
            }
          }
        });
        if(!game.length) throw new NotFoundException (
          `cannot find game with id ${id}`
        );
        return {
            data:game,
        };
    } catch (error) {
      throw error;
    }
  }
  async filterGames(title?:string,platfrom?:string){
    try {
        const game = await this.gamesRepository.getGames({
           where:{
             AND:[
               {
                 title:{
                   equals:title
                 }
               },
               {
                platfrom:{
                  some:{
                    name:platfrom
                  }
                }
               }
             ]
           },
           select:{
            id:true,
            title:true,
            poster:true
           }
        });
        if(!game.length) throw new NotFoundException(
         `cannot find games from given query`
        );
        return {
            data:game,
            size:game.length,
            result_count:await this.gamesRepository.getTotalGames()
        };
    } catch (error) {
        throw error;
    }
  }
}