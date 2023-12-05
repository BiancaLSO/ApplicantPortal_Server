export class NotificationDto {
  constructor(
    public title: string,
    public description: string,
    public sent_date: Date,
    public isRead: boolean,
  ) {}
}
