import { DataState } from "src/core/resources/data.state";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<DataState<UserEntity[]>>;
  create(user: UserEntity): Promise<DataState<UserEntity>>;
}