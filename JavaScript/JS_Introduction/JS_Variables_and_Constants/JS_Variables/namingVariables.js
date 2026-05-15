//VALID: must star with a small letter, "_" or "$"
let name = "Craig";
let _name = "Messi";
let $name = "Assange";
console.log(name, _name, $name); //Craig Messi Assange



//CASE SENSITIVITY: Variable names are case-sensitive so age and Age are different
let age = 23;
let Age = 24;
let AGE = 35;
console.log(age, Age, AGE); // 23 24 35

//CAMELCASE: first words is in small caps and the next in large caps
let myAge = 32;
let myFirstName = "Felix";
console.log(myAge, myFirstName); // 32 Felix

//INVALID: Variable names cannot be keywords
//let new = 5; 
//console.log(new); // "new" is a keyword so it cannot be used


//INVALID: variables cannot start with numbers
//let 4name = "Django";
//console.log(4name); //  4ame starts with a number, this is invalid and will give an error message 