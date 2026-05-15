/* 
Implicit Conversion:
JavaScript automatically performs conversion.
+ is used to convert to a numeric to a string when used after it
*/

//Converting a number to a string
let result;

result = "3" + 2;
console.log(result, "-", typeof(result));

result = "3" + true;
console.log(result, "-", typeof(result));

result = "3" + null;
console.log(result, "-", typeof(result));