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
import { ApplicationService } from 'src/application/application.service';

@Controller('application-form')
export class ApplicationFormController {
  constructor(
    private readonly applicationFormService: ApplicationFormService,
    private readonly applicationService: ApplicationService,
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
