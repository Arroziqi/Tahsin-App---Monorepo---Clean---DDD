import { RoleEntity } from "./role.entity";

export class UserEntity {
  id: number;
  email: string;
  password: string;
  username: string;
  role_id: number;
  profile_id?: number;

  // Relasi
  // registrations?: RegistrationEntity[];
  // profile?: ProfileEntity;
  role?: RoleEntity;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
