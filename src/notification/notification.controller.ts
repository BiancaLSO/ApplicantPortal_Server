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
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create_notification(@Req() req, @Body() body) {
    const user = await this.userService.findOne(body.userId);
    const newBody = {
      user: user,
      title: body.title,
      description: body.description,
      sent_date: new Date(),
      isRead: false,
    };
    return this.notificationService.create_notification(newBody);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  editColumn(@Param('id') id: string, @Body() body) {
    return this.notificationService.editColumn(+id, body.isRead);
  }

  @Delete(':id')
  remove_notification(@Param('id') id: string) {
    return this.notificationService.remove_notification(+id);
  }
}
