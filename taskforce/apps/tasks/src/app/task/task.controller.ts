import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTag, Route, TaskStatus } from '@taskforce/shared-types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskRdo } from './rdo/task.rdo';

@ApiTags(ApiTag.Tasks)
@Controller(Route.Tasks)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({
    type: CreateTaskDto,
    status: HttpStatus.CREATED,
  })
  @Post(Route.Task)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(Route.MyTasks)
  getMyTasks(@Param('taskStatus') taskStatus: TaskStatus, @Body() userId: string) {
    return this.taskService.getMyTasks(userId, taskStatus);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}