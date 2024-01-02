import {
  Body,
  Controller,
  ParseArrayPipe,
  Post,
  Request as Request2,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserCredentialsDTO } from './../user/dto/create-user-credentials.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AddressDto } from 'src/address/dto/address.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signupTenant(@Body() body: any) {
    const userCredentials = new CreateUserCredentialsDTO(
      body.username,
      body.password,
    );
    console.log('ctrl', userCredentials);
    const user = new CreateUserDto(
      body?.firstName,
      body?.lastName,
      body?.phone,
      body?.email,
      body?.cpr,
    );
    const address = new AddressDto(body?.street, body?.city, body?.zipCode);
    return this.authService.signup(userCredentials, user, address);
  }

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
}
