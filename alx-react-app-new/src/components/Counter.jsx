import React, {useState} from "react";


function Counter(){
  const [count, setCount] = useState(0);

  return ( <>
   <p style={{textAlign: "center", fontSize: "2rem", color: "#f3f1ff"}}>Current Count: {count}</p>
   <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
   <button style={{margin: "10px"}} onClick={() => setCount(count + 1)}>Increment</button>
   <button style={{margin: "10px"}}  onClick={() => setCount(count - 1)}>Decrement</button>
   <button style={{margin: "10px"}}  onClick={() => setCount(0)}>Reset</button>
   </div>

   </>)
}


export default Counter;
