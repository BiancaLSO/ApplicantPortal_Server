import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'application_requirements' })
export class ApplicationRequirements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  first_name: string;

  @Column({ type: 'varchar', length: 45 })
  last_name: string;

  @Column({ type: 'varchar', length: 45 })
  phone: string;

  @Column({ type: 'varchar', length: 10 })
  cpr: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 45 })
  street: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'numeric' })
  zipcode: number;
}
