import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SignupUserSchema } from '../presentation/dto/signup.dto';
import { UserModel } from '../data/models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SignupUserPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const result = SignupUserSchema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    const { username, email, password } = result.data;
    const hashedPassword = await this.authService.hashedPassword(password);

    return new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    });
  }
}
