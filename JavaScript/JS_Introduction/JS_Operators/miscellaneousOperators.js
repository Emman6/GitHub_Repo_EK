/*
Miscellaneous Operators:
, Comma evaluates multiple values and returns the value of the last one
?: Ternary returns value based on condition
typeof returns the data type of the variable
instance of returns true if the object is an instance of the class
void discards any expression's return value
*/

// , Comma evaluates multiple values and returns the value of the last one
let a = (2, 5, 8, 19)
console.log("Comma Operand a = (2, 5, 8, 19); ,a is", a,);

// ?: Ternary returns value based on condition
let b = 75;
let c = (b >= 50) ? "Pass" : "Fail";
console.log("Ternary Operand ((condition) ? If true ; If False: b is 75 is a" ,c);

// typeof returns the data type of the variable
let d = "This is a string"
console.log("Typeof Operand: type of data in d is", typeof d);

// instance of returns true if the object is an instance of the class
let kiteColors = ["blue", "green", "yellow"];

// Check if kiteColors is an instance of the Array class
console.log("kiteColors instanceof Array", kiteColors instanceof Array); // Output: true
console.log("kiteColors instanceof Object", kiteColors instanceof Object); // Output: true

// void discards any expression's return value
let e = "Discard this"
console.log("Void Operand: void e is", void e);

