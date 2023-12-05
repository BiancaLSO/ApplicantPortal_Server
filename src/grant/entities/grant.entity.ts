import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Activity } from 'src/activity/entites/activity.entity';
import { Application } from 'src/application/entities/application.entity';

@Entity()
export class Grant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  link: string;

  @ManyToOne(() => Category, (category) => category.grants)
  category: Category;

  @OneToMany(() => Application, (application) => application.grant)
  applications: Application[];
}
