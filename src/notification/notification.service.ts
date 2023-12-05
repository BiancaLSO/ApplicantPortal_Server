import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './entites/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  create_notification(notificationDto: NotificationDto) {
    return this.notificationRepository.save(notificationDto);
  }

  findAll() {
    return this.notificationRepository.find();
  }

  findOne(id: number) {
    const notification = this.notificationRepository.findOneBy({ id: id });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async editColumn(id: number, updatedValue: any) {
    const notification = await this.findOne(id);

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    notification.isRead = updatedValue;

    this.notificationRepository.save(notification);

    return notification;
  }

  remove_notification(id: number) {
    return this.notificationRepository.delete(id);
  }
}
