import { UserEntity } from '../../domain/entities/user.entity';

export class UserModel extends UserEntity {
  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    role_id: number,
    profile_id?: number,
  ) {
    super(id, username, email, password, role_id, profile_id);
  }
}
