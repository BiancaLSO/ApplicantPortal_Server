import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationFormController } from './application-form.controller';
import { ApplicationFormService } from './application-form.service';
import { ApplicationService } from '../application/application.service';
import { ApplicationFormDto } from './dto/application-form.dto';
import { ApplicationForm } from './entities/application-form.entity';

describe('ApplicationFormController', () => {
  let controller: ApplicationFormController;
  let applicationFormService: ApplicationFormService;

  beforeEach(async () => {
    const mockRepository = jest.fn(() => ({
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }));

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationFormController],
      providers: [ApplicationFormService, ApplicationService],
    }).compile();

    controller = module.get<ApplicationFormController>(
      ApplicationFormController,
    );
    applicationFormService = module.get<ApplicationFormService>(
      ApplicationFormService,
    );
  });

  describe('create', () => {
    it('should create a new application form', async () => {
      const applicationFormDto: ApplicationFormDto = {
        // Provide the necessary data for the application form
        application: {
          id: 1,
          activities: [],
          grant: {
            id: 1,
            title: 'test',
            start_date: new Date(),
            end_date: new Date(),
            link: 'test',
            category: {
              id: 1,
              name: 'test',
              grants: [],
            },
            applications: [],
          },
          user: {
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            cpr: 'test',
            email: 'test',
            isNotified: true,
            address: {
              id: 1,
              street: 'test',
              zipCode: 123456,
              city: 'test',
              users: [],
            },
            id: 0,
            applications: [],
            inquiries: [],
            notifications: [],
          },
        },
        project_title: 'test',
        experience_description: 'test',
        benefit_description: 'test',
        future_vision_description: 'test',
        traveler_name_and_position: 'test',
        purpose_description: 'test',
        departure_country: 'test',
        departure_city: 'test',
        destination_country: 'test',
        destination_city: 'test',
        trip_start_date: new Date(),
        trip_end_date: new Date(),
        requested_amount: 1,
        overall_amount: 1,
        recedency_name: 'test',
        project_description: 'test',
        project_country: 'test',
        recedency_start_date: new Date(),
        author_full_name: 'test',
        event_location: 'test',
        target_group: 'test',
        is_catalog_used: true,
        event_date: new Date(),
        municipality: 'test',
        recedency_end_date: new Date(),
        agreement_info: false,
      };

      const createdApplicationForm: ApplicationForm = {
        application: {
          id: 1,
          activities: [],
          grant: {
            id: 1,
            title: 'test',
            start_date: new Date(),
            end_date: new Date(),
            link: 'test',
            category: {
              id: 1,
              name: 'test',
              grants: [],
            },
            applications: [],
          },
          user: {
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            cpr: 'test',
            email: 'test',
            isNotified: true,
            address: {
              id: 1,
              street: 'test',
              zipCode: 123456,
              city: 'test',
              users: [],
            },
            id: 0,
            applications: [],
            inquiries: [],
            notifications: [],
          },
        },
        project_title: 'test',
        experience_description: 'test',
        benefit_description: 'test',
        future_vision_description: 'test',
        traveler_name_and_position: 'test',
        purpose_description: 'test',
        departure_country: 'test',
        departure_city: 'test',
        destination_country: 'test',
        destination_city: 'test',
        trip_start_date: new Date(),
        trip_end_date: new Date(),
        requested_amount: 1,
        overall_amount: 1,
        recedency_name: 'test',
        project_description: 'test',
        project_country: 'test',
        recedency_start_date: new Date(),
        author_full_name: 'test',
        event_location: 'test',
        target_group: 'test',
        is_catalog_used: true,
        event_date: new Date(),
        municipality: 'test',
        recedency_end_date: new Date(),
        agreement_info: false,
        id: 0,
      };

      jest
        .spyOn(applicationFormService, 'create')
        .mockResolvedValue(createdApplicationForm);

      const result = await controller.create(applicationFormDto);

      expect(result).toEqual(createdApplicationForm);
    });
  });

  describe('findAll', () => {
    it('should return an array of application forms', async () => {
      const applicationForms: ApplicationForm[] = [
        // Provide the expected array of application forms
      ];

      jest
        .spyOn(applicationFormService, 'findAll')
        .mockResolvedValue(applicationForms);

      const result = await controller.findAll();

      expect(result).toEqual(applicationForms);
    });
  });

  describe('findById', () => {
    it('should return the application form with the given id', async () => {
      const id = 1;
      const applicationForm: ApplicationForm = {
        // Provide the expected application form object
        id: 1,
        project_title: 'test',
        experience_description: 'test',
        benefit_description: 'test',
        future_vision_description: 'test',
        traveler_name_and_position: 'test',
        purpose_description: 'test',
        departure_country: 'test',
        departure_city: 'test',
        destination_country: 'test',
        destination_city: 'test',
        trip_start_date: new Date(),
        trip_end_date: new Date(),
        requested_amount: 1,
        overall_amount: 1,
        recedency_name: 'test',
        project_description: 'test',
        project_country: 'test',
        recedency_start_date: new Date(),
        author_full_name: 'test',
        event_location: 'test',
        target_group: 'test',
        is_catalog_used: true,
        event_date: new Date(),
        municipality: 'test',
        recedency_end_date: new Date(),
        agreement_info: false,
        application: {
          id: 1,
          activities: [],
          grant: {
            id: 1,
            title: 'test',
            start_date: new Date(),
            end_date: new Date(),
            link: 'test',
            category: {
              id: 1,
              name: 'test',
              grants: [],
            },
            applications: [],
          },
          user: {
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            cpr: 'test',
            email: 'test',
            isNotified: true,
            address: {
              id: 1,
              street: 'test',
              zipCode: 123456,
              city: 'test',
              users: [],
            },
            id: 0,
            applications: [],
            inquiries: [],
            notifications: [],
          },
        },
      };

      jest
        .spyOn(applicationFormService, 'findById')
        .mockResolvedValue(applicationForm);

      const result = await controller.findById(id);

      expect(result).toEqual(applicationForm);
    });
  });

  describe('update', () => {
    it('should update the application form with the given id', async () => {
      const id = 1;
      const updateApplicationFormDto: ApplicationFormDto = {
        // Provide the necessary data for updating the application form
        application: {
          id: 1,
          activities: [],
          grant: {
            id: 1,
            title: 'test',
            start_date: new Date(),
            end_date: new Date(),
            link: 'test',
            category: {
              id: 1,
              name: 'test',
              grants: [],
            },
            applications: [],
          },
          user: {
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            cpr: 'test',
            email: 'test',
            isNotified: true,
            address: {
              id: 1,
              street: 'test',
              zipCode: 123456,
              city: 'test',
              users: [],
            },
            id: 0,
            applications: [],
            inquiries: [],
            notifications: [],
          },
        },
        project_title: 'test',
        experience_description: 'test',
        benefit_description: 'test',
        future_vision_description: 'test',
        traveler_name_and_position: 'test',
        purpose_description: 'test',
        departure_country: 'test',
        departure_city: 'test',
        destination_country: 'test',
        destination_city: 'test',
        trip_start_date: new Date(),
        trip_end_date: new Date(),
        requested_amount: 1,
        overall_amount: 1,
        recedency_name: 'test',
        project_description: 'test',
        project_country: 'test',
        recedency_start_date: new Date(),
        author_full_name: 'test',
        event_location: 'test',
        target_group: 'test',
        is_catalog_used: true,
        event_date: new Date(),
        municipality: 'test',
        recedency_end_date: new Date(),
        agreement_info: false,
      };

      const updatedApplicationForm: ApplicationForm = {
        // Provide the expected updated application form object
        id: 1,
        project_title: 'test',
        experience_description: 'test',
        benefit_description: 'test',
        future_vision_description: 'test',
        traveler_name_and_position: 'test',
        purpose_description: 'test',
        departure_country: 'test',
        departure_city: 'test',
        destination_country: 'test',
        destination_city: 'test',
        trip_start_date: new Date(),
        trip_end_date: new Date(),
        requested_amount: 1,
        overall_amount: 1,
        recedency_name: 'test',
        project_description: 'test',
        project_country: 'test',
        recedency_start_date: new Date(),
        author_full_name: 'test',
        event_location: 'test',
        target_group: 'test',
        is_catalog_used: true,
        event_date: new Date(),
        municipality: 'test',
        recedency_end_date: new Date(),
        agreement_info: false,
        application: {
          id: 1,
          activities: [],
          grant: {
            id: 1,
            title: 'test',
            start_date: new Date(),
            end_date: new Date(),
            link: 'test',
            category: {
              id: 1,
              name: 'test',
              grants: [],
            },
            applications: [],
          },
          user: {
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            cpr: 'test',
            email: 'test',
            isNotified: true,
            address: {
              id: 1,
              street: 'test',
              zipCode: 123456,
              city: 'test',
              users: [],
            },
            id: 0,
            applications: [],
            inquiries: [],
            notifications: [],
          },
        },
      };

      jest
        .spyOn(applicationFormService, 'update')
        .mockResolvedValue(updatedApplicationForm);

      const result = await controller.update(id, updateApplicationFormDto);

      expect(result).toEqual(updatedApplicationForm);
    });
  });

  describe('remove', () => {
    it('should remove the application form with the given id', async () => {
      const id = 1;

      jest.spyOn(applicationFormService, 'remove').mockResolvedValue();

      await controller.remove(id);

      expect(applicationFormService.remove).toHaveBeenCalledWith(id);
    });
  });
});
