import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  create_status(statusDto: StatusDto) {
    return this.statusRepository.save(statusDto);
  }

  findAll() {
    return this.statusRepository.find();
  }

  findOne(id: number) {
    return this.statusRepository.findOneBy({ id: id });
  }

  findOneByName(name: string) {
    return this.statusRepository.findOne({
      where: { name: name },
    });
  }

  remove_status(id: number) {
    return this.statusRepository.delete(id);
  }
}
