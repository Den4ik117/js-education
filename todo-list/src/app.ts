import {Task, getTaskHTML} from './task';

const inputElem : HTMLInputElement | null = document.querySelector('#input');
const buttonElem: HTMLButtonElement | null = document.querySelector('#button');
const tasksElem: HTMLUListElement | null = document.querySelector('#tasks');

interface List<T> {
    items: T[];

    push(item: T): void;

    pop(): T | undefined;
}

class TODOList implements List<Task> {
    items: Task[];
    tasksElem: HTMLUListElement | null;

    constructor(items?: Task[]) {
        this.items = items ?? [];
        this.tasksElem = tasksElem;
    }

    push(task: Task): void {
        this.items.push(task);
        // const taskHTMLEl = getTaskHTML(task);
        this.rerender();
        // this.tasksElem?.appendChild(taskHTMLEl);
        localStorage.setItem('tasks', JSON.stringify(this.items));
    }

    pop(): Task | undefined {
        this.items.pop();

        this.rerender();

        localStorage.setItem('tasks', JSON.stringify(this.items));

        return undefined;
    }

    rerender(): void {
        const str = this.items.map((item) => {
            return `
                <li class="list-group-item d-flex align-items-center justify-content-between mb-2 border rounded">
                    <span>${item.title}</span>
                    <button class="btn btn-danger button" data-title="${item.title}">Удалить</button>
                </li>
            `
        }).join('');

        if (this.tasksElem) {
            this.tasksElem.innerHTML = str;
        }
    }

    receiveStorageTasks(): void {
        const rawStorageTasks = localStorage.getItem('tasks');
        const storageTasks = rawStorageTasks ? JSON.parse(rawStorageTasks) as Task[] : [];
        // console.log(storageTasks);
        this.items = storageTasks;
        this.rerender();
        // storageTasks.slice().reverse().forEach((task) => {
        //    this.push(task);
        // });
    }
}

const toDoList = new TODOList();

tasksElem?.addEventListener('click', (event) => {
    const element = event.target.closest('.button');

    if (element) {
        const { title } = element.dataset;

        console.log(title);

        // TODO найти с таким названием, удалить

        toDoList.rerender();
    }
})

buttonElem?.addEventListener('click', () => {
    const title = inputElem?.value;
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
