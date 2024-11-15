export class UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
  profile_id?: number | null;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    role_id: number,
    profile_id?: number,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role_id = role_id;
    this.profile_id = profile_id;
  }
}
