const resultElement = document.getElementById("result")
const firstInput = document.getElementById('input1')
const secondInput = document.getElementById('input2')

const plusBtn = document.getElementById("plus")
const minusBtn = document.getElementById("minus")
const multiplyBtn = document.getElementById("multiply")
const divideBtn = document.getElementById("divide")

// let buttons = [plusBtn, minusBtn, multiplyBtn, divideBtn]

const submitBtn = document.getElementById("submit")

const Operations = {
    Default: '+',
    Add: '+',
    Subtract: '-',
    Multiply: '*',
    Divide: '/',
};


let Operation = Operations.Default;


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

// функция
function computeNumbers(num1, num2, action) {
    // Решил сделать двумя способами
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
    const calculated = mathItUp[action](num1, num2);
    const evaluated = eval(String(num1) + action + String(num2));
    console.log(`Calculated: ${calculated}`);
    console.log(`Evaluated: ${evaluated}`);
    return calculated;
}

const numbersFractionDigits = 4;

submitBtn.onclick = function () {
    const firstNum = Number(firstInput.value);
    const secondNum = Number(secondInput.value);
    const result = computeNumbers(firstNum, secondNum, Operation);
    resultElement.textContent = result.toFixed(numbersFractionDigits);
}

// Сделал чуть больше, чем требовалось! В вёрстке еще и умножения с делением не было)
function controlDecimalPlaces(e) {
    const input = e.target
    if (input.value.indexOf(".") !== Number('-1')) {
        input.value = input.value.substring(0, input.value.indexOf(".") + numbersFractionDigits);
    }
}

firstInput.oninput = controlDecimalPlaces
secondInput.oninput = controlDecimalPlaces
