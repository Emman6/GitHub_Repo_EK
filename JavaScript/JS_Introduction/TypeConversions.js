//CONVERSION
console.log("CONVERSION");
console.log();

//Implicit Conversion
console.log("1. Implicit Conversion");
let result;
console.log("let result;");

result = "4" + 5;
console.log('"4" + 5');
console.log(result, '-', typeof(result));

console.log();
result = "4" + null;
console.log('"4" + null');
console.log(result, '-', typeof(result));

console.log();
result = "4" + true;
console.log('"4" + true');
console.log(result, '-', typeof(result));



console.log();

//Explcit Conversion
console.log("2. Explicit Conversion");
console.log();

result = Number("4");
console.log('Number("4")');
console.log(result, '-', typeof(result));

result = String("Four");
console.log('Number("Four")');
console.log(result, '-', typeof(result));

result = Boolean("true");
console.log('Boolean("true")');
console.log(result, '-', typeof(result));

console.log();