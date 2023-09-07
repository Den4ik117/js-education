export interface Task {
    title: string;
}

function createTaskTitleHTMLElem(title: string, classNames?: string[]) {
    const titleElem = document.createElement('span');
    if (!classNames)
        classNames = []
    titleElem.textContent = title;
    titleElem.className = classNames.join();
    return titleElem;
}

function createTaskButtonHTMLElem(taskTitle: string, classNames?: string[], textContent: string = 'X'): HTMLButtonElement {
    const btnEl = document.createElement('button');
    if (!classNames)
        classNames = ['btn', 'btn-danger'];
    btnEl.className = classNames.join(' ');
    btnEl.textContent = textContent;
    btnEl.setAttribute('data-task-title', taskTitle);
    return btnEl;
}

function createTaskLIHTMLElem(title: HTMLSpanElement, btn: HTMLButtonElement, classNames?: string[]): HTMLLIElement {
    const liElem = document.createElement('li');
    if (!classNames)
        classNames = ['list-group-item', 'd-flex', 'align-items-center',
            'justify-content-between', 'mb-2', 'border', 'rounded'];
    liElem.className = classNames.join(' ');
    liElem.appendChild(title);
    liElem.appendChild(btn);
    return liElem;
}

export function getTaskHTMLElem(task: Task): HTMLLIElement {
    const titleElem = createTaskTitleHTMLElem(task.title);
    const btnElem = createTaskButtonHTMLElem(task.title);
    return createTaskLIHTMLElem(titleElem, btnElem);
}