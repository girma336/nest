import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UdpateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksController {
    private readonly tasksService;
    private logger;
    constructor(tasksService: TasksService);
    getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    creatTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTask(id: string): void;
    updateTask(id: string, udpateTaskDto: UdpateTaskDto): Promise<Task>;
}
