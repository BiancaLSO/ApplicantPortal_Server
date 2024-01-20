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
import { NotificationService } from 'src/notification/notification.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly grantService: GrantService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
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
  async archive(
    @Param('id') id: string,
    @Req() req,
    @Body() value,
  ): Promise<Application> {
    await this.activityService.create_activity({
      id: id,
      name: 'Application closed by user',
      date: new Date(),
      note: 'Application has been archived, but not deleted. ',
      status: 'Archived',
    });

    if (req) {
      const user = await this.userService.findOneUserByCredentialsId(
        req.user.userId,
      );
      if (user.id) {
        const msg = {
          userId: user.id,
          title: 'Application Archived!',
          description: `Hi ${user.firstName}! Your application ${id} has now been archived. Your application will be stored in our database for the next 6 months for legal purposes, after which it will be deleted automatically.If you have any questions or inquries, please feel free to contact the SLKS Portal.`,
        };

        await this.notificationService.create_notification(msg);
      }
    }
    return await this.applicationService.archive(+id, value);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationService.remove(+id);
  }
}
