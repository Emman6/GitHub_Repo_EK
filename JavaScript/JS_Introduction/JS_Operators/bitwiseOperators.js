/* 
Bitwise Operators perform binary operations by converting decimal to binary (called operands) then performing operations on them
& AND Bitwise Operator selects 1 only if both binary numbers (operands) have 1 in their position
| OR Bitwise Operator  selects 1 only if one binary numbers (operands) have 1 in their position
~ NOT Bitwise Operator switches 1s to 0s and vice versa
^ XOR Bitwise Operator selects 1 only if both binary number (operands)are the same in their position 
<< Left Shift Bitwise Operator moves binary digits to the left and replacing it with 0
>> Right Shift Bitwise Operator moves binary digits to the right and replacing it with 1
>>> Zero Right Shift Bitwise Operator moves binary digits to the right and replacing it with 0

*/
let a = 12; //01100
let b = 25; //11001
let c = -3;
console.log(`a is ${a}, b is ${b} and c is ${c}`);
// & AND Bitwise Operator selects 1 only if both binary numbers (operands) have 1 in their position
result = a & b ;
console.log("a & b is", result);// 8 = 01000

// | OR Bitwise Operator  selects 1 only if one binary numbers (operands) have 1 in their position
result = a | b ;
console.log("a | b is", result); //25 = 11101

// ~ NOT Bitwise Operator switches 1s to 0s and vice versa
result = ~b ;
console.log("~b is", result);//6 = 00110

// ^ XOR Bitwise Operator selects 1 only if both binary number (operands)are the same in their position 
result = a ^ b ;
console.log("a ^ b is", result);// 10 = 01010

// << Left Shift Bitwise Operator moves binary digits to the left and replacing it with 0
result = a << b;
console.log("a << b is",result);

// >> Right Shift Bitwise Operator moves binary digits to the right and replacing it with 1
result = a >> b;
console.log("a >> b is", result);

// >>> Zero Right Shift Bitwise Operator moves binary digits to the right and replacing it with 0
result = a >>> b ;
console.log("a >>> b is", result);