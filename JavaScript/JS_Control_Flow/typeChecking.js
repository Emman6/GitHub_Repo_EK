//Tyoe Checking with Switch Case

let a = 1;

switch (a) {
case "1":
a = "one (string type)";
break;
case 1:
a = "one (number type)";
break;
case 2:
a = "two (number type)";
break;
default:
  a = "not found";

}
console.log(`The value of a is ${a}`);