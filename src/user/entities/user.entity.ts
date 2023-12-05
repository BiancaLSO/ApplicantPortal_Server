import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string | null;

  @Column()
  lastName: string | null;

  @Column()
  phone: string | null;

  @Column()
  cpr: string | null;

  @IsEmail()
  @Column()
  email: string | null;

  @Column()
  addresId: number;

  @Column()
  isNotified: boolean;

  @Column()
  notificationId: number;
}
