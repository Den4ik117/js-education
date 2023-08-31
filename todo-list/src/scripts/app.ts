import {Task} from './task.ts';
import {TODOListView} from './view.ts';
import {TaskLocalStorage} from './storage.ts';

const inputElem: HTMLInputElement | null = document.querySelector('#input');
const tasksElem: HTMLUListElement | null = document.querySelector('#tasks');
const modalWindowElem: HTMLDivElement | null = document.querySelector('#modal');
const buttonElem: HTMLButtonElement | null = document.querySelector('#button');


class TODOList {
    tasks: Set<Task>;

    constructor(public itemsView: TODOListView, public localStorage: TaskLocalStorage) {
        this.tasks = localStorage.tasks;
        this.init();
    }

    private init(): void {
        this.addAddingTaskByPressingEnter(inputElem);
        this.addAddingTaskByClickingButton(buttonElem, inputElem);
        this.addTaskDeleteListener();
    }

    add(task: Task): void {
        this.tasks.add(task);
        this.itemsView.add(task);
        this.localStorage.addTask(task);
    }

    remove(title: string): void {
        this.itemsView.deleteTask(title);
        this.localStorage.deleteTask(title);
        this.tasks.forEach((task) => {
            if (task.title === title)
                this.tasks.delete(task);
        });
    }

    private isInputEmpty(input: HTMLInputElement): boolean {
        return input.value === '' || input.value === null || input.value === undefined;
    }

    private isTaskAlreadyExists(task: Task): boolean {
        let isTaskExists = false;
        this.tasks.forEach((t) => {
            if (t.title === task.title) {
                isTaskExists = true;
                return;
            }
        });
        return isTaskExists;
    }

    private addAddingTaskByPressingEnter(source: HTMLInputElement | null): void {
        if (!source)
            return;
        source.addEventListener('keypress', (e) => {
            if (e.key !== 'Enter')
                return;
            const newTask: Task = {title: source.value};
            if (this.isInputEmpty(source) || this.isTaskAlreadyExists(newTask))
                return;
            this.add(newTask);
            source.value = '';
        });
    }

    private addAddingTaskByClickingButton(button: HTMLButtonElement | null,
                                          source: HTMLInputElement | null): void {
        if (!button || !source)
            return
        button.addEventListener('click', () => {
            const newTask: Task = {title: source.value};
            if (this.isInputEmpty(source) || this.isTaskAlreadyExists(newTask))
                return;
            this.add(newTask);
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
