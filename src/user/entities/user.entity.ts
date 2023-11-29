import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  cpr: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  addresId: number;

  @Column()
  isNotified: boolean;

  @IsNotEmpty()
  @Column()
  notificationId: number;
}
