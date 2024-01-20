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
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private notificationservice: NotificationService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: any) {
    const userCredentials = new CreateUserCredentialsDTO(
      body.username,
      body.password,
    );
    const user = new CreateUserDto(
      body?.firstName,
      body?.lastName,
      body?.phone,
      body?.cpr,
      body?.email,
    );
    const address = new AddressDto(body?.street, body?.city, body?.zipCode);
    const createdUserId = await this.authService.signup(
      userCredentials,
      user,
      address,
    );

    if (createdUserId) {
      const msg = {
        userId: createdUserId,
        title: 'Welcome to SLKS Portal!',
        description:
          'Welcome to the Grant Applicant Portal of The Ministry of Culture. Please make sure to fill out/ update your profile information as that will be taken as default personal details for every application.',
      };

      await this.notificationservice.create_notification(msg);
    }
    return createdUserId;
  }

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
}
