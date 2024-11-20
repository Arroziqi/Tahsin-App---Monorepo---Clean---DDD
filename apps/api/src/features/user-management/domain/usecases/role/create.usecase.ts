import { Inject, Injectable, Logger } from "@nestjs/common";
import { RoleEntity } from "../../entities/role.entity";
import { DataFailed, DataState } from "../../../../../core/resources/data.state";
import { UseCase } from "../../../../../core/domain/usecases/usecase";
import { RoleRepository } from "../../repository/role.repository";
import { ErrorEntity } from "../../../../../core/domain/entities/error.entity";
import { ROLE_REPO_TOKEN } from "src/core/const/provider.token";

@Injectable()
export class CreateRoleUsecase implements UseCase<RoleEntity, DataState<RoleEntity>> {
  private readonly logger = new Logger(CreateRoleUsecase.name);

  constructor(@Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository) { }
  async execute(input: RoleEntity): Promise<DataState<RoleEntity>> {
    const existingRole = await this.roleRepository.findByName(input.name, true);

    this.logger.debug(
      `Checking role name existence: ${input.name}`,
      JSON.stringify(existingRole, null, 2)
    );

    if (existingRole.data && existingRole.data.id) {
      this.logger.warn(`Create role attempt with existing name: ${input.name}`);
      return new DataFailed<RoleEntity>(new ErrorEntity(409, "Role already exists"));
    }

    const result = await this.roleRepository.create(input);
    this.logger.log(`New role created with name: ${input.name}`);

    return result;
  }
}