//Using Break to find the sum of positive numbers

let sum = 0;

while (true){
num = Number(prompt("Please enter any number"));

if (num < 0){
  break;
}
else {
  sum += num;
}
}
alert (`Sum is ${sum}`);

