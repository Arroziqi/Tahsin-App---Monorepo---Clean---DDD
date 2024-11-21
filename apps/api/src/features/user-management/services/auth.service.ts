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
import refreshConfig from '../config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
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
  ): Promise<DataState<UserModel & { accessToken: string; refreshToken: string }>> {
    try {
      this.logger.debug(`Attempting login for user ID: ${user.id}`);

      const { accessToken, refreshToken } = await this.generateTokens(user.id);

      this.logger.log(`Login successful for user ID: ${user.id}`);

      return new DataSuccess({ ...user, accessToken, refreshToken });
    } catch (error) {
      this.logger.error(`Login failed for user ID: ${user.id}`);
      throw new UnauthorizedException('Login failed');
    }
  }

  async generateTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      this.logger.debug(`Generating tokens for user ID: ${userId}`);

      const payload: AuthJwtPayload = { sub: userId };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, this.refreshTokenConfig),
      ]);

      this.logger.debug(`Token generation completed for user ID: ${userId}`);

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`Token generation failed for user ID: ${userId}`);
      throw new InternalServerErrorException(
        'Failed to generate authentication tokens',
      );
    }
  }

  async validateJwtUser(userId: number): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with ID: ${userId}`);

    const user = await this.userRepository.findById(userId);

    if (!user.data) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new UnauthorizedException('User not found!');
    }

    return user;
  }

  async validateRefreshToken(userId: number): Promise<DataState<UserModel>> {
    this.logger.debug(`Validating user with ID: ${userId}`);

    const user = await this.userRepository.findById(userId);

    if (!user.data) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new UnauthorizedException('User not found!');
    }

    return user;
  }

  async refreshToken(
    user: UserModel,
  ): Promise<DataState<UserModel & { accessToken: string; refreshToken: string }>> {
    try {
      this.logger.debug(`Attempting refresh token for user ID: ${user.id}`);

      const { accessToken, refreshToken } = await this.generateTokens(user.id);

      this.logger.log(`Refresh token successful for user ID: ${user.id}`);

      return new DataSuccess({ ...user, accessToken, refreshToken });
    } catch (error) {
      this.logger.error(`Refresh token failed for user ID: ${user.id}`);
      throw new UnauthorizedException('Refresh token failed');
    }
  }
}
