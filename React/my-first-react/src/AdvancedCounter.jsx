
import {useState} from "react";
function AdvancedCounter(){
  const [count, setCount] = useState(0);

  return (
<div>
  <h1>Counter: {count}</h1>
  <button onClick={() => setCount(count + 1)}>
   Increase
  </button>
  <br />
  <button onClick={() => setCount(count - 1)}>
   Decrease
  </button>
  <br />
  <button onClick={() => setCount(count * 2)}>
   Multiply
  </button>
  <br />
    <button onClick={() => setCount(0)}>
   Reset
  </button>
</div>

  )
}

export default AdvancedCounter;
