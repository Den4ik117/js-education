const resultElement = document.getElementById("result")
const firstInput = document.getElementById('input1')
const secondInput = document.getElementById('input2')

const plusBtn = document.getElementById("plus")
const minusBtn = document.getElementById("minus")
const multiplyBtn = document.getElementById("multiply")
const divideBtn = document.getElementById("divide")

const buttonList = document.getElementById('button-list')

// let buttons = [plusBtn, minusBtn, multiplyBtn, divideBtn]

const submitBtn = document.getElementById("submit")

const Operations = {
    Default: '+',
    Add: '+',
    Subtract: '-',
    Multiply: '*',
    Divide: '/',
};

const arr = [
    {
        operation: Operations.Add,
        element: plusBtn
    },
    {
        operation: Operations.Subtract,
        element: minusBtn,
    },
    {
        operation: Operations.Multiply,
        element: multiplyBtn,
    },
    {
        operation: Operations.Divide,
        element: divideBtn,
    }
];



let Operation = Operations.Default;

const setActiveButton = (currentButton) => {
    let oldElement = buttonList.querySelector('button.active')

    if (oldElement) {
        oldElement.classList.remove('active');
        oldElement.disabled = false;
    }

    currentButton.classList.add('active');
    currentButton.disabled = true;
};

setActiveButton(plusBtn);


arr.forEach((element) => {
    element.element.addEventListener('click', (event) => {
        Operation = element.operation;

        console.log('target', event.target)
        console.log('currect', event.currentTarget)

        setActiveButton(event.currentTarget);
    })
})

// Не придумал, как это универсальнее, компактнее организовать, чтоб в forEach'e можно было по кнопкам
// пробежаться и присвоить им то, что им надо присвоить.
plusBtn.onclick = function () {
    Operation = Operations.Add;
}

minusBtn.onclick = function () {
    Operation = Operations.Subtract;
}

multiplyBtn.onclick = function () {
    Operation = Operations.Multiply;
}

divideBtn.onclick = function () {
    Operation = Operations.Divide;
}

// Хотел добавить такую логику, чтобы при выборе операции кнопка становилась неактивной,
// для лучшего понимания пользователем, какая операция выбрана, но не придумал как. :)
// buttons.forEach((btn) => {
//    btn.onclick = function () {
//        this.disabled = true;
//    };
// });

const mathItUp = {
    '+': function (x, y) {
        return x + y
    },
    '-': function (x, y) {
        return x - y
    },
    '*': function (x, y) {
        return x * y
    },
    '/': function (x, y) {
        return x / y
    },
}

// функция
function computeNumbers(num1, num2, action) {
    // Решил сделать двумя способами


    const calculated = mathItUp[action](num1, num2);
    const evaluated = eval(String(num1) + action + String(num2));

    console.log(`Calculated: ${calculated}`);
    console.log(`Evaluated: ${evaluated}`);

    return calculated;
}

const NUMBERS_FRACTION_DIGITS = 4;

submitBtn.onclick = function () {
    const firstNum = +firstInput.value;
    const secondNum = +secondInput.value;

    const result = computeNumbers(firstNum, secondNum, Operation);

    resultElement.textContent = result.toFixed(NUMBERS_FRACTION_DIGITS);
}

// Сделал чуть больше, чем требовалось! В вёрстке еще и умножения с делением не было)
// Некоторое изменение
// Еще одно изменение
// Проверка на пуш
// Пулл реквестим
function controlDecimalPlaces(e) {
    const input = e.target
    if (input.value.indexOf(".") !== Number('-1')) {
        input.value = input.value.substring(0, input.value.indexOf(".") + NUMBERS_FRACTION_DIGITS);
    }
}

firstInput.oninput = controlDecimalPlaces
secondInput.oninput = controlDecimalPlaces
