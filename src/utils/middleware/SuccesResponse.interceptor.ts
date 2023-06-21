/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
export interface Response<T> {
    statusCode:number
    response: T
}
@Injectable()
export class SuccesResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
        map((data) => ({
          statusCode: response.statusCode,
          response: data,
        }))
      );
    }
}