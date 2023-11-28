import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Address } from './address.entity';
import { AddressService } from './address.service';
import { AddressDto } from './address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() addressDto: AddressDto): Promise<Address> {
    return this.addressService.create(addressDto);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Address> {
    return this.addressService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAddressDto: AddressDto,
  ): Promise<Address> {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.addressService.remove(+id);
  }
}
