import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ApplicationRequirements } from './application-requirements.entity';
import { ApplicationRequirementsDto } from './application-requirements.dto';

@Injectable()
export class ApplicationRequirementsService {
  constructor(
    @InjectRepository(ApplicationRequirements)
    private readonly applicationRequirementsRepository: Repository<ApplicationRequirements>,
  ) {}

  async create(
    applicationRequirementsDto: ApplicationRequirementsDto,
  ): Promise<ApplicationRequirements> {
    const applicationRequirements =
      this.applicationRequirementsRepository.create(applicationRequirementsDto);
    return await this.applicationRequirementsRepository.save(
      applicationRequirements,
    );
  }

  async findAll(): Promise<ApplicationRequirements[]> {
    return await this.applicationRequirementsRepository.find();
  }

  async findById(id: number): Promise<ApplicationRequirements> {
    return await this.applicationRequirementsRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    applicationRequirementsDto: ApplicationRequirementsDto,
  ): Promise<ApplicationRequirements> {
    await this.applicationRequirementsRepository.update(
      id,
      applicationRequirementsDto,
    );
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.applicationRequirementsRepository.delete(id);
  }
}
