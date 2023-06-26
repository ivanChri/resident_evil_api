/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config/dist";
import * as nodemailer from "nodemailer";
@Injectable()
export class MailService {
  constructor(private config:ConfigService){}
    async sendApiKey(receiver:string,key:string,token:string){
      const transporter = nodemailer.createTransport({
     service: this.config.get("SERVICE"),
      host:this.config.get("HOST"),
      port:587,
      tls: {
        ciphers:this.config.get("CIPHERS"),
        rejectUnauthorized: false,
      },
      auth: {
        user: this.config.get("USER"),
        pass: this.config.get("PASSWORD")
      },
      });
      await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify( (error, success) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
      const mailOptions = {
        from:this.config.get("USER"),
        to:receiver,
        subject:"apiKey",
        text:`your apikey is ${key} and  access_token: ${token}`
      };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions,(error, response) => {
              if (error) {
                  reject(error)
              } else {
                resolve(response)
              }
          });
    })
    };
};