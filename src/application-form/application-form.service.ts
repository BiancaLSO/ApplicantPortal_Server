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

  async findByApplicationId(id: number): Promise<ApplicationForm> {
    return await this.applicationFormRepository.findOne({
      where: { application: { id } }, // Use correct syntax here
      relations: ['application'],
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

  async callStoredProcedure(
    applicationId: number,
    grantId: number,
    applicationFormDto: ApplicationFormDto,
  ): Promise<void> {
    const {
      project_title,
      experience_description,
      benefit_description,
      future_vision_description,
      traveler_name_and_position,
      purpose_description,
      departure_country,
      departure_city,
      destination_country,
      destination_city,
      trip_start_date,
      trip_end_date,
      requested_amount,
      overall_amount,
      recedency_name,
      project_description,
      project_country,
      recedency_start_date,
      author_full_name,
      event_location,
      target_group,
      is_catalog_used,
      event_date,
      municipality,
      recedency_end_date,
      agreement_info,
    } = applicationFormDto;

    // Use these parameters when executing the stored procedure
    const result = await this.applicationFormRepository.query(
      'CALL insertapplicationform($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
      [
        applicationId,
        grantId,
        requested_amount,
        overall_amount,
        project_title,
        experience_description,
        benefit_description,
        future_vision_description,
        agreement_info,
        traveler_name_and_position,
        purpose_description,
        departure_country,
        departure_city,
        destination_country,
        destination_city,
        trip_start_date,
        trip_end_date,
        recedency_name,
        project_description,
        project_country,
        recedency_start_date,
        recedency_end_date,
        author_full_name,
        event_location,
        target_group,
        is_catalog_used,
        event_date,
        municipality,
      ],
    );
    return result;
  }
}
