import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormService } from './application-form.service';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/entities/application.entity';
import { Activity } from '../activity/entites/activity.entity';
import { User } from '../user/entities/user.entity';
import { UserCredentials } from '../user/entities/user.credentials.entity';
import { ActivityService } from '../activity/activity.service';
import { UserService } from '../user/user.service';
import { GrantService } from '../grant/grant.service';
import { Grant } from '../grant/entities/grant.entity';
import { Address } from '../address/entities/address.entity';
import { PDF } from '../pdf_upload/entities/pdf_upload.entity';
import { Status } from '../status/entities/status.entity';
import { StatusService } from 'src/status/status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationForm,
      Application,
      Activity,
      User,
      UserCredentials,
      Grant,
      Address,
      Status,
      PDF,
    ]),
  ],
  providers: [
    ApplicationFormService,
    ApplicationService,
    ActivityService,
    UserService,
    GrantService,
    StatusService,
  ],
  controllers: [ApplicationFormController],
  exports: [ApplicationFormService],
})
export class ApplicationFormModule {}
