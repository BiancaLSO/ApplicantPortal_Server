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

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create_notification(@Req() req, @Body() body) {
    return this.notificationService.create_notification(body);
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
