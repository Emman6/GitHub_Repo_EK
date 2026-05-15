/*
Else...If Statement:
The syntax:
if (condition 1){
//if body
}
else if (condition 2){
//else if body
}
else {
  else body
  }
*/

let grade = prompt("🫡Please enter a Grade: ");

if (grade >= 80){
  alert(`${grade}% is a Distinction! Well done! 😁`);
}
else if (grade <=79 && grade > 49){
  alert(`${grade}% is a 😀pass `);
}
else {
  alert(`😔 Sorry ${grade}% is a fail`);
}
