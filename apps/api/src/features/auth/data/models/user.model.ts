import { Exclude } from "class-transformer";

export class UserModel {
  id: number;
  username: string;
  email: string;
  @Exclude()
  password: string;
  role_id: number;
  profile_id?: number | null;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
