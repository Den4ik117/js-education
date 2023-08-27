export interface Task {
    title: string;
}

function createTaskTitleHTML(title: string) {
    const titleHTML = document.createElement('span') as HTMLSpanElement;
    titleHTML.textContent = title;
    return titleHTML;
}

function createTaskButtonHTML(): HTMLButtonElement {
    const btnEl = document.createElement('button') as HTMLButtonElement;
    const btnClassNames = ['btn', 'btn-danger'];
    const btnClass = btnClassNames.join(' ');
    btnEl.className = btnClass;
    btnEl.textContent = 'X';

    btnEl.addEventListener('click', (event) => {
        const clickedTarget = event.currentTarget;
        if (!(clickedTarget instanceof Element))
            return;
        clickedTarget.closest('li')?.remove();
    });

    return btnEl;
}

function createTaskLIHTML(title: HTMLSpanElement, btn: HTMLButtonElement): HTMLLIElement {
    const liHTML = document.createElement('li') as HTMLLIElement;
    const liClassNames = ['list-group-item', 'd-flex', 'align-items-center', 'justify-content-between'];
    const itemClass = liClassNames.join(' ');
    liHTML.className = itemClass;
    liHTML.appendChild(title);
    liHTML.appendChild(btn);

    return liHTML;
}

export function getTaskHTML(task: Task): HTMLLIElement {
    const titleHTML = createTaskTitleHTML(task.title);
    const btnHTML = createTaskButtonHTML();

    return createTaskLIHTML(titleHTML, btnHTML);
    // return `
    //     <li class='${itemClass}'>
    //       <span>${task.title}</span>
    //       <button class='${btnClass}'>X</button>
    //     </li>`
}