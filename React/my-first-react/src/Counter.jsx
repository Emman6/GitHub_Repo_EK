
import {useState} from "react";
function App(){
  const [count, setCount] = useState(0);

  return (
<div>
  <h1>Counter: {count}</h1>
  <button onClick={() => setCount(count + 1)}>
   Increase
  </button>
</div>

  )
}

export default App
