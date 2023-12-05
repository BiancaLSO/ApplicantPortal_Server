import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grant } from './grant.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Grant, (grant) => grant.category)
  grants: Grant[];
}
