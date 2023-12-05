import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'application_requirements' })
export class ApplicationRequirements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cpr: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  city: string;

  @Column({ type: 'numeric', nullable: true })
  zipcode: number;
}
