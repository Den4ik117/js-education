import {Task, getTaskHTML} from "./task.ts";

const inputElem = document.querySelector('#input') as HTMLInputElement;
const buttonElem = document.querySelector('#button') as HTMLButtonElement;
const tasksElem = document.querySelector('#tasks') as HTMLUListElement;


interface List<T> {
    items: T[];

    push(item: T): void;

    pop(): T | undefined;
}

class TODOList implements List<Task> {
    items: Task[];
    tasksElem: HTMLUListElement;

    constructor(items?: Task[]) {
        this.items = items ?? [];
        this.tasksElem = tasksElem;
    }


    push(task: Task): void {
        this.items.push(task);
        const taskHTMLEl = getTaskHTML(task);
        this.tasksElem.appendChild(taskHTMLEl);
        localStorage.setItem('tasks', JSON.stringify(this.items));
    }

    pop(): Task | undefined {
        return this.items.pop();
    }

    receiveStorageTasks(): void {
        const rawStorageTasks = localStorage.getItem('tasks');
        const storageTasks = rawStorageTasks ? JSON.parse(rawStorageTasks) as Task[] : [];
        storageTasks.slice().reverse().forEach((task) => {
           this.push(task);
        });
    }
}

const toDoList = new TODOList();

buttonElem.addEventListener('click', () => {
    const title = inputElem.value;
    if (!title)
        return;
    const newTask: Task = {
        title: title
    }
    toDoList.push(newTask);
})

window.addEventListener('load', () => {
   toDoList.receiveStorageTasks();
});
