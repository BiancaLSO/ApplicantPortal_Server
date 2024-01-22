import { Activity } from '../../activity/entites/activity.entity';
import { Grant } from '../../grant/entities/grant.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'application' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isActive: boolean;

  @OneToMany(() => Activity, (activity) => activity.application)
  activities: Activity[];

  @ManyToOne(() => Grant, (grant) => grant.applications, { eager: true })
  @JoinColumn({ name: 'grant_id' })
  grant: Grant;

  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
