/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware,NotAcceptableException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class emailCheckerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.body.email.includes('gmail')) throw new NotAcceptableException (
      `please use gmail!`
    );
    next();
  }
}
