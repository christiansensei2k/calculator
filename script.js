let inputA = '';
let inputB = '';
let inputOp = '';
let clearOk = false;
let opPermitted = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {

    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }

}

//select all elements with class num-button
let display = document.querySelector('.screen-container');
let equals_button = document.querySelector('#equals-button');
let clear_button = document.querySelector('#clear-button');
let num_buttons = document.querySelectorAll('.num-button');
let op_buttons = document.querySelectorAll('.op-button');

function checkDivideByZero(input, operator){
    console.log("Checking dividebyzero");
    return(input == '0' && operator == '/');
}

function clear(){
    inputA = '';
    inputB = '';
    display.textContent = '';
    inputOp = '';
}

for(num of num_buttons){
    num.addEventListener('click', (e) => {
        if(clearOk){
            display.textContent = '';
            clearOk = false;
        }
        display.textContent = display.textContent + e.target.textContent; 
        opPermitted = true;   
    })
}

for(op of op_buttons){
    op.addEventListener('click', (e) => {
        if(opPermitted){
            opPermitted = false;
            clearOk = true;
            if(inputA == ''){
                inputA = display.textContent;
            } else {
                inputB = display.textContent;
                if(checkDivideByZero(inputB, inputOp)){
                    clear();
                    display.textContent = 'ya rite';
                    clearOk = true;
                } else{
                    display.textContent = operate(Number(inputA), inputOp, Number(inputB));
                    inputA = display.textContent;
                    inputB = '';
                }
            }
            inputOp = e.target.textContent;
        }
    })

}

equals_button.addEventListener('click', () => {
    if(inputB == ''){
        inputB = display.textContent;

        if(checkDivideByZero(inputB, inputOp)){
                clear();
                display.textContent = 'ya rite';
                clearOk = true;
        } else{
            display.textContent = operate(Number(inputA), inputOp, Number(inputB));
            inputB = '';
            inputA = '';
            clearOk = true;
        }
    }
})

clear_button.addEventListener('click', () => {
   clear();
})

