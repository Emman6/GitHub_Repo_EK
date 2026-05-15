//Switch Case without a default.

let day = 4;

switch(day){
case 1:
  console.log("Wednesday");
  break;
  case 2:
  console.log("WThursday");
  break;
  case 3:
  console.log("Friday");
  break;
}// no default means that the program simply goes to the next line if no matches are found
console.log("No default placed therein")

// No Breaks
let date = 2;

switch(date){
case 1:
  console.log("Wednesday");
case 2:
  console.log("Thursday");
case 3:
  console.log("Friday");
}// no break means the program executes each case after it has found its match
