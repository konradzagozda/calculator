/// math functions


function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

function operate(a, b, operator){
  switch(operator)
  {
    case '+':
      return add(a, b);
      break;
    case '-':
      return subtract(a, b);
      break;
    case '*':
      return multiply(a, b);
      break;
    case '/':
      return divide(a, b);
      break;
  }
}

let display = {
  obj: document.querySelector('#display textarea'),
  info: document.querySelector('#info'),
  operator1: '',
  operand1: '',
  operator2: '',
  evaluated: undefined
}

/// dom related functions:

function updateDisplay(){
  display.obj.value = display.operator1 + ' ' + display.operand1 + ' ' + display.operator2;
  display.info.innerHTML = '';
}

function clickDigit(e){
    if (display.evaluated !== undefined) return;
    if (display.operand1 === ''){
        display.operator1 += e.target.value;
    } else {
      display.operator2 += e.target.value
    }
    updateDisplay();
}

function clickOperator(e){
    if (display.operator1 === ''){
      display.info.innerHTML = 'Put some numbers first.';
      return;
    }
    if (display.operand1 === '') {
      display.operand1 = e.target.value;
    } else {
      display.operand2 = e.target.value;
    }
    updateDisplay();
}

function evaluate(){
  if (display.operator2 !== '' ){
    if (display.evaluated === undefined){
    display.evaluated = operate(+display.operator1, +display.operator2, display.operand1);
    display.obj.value += '\n' + ' = ' + display.evaluated;
  }
  } else {
    display.info.innerHTML = 'use atleast 2 number, and an operand';
  }
}

function clear(){
  display = {
    obj: document.querySelector('#display textarea'),
    info: document.querySelector('#info'),
    operator1: '',
    operand1: '',
    operator2: '',
    evaluated: undefined
  }
  updateDisplay();
}


////////// variables and eventListener /////////


let buttons = document.querySelectorAll(`.container > button[name="digit"]`);
buttons.forEach(element => element.addEventListener('click', clickDigit));

let operators = document.querySelectorAll('.container > button[name="operator"]');
operators.forEach(element => element.addEventListener('click', clickOperator));

let equal = document.querySelector('.container > button[name="equal"]');
equal.addEventListener('click', evaluate);

let clearButton = document.querySelector('.container > button[name="clear"]');
clearButton.addEventListener('click', clear);
