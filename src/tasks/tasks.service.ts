import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto, memberId: number): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      member: { id: memberId},
      finished: false
    });
    return this.taskRepository.save(task);
  }

  async findAll(memberId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { member: { id: memberId}}});
  }

  async findOne(id: number, memberId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, member: { id: memberId } } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, memberId: number): Promise<Task> {
    const task = await this.findOne(id, memberId);

    if (task.finished) {
      throw new ForbiddenException('Cannot edit a finalized task');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: number, memberId: number): Promise<void> {
    const task = await this.findOne(id, memberId);
    await this.taskRepository.remove(task);
  }
}
