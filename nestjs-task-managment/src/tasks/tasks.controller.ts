import { Body, Controller, Delete, Get, Param, Post, Patch, Query, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UdpateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getTask(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User {user.username} retrieving all tasks, Filters: ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTask(filterDto, user)
    }

    @Get(':id')
    getTaskById(@Param('id') id:string): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    creatTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user)
    }
  
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id)
    }

    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body() udpateTaskDto: UdpateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(id, udpateTaskDto.status)
    }
}
