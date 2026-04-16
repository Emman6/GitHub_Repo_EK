//NESTED LOOPS
console.log("Breaks with Nested Ifs");

//Outer Loop
for (let i = 1; i <=3; i++){

  //inner loop
  for (let j=1; j <=3; j++) {
if (i == 2) {
  break;
}
console.log(`i = ${i}, j = ${j}`);
  }
}
console.log();

//With Labels
console.log("Breaks with Labels");

outerloop: for (let k = 1; k <=3; k++){

  //inner loop
innerloop:  for (let l=1; l <=3; l++) {
if (l == 2) {
  break outerloop;
}
console.log(" k = " + k, "l = " + l);
  }
}
console.log();

// Break with a Switch

let fruit = "Banana";

switch (fruit) {
    case "Banana":
        console.log(` ${fruit} is good!`);
        break;
    case "Apple":
        console.log(` ${fruit} is tasty!`);
        break;
    default:
        console.log("Unknown fruit!");
}

// Output: Apple is tasty!