import React, { useEffect } from 'react'
import {io} from "socket.io-client"

function App() {
  const socket=io("http://localhost:5000");

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("Connected",socket.id)
    })
    socket.on("welcome",(m)=>{
      console.log(m);
    })
  },[])

  return (
    <div>App</div>
  )
}

export default App