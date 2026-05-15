/* Logical Operators:
They are used to perform logical operations on Boolean (True or False) expressions
&& AND True only if both side of the expression are True
|| OR True if only one side of the expression is true
! NOT True if the single-sided expression is False and vice versa
*/
let k = 9;
// && AND True only if both side of the expression are True
console.log("AND &&: (k === 9) && (k < 10) is", (k === 9) && (k < 10));//True
console.log("AND &&: (k > 8) && (k === 8) is", (k > 8) && (k === 8));//False

// || OR True if only one side of the expression is true
console.log("OR ||: (k !== 19) || ( k < 4) is", (k !== 19) || ( k < 4));//True
console.log("OR ||: (k < 15) || (k > 7) is",(k < 15) || (k > 7));//True
console.log("OR ||:(k > 11) || (k === '9') is",(k > 11) || (k === '9'));//False

// ! NOT True if the single-sided expression is False and vice versa
console.log("NOT !: !(k > 17) is", !(k > 17));//True
console.log("NOT !: !(k === 9) is", !(k === 9));//False
