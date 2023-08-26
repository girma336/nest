"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("./task-status.enum");
const tasks_repository_1 = require("./tasks.repository");
let TasksService = exports.TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async getTask(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.tasksRepository.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async getTaskById(id) {
        const found = await this.tasksRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Task not found with ${id}`);
        }
        return found;
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            status: task_status_enum_1.TaskStatus.OPEN,
            user,
        });
        await this.tasksRepository.save(task);
        return task;
    }
    async deleteTask(id) {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with Id ${id} not found`);
        }
    }
    async updateTask(id, status) {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
};
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_repository_1.TasksRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map