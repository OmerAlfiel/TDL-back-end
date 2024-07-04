export interface Task {
    id: number;
    name: string;
    completed: boolean;
}
export declare class TasksService {
    private tasks;
    private taskIdCounter;
    getAllTasks(): Task[];
    addTask(name: string): Task;
    completeTask(id: number): Task;
    removeTask(id: number): Task;
    private renumberTasks;
}
