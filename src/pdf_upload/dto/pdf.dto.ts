import { Activity } from '../../activity/entites/activity.entity';

export class PdfDto {
  activity: Activity;

  constructor(public name: string, public content: string) {}
}
