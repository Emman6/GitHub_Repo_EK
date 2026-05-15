/*Variable Hoisting
*/

//Hoisting with VAr leads to undefined because the variable's value is not hoisted, just its declaration
console.log(message); //using the variable message before it is declared
var message = "Hello🫡"; // declaring the variable message
//Output is undefined because the value is not taken - just the initialization

//Hoisting with "Let" and "Const"  these are not hoisted but do not have a default value

console.log(animal);// animal is usd before declaration
let animal = "pig"; //the declaration of animal is given the value of pig
