import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Activity } from '../activity/entites/activity.entity';

@Entity()
export class PDF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @ManyToOne(() => Activity, (activity) => activity.attachments)
  activity: Activity;
}
