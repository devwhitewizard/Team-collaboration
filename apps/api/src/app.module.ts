import { Module } from '@nestjs/common';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UpdatesModule } from './modules/updates/updates.module';

@Module({
  imports: [
    OrganizationsModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    UpdatesModule,
  ],
})
export class AppModule {}
