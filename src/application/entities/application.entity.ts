import { Activity } from 'src/activity/entites/activity.entity';
import { Grant } from 'src/grant/entities/grant.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { Activity } from '../activity/activity.entity'; Here we need these entities in order for the @ManyToOne relationships to work
// import { Grant } from '../grant/grant.entity';
// import { User } from '../user/user.entity';

@Entity({ name: 'application' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Activity, (activity) => activity.application)
  activities: Activity[];

  @ManyToOne(() => Grant, (grant) => grant.applications, { eager: true })
  @JoinColumn({ name: 'grant_id' })
  grant: Grant;

  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
