import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.addresId = 1; // Change these after getting the address and notification entities and dtos
    createUserDto.notificationId = 1;

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.userRepository.findOne({ where: { id } });
    if (!toUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async removeUserAndRelatedEntities(id: number) {
    // Uncomment this when we have the Address Entity

    //const user = await this.userRepository.findOne({ where: { id } });
    // if (user) {
    //   if (user.addressId) {
    //     const address = await this.addressRepository.findOne(user.addressId);

    //     if (address) {
    //       address.user = null;
    //       await this.addressRepository.save(address);
    //     }
    //   }

    //   return { message: 'User and related entities deleted' };
    // }

    // throw new NotFoundException('User not found');

    return this.userRepository.delete(id);
  }
}
