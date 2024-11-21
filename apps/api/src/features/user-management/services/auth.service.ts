import {
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../domain/repository/user.repository';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { DataState, DataSuccess } from 'src/core/resources/data.state';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from '../types/auth.jwtPayload';
import { UserModel } from '../data/models/user.model';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('AuthService initialized');
  }

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with email: ${email}`);

    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user.data) {
        this.logger.warn(`User not found with email: ${email}`);
        throw new UnauthorizedException('User not found!');
      }

      const isPasswordValid = await this.passwordService.comparePassword(
        password,
        user.data.password,
      );

      if (!isPasswordValid) {
        this.logger.warn(`Invalid password attempt for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials!');
      }

      this.logger.debug('User validated successfully');

      return user;
    } catch (error) {
      this.logger.error(`User validation failed: ${error.message}`);
      throw error;
    }
  }

  async login(
    user: UserModel,
  ): Promise<DataState<UserModel & { accessToken: string }>> {
    try {
      this.logger.debug(`Attempting login for user ID: ${user.id}`);

      const { accessToken } = await this.generateTokens(user.id);

      this.logger.log(`Login successful for user ID: ${user.id}`);

      return new DataSuccess({ ...user, accessToken });
    } catch (error) {
      this.logger.error(`Login failed for user ID: ${user.id}`);
      throw new UnauthorizedException('Login failed');
    }
  }

  async generateTokens(userId: number): Promise<{ accessToken: string }> {
    try {
      this.logger.debug(`Generating tokens for user ID: ${userId}`);

      const payload: AuthJwtPayload = { sub: userId };
      const [accessToken] = await Promise.all([
        this.jwtService.signAsync(payload),
      ]);

      this.logger.debug(`Token generation completed for user ID: ${userId}`);

      return { accessToken };
    } catch (error) {
      this.logger.error(`Token generation failed for user ID: ${userId}`);
      throw new InternalServerErrorException(
        'Failed to generate authentication tokens',
      );
    }
  }
}
