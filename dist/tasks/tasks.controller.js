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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
    addTask(name) {
        const newTask = this.tasksService.addTask(name);
        this.sendTelegramMessage('Task added', newTask);
        return newTask;
    }
    completeTask(id) {
        const completedTask = this.tasksService.completeTask(+id);
        this.sendTelegramMessage('Task completed', completedTask);
        return completedTask;
    }
    removeTask(id) {
        const removedTask = this.tasksService.removeTask(+id);
        this.sendTelegramMessage('Task removed', removedTask);
        return removedTask;
    }
    async sendTelegramMessage(action, task) {
        const TELEGRAM_BOT_TOKEN = '7379732207:AAGRtQw1mBvde5kavx7cJ0Apwfe8SpsfTZ8';
        const TELEGRAM_CHAT_ID = '1116524911';
        const message = `${action}:\nTask ID: ${task.id}\nTask: ${task.name}\nStatus: ${task.completed ? 'Completed' : 'Pending'}`;
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const formData = new URLSearchParams();
        formData.append('chat_id', TELEGRAM_CHAT_ID);
        formData.append('text', message);
        try {
            await fetch(url, {
                method: 'POST',
                body: formData,
            });
        }
        catch (error) {
            console.error('Error sending message to Telegram:', error);
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "addTask", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "completeTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "removeTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map