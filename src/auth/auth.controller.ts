import {
  Body,
  Controller,
  Post,
  Request as Request2,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserCredentialsDTO } from 'src/user/dto/create-user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signupTenant(
    @Body() createUserCredentialsDto: CreateUserCredentialsDTO,
  ) {
    console.log(createUserCredentialsDto);
    return this.authService.signup(createUserCredentialsDto);
  }

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
}
