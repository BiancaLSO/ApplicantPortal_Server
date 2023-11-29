import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { ApplicationDto } from './application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() applicationDto: ApplicationDto): Promise<Application> {
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
