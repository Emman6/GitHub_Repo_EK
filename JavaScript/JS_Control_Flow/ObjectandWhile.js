//ARRAY OF OBJECT

let medicalSupplies = [
  {name: `Syringe`, quantity: 5},
  {name: `Stethoscope`, quantity:7},
  {name: `MRI`, quantity:8}
] 
let i = 0
while (i < medicalSupplies.length){
let currentItem = medicalSupplies[i]; 

  if (currentItem.quantity < 11){
    alert(`⚠️You have only ${currentItem.quantity} ${currentItem.name}'s. This is extremely low !`);
  }
  else {
    alert(`You have enough ${currentItem.name}s 😊!`);
}
i ++;
}