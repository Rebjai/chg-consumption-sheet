import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamableFile } from '@nestjs/common';

export interface Response<T> {
  data: T;
  status: number;
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, Response<T>| StreamableFile> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | StreamableFile> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof StreamableFile) {
          return data; 
        } else {
          return { data, status: 200 };
        }
      }),
    );
  }
}