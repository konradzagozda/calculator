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
  if (b !== 0) {
    return a / b;
  } else {
    display.info.innerHTML = 'can\'t divide by zero, try again';
    clear();
  }
}

function operate(a, b, operator){
  [a, b] = [+a, +b];
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


// arr = [12345, '+', 3456, '-', 2, '*', 323];
function evaluate() {
    if (display.formula.length >= 3){
      let arr = display.formula
      let workingArr = [...arr];
      let i = 0;
      while (workingArr.indexOf('*') > -1 || workingArr.indexOf('/') > -1){
        if (workingArr[i] === '*' || workingArr[i] === '/') {
          workingArr.splice(i-1,3, operate(workingArr[i-1], workingArr[i+1], workingArr[i]))
          i -= 2;
        }
        i += 1;
      }
      i = 0
      if (workingArr.indexOf(undefined) > -1) {
        clear();
        return;
      }
      while (workingArr.indexOf('+') > -1 || workingArr.indexOf('-') > -1){
        if (workingArr[i] === '-' || workingArr[i] === '+') {
          workingArr.splice(i-1,3, operate(workingArr[i-1], workingArr[i+1], workingArr[i]))
          i -= 2;
        }
        i += 1;
      }
      display.evaluated = workingArr[0];
      updateDisplay();
      if (display.evaluated !== undefined) {
        display.formula = [display.evaluated];
        display.evaluated = undefined;
      }
    } else if (display.formula.length === 2) {
      display.info.innerHTML = 'put one more number';
    } else if (display.formula.length === 0) {
      display.info.innerHTML = 'put a number first';
    } else {
      updateDisplay();
    }

}


let display = {
  obj: document.querySelector('#display textarea'),
  info: document.querySelector('#info'),
  evaluated: undefined,
  formula: []
}

/// dom related functions:


// [12345, '+', 3456, '-', 2, '*', 323]
function updateDisplay(){
  display.obj.value = '';
  if (display.formula.length === 0) {
    return;
  }
  if (display.formula.length === 1) {
    if (display.formula[0] === undefined) {
      display.info.innerHTML = '';
      clear();
      return;
    }
    display.obj.value = display.formula[0];
    display.info.innerHTML = '';
  } else if(display.formula.length >= 2){
    for (let i = 0; i < display.formula.length; i++){
      display.obj.value += display.formula[i] + ' ';
    }
    if (display.evaluated !== undefined) {
      display.obj.value += '=' + ' ' + display.evaluated;
    }
  } else {
    display.info.innerHTML = 'use correct formula';
  }

}

function clickDigit(e){
  if(display.formula.length === 0) {
    display.formula.push(e.target.value);
  } else if (!isNaN(+display.formula[display.formula.length-1])) {
    display.formula[display.formula.length-1] += e.target.value;
  } else {
    display.formula.push(e.target.value);
  }
  updateDisplay();
}

function clickOperator(e){
  if (!isNaN(+display.formula[display.formula.length-1])){
    display.formula.push(e.target.value);
  } else if (display.formula.length > 0){
    display.formula[display.formula.length-1] = e.target.value;
  } else {
    display.info.innerHTML = 'Put some numbers first.';
  }
  updateDisplay();
}

function clear(){
  display = {
    obj: document.querySelector('#display textarea'),
    info: document.querySelector('#info'),
    evaluated: undefined,
    formula: []
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

////////
