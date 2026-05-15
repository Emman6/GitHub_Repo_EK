//Global Variables can be accessed both inside and outside functions
//first declare the global variable
var message = "Hi there🤔"

function greet(){
  console.log(`THis is from within the function: ${message}`);
}

greet();

console.log(`This is from outside the function: ${message}.`)


//You can change the value of a global variable from inside the function
let a = 32;

function printNum(){
  a++;
  }
  console.log(`a is ${a}, before calling the function`);
  printNum();
  console.log(`a is now ${a}, after the function has been caleed and executed`);

  //Variables without Declaration
  //When this occirs that variable automatically becomes a global variable
  function myLocation(){
    b = "In God's will";
  }
  myLocation();// inside the function
  console.log(b); //outside the function