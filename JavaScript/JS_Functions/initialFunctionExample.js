//Initial Function Example
//A function is an independant block of code that performs a specific task

//simply creating a function
function greet(){
  console.log("Helo World🫡👋🏼")
} 

//A Function Expression
//creating a box (a variable) called names and storing a function therein

let names = function() {
  console.log("Emmanuel Mwesigwa Kwezi🫡");
}


//calling the greet() function
greet();
//calling the myNames() function
names();

//This is outside the function
console.log("Outside the function");

