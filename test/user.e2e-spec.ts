// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Connection, Repository } from 'typeorm';
// import { User } from './../src/user/entities/user.entity';
// import { TestModule } from './../src/test.module';
// import { CreateUserDto } from './../src/user/dto/create-user.dto';
// import { Activity } from './../src/activity/entites/activity.entity';
// import { Application } from './../src/application/entities/application.entity';

// describe('UserController (e2e)', () => {
//   let app: INestApplication;
//   let moduleFixture: TestingModule;
//   let userRepository: Repository<User>;
//   let applicationRepository: Repository<Application>;
//   let activityRepository: Repository<Activity>;
//   let connection: Connection;
//   let testUsers: User[];

//   beforeEach(async () => {
//     moduleFixture = await Test.createTestingModule({
//       imports: [TestModule],
//     }).compile();

//     userRepository = moduleFixture.get(getRepositoryToken(User));
//     applicationRepository = moduleFixture.get(getRepositoryToken(Application));
//     activityRepository = moduleFixture.get(getRepositoryToken(Activity));

//     connection = moduleFixture.get(Connection);
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   }, 10000);

//   afterEach(async () => {
//     if (testUsers && testUsers.length > 0) {
//       await userRepository.remove(testUsers);
//       testUsers = [];
//     }

//     if (moduleFixture) {
//       await moduleFixture.close();
//     }
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   describe('GET Users', () => {
//     it('should retrieve all users (GET)', async () => {
//       const user1 = new CreateUserDto(
//         'Nora',
//         'Smith',
//         '123456789',
//         '12345678',
//         'norasmith@gmail.com',
//         false,
//         1,
//         1,
//       );

//       const user2 = new CreateUserDto(
//         'Nora',
//         'Smith',
//         '123456789',
//         '12345678',
//         'norasmith@gmail.com',
//         false,
//         1,
//         1,
//       );

//       const newUsers = await Promise.all([
//         await userRepository.save(user1),

//         await userRepository.save(user2),
//       ]);

//       const flattenedArray = newUsers.flat();
//       testUsers.push(...flattenedArray);

//       // Act
//       const { body }: { body: User[] } = await request(app.getHttpServer())
//         .get('/user')
//         .expect(200);

//       // Assert (expect)
//       expect(body.length).toEqual(2);
//       expect(body[0].firstName).toEqual('Nora');
//     });
//   });

//   describe('GET User by ID', () => {
//     it('should retrieve an user by ID (GET)', async () => {
//       const user1 = new CreateUserDto(
//         'Nora',
//         'Smith',
//         '123456789',
//         '12345678',
//         'norasmith@gmail.com',
//         false,
//         1,
//         1,
//       );

//       const user2 = new CreateUserDto(
//         'Nora',
//         'Smith',
//         '123456789',
//         '12345678',
//         'norasmith@gmail.com',
//         false,
//         1,
//         1,
//       );

//       const newUsers = await Promise.all([
//         await userRepository.save(user1),

//         await userRepository.save(user2),
//       ]);

//       const flattenedArray = newUsers.flat();
//       testUsers.push(...flattenedArray);

//       // Act
//       const { body: retrievedUser }: { body: User } = await request(
//         app.getHttpServer(),
//       )
//         .get(`/user/${newUsers[0].id}`)
//         .expect(200);

//       // Assert
//       expect(retrievedUser.id).toEqual(newUsers[0].id);
//       expect(retrievedUser.firstName).toEqual('Nora');
//     });
//   });

//   describe('DELETE user by ID', () => {
//     it('should delete an user by ID (DELETE)', async () => {
//       const user1 = new CreateUserDto(
//         'Nora',
//         'Smith',
//         '123456789',
//         '12345678',
//         'norasmith@gmail.com',
//         false,
//         1,
//         1,
//       );

//       const createdUser = await request(app.getHttpServer())
//         .post('/user')
//         .send(user1)
//         .expect(201);

//       await request(app.getHttpServer())
//         .delete(`/user/${createdUser.body.id}`)
//         .expect(200);
//     });
//   });
// });
