import {
  Body,
  Controller,
  Post,
  Request as Request2,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserCredentialsDTO } from './../user/dto/create-user-credentials.dto';
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
  async signupTenant(
    @Body() createUserCredentialsDto: CreateUserCredentialsDTO,
  ) {
    const userId = await this.authService.signup(createUserCredentialsDto);
    console.log(createUserCredentialsDto);
    const msg = {
      userId: userId,
      title: 'Welcome to SLKS Portal!',
      description:
        'Welcome to the Grant Applicant Portal of The Ministry of Culture. Please make sure to fill out/ update your profile information as that will be taken as default personal details for every application.',
    };
    await this.notificationservice.create_notification(msg);
    return userId;
  }

  // login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }
}
