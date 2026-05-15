//JavaScript Block-Level Variables
//These use the let and const keywords and ar accessible only within the block of curly braces {}

function display_scopes(){
  let message = "local";

  if (true){
//declaringa block-level variable
let message = "block-level";
console.log(`Inner scope: ${message}`);
  }
  console.log(`Outer scope: ${message}`);
}
display_scopes();

//Let is always block-scoped