import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  street: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'bigint' })
  zipCode: number;

  @OneToMany(() => User, (user) => user.address)
  users: User[];
}
