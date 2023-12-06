import { Activity } from '../../activity/entites/activity.entity';
import { ApplicationRequirements } from '../../application-requirements/entities/application-requirements.entity';
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

  @OneToOne(
    () => ApplicationRequirements,
    (ApplicationRequirements) => ApplicationRequirements.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  application_req: ApplicationRequirements;
}
