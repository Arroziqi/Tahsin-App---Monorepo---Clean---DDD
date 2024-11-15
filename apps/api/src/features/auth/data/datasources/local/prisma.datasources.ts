import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

export interface PrismaDataSources {
  findByEmail(email: string): Promise<DataState<UserModel[]>>;
  create(user: UserModel): Promise<DataState<UserModel>>;
}

@Injectable()
export class PrismaDataSourcesImpl implements PrismaDataSources {
  constructor(private prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<DataState<UserModel[]>> {
    const users = await this.prismaService.user.findMany({
      where: {
        email: email,
      },
    });

    return {
      data: users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        role_id: user.role_id,
        profile_id: user.profile_id ?? null,
      })),
      error: undefined,
    };
  }

  async create(user: UserModel): Promise<DataState<UserModel>> {
    const data = await this.prismaService.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role_id: user.role_id,
        profile_id: user.profile_id,
      },
    });

    return Promise.resolve({
      data: {
        id: data.id,
        username: data.username,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        profile_id: data.profile_id,
      },
      error: undefined,
    });
  }
}
