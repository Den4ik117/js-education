import {Task} from './task.ts';

export class TaskLocalStorage {
    key: string;
    tasks: Set<Task>;

    constructor(keyToAccess?: string, items?: Set<Task>) {
        this.key = keyToAccess ?? 'tasks';
        this.tasks = items ?? this.parseLocalStorage();
    }

    private parseLocalStorage(): Set<Task> {
        const existingTasks = localStorage.getItem(this.key);
        if (!existingTasks)
            return new Set<Task>();
        return JSON.parse(existingTasks);
    }

    push(task: Task): void {
        this.tasks.add(task);
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    }

    deleteTaskByTitle(title: string): void {
        this.tasks.forEach((task) => {
            if (task.title === title)
                this.tasks.delete(task);
        });
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    }
}