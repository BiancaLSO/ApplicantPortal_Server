import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { Activity } from '../activity/activity.entity'; Here we need these entities in order for the @ManyToOne relationships to work
// import { Grant } from '../grant/grant.entity';
// import { User } from '../user/user.entity';

@Entity({ name: 'application' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grant_id: number;

  @Column()
  activity_id: number;

  @Column()
  user_id: number;

  //   @ManyToOne(() => Activity, { eager: true })
  //   @JoinColumn({ name: 'activity_id' })
  //   activity: Activity;

  //   @ManyToOne(() => Grant, { eager: true })
  //   @JoinColumn({ name: 'grant_id' })
  //   grant: Grant;

  //   @ManyToOne(() => User, { eager: true })
  //   @JoinColumn({ name: 'user_id' })
  //   user: User;
}
