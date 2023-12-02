import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationForm } from './application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationForm])],
  providers: [ApplicationFormService],
  controllers: [ApplicationFormController],
  exports: [ApplicationFormService],
})
export class ApplicationFormModule {}
