import { TaskStatus } from "../task-status.enum";
import  { IsEnum } from 'class-validator'
export class UdpateTaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}