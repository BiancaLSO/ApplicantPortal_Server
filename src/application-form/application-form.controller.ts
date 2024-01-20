import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApplicationFormDto } from './dto/application-form.dto';
import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationService } from '../application/application.service';
import { ActivityService } from 'src/activity/activity.service';
import { UserService } from 'src/user/user.service';
import { ApplicationDto } from 'src/application/dto/application.dto';
import { GrantService } from 'src/grant/grant.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationService } from 'src/notification/notification.service';

@Controller('application-form')
export class ApplicationFormController {
  constructor(
    private readonly applicationFormService: ApplicationFormService,
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
    private readonly grantService: GrantService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body): Promise<ApplicationForm> {
    const application = await this.applicationService.findById(
      body.applicationId,
    );
    const applicationFormDto = new ApplicationFormDto();
    applicationFormDto.application = application;
    return this.applicationFormService.create(applicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/call-stored-procedure/:userId/:grantId')
  async callStoredProcedure(
    @Param('userId') userId: number,
    @Param('grantId') grantId: number,
    @Body() body,
  ): Promise<any> {
    let activity;
    if (body.submission) {
      activity = await this.activityService.create_activity({
        name: 'Application opened',
        date: new Date(),
        note: 'For any inquires contact the portal',
        status: 'Submitted',
      });
    } else {
      activity = await this.activityService.create_activity({
        name: 'Application opened',
        date: new Date(),
        note: 'For any inquires contact the portal',
        status: 'Not submitted',
      });
    }
    const user = await this.userService.findOne(userId);
    const grant = await this.grantService.findOne(grantId);

    const applicationDto: ApplicationDto = {
      grant,
      user,
      activities: [activity],
      isActive: true,
    };

    const application = await this.applicationService.create(applicationDto);

    if (application) {
      if (body.submission) {
        const msg = {
          userId: user.id,
          title: 'Application Submitted!',
          description: `Hi ${user.firstName}! Your application ${application.id} for ${application.grant.title} has now been submitted. The processing time for your application may take up to 10 days. If you have any questions or inquries about the progress of your application, please feel free to contact the SLKS Portal.`,
        };

        await this.notificationService.create_notification(msg);
      } else {
        const msg = {
          userId: user.id,
          title: 'Application Created!',
          description: `Hi ${user.firstName}! Your application ${application.id} for ${application.grant.title} has now been created. The application is currently only available for your viewing. If you would like for the application to be processed, you would need to send in the application by ${application.grant.end_date}.`,
        };

        await this.notificationService.create_notification(msg);
      }
    }

    this.applicationFormService.callStoredProcedure(
      application.id,
      grantId,
      body.values,
    );
    return application.id;
  }

  @Get()
  findAll(): Promise<ApplicationForm[]> {
    return this.applicationFormService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApplicationForm> {
    return this.applicationFormService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/applicationId/:id')
  findByApplicationId(@Param('id') id: number): Promise<ApplicationForm> {
    return this.applicationFormService.findByApplicationId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('save-application/:id')
  async saveApplication(
    @Param('id') id: number,
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Req() req,
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    await this.activityService.create_activity({
      id: id,
      name: 'Application edited',
      date: new Date(),
      note: 'Resubmitted by user; application processs may take longer due to resubmission.',
      status: 'Resubmitted',
    });

    if (req) {
      const user = await this.userService.findOneUserByCredentialsId(
        req.user.userId,
      );
      if (user.id) {
        const msg = {
          userId: user.id,
          title: 'Application Resubmitted!',
          description: `Hi ${user.firstName}! Your application ${id} has now been edited an resubmitted. Due to the resubmission, the processing time for your application may be prolonged up to 2 weeks. If you have any questions or inquries about the progress of your application, please feel free to contact the SLKS Portal.`,
        };

        await this.notificationService.create_notification(msg);
      }
    }

    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('submit/:id')
  async submitSaved(
    @Param('id') id: number,
    @Req() req,
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    await this.activityService.create_activity({
      id: id,
      name: 'Application opened',
      date: new Date(),
      note: 'For any inquiries contact the SLKS portal.',
      status: 'Submitted',
    });

    if (req) {
      const user = await this.userService.findOneUserByCredentialsId(
        req.user.userId,
      );
      if (user.id) {
        const msg = {
          userId: user.id,
          title: 'Application Submitted!',
          description: `Hi ${user.firstName}! Your application ${id} has now been submitted. The processing time for your application can take up to 10 days. If you have any questions or inquries about the progress of your application, please feel free to contact the SLKS Portal.`,
        };

        await this.notificationService.create_notification(msg);
      }
    }
    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationFormService.remove(+id);
  }
}
