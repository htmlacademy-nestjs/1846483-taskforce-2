import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig, RABBITMQ_SERVICE_TASKS } from '../../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, CategoryService],
  imports: [
    TaskModule,
    PrismaModule,
    CategoryModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_TASKS,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ]
})
export class TaskModule {}
