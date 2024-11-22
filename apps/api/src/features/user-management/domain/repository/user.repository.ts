import { DataState } from "src/core/resources/data.state";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserEntity>>;
  findById(id: number, includeRole?: boolean): Promise<DataState<UserEntity>>;
  create(user: UserEntity): Promise<DataState<UserEntity>>;
  updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null): Promise<DataState<String>>;
}