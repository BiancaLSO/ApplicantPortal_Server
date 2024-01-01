import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ConsoleLogger,
  UseGuards,
} from '@nestjs/common';

import { ApplicationFormDto } from './dto/application-form.dto';
import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationService } from '../application/application.service';
import { ActivityService } from 'src/activity/activity.service';
import { UserService } from 'src/user/user.service';
import { ApplicationDto } from 'src/application/dto/application.dto';
import { GrantService } from 'src/grant/grant.service';
import { StatusService } from 'src/status/status.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('application-form')
export class ApplicationFormController {
  constructor(
    private readonly applicationFormService: ApplicationFormService,
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
    private readonly grantService: GrantService,
    private readonly statusService: StatusService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body): Promise<ApplicationForm> {
    console.log(body.applicationId);
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
    console.log(body);
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
    console.log(activity);
    const user = await this.userService.findOne(userId);
    const grant = await this.grantService.findOne(grantId);

    const applicationDto: ApplicationDto = {
      grant,
      user,
      activities: [activity],
      isActive: true,
    };

    const application = await this.applicationService.create(applicationDto);

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
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    await this.activityService.create_activity({
      id: id,
      name: 'Application edited',
      date: new Date(),
      note: 'Resubmitted by user; application processs may take longer due to resubmission.',
      status: 'Resubmitted',
    });

    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('submit/:id')
  async submitSaved(
    @Param('id') id: number,
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    console.log('im here');
    await this.activityService.create_activity({
      id: id,
      name: 'Application opened',
      date: new Date(),
      note: 'For any inquiries contact the SLKS portal.',
      status: 'Submitted',
    });

    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationFormService.remove(+id);
  }
}
