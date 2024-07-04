"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 1;
    }
    getAllTasks() {
        return this.tasks;
    }
    addTask(name) {
        const newTask = { id: this.taskIdCounter++, name, completed: false };
        this.tasks.push(newTask);
        return newTask;
    }
    completeTask(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.completed = true;
            this.tasks = this.tasks.filter((t) => t.id !== id);
            this.tasks.unshift(task);
        }
        return task;
    }
    removeTask(id) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex > -1) {
            const [removedTask] = this.tasks.splice(taskIndex, 1);
            this.renumberTasks();
            return removedTask;
        }
        return null;
    }
    renumberTasks() {
        this.taskIdCounter = 1;
        this.tasks.forEach((task) => {
            task.id = this.taskIdCounter++;
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map