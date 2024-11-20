import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/domain/usecases/usecase";
import { UserEntity } from "../../entities/user.entity";
import { DataState } from "src/core/resources/data.state";

@Injectable()
export class LoginUsecase implements UseCase<UserEntity, DataState<UserEntity>> {
  execute(input: UserEntity): Promise<DataState<UserEntity>> {
    throw new Error("Method not implemented.");
  }

}