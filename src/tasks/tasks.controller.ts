import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':memberId/:id')
  findOne(@Param('memberId') MemberId: string, @Param('id') id: string) {
    return this.tasksService.findOne(+MemberId, +id);
  }

  @Patch(':memberId/:id')
  update(@Param('memberId') memberId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+memberId, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('memberId') memberId: string, @Param('id') id: string) {
    return this.tasksService.remove(+memberId, +id);
  }
}
