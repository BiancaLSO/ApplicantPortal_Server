import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/entities/application.entity';
import { Activity } from '../activity/entites/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationForm, Application, Activity])],
  providers: [ApplicationFormService, ApplicationService],
  controllers: [ApplicationFormController],
  exports: [ApplicationFormService],
})
export class ApplicationFormModule {}
