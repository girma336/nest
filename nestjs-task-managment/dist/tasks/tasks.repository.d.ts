import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
export declare class TasksRepository extends Repository<Task> {
    private dataSource;
    constructor(dataSource: DataSource);
    getTask(filterDto: GetTaskFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
