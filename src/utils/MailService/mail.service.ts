/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config/dist";
const fetch = require("node-fetch")
@Injectable()
export class MailService {
  constructor(private config:ConfigService){}
    async sendApiKey(receiver:string,key:string,token:string){
      const data = {
        service_id : this.config.get("SERVICE"),
        template_id : this.config.get("TEMPLATE_ID"),
        user_id: this.config.get("USER_ID"),
        accessToken :this.config.get("ACCESS_TOKEN"),
        template_params: {
          to_name:receiver,
          from_name:this.config.get("USER"),
          message:`your apiKey is ${key} and your acces_token ${token}`
        }
      };
       try {
        return await fetch(this.config.get("SERVICE_URL"), {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'}
         });
       } catch (error) {
         throw error;
       }
    };
};