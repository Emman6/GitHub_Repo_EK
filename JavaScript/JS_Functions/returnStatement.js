/*Return a Value
We can return a value using the return statement
*/

//function to find the squaer of a number
function findSquare(num){
  //return the squaer
  return num * num;
}

//call the function and store the result
let square = findSquare(3);

console.log(`Square: ${square}`);


let newWay = function (num2){
return num2 *num2;
}
let num2 = newWay(5);

console.log(`Square is ${num2}`)


//The Return Statement Terminates the Function
//any code written after the return statement is not executed

let sample = function (){
  console.log("This is written before the return statement.")
  return "This is the Return Statement";
  console.log("This is after the return statement")
}
console.log(sample());