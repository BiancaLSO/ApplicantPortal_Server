import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class UserCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @OneToOne((type) => User, (user) => user.id, { cascade: true })
  @JoinColumn()
  user: User;
}
