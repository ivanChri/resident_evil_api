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
      service: this.config.get("SERVICE"),
      host:this.config.get("HOST"),
      port:587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: this.config.get("USER"),
        pass: this.config.get("PASSWORD")
      },
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