import {Task} from './task.ts';

export class TaskLocalStorage {
    key: string;
    tasks: Task[];

    constructor(keyToAccess?: string, items?: Task[]) {
        this.key = keyToAccess ?? 'tasks';
        this.tasks = items ?? this.parseLocalStorage();
    }

    private parseLocalStorage(): Task[] {
        const existingTasks = localStorage.getItem(this.key);
        if (!existingTasks)
            return [];
        return JSON.parse(existingTasks);
    }

    push(task: Task): void {
        this.tasks.push(task);
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    }

    pop(title: string): void {
        // const indexOfTaskToDelete = this.tasks.findIndex((task) => {
        //     return task.title === title
        // });
        // const taskToDelete = this.tasks[indexOfTaskToDelete];
        //
        // this.tasks.splice(indexOfTaskToDelete, 1);
        this.tasks = this.tasks.filter((task) => {
            return task.title !== title;
        });
        localStorage.setItem(this.key, JSON.stringify(this.tasks));
    }
}