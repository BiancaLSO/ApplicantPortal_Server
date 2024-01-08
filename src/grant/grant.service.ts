import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grant } from './entities/grant.entity';
import { GrantDto } from './dto/grant.dto';

@Injectable()
export class GrantService {
  constructor(
    @InjectRepository(Grant)
    private grantRepository: Repository<Grant>,
  ) {}

  create_grant(grantDto: GrantDto) {
    return this.grantRepository.save(grantDto);
  }
  findAll() {
    return this.grantRepository.find({
      relations: ['category'],
    });
  }

  findOne(id: number) {
    return this.grantRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
  }

  remove_grant(id: number) {
    return this.grantRepository.delete(id);
  }
}
