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
import { ActivityService } from '../activity/activity.service';
import { GrantService } from '../grant/grant.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { StatusService } from 'src/status/status.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly grantService: GrantService,
    private readonly userService: UserService,
    private readonly statusService: StatusService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() body): Promise<Application> {
    const activity = await this.activityService.create_activity({
      name: 'Application opened',
      date: new Date(),
      note: 'For any inquires contact the portal',
      status: 'Submitted',
    });
    const grant = await this.grantService.findOne(body.grantId);
    const user = await this.userService.findOne(body.userId);

    console.log('the returned activity', activity);

    const applicationDto: ApplicationDto = {
      grant,
      user,
      activities: [activity],
      isActive: true,
    };

    return this.applicationService.create(applicationDto);
  }

  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number): Promise<Application> {
    return this.applicationService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user-applications/:userId')
  findByUserId(@Param('userId') userId: number): Promise<Application[]> {
    return this.applicationService.findByUserId(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateApplicationDto: ApplicationDto,
  ): Promise<Application> {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/archive/:id')
  async archive(@Param('id') id: string, @Body() value): Promise<Application> {
    console.log(value);
    await this.activityService.create_activity({
      id: id,
      name: 'Application closed by user',
      date: new Date(),
      note: 'Application has been archived, but not deleted. ',
      status: 'Archived',
    });
    return await this.applicationService.archive(+id, value);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationService.remove(+id);
  }
}
