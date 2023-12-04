import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Status } from './status.entity';
import { PDF } from './pdf_upload.entity';

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

  @ManyToOne(() => Status, (status) => status.activities)
  status: Status;

  @OneToMany(() => PDF, (pdf) => pdf.activity)
  attachments: PDF[];
}
