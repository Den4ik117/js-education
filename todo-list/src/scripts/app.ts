import {Task} from './task.ts';
import {TODOListView} from './view.ts';
import {TaskLocalStorage} from './storage.ts';

const inputElem: HTMLInputElement | null = document.querySelector('#input');
const tasksElem: HTMLUListElement | null = document.querySelector('#tasks');
const modalWindowElem: HTMLDivElement | null = document.querySelector('#modal');
const buttonElem: HTMLButtonElement | null = document.querySelector('#button');


class TODOList {
    tasks: Task[];

    constructor(public itemsView: TODOListView,
                public localStorage: TaskLocalStorage,
                items?: Task[]) {
        this.tasks = items ?? [];
        this._init();
    }

    private _init(): void {
        this.addTaskAddingListener();
        this.addTaskDeleteListener();
    }

    push(task: Task): void {
        this.tasks.push(task);
        this.itemsView.push(task);
        this.localStorage.push(task);
    }

    remove(title: string): Task | undefined {
        this.itemsView.remove(title);
        this.localStorage.pop(title);
        return this.tasks.find((task) => {
            return task.title === title
        });
    }

    private addTaskAddingListener() {
        buttonElem?.addEventListener('click', () => {
            const title = inputElem?.value;
            if (!title)
                return;
            const newTask: Task = {
                title: title
            };
            this.push(newTask);
        })
    }

    private addTaskDeleteListener(): void {
        this.itemsView.root?.addEventListener('click', (event) => {
            const clickedTarget = event.target;
            if (!(clickedTarget instanceof HTMLButtonElement))
                return
            const taskTitle = clickedTarget.getAttribute('data-task-title');
            if (!taskTitle)
                return;
            this.remove(taskTitle);
        });
    }
}

const taskLocalStorage = new TaskLocalStorage('tasks');
const toDoListView = new TODOListView(tasksElem, modalWindowElem, taskLocalStorage.tasks);
new TODOList(toDoListView, taskLocalStorage);
