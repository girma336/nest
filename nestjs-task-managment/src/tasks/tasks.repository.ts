import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager())
    }
    async getTask(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task')
        const tasks = await query.getMany()
        return tasks;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
 
         const task = this.create({
                     title,
                     description,
                     status: TaskStatus.OPEN
             });
 
         await this.save(task)
 
         return task;
     }
}
