import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../domain/repository/role.repository";
import { DataState } from "../../../../core/resources/data.state";
import { RoleEntity } from "../../domain/entities/role.entity";
import { ROLE_REPO_TOKEN } from "../../../../core/const/provider.token";

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @Inject(ROLE_REPO_TOKEN) private readonly roleRepository: RoleRepository
  ) { }

  async findById(id: number, includeUsers?: boolean): Promise<DataState<RoleEntity>> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string, includeUsers?: boolean): Promise<DataState<RoleEntity>> {
    return await this.roleRepository.findByName(name, includeUsers);
  }
  async findAll(includeUsers?: boolean): Promise<DataState<RoleEntity[]>> {
    throw new Error("Method not implemented.");
  }
  create(role: RoleEntity): Promise<DataState<RoleEntity>> {
    throw new Error("Method not implemented.");
  }
  update(role: RoleEntity): Promise<DataState<RoleEntity>> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<DataState<null>> {
    throw new Error("Method not implemented.");
  }
}