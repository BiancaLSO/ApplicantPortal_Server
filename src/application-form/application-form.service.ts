import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ApplicationForm } from './entities/application-form.entity';
import { ApplicationFormDto } from './dto/application-form.dto';

@Injectable()
export class ApplicationFormService {
  constructor(
    @InjectRepository(ApplicationForm)
    private readonly applicationFormRepository: Repository<ApplicationForm>,
  ) {}

  async create(
    applicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    const applicationForm =
      this.applicationFormRepository.create(applicationFormDto);
    return await this.applicationFormRepository.save(applicationForm);
  }

  async findAll(): Promise<ApplicationForm[]> {
    return await this.applicationFormRepository.find();
  }

  async findById(id: number): Promise<ApplicationForm> {
    return await this.applicationFormRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    applicationFormDto: ApplicationFormDto,
  ): Promise<ApplicationForm> {
    await this.applicationFormRepository.update(id, applicationFormDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.applicationFormRepository.delete(id);
  }
}
