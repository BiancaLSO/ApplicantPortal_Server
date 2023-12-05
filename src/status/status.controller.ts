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
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create_status(@Req() req, @Body() body) {
    return this.statusService.create_status(body);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @Delete(':id')
  remove_status(@Param('id') id: string) {
    return this.statusService.remove_status(+id);
  }
}
