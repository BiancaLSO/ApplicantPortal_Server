import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityDto } from './dto/activity.dto';
import { Activity } from './entites/activity.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create_activity(body) {
    const status = await this.statusRepository.findOne({
      where: { id: body.statusId },
    });

    const activityDto = new ActivityDto(body.name, body.date, body.note);
    activityDto.status = status;
    return this.activityRepository.save(activityDto);
  }
  findAll() {
    return this.activityRepository.find({
      relations: ['status', 'attachments'],
    });
  }

  findAllByApplicationId(id) {
    return this.activityRepository.find({
      where: { application: { id } }, // Use correct syntax here
      relations: ['status', 'application'],
    });
  }

  async isApplicationSubmitted(id) {
    const activityList = await this.findAllByApplicationId(id);
    const submitted = activityList.some((activity) => {
      return activity.status.name === 'Submitted';
    });
    return submitted;
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
