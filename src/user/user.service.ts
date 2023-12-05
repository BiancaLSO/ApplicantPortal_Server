import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentials } from './entities/user.credentials.entity';
import { encodePassword } from './../auth/utils.bcrypt';
import { CreateUserCredentialsDTO } from './dto/create-user-credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserCredentials)
    private userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async createUserandCredentials(
    createUserCredentialsDto: CreateUserCredentialsDTO,
  ) {
    const existingUser = await this.userCredentialsRepository.findOneBy({
      username: createUserCredentialsDto.username,
    });
    if (existingUser) {
      throw new Error('Username already exists');
    } else {
      const user = new User();
      user.addresId = 1; // Change these after getting the address and notification entities and dtos
      user.notificationId = 1;
      user.isNotified = false;

      const savedUser = await this.userRepository.save(user);

      const userCredentials = new UserCredentials();
      userCredentials.username = createUserCredentialsDto.username;
      userCredentials.password = await encodePassword(
        createUserCredentialsDto?.password,
      );
      userCredentials.user = savedUser;

      return await this.userCredentialsRepository.save(userCredentials);
    }
  }

  async findByUsername(username: string) {
    return this.userCredentialsRepository
      .createQueryBuilder('userCredentials')
      .where('userCredentials.username = :username', { username })
      .getOne();
  }

  async findAll() {
    return this.userRepository.find();
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
