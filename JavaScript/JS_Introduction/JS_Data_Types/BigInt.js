// A BigInt are very small (< 2^53 - 1) or very large (> -(2^53 - 1))integers beyond the regular scope of number data type (Integers < (2^53-1); -(2^53-1) < Integers ))

//BigInt is created by appending n to the end of an integer
let valueOfBigInt = 90837934693264374n;
console.log(`${valueOfBigInt} is the initial value`)

//adding two Big Integers together
let result1 = valueOfBigInt + 1n;
console.log(result1); 90837934693264375n

let value2 = `${result1}`;
console.log(`${value2} is the new value2`);

//INVALID: You cannot mix BigInt and a regular integer
let valueOfNewBigInts = 80837934693264374n;
console.log(`${valueOfNewBigInts}is a second initial value`)

//adding a Big Integers to a regular Integer
let result2 = valueOfNewBigInt + 1;
console.log(result2); 

let value3 = `${result2}`;
console.log(`${value3}is the new value2`);