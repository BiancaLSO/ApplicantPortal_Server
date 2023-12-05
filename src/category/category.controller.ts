import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create_category(@Req() req, @Body() body) {
    return this.categoryService.create_category(body);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Delete(':id')
  remove_category(@Param('id') id: string) {
    return this.categoryService.remove_category(+id);
  }
}
