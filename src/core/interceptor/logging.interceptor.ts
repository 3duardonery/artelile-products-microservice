import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Executing...');
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const headers = request.headers;
    const body = request.body;
    console.log({
      url: url,
      headers: headers,
      body: body,
    });

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Done... ${Date.now() - now}ms`)));
  }
}
