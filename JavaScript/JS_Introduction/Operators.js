//Operators
console.log('OPERATORS');
console.log('');

//Artihmetics Operators
console.log('1. ARITHMETIC OPERATORS');
let x = 5;
console.log ('let x = 5;');

//addition
console.log("Addition: x + 3 =", x + 3);
//subtraction
console.log("Subtraction: x - 2 =", x - 2);
//division
console.log("Division: x / 2 =", x / 2);
//remainder the value of the remainder after division
console.log("Remainder: x % 3 =", x % 3);
//multiplication
console.log("Multipication: x * 2 =", x * 2);
//exponentiation
console.log("Exponenets: x ** 2 =", x ** 2);
//increment adding one
console.log("Increment: ++x =", ++x );
//decrement subtracting one
console.log("Decrement: --x =", --x );

console.log('');

//Assignment Operators
console.log('2. ASSIGNMENT OPERATORS');

let a = 5;
console.log('let a = 5 (initially)');

//assignment
console.log("Assignmnent: a = ", a); 
//addition assignment
console.log("Addition Assignment:a += 2 = ", a += 2); 
//subtraction assignment
console.log("Subtraction Assignment:a -= 2 =", a -= 2); 
//multiplication assignment
console.log("Multiplication Assignment: a *= 2 =", a *= 2); 
//division assignment
console.log("Division Assignment: a /= 2 =", a /= 2); 
//remainder assignment
console.log("Remainder Assignment: a %=2 =", a %= 2); 
//exponentiation assignment
console.log("Exponentiation Assignment: a **=2 =", a **=2);

console.log('');

//Comparison Operators
console.log('3. COMPARISON OPERATORS');
const b = 4, c = 5;
console.log('const b = 4, c = 5');
console.log("Greater than:b > c is",b > c);
//equal to 
console.log("Equal to: b == c is",b == c);
//not equal to
console.log("Not equal to: b != c is",b != c);
//greater than or equal to
console.log("Greater than or equal to: b >= c is",b >= c);
//less than or equal to
console.log("Less than or equal to: b <= c is",b <= c);
// strictly (in both data tpe and value) equal to
console.log("Strictly equal to (in value and data type) : b === c is",b === c);
//stricly not equal to (checks both data type and value)
console.log("Striclty not equal to (in value and type): b !== c is",b !== c);

console.log('');

//Logical Operators
console.log('4. LOGICAL OPERATORS');
const d = 9, e = 13;
console.log('const d = 9, e = 13');
//Logical AND
console.log("Logical AND: (d < e) && (e != d) is", (d < e) && (e != d));
//Logical OR one side is true
console.log("Logical OR: (d !== e) || ( e === d) is",(d !== e) || ( e === d));
//Logical NOT is false if statement is true and vice versa
console.log("Logical NOT:!(d < e) is",!(d < e));

console.log();

//Bitwise Operators
console.log('5. BITWISE OPERATORS');
let f = 7, g = 9;
console.log('let f = 7, g = 9');
//Bitwise AND
console.log("Bitwise AND: f & g is", f & g);
//Bitwise OR
console.log("Bitwise OR: f | g is", f | g);
//Bitwise XOR
console.log("Bitwise OR: f ^ g is", f ^ g);
//Bitwise NOT simply inverts the number in binary
console.log("Bitwise NOT: f ~ g is", ~ g);
//Left shift
console.log("Left shift: f << g is", f << g);
//Sign-propagation right shift
console.log("Sign-propagation right shift: is", f >> g);
//Zero-fill right shift
console.log("Zero-fill right shift: f >>> g is", f >>> g);

console.log();

//Concatenation Operator
console.log('6. CONCATENATION OPERATORS');
let str1 = 'Emman', str2 = 'uel';
console.log("let str1 = 'Emman', str2 = 'uel'");
console.log(str1 + str2);
console.log();

//Challenge
console.log("CHALLENGE");
console.log("num1 = 3, num2 = 4");

function basicCalulator(num1, op, num2){
  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "/") return num1 / num2; 
  if (op === "**") return num1 ** num2;
}
console.log("Addition:", basicCalulator(3, "+", 4));
console.log("Subtraction:", basicCalulator(3, "-", 4));
console.log("Division:", basicCalulator(3, "/", 4));
console.log("Exponentiation:", basicCalulator(3, "**", 4));