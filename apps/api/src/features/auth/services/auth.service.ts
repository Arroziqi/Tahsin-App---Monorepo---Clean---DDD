import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { UserModel } from '../data/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  mapDataModelToEntity(dataModel: UserModel): UserEntity {
    return new UserEntity(
      dataModel.id!,
      dataModel.username,
      dataModel.email,
      dataModel.password,
      dataModel.role_id!,
      dataModel.profile_id,
    );
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
