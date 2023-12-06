import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ApplicationFormDto } from './dto/application-form.dto';
import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationService } from '../application/application.service';
import { ActivityService } from 'src/activity/activity.service';
import { UserService } from 'src/user/user.service';
import { ApplicationDto } from 'src/application/dto/application.dto';
import { GrantService } from 'src/grant/grant.service';

@Controller('application-form')
export class ApplicationFormController {
  constructor(
    private readonly applicationFormService: ApplicationFormService,
    private readonly applicationService: ApplicationService,
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
    private readonly grantService: GrantService,
  ) {}

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

  @Post('/call-stored-procedure/:userId/:grantId')
  async callStoredProcedure(
    @Param('userId') userId: number,
    @Param('grantId') grantId: number,
    @Body() applicationFormDto: ApplicationFormDto,
  ): Promise<void> {
    const activity = await this.activityService.create_activity({
      name: 'Application opened',
      date: new Date(),
      note: 'For any inquires contact the portal',
      statusId: 1,
    });
    const user = await this.userService.findOne(userId);
    const grant = await this.grantService.findOne(grantId);

    const applicationDto: ApplicationDto = {
      grant,
      user,
      activities: [activity],
    };

    const application = await this.applicationService.create(applicationDto);
    return this.applicationFormService.callStoredProcedure(
      application.id,
      grantId,
      applicationFormDto,
    );
  }

  @Get()
  findAll(): Promise<ApplicationForm[]> {
    return this.applicationFormService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApplicationForm> {
    return this.applicationFormService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateApplicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    return this.applicationFormService.update(+id, updateApplicationFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationFormService.remove(+id);
  }
}
