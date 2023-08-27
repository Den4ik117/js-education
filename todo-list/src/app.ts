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
        this.items = items ? items : [];
        this.tasksElem = tasksElem;
    }

    push(task: Task): void {
        this.items.push(task);
        const taskHTMLEl = getTaskHTML(task);
        tasksElem.appendChild(taskHTMLEl);
        // tasksElem.insertAdjacentHTML('beforeend', getTaskHTMLElement(task));
    }

    pop(): Task | undefined {
        return this.items.pop();
    }
}

const tasks = new TODOList();

buttonElem.addEventListener('click', () => {
    const title = inputElem.value;
    if (!title)
        return;
    const newTask: Task = {
        title: title
    }
    tasks.push(newTask);
})

