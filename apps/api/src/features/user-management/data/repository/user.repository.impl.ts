import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repository/user.repository";
import { DataState } from "src/core/resources/data.state";
import { UserEntity } from "../../domain/entities/user.entity";
import { USER_REPO_TOKEN } from "src/core/const/provider.token";

@Injectable()
export abstract class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(USER_REPO_TOKEN) private readonly userRepository: UserRepository
  ) {}
  async findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>> {
    return await this.userRepository.findByEmail(email, includeRole);
  }
  async findById(id: number, includeRole?: boolean): Promise<DataState<UserEntity>> {
    return await this.userRepository.findById(id, includeRole);
  }
  async create(user: UserEntity): Promise<DataState<UserEntity>> {
    return await this.userRepository.create(user);
  }
}