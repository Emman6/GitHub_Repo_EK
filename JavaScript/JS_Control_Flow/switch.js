//Switch Case Statement
/*
Syntax:

switch (expression){
case value 1:
  code bock to be executed if expression matches value1
}
  case value 2:
  code bock to be executed if expression matches value 2
}
  case value 3:
  code bock to be executed if expression matches value 3
}
  default:
    code block to be executed if expression does not match any case
*/

//Example 1:
console.log("Example 1:")
let LED = "Connected";
let message = "LED is Powered";

switch (LED){
case "Disconnected":
  message = "LED is disconnected";
  break;
case "Connected":
  message = "LED is connected";
  break;

default:
  message = "LED status not registered."
}
console.log(message);


//Example 2
console.log("Example 2:");
let day = 3;
let activity;

switch (day){
  case 1:
    console.log("Sunday");
    break;
    case 2:
    console.log("Monday");
    break;
    case 3:
    console.log("Tuesday");
    break;
    case 4:
    console.log("Wednesday");
    break;
    case 5:
    console.log("Thursday");
    break;
    case 6:
    console.log("Friday");
    break;
    case 7:
    console.log("Saturday");
    break;

    default:
      console.log("No day selected");
}