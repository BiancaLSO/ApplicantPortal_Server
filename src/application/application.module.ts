import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

// import { ActivityModule } from '../activity/activity.module';
// import { GrantModule } from '../grant/grant.module';
// import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    // ActivityModule,
    // GrantModule,
    // UserModule,
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}
