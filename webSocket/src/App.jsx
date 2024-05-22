import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

/*thcleaup function is the return statement in useEFFECT*/
/*The cleanup function inside useEffect runs before the next effect execution (except for the initial render) and before the component is unmounted.
The effect itself runs after the component has rendered and after the cleanup function if dependencies have changed.*/

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName , setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    });

    socket.on("receive", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  ///overhere we're sending the data to a particular user and not everyone , room is the id of the user we want to send the data to
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  };

  const joinRoomHandler=(e)=>{
    e.preventDefault();
    socket.emit('join-room',roomName)
    setRoomName("");
  }


  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 200 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {socketId && socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
         <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
        <Stack>
          {messages.map((m, i) => (
            <Typography key={i} variant="h6" component="div" gutterBottom>
              {m}
            </Typography>
          ))}
        </Stack>
      </form>
    </Container>
  );
}

export default App;
