import { Category } from '../../entities/category.entity';

export class GrantDto {
  category: Category;

  constructor(
    public title: string,
    public start_date: Date,
    public end_date: Date,
    public link: string,
  ) {}
}
