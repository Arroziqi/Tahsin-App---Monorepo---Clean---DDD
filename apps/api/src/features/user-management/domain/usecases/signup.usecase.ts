import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { UserEntity } from '../entities/user.entity';
import { DataState } from 'src/core/resources/data.state';
import { UserRepository } from '../repository/user.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class SignupUsecase
  implements UseCase<UserEntity, DataState<UserEntity>>
{
  private readonly logger = new Logger(SignupUsecase.name);

  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(input: UserEntity): Promise<DataState<UserEntity>> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      input.email,
      true,
    );

    this.logger.debug(
      `Checking email existence: ${input.email}`,
      JSON.stringify(userWithSameEmail, null, 2)
    );

    if (userWithSameEmail.data.length > 0) {
      this.logger.warn(`Signup attempt with existing email: ${input.email}`);
      throw new ErrorEntity(409, 'Email already exist, please use another email', 'Email already exist');
    }

    const hashedPassword = await this.authService.hashedPassword(input.password);
    input.password = hashedPassword;

    const result = await this.userRepository.create(input);
    this.logger.log(`New user created with email: ${input.email}`);
    
    return result;
  }
}
