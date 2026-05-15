//Switch Case vs If Else

/*Switch Case*/
let trafficLight = "Green";

switch(trafficLight){
case "Green":
  console.log("GO");
  break;
  case "Red":
  console.log("STOP");
  break;
  case "Yello":
  console.log("READY");
  break;
 default:
  console.log("No color indicated");
}
//Switch Case is easier to read and suitable for simple cases where one variable is being tested against multiple conditions

/*If Else Case*/
let color = "Red";

if (color == "Red"){
  console.log("STOP");
}
else if(color === "Green"){
  console.log("GO");
}
else if (color === "Yellow"){
  console.log("READY")
}

else {
  console.log("No color indicated");
}

//If Else case is suitable for situations which require more complex logic