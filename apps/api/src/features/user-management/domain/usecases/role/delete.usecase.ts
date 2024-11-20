import { RoleRepository } from "../../repository/role.repository";

import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/core/domain/usecases/usecase";

import { DataFailed, DataState } from "src/core/resources/data.state";
import { ErrorEntity } from "src/core/domain/entities/error.entity";
import { ROLE_REPO_TOKEN } from "src/core/const/provider.token";

@Injectable()
export class DeleteRoleUsecase implements UseCase<number, DataState<null>> {
  constructor(@Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository) { }
  async execute(input: number): Promise<DataState<null>> {
    const existingRole = await this.roleRepository.findById(input, true);

    if (!existingRole.data) {
      return new DataFailed<null>(new ErrorEntity(404, "Role not found"));
    }

    return await this.roleRepository.delete(input);
  }
} 