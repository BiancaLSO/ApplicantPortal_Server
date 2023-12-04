import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

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
}
