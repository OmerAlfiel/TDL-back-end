import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  addTask(@Body('name') name: string) {
    const newTask = this.tasksService.addTask(name);
    this.sendTelegramMessage('Task added', newTask);
    return newTask;
  }

  @Patch(':id/complete')
  completeTask(@Param('id') id: string) {
    const completedTask = this.tasksService.completeTask(+id);
    this.sendTelegramMessage('Task completed', completedTask);
    return completedTask;
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    const removedTask = this.tasksService.removeTask(+id);
    this.sendTelegramMessage('Task removed', removedTask);
    return removedTask;
  }

  private async sendTelegramMessage(action: string, task) {
    const TELEGRAM_BOT_TOKEN = 'TELEGRAM_BOT_TOKEN';
    const TELEGRAM_CHAT_ID = 'TELEGRAM_CHAT_ID';
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
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
    }
  }
}
