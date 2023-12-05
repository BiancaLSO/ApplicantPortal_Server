import { Status } from '../../status/entities/status.entity';

export class ActivityDto {
  status: Status;

  constructor(public name: string, public date: Date, public note: string) {}
}
