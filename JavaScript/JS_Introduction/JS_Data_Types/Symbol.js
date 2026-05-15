//Symbol data types simply means that JavaScript determines tha this the symbol is distinct from all other symbols even if they are the same
let symbol1 = Symbol("Atlas");
let symbol2 = Symbol("Atlas");

console.log (symbol1===symbol2); //Is symbol1 exactly the same in type and value (===) as symbol2?
