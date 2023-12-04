import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { StatusService } from '../status/status.service';
import { ActivityDto } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly statusService: StatusService,
  ) {}

  @Post()
  async create(@Req() req, @Body() body) {
    const activityDto = new ActivityDto(body.name, body.date, body.note);

    activityDto.status = await this.statusService.findOne(1);

    return this.activityService.create_activity(activityDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }

  @Delete(':id')
  remove_activity(@Param('id') id: string) {
    return this.activityService.remove_activity(+id);
  }
}
