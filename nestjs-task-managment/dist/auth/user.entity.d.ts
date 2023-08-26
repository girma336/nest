import { Task } from "src/tasks/task.entity";
export declare class User {
    id: string;
    email: string;
    password: string;
    tasks: Task[];
}
