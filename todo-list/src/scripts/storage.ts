import {Task} from './task.ts';

export class TaskLocalStorage {
    key: string;
    tasks: Set<Task>;

    constructor(keyToAccess?: string) {
        this.key = keyToAccess ?? 'tasks';
        this.tasks = this.parse();
    }

    private parse(): Set<Task> {
        const existingTasks = localStorage.getItem(this.key);
        if (!existingTasks)
            return new Set<Task>();
        return new Set<Task>(JSON.parse(existingTasks));
    }

    addTask(task: Task): void {
        this.tasks.add(task);
        this.update();
    }

    deleteTask(title: string): void {
        this.tasks.forEach((task) => {
            if (task.title === title)
                this.tasks.delete(task);
        });
        this.update();
    }

    private update(): void {
        const value = JSON.stringify([...this.tasks]);
        localStorage.setItem(this.key, value);
    }
}