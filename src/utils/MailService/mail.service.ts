/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config/dist";
const nodemailer = require("nodemailer");
@Injectable()
export class MailService {
  constructor(private config:ConfigService){}
    async sendApiKey(receiver:string,key:string,token:string){
      const transporter = nodemailer.createTransport({
      service:"gmail",
      host:"smtp.gmail.com",
      port:465,
      secure:true,
      auth:{
          type:"OAuth2",
          user:this.config.get("USER"),
          password:this.config.get("PASSWORD"),
          clientId:this.config.get("CLIENT_ID"),
          clientSecret:this.config.get("CLIENT_SECRET"),
         refreshToken:this.config.get("REFRESH_TOKEN")
      }
      });
      const mailOptions = {
        from:this.config.get("USER"),
        to:receiver,
        subject:"apiKey",
        text:`your apikey is ${key} and  access_token: ${token}`
      };
     return await transporter.sendMail(mailOptions, (err:any, info:any) => {
        if (err) throw err;
       console.log(`ok ${info.response}`);
    });
    };
};