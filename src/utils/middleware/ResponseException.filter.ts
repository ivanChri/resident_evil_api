/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost,HttpException} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException,host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const data = exception.getResponse();
    res.status(status).json({
        response:data,
        path: req.url,
      });
  }
}

