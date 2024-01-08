import { Activity } from '../../activity/entites/activity.entity';
import { Grant } from '../../grant/entities/grant.entity';
import { User } from '../../user/entities/user.entity';

export class ApplicationDto {
  grant: Grant;
  user: User;
  activities: Activity[];
  isActive: boolean;
}
