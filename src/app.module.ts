import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationNotificationsModule } from './app_notifications/app_notifications.module';
import { ApplicationPermissionsModule } from './app_permissions/app_permissions.module';
import { ApplicationRolePermissionsModule } from './app_role_permissions/app_role_permissions.module';
import { ApplicationRolesModule } from './app_roles/app_roles.module';
import { ApplicationUserCustomPermissionsModule } from './app_user_custom_permissions/app_user_custom_permissions.module';
import { ApplicationUserRolesModule } from './app_user_roles/app_user_roles.module';
import { ApplicationUsersModule } from './app_users/app_users.module';
import { AuthModule } from './auth/auth.module';
import { dbConfigService } from './common/config';
import { HttpErrorFilter } from './common/filters';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './common/interceptors';
import { ReplaceAuthorizationHeaderFromCookie } from './common/middlewares';
import { EmailOtpModule } from './common/services/email_services.module';
import { DataReposModule } from './data_repos/data_repos.module';
import { FilesCloudinaryModule } from './files-cloudinary/files-cloudinary.module';
import { MasterAudioLibrariesModule } from './master_audio_libraries/master_audio_libraries.module';
import { MasterBookLibrariesModule } from './master_book_libraries/master_book_libraries.module';
import { MasterCitiesModule } from './master_cities/master_cities.module';
import { MasterCompanyTypesModule } from './master_company_types/master_company_types.module';
import { MasterConnectChannelsModule } from './master_connect_channels/master_connect_channels.module';
import { MasterContactTypesModule } from './master_contact_types/master_contact_types.module';
import { MasterCountiesModule } from './master_counties/master_counties.module';
import { MasterCountriesModule } from './master_countries/master_countries.module';
import { MasterPhotoLibrariesModule } from './master_photo_libraries/master_photo_libraries.module';
import { MasterStatesModule } from './master_states/master_states.module';
import { MasterTagCategoriesModule } from './master_tag_categories/master_tag_categories.module';
import { MasterTagsModule } from './master_tags/master_tags.module';
import { MasterTaskStatusesModule } from './master_task_statuses/master_task_statuses.module';
import { MasterVideoLibrariesModule } from './master_video_libraries/master_video_libraries.module';
import { MasterZipCodesModule } from './master_zip_codes/master_zip_codes.module';
import { MasterZoneTypesModule } from './master_zone_types/master_zone_types.module';
import { TaskNotesModule } from './task_notes/task_notes.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamWeeklyWorkSchedulesModule } from './team_weekly_work_schedules/team_weekly_work_schedules.module';
import { VoterFriendsFamilyModule } from './voter_friends_family/voter_friends_family.module';
import { VoterTagsModule } from './voter_tags/voter_tags.module';
import { VoterZonesModule } from './voter_zones/voter_zones.module';
import { VotersModule } from './voters/voters.module';
import { WebhookDataModule } from './webhook_data/webhook_data.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ZoneAccountTeamsModule } from './zone_account_teams/zone_account_teams.module';
import { ZoneAreaByZipcodesModule } from './zone_area_by_zipcodes/zone_area_by_zipcodes.module';
import { ZoneCompaniesModule } from './zone_companies/zone_companies.module';
import { ZoneContactsModule } from './zone_contacts/zone_contacts.module';
import { ZoneTeamsModule } from './zone_teams/zone_teams.module';
import { ZonesModule } from './zones/zones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()),
    SentryModule.forRoot(),
    WebhooksModule,
    WebhookDataModule,
    AuthModule,
    FilesCloudinaryModule,
    MasterPhotoLibrariesModule,
    MasterAudioLibrariesModule,
    MasterBookLibrariesModule,
    MasterVideoLibrariesModule,
    MasterZoneTypesModule,
    MasterCompanyTypesModule,
    MasterContactTypesModule,
    MasterConnectChannelsModule,
    MasterZipCodesModule,
    MasterCitiesModule,
    MasterCountiesModule,
    MasterStatesModule,
    MasterCountriesModule,
    MasterTagCategoriesModule,
    MasterTagsModule,
    ApplicationUsersModule,
    ApplicationUserRolesModule,
    ApplicationRolesModule,
    ApplicationPermissionsModule,
    ApplicationRolePermissionsModule,
    ApplicationUserCustomPermissionsModule,
    ApplicationNotificationsModule,
    DataReposModule,
    EmailOtpModule,
    MasterTaskStatusesModule,
    TaskNotesModule,
    TasksModule,
    TeamWeeklyWorkSchedulesModule,
    VoterFriendsFamilyModule,
    VoterTagsModule,
    VoterZonesModule,
    VotersModule,
    ZoneAccountTeamsModule,
    ZoneAreaByZipcodesModule,
    ZoneCompaniesModule,
    ZoneContactsModule,
    ZoneTeamsModule,
    ZonesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useFactory: () => {
        return new SentryGlobalFilter();
      },
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReplaceAuthorizationHeaderFromCookie).forRoutes('*');
  }
}
