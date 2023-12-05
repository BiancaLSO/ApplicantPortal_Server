import { Activity } from '../../entities/activity.entity';

export class PdfDto {
  activity: Activity;

  constructor(public name: string, public content: string) {}
}
