//Continue Statement
/* Continue skis the cndition in the iteration of the loop */
console.log ("Continue Statement");
for (let i = 1; i <= 11; i ++){
//skip the iteration is 1 is even
if (i % 2 === 0){
  continue; //skip if when you divide i by 2 there is no remainder
}
console.log(i); //print i 
}

/* Continue with For Loop*/
console.log ("Continue with For Loop");
for (let l = 1; l <= 10; ++l) {
  //skip if value of l is between 3 and 6
  if ( l > 2 && l < 9){
    continue;
  }
  console.log(l)
}

//Continue with the While Loop
console.log("Continue with While Loop");
var num = 1;

while (num <= 9){
  // skip the iteration on all even numbers
  if (num % 2 === 0){
    ++num;
    continue
  }
  console.log(num);
  ++num;
}

//Nested For Loops
console.log("Nested For Loops");
//outer loop
for (let b = 1; b <= 3; b ++){
//inner loop
for (let c = 1; c <= 3; c++ ){
  if (c == 2){
    continue;
  }
  console.log(`b = ${b}, c = ${c}`);
}
}

//Continue with Labels
console.log("Continue with Labels");


outerloop: for (let k = 1; k <= 4; k++){
innerloop: for (let f = 1; f <= 4; f++){
  if (f === 2){
    continue outerloop;
  }
  console.log("k = "+ k+", f = "+ f);
}
}

