import { User } from '../../user/entities/user.entity';

export class ContactFormDto {
  description: string;
  user: User;
}
