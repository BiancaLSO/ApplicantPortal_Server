import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationRequirements } from './entities/application-requirements.entity';
import { ApplicationRequirementsService } from './application-requirements.service';
import { ApplicationRequirementsController } from './application-requirements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationRequirements])],
  providers: [ApplicationRequirementsService],
  controllers: [ApplicationRequirementsController],
  exports: [ApplicationRequirementsService],
})
export class ApplicationRequirementsModule {}
