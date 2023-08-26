import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(private tasksRepository: TasksRepository) {}
    
    async getTask(filterDto: GetTaskFilterDto,  user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        
        const query = this.tasksRepository.createQueryBuilder('task')
        query.where({ user })
        if(status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%`}
            );
        }

        const tasks = await query.getMany()
        return tasks;
    }
    // createQueryBuilder(arg0: string) {
    //     throw new Error('Method not implemented.');
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({id: id})
        if(!found){
            throw new NotFoundException(`Task not found with ${id}`)
        }

        return found
    }
    
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
 
         const task = this.tasksRepository.create({
                     title,
                     description,
                     status: TaskStatus.OPEN,
                     user,
             });
 
         await this.tasksRepository.save(task)
 
         return task;
     }
 
    async deleteTask(id: string): Promise<void> {
      const result = await this.tasksRepository.delete(id)
      if(result.affected === 0) {
        throw new NotFoundException(`Task with Id ${id} not found`)
      }
    }

    async updateTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await this.tasksRepository.save(task)
        return task
    }
}
