import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grant } from './entities/grant.entity';
import { GrantController } from './grant.controller';
import { CategoryService } from '../category/category.service';
import { GrantService } from './grant.service';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grant, Category])],
  controllers: [GrantController],
  providers: [GrantService, CategoryService],
})
export class GrantModule {}
