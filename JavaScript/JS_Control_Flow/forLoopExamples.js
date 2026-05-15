/*for Loop:
for (initialExpression; condition; updateExpression) {
     //for loop body
}
*/
//Example 1: forLoop - print numbers 1 to 5

for (let i = 1; i < 6; i ++){
  console.log(i);
}

//Example 2: forLoop - display sum of natural numbers
let sum = 0;
const n = 100;

for (let p = 1; p <= n; p ++){
sum += p;
}

console.log(`sum: ${sum}`);

//Example 3: for Loop to iterate over elements of an Array
const modules =["Database", "Web Development", "Discreet Mathematics"];

for (let m = 0; m < modules.length; m ++){
console.log(modules[m]);
}

//Nested for Loops

for (let i = 0; i <3; i++){
  for (let j = 0; j <2; j++){
    console.log (`i = ${i}, j = ${j}`)
  }
}


//Potentially Infinite Loop
//for (let i = 0; i <=5; i++) this would run forever...
for (let k = 0; k <=5; k++){
  console.log("This could run forever!")
}

//Omitting parts of the loop
let p = 0; //initializing outside the loop
for (; p <3;){
  console.log(`p is ${p}`);
//incrementng inside the loop body
  p++;
}

