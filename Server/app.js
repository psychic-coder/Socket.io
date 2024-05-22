import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
app.use(cors());

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

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Id", socket.id);

  socket.emit("welcome","Welcome to the server !!!");

});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
