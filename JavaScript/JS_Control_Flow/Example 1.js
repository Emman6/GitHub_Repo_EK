let num = 0, sum = 0;

while (num >= 0) {
    sum += num;
    // The browser will pause here and show the input box
    num = parseInt(prompt("Enter a number (negative number to stop): "));
}

console.log(`The sum is ${sum}`);
alert(`The final sum is ${sum}`); // Added an alert so you see the result easily