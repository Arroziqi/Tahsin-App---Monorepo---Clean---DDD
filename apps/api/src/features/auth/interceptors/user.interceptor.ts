import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserModel } from '../data/models/user.model';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(response => {
        if (response?.data) {
          response.data = plainToInstance(UserModel, response.data, {
            excludeExtraneousValues: false
          });
        }
        return response;
      }),
    );
  }
}
