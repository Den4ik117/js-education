import {getTaskHTMLElem, Task} from './task.ts';

export class TODOListView {
    root: HTMLUListElement | null;
    modalWindow: HTMLDivElement | null;
    dataAttributeName: string;

    constructor(ULListElem: HTMLUListElement | null,
                popupWindow: HTMLDivElement | null,
                tasks?: Set<Task>,
                dataAttributeName: string = 'title') {
        this.root = ULListElem;
        this.modalWindow = popupWindow;
        this.dataAttributeName = dataAttributeName;
        this.init(tasks);
    }

    private init(tasks?: Set<Task>): void {
        this.showTasks(tasks);
        this.registerModalClosing();
    }

    private showTasks(tasks?: Set<Task>): void {
        if (!tasks)
            return;
        tasks.forEach((task) => {
            this.push(task);
        })
    }

    private registerModalClosing(): void {
        window.addEventListener('click', (e) => {
            if (e.target === this.modalWindow)
                this.closeModalWindow();
        });

        const successButton = this.modalWindow?.querySelector('#modal-close-btn');
        if (!successButton)
            return
        successButton.addEventListener('click', () => {
           this.closeModalWindow();
        });
    }

    push(task: Task): void {
        const taskElem = getTaskHTMLElem(task);
        taskElem.setAttribute(`data-${this.dataAttributeName}`, task.title);
        this.root?.prepend(taskElem);
    }

    remove(title: string): void {
        const dataSelector = `[data-${this.dataAttributeName}="${title}"]`;
        const taskElemsToDelete = this.root?.querySelectorAll(dataSelector);
        taskElemsToDelete?.forEach((taskElem) => {
            taskElem.remove();
        });
        this.showModalWindow();
    }

    private showModalWindow(): void {
        this.modalWindow?.classList.remove('d-none');
        this.modalWindow?.classList.add('d-block');
    }

    private closeModalWindow(): void {
        this.modalWindow?.classList.remove('d-block');
        this.modalWindow?.classList.add('d-none');
    }
}