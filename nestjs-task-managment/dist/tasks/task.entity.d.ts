import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
}
