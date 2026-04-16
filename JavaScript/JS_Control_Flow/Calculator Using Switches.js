//SIMPLE CALCULATOR


let keepCalculating = true;

console.log(`This is a simple calculator`);
//To loop the calculator so I do not have to refresh the page
while (keepCalculating){
let input = prompt(`Please enter a number or type exit to stop:`);
if (input === 'exit' || input === null ){
keepCalculating = false;
alert (`Thank you 🙂 now exiting the calculator`);
}
else {
let Number1 = Number(prompt(`Please enter your first Number`));
let Number2 = Number(prompt(`Please enter your second Number`));
let result 
const operator = prompt(`Please select the operator: either +, -, * or /`);

//Prompt to select an operator
switch(operator){
case "+":
result = Number1 + Number2;
alert (`${Number1} ${operator} ${Number2} = ${result}`)
break;

case "*":
result = Number1 * Number2;
alert (`${Number1} ${operator} ${Number2} = ${result}`)
break;

case "/":
result = Number1 / Number2;
alert (`${Number1} ${operator} ${Number2} = ${result}`)
break;

case "-":
result = Number1 - Number2;
alert (`${Number1} ${operator} ${Number2} = ${result}`)
break;

default:
  result = `Invalid Operator`;

}
}
}