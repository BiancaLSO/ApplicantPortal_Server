import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Application } from './entities/application.entity';
import { ApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(applicationDto: ApplicationDto): Promise<Application> {
    const application = this.applicationRepository.create(applicationDto);
    return await this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return await this.applicationRepository.find();
  }

  async findById(id: number): Promise<Application> {
    return await this.applicationRepository.findOne({
      where: { id },
      relations: ['activities', 'grant', 'user'],
    });
  }

  async update(
    id: number,
    applicationDto: ApplicationDto,
  ): Promise<Application> {
    await this.applicationRepository.update(id, applicationDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.applicationRepository.delete(id);
  }
}
