/*
Nested If Els Statement:
if (condition 1){
if (condition 2){
body if condition 1 and 2 are true
}
else {
  body if condition 2 is false
  }
}

else {
  body if condition 1 is false
  }
*/

// I am using prompt to get data from the user and storing it in the 'age' variable
let age = prompt("Please input your age😀: ");

// FIRST LEVEL: I check the broad category first. Is the person 25 or older?
if (age >= 25) {
    
    // SECOND LEVEL (Nested): Since they are 25+, I now check if they fall in a specific range.
    // I use the logical AND (&&) to ensure the age is BOTH 26 or more AND 50 or less.
    if (age <= 50 && age >= 26) {
        alert("You are middle aged🧑🏼‍🦰");
    } 
    // If they are 25 or older, but NOT between 26-50, they must be 51 or older (or exactly 25).
    else {
        alert("You are a silver-days 👵🏼");
    }
} 
// CATCH-ALL: If the very first condition (age >= 25) was false, they must be 24 or younger.
else {
    alert("You are a young person👶🏼");
}