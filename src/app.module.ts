import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactFormModule } from './contact-form/contact-form.module';
import { AddressModule } from './address/address.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationFormModule } from './application-form/application-form.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { ActivityModule } from './activity/activity.module';
import { PdfUploadModule } from './pdf_upload/pdf_upload.module';
import { CategoryModule } from './category/category.module';
import { GrantModule } from './grant/grant.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      }),
      inject: [ConfigService],
    }),
    ContactFormModule,
    AddressModule,
    ApplicationModule,
    ApplicationFormModule,
    UserModule,
    AuthModule,
    StatusModule,
    ActivityModule,
    PdfUploadModule,
    CategoryModule,
    GrantModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
