import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [PrismaModule, TaskModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
