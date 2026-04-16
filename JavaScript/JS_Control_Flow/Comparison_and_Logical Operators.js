//COMPARISON AND LOGICAL OPERATORS
console.log(`COMPARISON AND LOGICAL OPERATORS`);
console.log();

const a = 3, b=4;
console.log(`const a = 3, b=4;`);
console.log();
//1. Greater than
console.log(`1. Greater than`);
console.log(`a > b is ${a >b}`);
console.log();

//2. Less than
console.log(`2. Less than`);
console.log(`a < b is ${a < b}`);
console.log();

//3. Equal to
console.log(`3. Equal to`);
console.log(`a == b is ${a == b}`);
console.log();

//4. Not equal to
console.log(`4. Not equal to`);
console.log(`a != b is ${a != b}`);
console.log();

//5. Strictly Equal to (in data type and value)
console.log(`5. Strictly Equal to`);
console.log(`a === b is ${a === b}`);
console.log();

//6. Strictly not Equal to (in data type and value)
console.log(`6. Strictly not Equal to`);
console.log(`a !== b is ${a !== b}`);
console.log();

//7. Greater than or equal to
console.log(`7. Greater than or equal to`);
console.log(`a >= b is ${a >= b}`);
console.log();

//8. Less than or equal to
console.log(`8. Less than or equal to`);
console.log(`a <= b is ${a <= b}`);
console.log();


//LOGICAL OPERATORS
console.log(`LOGICAL OPERATORS`);
console.log();

console.log();

//1. Logical AND Operator (both arguments must be true)
const c = 3, d = 4;
console.log(`1. Logical AND Operator`);
console.log(`const c = 3, d = 4;`);
console.log(`AND Operator: (c < d) && (c !== d) is ${(c < d) && (c !== d)}`);
console.log(`AND Operator: (c <= d) && (c === d) is ${(c <= d) && (c === d)}`);
console.log();

//2. Logical OR Operator (one argument must be true)
let x = 2;
console.log(`2. Logical OR Operator`);
console.log(`let x = 2;`);
console.log(`OR Operator: (x == 2) || (x > 1) is ${(x == 2) || (x > 1)}`);
console.log(`OR Operator: (x <= 1) || (x === 2) is ${(x <= 1) || (x === 2)}`);
console.log(`OR Operator: (x == 1) || (x === 4) is ${(x == 1) || (x === 4)}`);
console.log();

//3. Logical NOT Operator
//NOT on true
console.log(`NOT on true`);
console.log(`!true is ${!true}`);
console.log();

//NOT on false
console.log(`NOT on false`);
console.log(`!false is ${!false}`);
console.log();

//comparison example (false if argument is true and vice versa)
console.log(`Comparison example`);
console.log(`!(1 === 1) is ${!(1 === 1)}`);
console.log(`!(1 === 3) is ${!(1 === 3)}`);
console.log();

//Challenge
console.log(`Challenge`);
function numGreaterThanFive(num){
if (num >= 5) return `Yes`
else return `No`
}
console.log(numGreaterThanFive(7));
console.log(numGreaterThanFive(4));
console.log(numGreaterThanFive(5));

