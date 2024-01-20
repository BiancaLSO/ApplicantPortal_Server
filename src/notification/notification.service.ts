import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entites/notification.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
  constructor(
    private userService: UserService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create_notification(body: any) {
    const user = await this.userService.findOne(body.userId);
    const newBody = {
      user: user,
      title: body.title,
      description: body.description,
      sent_date: new Date(),
      isRead: false,
    };
    return await this.notificationRepository.save(newBody);
  }

  findAll() {
    return this.notificationRepository.find();
  }

  async findAllByUserId(id: number): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { user: { id } },
    });
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
