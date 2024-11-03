import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
