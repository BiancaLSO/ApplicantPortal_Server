import { Application } from '../../application/entities/application.entity';
import { Status } from '../../status/entities/status.entity';

export class ActivityDto {
  status: Status;
  application: Application;

  constructor(public name: string, public date: Date, public note: string) {}
}
