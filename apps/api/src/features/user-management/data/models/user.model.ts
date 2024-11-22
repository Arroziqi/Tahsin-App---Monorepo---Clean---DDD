import { Exclude } from 'class-transformer';
import { RoleModel } from './role.model';

export class UserModel {
  id: number;
  email: string;
  @Exclude()
  password: string;
  username: string;
  role_id: number;
  profile_id?: number;
  @Exclude()
  hashedRefreshToken?: string;

  // Relasi
  // registrations?: RegistrationEntity[];
  // profile?: ProfileEntity;
  role?: RoleModel;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
