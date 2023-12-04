import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  cpr: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  addresId: number;

  @Column()
  isNotified: boolean;

  @Column()
  notificationId: number;
}
