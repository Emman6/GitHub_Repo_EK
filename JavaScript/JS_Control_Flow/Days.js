//SIMPLE TOOL TO VIEW THE DAYS OF THE WEEK

let days = Number(prompt(`Please type a number form 1 to 7`));

switch(days){
case 1:
alert(`Sunday is encoded as ${days}`);
break;

case 2:
alert(`Monday is encoded as ${days}`);
break

case 3:
alert(`Tuesday is encoded as ${days}`);
break

case 4:
alert(`Wednesday is encoded as ${days}`);
break

case 5:
alert(`Thursday is encoded as ${days}`);
break

case 6:
alert(`Friday is encoded as ${days}`);
break


case 7:
case 8:
  alert(`The weekend is encoded as ${days}`);
break;

default:
  alert(`Not Valid`);

}