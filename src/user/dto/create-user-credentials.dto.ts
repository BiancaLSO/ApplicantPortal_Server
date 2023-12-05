import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  userId: number;

  constructor(username: string, password: string, userId: number) {
    this.username = username;
    this.password = password;
    this.userId = userId;
  }
}
