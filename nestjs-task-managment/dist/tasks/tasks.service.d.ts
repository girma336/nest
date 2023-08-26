import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTask(id: string, status: TaskStatus): Promise<Task>;
}
