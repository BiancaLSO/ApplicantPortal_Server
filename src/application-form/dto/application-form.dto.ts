import { Application } from '../../application/entities/application.entity';

export class ApplicationFormDto {
  application: Application;
  project_title: string;
  experience_description: string;
  benefit_description: string;
  future_vision_description: string;
  traveler_name_and_position: string;
  purpose_description: string;
  departure_country: string;
  departure_city: string;
  destination_country: string;
  destination_city: string;
  trip_start_date: Date;
  trip_end_date: Date;
  requested_amount: number;
  overall_amount: number;
  recedency_name: string;
  project_description: string;
  project_country: string;
  recedency_start_date: Date;
  author_full: string;
  event_location: string;
  target_group: string;
  is_catalog_used: boolean;
  event_date: Date;
  municipality: string;
  recedency_end_date: Date;
  agreement_info: boolean;
  form_step: number;
}
