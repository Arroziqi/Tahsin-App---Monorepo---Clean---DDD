import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { UserEntity } from '../entities/user.entity';
import { DataState } from 'src/core/resources/data.state';
import { UserRepository } from '../repository/user.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { USER_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class SignupUsecase
  implements UseCase<UserEntity, DataState<UserEntity>>
{
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository,
  ) {}
  async execute(input: UserEntity): Promise<DataState<UserEntity>> {
    // const userWithSameEmailCount = await this.userRepository.findByEmail(
    //   input.email,
    // );
    // if (userWithSameEmailCount.data) {
    //   throw {
    //     data: null,
    //     error: {
    //       message: 'Email already exists',
    //       code: 'EMAIL_ALREADY_EXISTS',
    //     },
    //   };
    // }

    return this.userRepository.create(input);
  }
}
