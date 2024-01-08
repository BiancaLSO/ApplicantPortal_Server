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
import { CategoryService } from '../category/category.service';
import { GrantService } from './grant.service';
import { GrantDto } from './dto/grant.dto';

@Controller('grant')
export class GrantController {
  constructor(
    private readonly grantService: GrantService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(@Req() req, @Body() body) {
    const grantDto = new GrantDto(
      body.title,
      body.start_date,
      body.end_date,
      body.link,
    );

    const category = await this.categoryService.findOne(body.categoryId);

    grantDto.category = category;

    return this.grantService.create_grant(grantDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.grantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grantService.findOne(+id);
  }

  @Delete(':id')
  remove_grant(@Param('id') id: string) {
    return this.grantService.remove_grant(+id);
  }
}
