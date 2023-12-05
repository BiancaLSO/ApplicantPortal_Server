import { User } from 'src/user/entities/user.entity';

export class ContactFormDto {
  description: string;
  user: User;
}
