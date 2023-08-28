import {Task} from './task';

export class TaskLocalStorage {
    key: string;
    tasks: Task[];

    constructor(keyToAccess?: string, items?: Task[]) {
        this.key = keyToAccess ?? 'tasks';
        this.tasks = items ?? this._parseLocalStorage();
    }

    _parseLocalStorage(): Task[] {
        const existingTasks = localStorage.getItem(this.key);
        if (!existingTasks)
            return [];
        return JSON.parse(existingTasks);
    }

    push(task: Task): void {
        this.tasks.push(task);
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    }

    pop(title: string): Task {
        const indexOfTaskToDelete = this.tasks.findIndex((task) => {
            return task.title === title
        });
        const taskToDelete = this.tasks[indexOfTaskToDelete];

        this.tasks.splice(indexOfTaskToDelete, 1);
        localStorage.setItem(this.key, JSON.stringify(this.tasks));

        return taskToDelete;
    }
}