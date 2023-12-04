import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './../src/user/entities/user.entity';
import { TestModule } from './../src/test.module';
import { CreateUserDto } from './../src/user/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let userRepository: Repository<User>;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userRepository = moduleFixture.get(getRepositoryToken(User));
    await userRepository.delete({});

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await userRepository.delete({});
    await moduleFixture.close();
    await app.close();
  });

  describe('GET Users', () => {
    it('should retrieve all users (GET)', async () => {
      // Arrange
      await Promise.all([
        await userRepository.insert(
          new CreateUserDto(
            'Nora',
            'Smith',
            '123456789',
            '12345678',
            'norasmith@gmail.com',
            false,
            1,
            1,
          ),
        ),

        await userRepository.insert(
          new CreateUserDto(
            'Nora',
            'Smith',
            '123456789',
            '12345678',
            'norasmith@gmail.com',
            false,
            1,
            1,
          ),
        ),
      ]);

      // Act
      const { body }: { body: User[] } = await request(app.getHttpServer())
        .get('/user')
        .expect(200);

      // Assert (expect)
      expect(body.length).toEqual(2);
      expect(body[0].firstName).toEqual('Nora');
    });
  });

  describe('GET User by ID', () => {
    it('should retrieve an user by ID (GET)', async () => {
      // Arrange
      const createDto1 = new CreateUserDto(
        'Nora',
        'Smith',
        '123456789',
        '12345678',
        'norasmith@gmail.com',
        false,
        1,
        1,
      );
      const createDto2 = new CreateUserDto(
        'Nora2',
        'Smith2',
        '1234567892',
        '123456782',
        'norasmith2@gmail.com',
        true,
        1,
        1,
      );

      const user1 = await userRepository.insert(createDto1);
      const user2 = await userRepository.insert(createDto2);

      // Act
      const { body: retrievedUser }: { body: User } = await request(
        app.getHttpServer(),
      )
        .get(`/user/${user1.identifiers[0].id}`)
        .expect(200);

      // Assert
      expect(retrievedUser.id).toEqual(user1.identifiers[0].id);
      expect(retrievedUser.firstName).toEqual('Nora');
    });
  });

  //   describe('POST user', () => {
  //     it('should create a new user (POST)', async () => {
  //       const user = {
  //         userId: 1,
  //         categoryId: 1,
  //         data: {
  //           subject: 'Water issue',
  //           description: 'Water is coming out',
  //         },
  //       };

  //       const { body }: { body: User } = await request(app.getHttpServer())
  //         .post('/issues')
  //         .send(issue)
  //         .expect(201);

  //       expect(body.subject).toEqual('Water issue');
  //       expect(body.description).toEqual('Water is coming out');
  //     });
  //   });

  describe('DELETE user by ID', () => {
    it('should delete an user by ID (DELETE)', async () => {
      const user = {
        userId: 1,
        firstName: 'Nora2',
        lastName: 'Smith2',
        phone: '1234567892',
        cpr: '123456782',
        email: 'norasmith2@gmail.com',
        isNotified: true,
        addressId: 1,
        notificationId: 1,
      };
      await request(app.getHttpServer())
        .delete(`/user/${user.userId}`)
        .expect(200);
    });
  });

  afterAll(() => {
    app.close();
  });
});
