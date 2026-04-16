import ImportStudent from "./ImportStudent";
import Counter from "./Counter"; // Calling the Counter file!
import AdvancedCounter from "./AdvancedCounter"
import Checker from "./Checker"
function App() {
  return (
    <div>
      <h1>My Workspace</h1>
      <hr />
      
      {/* Student list */}
      <ImportStudent /> 
      
      <hr />
      
      {/* Counter exercise */}
      <Counter />
       <hr />
      
      {/* AdvancedCounter exercise */}
      <AdvancedCounter />
        <hr />
      
      <div>
      <h1>My Workspace</h1>
      {/* You pass the number here just like an HTML attribute */}
      <Checker number={10} />
      <Checker number={7} />
    </div>
    </div>
    
  )
}

export default App;