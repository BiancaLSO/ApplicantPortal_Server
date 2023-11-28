import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  street: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'bigint' })
  zipcode: number;
}
