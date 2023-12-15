import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Application } from '../../application/entities/application.entity';

@Entity({ name: 'application_form' })
export class ApplicationForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  project_title: string;

  @Column({ type: 'varchar', nullable: true })
  experience_description: string;

  @Column({ type: 'varchar', nullable: true })
  benefit_description: string;

  @Column({ type: 'varchar', nullable: true })
  future_vision_description: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  traveler_name_and_position: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  purpose_description: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  departure_country: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  departure_city: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  destination_country: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  destination_city: string;

  @Column({ type: 'date', nullable: true })
  trip_start_date: Date;

  @Column({ type: 'date', nullable: true })
  trip_end_date: Date;

  @Column({ type: 'numeric', nullable: true })
  requested_amount: number;

  @Column({ type: 'numeric', nullable: true })
  overall_amount: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  recedency_name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  project_description: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  project_country: string;

  @Column({ type: 'date', nullable: true })
  recedency_start_date: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  author_full_name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  event_location: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  target_group: string;

  @Column({ type: 'boolean', nullable: true })
  is_catalog_used: boolean;

  @Column({ type: 'date', nullable: true })
  event_date: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  municipality: string;

  @Column({ type: 'date', nullable: true })
  recedency_end_date: Date;

  @Column({ type: 'boolean', nullable: true })
  agreement_info: boolean;

  @Column({ type: 'int', nullable: true })
  application_id: number;

  @OneToOne(() => Application, (application) => application.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'application_id' })
  application: Application;
}
