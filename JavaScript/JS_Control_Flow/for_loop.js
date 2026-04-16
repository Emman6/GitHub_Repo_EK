//FOR LOOP

console.log(`1st Example`);
for (let i = 0; i < 3; i++){
console.log (`Hello ${i}`);
}
/*
Hello 0
Hello 1
Hello 2
*/

console.log();


/*
Syntax:
for (variable; condititon to test if true; action upon the variable if condition is true){
action to take
}
*/

console.log(`2nd Example`);

//Print 1 to 9

for (t = 0; t < 9; t++){
console.log(`The number is ${t}`);
}
console.log();

//The 3rd Example
console.log(`The 3rd Example`);
let sum = 0;
const n = 100;

for (i = 2; i <= n; i+= 2){
  sum+= i;
}
console.log(`sum of even numbers: ${sum}`);
console.log();

//Counting Backwards from 10

console.log(`Counting Backwards from 10 Example`);
let f = 0;
const p = 0;

for (f = 10; f >= p; f-= 1){
  if (f> 0){
  console.log(`Counting Backwards from 10: ${f}`);
}

else console.log(`...${0}, BLAST OFF!`);
}

console.log();

//Printing every value in an array

console.log(`Printing every value in an array`);
const colors = ["red", "yellow", "black", "white"];
for (let g = 0; g < colors.length; g++){
    console.log(`The color is ${colors[g]}`);
}
console.log(`These are all the colors`);
console.log();

//Outer and Inner Loops
console.log(`3 outer loops of 2 inner loops`);

for (let h = 0; h < 3; h++){
 for (let k = 0; k < 2; k++){
  console.log(`h = ${h} whereas k = ${k}`);
 }
}
console.log(`These are all 6 loops`);
console.log();

//Omitting parts of the loop

//CHALLENGE
function factorialProduct(num) {
let result = 1;

for (let i = num; i >= 1; i--) {
  result *=i; //means result = result * i
}

return result;
}

console.log(4);
console.log(5);