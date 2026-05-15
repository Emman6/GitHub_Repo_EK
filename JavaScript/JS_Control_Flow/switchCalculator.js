// Take user input for two numbers
let num1 = Number(prompt("Enter the value of the first number: "));
let num2 = Number(prompt("Enter the value of the second number: "));

// Take user input to select an operator
const operator = prompt("Enter an operator (+, -, * or /): ");

// Declare result before using it in the switch
let result;

switch (operator) {
  case "+":
    result = num1 + num2;
    alert(`${num1} + ${num2} is ${result}`);
    break;

  case "-":
    result = num1 - num2;
    alert(`${num1} - ${num2} is ${result}`);
    break;

  case "/":
    // Optional: Add a check for division by zero
    if (num2 !== 0) {
      result = num1 / num2;
      alert(`${num1} / ${num2} is ${result}`);
    } else {
      alert("Error: Division by zero is not allowed.");
    }
    break;

  case "*":
    result = num1 * num2;
    alert(`${num1} * ${num2} is ${result}`);
    break;

  default:
    alert("Invalid Operator");
}