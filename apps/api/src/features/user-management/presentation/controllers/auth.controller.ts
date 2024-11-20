import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../data/models/user.model';
import { SignupUserPipe } from '../../pipes/signup.user.pipe';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { SignupUsecase } from '../../domain/usecases/auth/signup.usecase';

@Controller('/api/users')
export class AuthController {
  constructor(private readonly signupUsecase: SignupUsecase) { }

  @Post('/signup')
  @UseInterceptors(UserInterceptor)
  async signUp(
    @Body(SignupUserPipe) request: UserModel,
  ): Promise<DataState<UserModel>> {
    try {
      return await this.signupUsecase.execute(request);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return `Hello ${name || 'World'}`;
  }
}
