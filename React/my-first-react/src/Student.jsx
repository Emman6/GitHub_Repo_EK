function Student(props){
return (
  <div>
<h2>Name: {props.name}</h2>
<p>Course: {props.course}</p>
<p>Year:{props.year}</p>
  </div>
)
}
export default Student