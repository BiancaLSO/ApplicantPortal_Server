import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, Repository } from 'typeorm';
import { Grant } from './entities/grant.entity';
import { Category } from '../category/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { GrantDto } from './dto/grant.dto';

describe('GrantController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let connection: Connection;
  let grantRepository: Repository<Grant>;
  let categoryRepository: Repository<Category>;
  let testGrants: Grant[] = [];
  let testCategory: Category[] = [];

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    grantRepository = moduleFixture.get(getRepositoryToken(Grant));
    categoryRepository = moduleFixture.get(getRepositoryToken(Category));

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await grantRepository.remove(testGrants);
    await categoryRepository.remove(testCategory);
    testGrants = [];
    testCategory = [];
    await moduleFixture.close();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST Grant', () => {
    it('should create a grant (GET)', async () => {
      const categoryBody = new Category();
      categoryBody.name = 'Crafts & Design ';
      const createdCategory = await request(app.getHttpServer())
        .post('/category')
        .send(categoryBody);

      testCategory.push(createdCategory.body);

      const grant1 = new GrantDto(
        'Test Grant 1',
        new Date(2023, 0, 15),
        new Date(2023, 3, 15),
        'example.com',
      );
      grant1.category = createdCategory.body;
      // Arrange
      const createdGrant = await request(app.getHttpServer())
        .post('/grant')
        .send(grant1)
        .expect(201);

      testGrants.push(createdGrant.body);

      // Assert (expect)
      console.log('the test grant', createdGrant.body);
      console.log('the sent grant', grant1);
      expect(createdGrant.body.category).toEqual(grant1.category);
    });
  });

  describe('GET Grants', () => {
    it('should retrieve all grants (GET)', async () => {
      const categoryBody = new Category();
      categoryBody.name = 'Research';
      const createdCategory = await request(app.getHttpServer())
        .post('/category')
        .send(categoryBody);

      testCategory.push(createdCategory.body);

      const grant1 = new GrantDto(
        'Test Grant 1',
        new Date(2023, 0, 15),
        new Date(2023, 3, 15),
        'example.com',
      );
      grant1.category = createdCategory.body;

      const grant2 = new GrantDto(
        'Test Grant 2',
        new Date(2023, 10, 25),
        new Date(2023, 11, 25),
        'example.com',
      );
      grant2.category = createdCategory.body;

      const grant3 = new GrantDto(
        'Test Grant 3',
        new Date(2023, 8, 21),
        new Date(2023, 11, 21),
        'example.com',
      );
      grant3.category = createdCategory.body;
      // Arrange
      const grants = await Promise.all([
        await grantRepository.save(grant1),
        await grantRepository.save(grant2),
        await grantRepository.save(grant3),
      ]);
      const flattenedArray = grants.flat();
      testGrants.push(...flattenedArray);

      // Act
      const { body }: { body: Grant[] } = await request(app.getHttpServer())
        .get('/grant')
        .expect(200);

      // Assert (expect)
      expect(body.length).toEqual(4);
      expect(body[1].title).toEqual('Test Grant 1');
    });
  });

  describe('GET Grant by id', () => {
    it('should find a grant by id (GET)', async () => {
      const categoryBody = new Category();
      categoryBody.name = 'Crafts & Design ';
      const createdCategory = await request(app.getHttpServer())
        .post('/category')
        .send(categoryBody);

      testCategory.push(createdCategory.body);

      const grant1 = new GrantDto(
        'Test Grant 1',
        new Date(2023, 0, 15),
        new Date(2023, 3, 15),
        'example.com',
      );
      grant1.category = createdCategory.body;
      // Arrange
      const createdGrant = await request(app.getHttpServer())
        .post('/grant')
        .send(grant1)
        .expect(201);

      testGrants.push(createdGrant.body);

      await request(app.getHttpServer())
        .get(`/grant/${createdGrant.body.id}`)
        .expect(200);
    });
  });

  describe('DELETE Grant', () => {
    it('should delete a grant by id (DELETE)', async () => {
      const categoryBody = new Category();
      categoryBody.name = 'Crafts & Design ';
      const createdCategory = await request(app.getHttpServer())
        .post('/category')
        .send(categoryBody);

      testCategory.push(createdCategory.body);

      const grant1 = new GrantDto(
        'Test Grant 1',
        new Date(2023, 0, 15),
        new Date(2023, 3, 15),
        'example.com',
      );
      grant1.category = createdCategory.body;
      // Arrange
      const createdGrant = await request(app.getHttpServer())
        .post('/grant')
        .send(grant1)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/grant/${createdGrant.body.id}`)
        .expect(200);
    });
  });
});
