
//VARIABLES
//declare variable num
let num;

// assign 9 to num
num = 9;

//alternatively initializing a variable during its creation
let num1 = 9;

let num2 = 11;

//declaring multiple within a single statement

let num3 = 7, num4 = 15, num5 = 9;

//changing the value of the variable from 21 to 27
//place the number 21 in a box called score
let score = 9;
console.log(21); //should output 21
//replace the contents of the score box with 27
score = 27;
console.log(27); //should output 27

//variable names must start with a letter, _ or $, never a number, and are case sensitive
let firstCry = "Do not" //camel case
let _Cry = "cry about"  //not the same as cry, because of the case
let $cry = "it" //valid because it can start with a dollar sign

console.log(firstCry, _Cry, $cry);


//CONSTANTS
//assign the variable 5 to the box num
const hut = 5000;
console.log(hut)


//CHALLENGE
let hut1, hut2;
function calculateProduct2 (hut1, hut2){
  hut1 = 7;
  hut2 = 15;
console.log(hut1*hut2);
}
calculateProduct2();

let car1, car2;
function calculateProduct(car1, car2){
  console.log(car1*car2)
}
calculateProduct(3, 7);
calculateProduct(4, 5);
calculateProduct(9, 10);