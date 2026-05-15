// while and do...while Loop
/* Syntax: while (condition) {
body of loop
}*/

let powerOn = true;
let battery = 0;

while (powerOn){
  battery ++; //increment battery by 1
  
  if (battery === 5) {
    powerOn = false; // This stops the loop
  }
    console.log(`Is the power still on: ${powerOn}`)

}

let height = 0;
while (height <= 4){
  console.log(`You are ${height} meters tall`)
  height ++;
}

