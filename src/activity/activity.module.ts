import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entites/activity.entity';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { StatusService } from '../status/status.service';
import { Status } from '../status/entities/status.entity';
import { Application } from 'src/application/entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Status, Application])],
  controllers: [ActivityController],
  providers: [ActivityService, StatusService],
})
export class ActivityModule {}
