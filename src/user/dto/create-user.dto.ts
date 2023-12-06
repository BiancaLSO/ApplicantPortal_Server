import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cpr: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  addresId: number;

  @IsBoolean()
  isNotified: boolean;

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    cpr: string,
    email: string,
    isNotified: boolean,
    addresId: number,
    notificationId: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.cpr = cpr;
    this.isNotified = isNotified;
    this.addresId = addresId;
  }
}
