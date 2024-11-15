import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SignupUserSchema } from '../presentation/dto/signup.dto';
import { UserModel } from '../data/models/user.model';

@Injectable()
export class SignupUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const result = SignupUserSchema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    const { username, email, password } = result.data;

    return new UserModel(0, username, email, password, 2);
  }
}
