import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { Application } from './entities/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './dto/application.dto';
import { ActivityService } from 'src/activity/activity.service';
import { GrantService } from 'src/grant/grant.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly grantService: GrantService,
    private readonly userService: UserService,
  ) {}

  /* @UseGuards(JwtAuthGuard) */
  @Post()
  async create(@Req() req, @Body() body): Promise<Application> {
    const activity = await this.activityService.create_activity({
      name: 'Application opened',
      date: new Date(),
      note: 'For any inquires contact the portal',
      statusId: 1,
    });
    const grant = await this.grantService.findOne(body.grantId);
    const user = await this.userService.findOne(body.userId);

    console.log('the returned activity', activity);

    const applicationDto: ApplicationDto = {
      grant,
      user,
      activities: [activity],
    };

    return this.applicationService.create(applicationDto);
  }

  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Application> {
    return this.applicationService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateApplicationDto: ApplicationDto,
  ): Promise<Application> {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete('id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationService.remove(+id);
  }
}
