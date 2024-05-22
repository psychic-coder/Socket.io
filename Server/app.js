import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const server = createServer(app);
app.use(cors()); //we did cross origin as our users are gonna be frpom different platforms
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});



app.get("/", (req, res) => {
  res.send("Hello !");
});

const user=false;
io.use((socket,next)=>{
if(user) next();
})



io.on("connection", (socket) => {
  console.log("User connected", socket.id);


  //we are receiving the data from the frontend and then sending the data to a particular user using the userid or room
  socket.on("message",({message,room})=>{
    console.log(message)
    socket.to(room).emit("receive",message)
  });

  socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`User joined room ${room}`);
  })

  /*socket.emit("welcome",`Welcome to the server !!!`);
  socket.broadcast.emit("welcome",`${socket.id} joined the server !`);*/
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
