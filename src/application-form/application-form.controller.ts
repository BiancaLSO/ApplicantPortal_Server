import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ApplicationFormDto } from './application-form.dto';
import { ApplicationForm } from './application-form.entity';
import { ApplicationFormService } from './application-form.service';

@Controller('application-form')
export class ApplicationFormController {
  constructor(
    private readonly applicationFormService: ApplicationFormService,
  ) {}

  @Post()
  create(
    @Body() applicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    return this.applicationFormService.create(applicationFormDto);
  }

  @Post('/call-stored-procedure/:grantId')
  callStoredProcedure(
    @Param('grantId') grantId: number,
    @Body() applicationFormDto: ApplicationFormDto,
  ): Promise<void> {
    return this.applicationFormService.callStoredProcedure(
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
