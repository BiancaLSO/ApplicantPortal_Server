export class AddressDto {
  street: string;
  city: string;
  zipCode: number;

  constructor(street: string, city: string, zipCode: number) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
  }
}
