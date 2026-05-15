//Break Statement

/**
 * This terminates n infinite loop if the condition for the break statement is met

*/

while (true){
  let num = Number(prompt("Enter any number (0 to exit):"));
if (num == 0){
  break;
}
alert(`You chose ${num}`)
}
