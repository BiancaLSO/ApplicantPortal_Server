import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Address } from '../../address/entities/address.entity';
import { Application } from '../../application/entities/application.entity';
import { ContactForm } from '../../contact-form/entities/contact-form.entity';
import { Notification } from '../../notification/entites/notification.entity';

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

  @OneToMany(() => ContactForm, (inquiry) => inquiry.user)
  inquiries: ContactForm[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
