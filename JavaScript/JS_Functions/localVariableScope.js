//Java Script Local Variables
//These are created within functions and are only accessible from within those functions
//local variable here called message

function greet(){
var message = "Hello"
console.log(`Local: ${message}`);
}
greet();

//An attempt to access the message outside the variable:
//console.log(`Message is ${message}`); this fails
