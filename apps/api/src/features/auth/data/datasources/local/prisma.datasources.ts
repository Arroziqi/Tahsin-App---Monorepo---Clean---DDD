import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@nestjs/common';

export interface PrismaDataSources {
  findByEmail(email: string): Promise<DataState<UserModel>>;
  create(user: UserModel): Promise<DataState<UserModel>>;
}

@Injectable()
export class PrismaDataSourcesImpl implements PrismaDataSources {
  findByEmail(email: string): Promise<DataState<UserModel>> {
    return Promise.resolve({
      data: {
        id: 1,
        username: 'username',
        email: 'email',
        password: 'password',
        role_id: 1,
        profile_id: 1,
      },
      error: null,
    });
  }
  create(user: UserModel): Promise<DataState<UserModel>> {
    return Promise.resolve({
      data: {
        id: 2,
        username: 'ah masa berhasil sii',
        email: 'email',
        password: 'password',
        role_id: 1,
        profile_id: 1,
      },
      error: null,
    });
  }
}
