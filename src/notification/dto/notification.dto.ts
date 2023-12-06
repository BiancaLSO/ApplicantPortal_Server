import { User } from 'src/user/entities/user.entity';

export class NotificationDto {
  user: User;
  constructor(
    public title: string,
    public description: string,
    public sent_date: Date,
    public isRead: boolean,
  ) {}
}
