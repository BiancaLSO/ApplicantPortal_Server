import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ContactForm } from './contact-form.entity';
import { ContactFormDto } from './contact-form.dto';

@Injectable()
export class ContactFormService {
  constructor(
    @InjectRepository(ContactForm)
    private readonly contactFormRepository: Repository<ContactForm>,
  ) {}

  async create(contactFormDto: ContactFormDto): Promise<ContactForm> {
    const contactForm = this.contactFormRepository.create(contactFormDto);
    return await this.contactFormRepository.save(contactForm);
  }

  async findAll(): Promise<ContactForm[]> {
    return await this.contactFormRepository.find({ relations: ['user'] }); // the relations option will load the user object, we can see later on if we need it or not
  }

  async findById(id: number): Promise<ContactForm> {
    return await this.contactFormRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    contactFormDto: ContactFormDto,
  ): Promise<ContactForm> {
    await this.contactFormRepository.update(id, contactFormDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.contactFormRepository.delete(id);
  }
}
