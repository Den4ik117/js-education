import {Task} from './task';
import {TODOListView} from './view';
import {TaskLocalStorage} from './storage';

const inputElem: HTMLInputElement | null = document.querySelector('#input');
const buttonElem: HTMLButtonElement | null = document.querySelector('#button');
buttonElem?.addEventListener('click', () => {
    const title = inputElem?.value;
    if (!title)
        return;
    const newTask: Task = {
        title: title
    };
    toDoList.push(newTask);
})


const tasksElem: HTMLUListElement | null = document.querySelector('#tasks');

class TODOList {
    tasks: Task[];

    constructor(public itemsView: TODOListView,
                public localStorage: TaskLocalStorage,
                items?: Task[]) {
        this.tasks = items ?? [];
        this._init();
    }

    private _init(): void {
        this._addTaskDeleteListener();
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

    private _addTaskDeleteListener(): void {
        this.itemsView.root?.addEventListener('click', (event) => {
            const clickedTarget = event.target;
            if (!(clickedTarget instanceof HTMLButtonElement))
                return
            //TODO: Не лучший способ искать рядом лежащий span, но лучше не знаю
            const taskTitle = clickedTarget.previousElementSibling?.textContent;
            if (taskTitle) {
                this.remove(taskTitle);
            }
        });
    }
}

const taskLocalStorage = new TaskLocalStorage('tasks');
const toDoListView = new TODOListView(tasksElem, taskLocalStorage.tasks);
const toDoList = new TODOList(toDoListView, taskLocalStorage);
