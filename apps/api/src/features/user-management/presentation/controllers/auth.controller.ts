import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Logger,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../data/models/user.model';
import { SignupUserPipe } from '../../pipes/signup.user.pipe';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { SignupUsecase } from '../../domain/usecases/auth/signup.usecase';
import { LocalAuthGuard } from '../../guards/local-auth/local.auth.guard';
import { AuthService } from '../../services/auth.service';

@Controller('/api/users')
@UseInterceptors(UserInterceptor)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly signupUsecase: SignupUsecase,
    private readonly authService: AuthService,
  ) {
    this.logger.log('AuthController initialized');
  }

  @Post('/signup')
  async signUp(
    @Body(SignupUserPipe) request: UserModel,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Processing signup request for user: ${request.email}`);

      const result = await this.signupUsecase.execute(request);

      this.logger.debug('Signup completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Signup failed', {
        error: error.message,
      });

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    this.logger.debug(`Processing signin request for user id: ${req.user.data.id}`);

    try {
      const result = await this.authService.login(req.user.data);

      this.logger.debug('Signin completed successfully');

      return result;
    } catch (error) {
      this.logger.error('Signin failed', {
        error: error.message,
      });

      throw error;
    }
  }
}
