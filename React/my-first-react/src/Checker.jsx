function Checker(props) {
  let result = "";
  if (props.number % 2===0){
    result = "Even";
  } else {
    result = "Odd"
  }

  return <h2>The number {props.number} is {result}</h2>;
}
export default Checker;