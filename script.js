let user = {};

user.name = 'John';
user.surname = 'Smith';
user.name = 'Pete';

delete user.name;

console.log(user);

function isEmpty(obj) {
  let counter = 0;
  for (let x in obj) {
    counter++;
  }
  if (counter === 0) return true;
  else return false;
}

console.log(isEmpty(user));


let empty = {};

console.log(isEmpty(empty));

// sum object properties:

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

function sumSalaries(obj){
  let sum = 0;
  for (let x in obj){
    sum += obj[x];
  }
  return sum;
}

console.log(sumSalaries(salaries));

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

console.log(menu);

function multiplyNumeric(obj) {
  for (let x in obj) {
    if (typeof obj[x] === "number"){
      obj[x] *= 2;
    }
  }
}

multiplyNumeric(menu);
console.log(menu);
