import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private taskIdCounter = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  addTask(name: string): Task {
    const newTask = { id: this.taskIdCounter++, name, completed: false };
    this.tasks.push(newTask);
    return newTask;
  }

  completeTask(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.tasks.unshift(task); // Move completed task to the top
    }
    return task;
  }

  removeTask(id: number): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      const [removedTask] = this.tasks.splice(taskIndex, 1);
      this.renumberTasks();
      return removedTask;
    }
    return null;
  }

  private renumberTasks() {
    this.taskIdCounter = 1;
    this.tasks.forEach((task) => {
      task.id = this.taskIdCounter++;
    });
  }
}
