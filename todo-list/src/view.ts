import {getTaskHTMLElem, Task} from './task';

export class TODOListView {
    root: HTMLUListElement | null;
    dataAttributeName: string;

    constructor(ULListElem: HTMLUListElement | null, tasks?: Task[], dataAttributeName?: string) {
        this.root = ULListElem;
        this.dataAttributeName = dataAttributeName ?? 'title';
        this.showTasks(tasks);
    }

    private showTasks(tasks?: Task[]): void {
        if (tasks) {
            tasks.forEach((task) => {
                this.push(task);
            })
        }
    }

    push(task: Task): void {
        const taskElem = getTaskHTMLElem(task);
        taskElem.setAttribute(`data-${this.dataAttributeName}`, task.title);
        this.root?.appendChild(taskElem);
    }

    remove(title: string): HTMLLIElement | null {
        const dataSelector = `[data-${this.dataAttributeName}="${title}"]`;
        const taskElemToDelete = this.root?.querySelector(dataSelector);
        taskElemToDelete?.remove();
        return taskElemToDelete as HTMLLIElement;
    }
}