import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Application } from 'src/application/entities/application.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ nullable: true })
  cpr: string | null;

  @IsEmail()
  @Column({ nullable: true })
  email: string | null;

  @Column()
  isNotified: boolean;

  @Column()
  notificationId: number;

  @ManyToOne(() => Address, (address) => address.users, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
