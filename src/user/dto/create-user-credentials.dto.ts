import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
