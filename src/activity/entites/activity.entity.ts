import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { PDF } from '../../pdf_upload/entities/pdf_upload.entity';
import { Application } from '../../application/entities/application.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  note: string;

  @ManyToOne(() => Status, (status) => status.activities, { eager: true })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Application, (application) => application.activities, {
    eager: true,
  })
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @OneToMany(() => PDF, (pdf) => pdf.activity)
  attachments: PDF[];
}
