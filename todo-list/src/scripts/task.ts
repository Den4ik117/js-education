export interface Task {
    title: string;
}

function createTaskTitleHTMLElem(title: string) {
    const titleHTML: HTMLSpanElement = document.createElement('span');
    titleHTML.textContent = title;
    return titleHTML;
}

function createTaskButtonHTMLElem(taskTitle: string): HTMLButtonElement {
    const btnEl: HTMLButtonElement = document.createElement('button');
    const btnClassNames = ['btn', 'btn-danger'];
    btnEl.className = btnClassNames.join(' ');
    btnEl.textContent = 'X';
    btnEl.setAttribute('data-task-title', taskTitle);

    return btnEl;
}

function createTaskLIHTMLElem(title: HTMLSpanElement, btn: HTMLButtonElement): HTMLLIElement {
    const liHTML: HTMLLIElement = document.createElement('li');
    const liClassNames = ['list-group-item', 'd-flex', 'align-items-center', 'justify-content-between', 'mb-2',
        'border', 'rounded'];
    liHTML.className = liClassNames.join(' ');
    liHTML.appendChild(title);
    liHTML.appendChild(btn);

    return liHTML;
}

export function getTaskHTMLElem(task: Task): HTMLLIElement {
    const titleHTML = createTaskTitleHTMLElem(task.title);
    const btnHTML = createTaskButtonHTMLElem(task.title);

    return createTaskLIHTMLElem(titleHTML, btnHTML);
}