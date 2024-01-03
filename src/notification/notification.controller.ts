import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Request,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './entites/notification.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create_notification(@Req() req, @Body() body) {
    return this.notificationService.create_notification(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.notificationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/userId/:userId')
  async findAllByUserId(
    @Param('userId') userId: number,
  ): Promise<Notification[]> {
    return await this.notificationService.findAllByUserId(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editColumn(@Param('id') id: string, @Body() body) {
    console.log(body);
    return this.notificationService.editColumn(+id, body.isRead);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove_notification(@Param('id') id: string) {
    return this.notificationService.remove_notification(+id);
  }
}
