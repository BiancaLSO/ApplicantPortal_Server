import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserCredentials } from './entities/user.credentials.entity';
import { encodePassword } from './../auth/utils.bcrypt';
import { CreateUserCredentialsDTO } from './dto/create-user-credentials.dto';
import { Address } from '../address/entities/address.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AddressDto } from '../address/dto/address.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserCredentials)
    private userCredentialsRepository: Repository<UserCredentials>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createUserandCredentials(
    createUserCredentialsDto: CreateUserCredentialsDTO,
    createUserDto?: CreateUserDto,
    addressDto?: AddressDto,
  ) {
    const existingUser = await this.userCredentialsRepository.findOne({
      where: {
        username: ILike(createUserCredentialsDto.username),
      },
    });

    if (existingUser) {
      throw new Error('Username already exists');
    } else {
      const user = new User();
      if (createUserDto) {
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.phone = createUserDto.phone;
        user.email = createUserDto.email;
        user.cpr = createUserDto.cpr;

        const existingUserAddress = await this.addressRepository.findOne({
          where: {
            zipCode: addressDto.zipCode,
            city: addressDto.city,
            street: addressDto.street,
          },
        });

        if (!existingUserAddress) {
          const newAddress = await this.addressRepository.save({
            zipCode: addressDto.zipCode,
            city: addressDto.city,
            street: addressDto.street,
          });

          user.address = newAddress;
        } else {
          user.address = existingUserAddress;
        }
      } else {
        const existingAddress = await this.addressRepository.findOne({
          where: {
            zipCode: 2300,
            city: 'Kobenhavn S',
            street: 'Richard Mortensens Vej',
          },
        });

        if (!existingAddress) {
          const newAddress = await this.addressRepository.save({
            zipCode: 2300,
            city: 'Kobenhavn S',
            street: 'Richard Mortensens Vej',
          });

          user.address = newAddress;
        } else {
          user.address = existingAddress;
        }
      }
      user.isNotified = false;

      const savedUser = await this.userRepository.save(user);

      const userCredentials = new UserCredentials();
      userCredentials.username = createUserCredentialsDto.username;
      userCredentials.password = await encodePassword(
        createUserCredentialsDto?.password,
      );
      userCredentials.user = savedUser;

      await this.userCredentialsRepository.save(userCredentials);
      return savedUser.id;
    }
  }

  async findByUsername(username: string) {
    return this.userCredentialsRepository
      .createQueryBuilder('userCredentials')
      .where('userCredentials.username = :username', { username })
      .getOne();
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['notifications', 'inquiries', 'applications', 'address'],
    });
  }

  async findAllUserCredentials() {
    return this.userCredentialsRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneUserCredential(id: number) {
    return this.userCredentialsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async findOneUserByCredentialsId(id: number) {
    const userCredentials = await this.findOneUserCredential(id);
    return userCredentials.user;
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
    // delete user credentials as well
    return this.userRepository.delete(id);
  }
}
