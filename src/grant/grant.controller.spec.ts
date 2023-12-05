/* THIS IS THE FIRST ITERARTION OF THE TEST FILE; WORKS; WANTED TO KEEP IT
import { Test, TestingModule } from '@nestjs/testing';
import { GrantController } from './grant.controller';
import { GrantService } from './grant.service';
import { CategoryService } from '../category/category.service';
import {
  getConnection,
  createConnection,
  Connection,
  Repository,
} from 'typeorm';
import { Grant } from '../entities/grant.entity';
import { Category } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GrantController', () => {
  let grantController: GrantController;
  let grantService: GrantService;
  let categoryService: CategoryService;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [Grant, Category],
      synchronize: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrantController],
      providers: [
        GrantService,
        CategoryService,
        {
          provide: getRepositoryToken(Grant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    grantController = module.get<GrantController>(GrantController);
    grantService = module.get<GrantService>(GrantService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  const mockGrant1 = new Grant();
  mockGrant1.id = 1;
  mockGrant1.title = 'Test Grant';
  mockGrant1.start_date = new Date('2023-01-01');
  mockGrant1.end_date = new Date('2023-12-31');
  mockGrant1.link = 'http://example.com';

  const mockGrant2 = new Grant();
  mockGrant2.id = 2;
  mockGrant2.title = 'Grant 2';
  mockGrant2.start_date = new Date('2023-02-01');
  (mockGrant2.end_date = new Date('2023-11-30')),
    (mockGrant2.link = 'http://example.com');

  const mockRequest = {
    user: undefined,
  };

  describe('create', () => {
    it('should create a new grant', async () => {
      // Create a category in the database
      const createdCategory: Partial<Category> = await connection
        .getRepository(Category)
        .save({
          name: 'Education',
        });

      // Stub the findOne method to return the created category
      jest
        .spyOn(categoryService, 'findOne')
        .mockImplementation(async () => createdCategory as Category);

      // Create an actual instance of Grant entity
      const createdGrant = mockGrant1;
      createdGrant.category = createdCategory as Category;

      // Stub the create_grant method to return the created Grant entity
      jest
        .spyOn(grantService, 'create_grant')
        .mockImplementation(async () => createdGrant);

      const result = await grantController.create(mockRequest, createdGrant);

      // Adjust this expectation based on your actual implementation
      expect(result).toEqual(createdGrant);
      expect(grantService.create_grant).toHaveBeenCalledWith(expect.anything());
      expect(categoryService.findOne).toHaveBeenCalledWith(createdCategory.id);
    });
  });

  describe('findAll', () => {
    it('should return an array of grants', async () => {
      const createdCategory: Partial<Category> = await connection
        .getRepository(Category)
        .save({
          name: 'Education',
        });

      jest
        .spyOn(categoryService, 'findOne')
        .mockImplementation(async () => createdCategory as Category);

      const createdGrant1 = mockGrant1;
      createdGrant1.id = 2;
      createdGrant1.category = createdCategory as Category;

      const createdGrant2 = mockGrant2;
      createdGrant2.id = 3;
      createdGrant2.category = createdCategory as Category;

      const mockGrants = [createdGrant1, createdGrant2];

      // Stub the findAll method to return the mock array of grants
      jest
        .spyOn(grantService, 'findAll')
        .mockImplementation(async () => mockGrants);

      const result = await grantController.findAll(mockRequest);

      expect(result).toEqual(mockGrants);
      expect(grantService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single grant by ID', async () => {
      const createdCategory: Partial<Category> = await connection
        .getRepository(Category)
        .save({
          name: 'Education',
        });

      jest
        .spyOn(categoryService, 'findOne')
        .mockImplementation(async () => createdCategory as Category);

      const createdGrant = mockGrant1;
      createdGrant.id = 4;
      createdGrant.category = createdCategory as Category;

      jest
        .spyOn(grantService, 'create_grant')
        .mockImplementation(async () => createdGrant);

      const mockResult = await grantController.create(
        mockRequest,
        createdGrant,
      );
      // Stub the findOne method to return the mock grant
      jest
        .spyOn(grantService, 'findOne')
        .mockImplementation(async () => createdGrant);

      const result = await grantController.findOne(`${mockResult.id}`);

      expect(result).toEqual(createdGrant);
    });
  });

  describe('remove_grant', () => {
    it('should remove a grant by ID', async () => {
      const createdCategory: Partial<Category> = await connection
        .getRepository(Category)
        .save({
          name: 'Education',
        });

      jest
        .spyOn(categoryService, 'findOne')
        .mockImplementation(async () => createdCategory as Category);

      const createdGrant = mockGrant2;
      createdGrant.id = 5;
      createdGrant.category = createdCategory as Category;

      jest
        .spyOn(grantService, 'create_grant')
        .mockImplementation(async () => createdGrant);

      const mockResult = await grantController.create(
        mockRequest,
        createdGrant,
      );

      // Stub the remove_grant method
      jest
        .spyOn(grantService, 'remove_grant')
        .mockImplementation(async () => ({ affected: 1, raw: true })); // Assuming 1 row affected indicates successful deletion

      const removed_id = mockResult.id.toString();
      await grantController.remove_grant(removed_id);

      expect(grantService.remove_grant).toHaveBeenCalledWith(mockResult.id);
    });
  });

}); */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  getConnection,
  createConnection,
  Connection,
  Repository,
} from 'typeorm';
import { Grant } from './entities/grant.entity';
import { Category } from '../category/entities/category.entity';
import { GrantController } from './grant.controller';
import { GrantService } from './grant.service';
import { CategoryService } from '../category/category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { GrantDto } from './dto/grant.dto';
import { CategoryDto } from 'src/category/dto/category.dto';

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
