import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ApplicationRequirementsDto } from './dto/application-requirements.dto';
import { ApplicationRequirements } from './entities/application-requirements.entity';
import { ApplicationRequirementsService } from './application-requirements.service';

@Controller('application-requirements')
export class ApplicationRequirementsController {
  constructor(
    private readonly applicationRequirementsService: ApplicationRequirementsService,
  ) {}

  @Post()
  create(
    @Body() applicationRequirementsDto: ApplicationRequirementsDto,
  ): Promise<ApplicationRequirements> {
    return this.applicationRequirementsService.create(
      applicationRequirementsDto,
    );
  }

  @Get()
  findAll(): Promise<ApplicationRequirements[]> {
    return this.applicationRequirementsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApplicationRequirements> {
    return this.applicationRequirementsService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateApplicationRequirementsDto: ApplicationRequirementsDto,
  ): Promise<ApplicationRequirements> {
    return this.applicationRequirementsService.update(
      +id,
      updateApplicationRequirementsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.applicationRequirementsService.remove(+id);
  }
}
