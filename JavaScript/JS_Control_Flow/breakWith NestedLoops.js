//Nested Loops

//outer loop

for (let i = 1; i <= 3; i ++){

  //inner loop
  for (let j = 1; j <= 3; j ++){
if (i == 2) {
break;
}
console.log(`i = ${i}, j = ${j}`);
  }

}

/*
This program skips the part when i is exactly equals to 2
*/

//Breaks with comments

greaterLoop: for (let k = 1; k <= 3; k++){
 lesserLoop: for (let p = 1; p <= 3; p ++){
  if (p === 3){
    break greaterLoop;
  }
  console.log("k = " + k + ", p = " + p)
 }
}