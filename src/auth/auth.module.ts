import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { NotificationService } from '../notification/notification.service';
import { NotificationModule } from '../notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notification/entites/notification.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    NotificationModule,
    TypeOrmModule.forFeature([Notification]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, NotificationService],
  exports: [AuthService],
})
export class AuthModule {}
