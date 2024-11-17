import { Injectable } from "@nestjs/common";
import { DataState } from "../../../../../core/resources/data.state";
import { RoleModel } from "../../models/role.model";
import { PrismaService } from "../../../../../common/services/prisma.service";

export interface RolePrismaDataSources {
  findById(id: number): Promise<DataState<RoleModel>>;
  findByName(name: string): Promise<DataState<RoleModel>>;
  findAll(): Promise<DataState<RoleModel[]>>;
  create(role: RoleModel): Promise<DataState<RoleModel>>;
}

@Injectable()
export class RolePrismaDataSourcesImpl implements RolePrismaDataSources {
  constructor(private readonly prismaService: PrismaService) { }
  async findById(id: number, includeUsers?: boolean): Promise<DataState<RoleModel>> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string, includeUsers?: boolean): Promise<DataState<RoleModel>> {
    const role = await this.prismaService.role.findFirst({
      where: {
        name: name,
      },
      include: {
        users: includeUsers,
      },
    });

    return {
      data: new RoleModel({
        ...role,
        users: includeUsers ? role?.users?.map(user => ({
          ...user,
          profile_id: user.profile_id ?? undefined
        })) : undefined
      }),
      error: undefined,
    };
  }
  async findAll(includeUsers?: boolean): Promise<DataState<RoleModel[]>> {
    throw new Error("Method not implemented.");
  }
  async create(role: RoleModel): Promise<DataState<RoleModel>> {
    const data = await this.prismaService.role.create({
      data: {
        name: role.name,
      },
    });

    return {
      data: new RoleModel(data),
      error: undefined,
    };
  }
}