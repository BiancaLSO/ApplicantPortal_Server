import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityDto } from './dto/activity.dto';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  create_activity(activityDto: ActivityDto) {
    return this.activityRepository.save(activityDto);
  }
  findAll() {
    return this.activityRepository.find({
      relations: ['status', 'attachments'],
    });
  }

  findOne(id: number) {
    return this.activityRepository.findOne({
      where: { id: id },
      relations: ['status'],
    });
  }

  remove_activity(id: number) {
    return this.activityRepository.delete(id);
  }
}
