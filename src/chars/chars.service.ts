/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException} from "@nestjs/common";
import { CharsRepository } from "./chars.repository";
@Injectable()
export class CharsService{
   constructor(private charsRepository:CharsRepository){}
  async getChars(
    query:{
    page:number,
    name:string,
    game:string,
    gender:string,
    status:string,
  }){
    const {page,name,game,gender,status} = query;
    if(name||game||gender||status) return this.filterChar(name,game,gender,status);
    if(page > 7) throw new NotFoundException (
      `the available pages of this route are only 7 pages`
    );
     try {
        const chars = await this.charsRepository.getChars({
            take:20,
            skip:page > 1 ? 1 : 0,
            cursor:{
             id:page > 1 ? (page - 1) * 20 : 1
            },
            select:{
              id:true,
              name:true,
              img:true
            }
         });
         return {
             data:chars,
             page:{
                size:chars.length,
                current_page:page || "1",
                total_Page:7,
                result_count:await this.charsRepository.getCharsLength()
             }
         };
     } catch (error) {
        throw error;
     }
   }
   async filterChar(
    name?:string,
    game?:string,
    gender?:string,
    status?:string
    ){
      try {
        const filterChar = await this.charsRepository.getChars({
           where:{
             AND:[
               {
                name:{
                  startsWith:name
                },
               },
               {
                games_chartogames:{
                  some:{
                    title:{
                       equals:game
                    }
                  }
                }
               },
               {
                gender:{
                   gender:{
                    equals:gender
                   }
                }
               },
               {
                status:{
                  status:{
                     equals:status
                  }
                }
               }
             ]
           },
           select:{
             id:true,
             img:true,
             name:true,
           }
        });
        if(!filterChar.length) throw new NotFoundException (
          `cannot find char from given query`
        );
        return {
           data:filterChar,
           size:filterChar.length,
           result_count:await this.charsRepository.getCharsLength()
        };
      }
       catch (error) {
         throw error;
      }
   }

   async getDetailChar(id:number){
      try {
       const char = await this.charsRepository.getChars({
        where:{
            id:{
                equals:id
            },
        },
        select:{
           id:true,
           name:true,
           img:true,
           lore:true,
           status:true,
           gender:true,
           games_chars_first_debut_idTogames:{
            select:{
                id:true,
                title:true
            }
           },
           games_chars_last_debut_idTogames:{
            select:{
                id:true,
                title:true
            }
          },
          games_chartogames:{
            select:{
                id:true,
                title:true
            }
          }
        }
      });
       if(!char.length) throw new NotFoundException (
        `cannot find char with id ${id},char id is only available up to ${await this.charsRepository.getCharsLength()}`
       );
       return {
         data:char
       };
      } catch (error) {
        throw error;
      }  
   }
}