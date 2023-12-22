import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from './../auth/utils.bcrypt';
import { UserService } from './../user/user.service';
import { CreateUserCredentialsDTO } from './../user/dto/create-user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserCredentialsDto: CreateUserCredentialsDTO) {
    return this.userService.createUserandCredentials(createUserCredentialsDto);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const matched = comparePasswords(password, user.password);
      if (matched) {
        return user;
      } else {
        console.log("Password don't match");
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      id: payload.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
