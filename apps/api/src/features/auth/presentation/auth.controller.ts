import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { SignupUsecase } from '../domain/usecases/signup.usecase';
import { SignupDto } from './dto/signup.dto';
import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../data/models/user.model';

@Controller('/api/users')
export class AuthController {
  constructor(private readonly signupUsecase: SignupUsecase) {}

  @Post('/signup')
  async signUp(@Body() request: SignupDto): Promise<DataState<any>> {
    try {
      const userModel = new UserModel(
        0,
        request.username,
        request.email,
        request.password,
        1,
      );

      return await this.signupUsecase.execute(userModel);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message, // Adjust this to match your error handling structure
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
