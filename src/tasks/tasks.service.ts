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

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      finished: false
    });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(memberId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, member: { id: memberId } } });
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  async update(memberId: number, id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id, memberId);

    if (task.finished) {
      throw new ForbiddenException('Não é possível editar uma tarefa finalizada');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(memberId: number, id: number): Promise<void> {
    const task = await this.findOne(memberId, id);
    await this.taskRepository.remove(task);
  }
}
