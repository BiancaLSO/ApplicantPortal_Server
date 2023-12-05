import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grant } from '../grant/entities/grant.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Grant, (grant) => grant.category)
  grants: Grant[];
}
