import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Address } from './entities/address.entity';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(addressDto: AddressDto): Promise<Address> {
    const address = this.addressRepository.create(addressDto);
    return await this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async findById(id: number): Promise<Address> {
    return await this.addressRepository.findOne({ where: { id } });
  }

  async update(id: number, addressDto: AddressDto): Promise<Address> {
    await this.addressRepository.update(id, addressDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
