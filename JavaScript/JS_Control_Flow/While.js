//Display Numbers from 1 to 3

let i = 1

while (i <= 5){
  console.log(i);
  i += 1;
}

let num = 0, sum = 0;

while (num >= 0){
sum += num;

num = parseInt(prompt(`Enter a number: `));
}
console.log (`The sum is ${sum}`);
alert(`The sum is ${sum}`)