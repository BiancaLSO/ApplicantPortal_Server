import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { User } from '../user/user.entity'; // we need to have User entity imported here, so we can use it in the @ManyToOne decorator

@Entity({ name: 'contact_form' })
export class ContactForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => User, (user) => user.inquiries, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
