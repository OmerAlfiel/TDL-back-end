import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): import("./tasks.service").Task[];
    addTask(name: string): import("./tasks.service").Task;
    completeTask(id: string): import("./tasks.service").Task;
    removeTask(id: string): import("./tasks.service").Task;
    private sendTelegramMessage;
}
