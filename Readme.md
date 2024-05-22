io-->refers to the  entire circuit(server)
socket--->refers to a particular user
every socket has an id , which we can access via "socket.id"
emit-->we are triggering an event, we are sending the data
on-->with on we are always keeping a listener , which is listening the event ,we are receiving the data
socket.broadcast.emit-->When you use socket.broadcast.emit, the message is sent to all clients except the one that initiated the event. This is useful when you want to notify all other clients about something, but not the one who triggered the event.




----------------

Server---->

io.emit(Event1,"Hhi")
---------------
Client----->

Socket.on(Event1,(m)=>{
    console.log(m);
})
-----------------
----------------

Client----->

Socket.emit(btn,4);
---------------
Server---->

Socket.on(btn,((n)=>{
   
}))

------------------


individually each user is inside a room , and each room has an id same to socket.id

socket.to().emit();----->Purpose: Sends an event to all sockets in the specified room, except the sender.
the to contains the room id to which we want to send the message

-----------------------------
socket.join('room1')--->In Socket.IO, the .join method is used to allow a socket (client) to join a "room." A room is a logical grouping of sockets that enables you to broadcast messages to multiple clients that have joined the same room. This concept is useful in scenarios like chat applications, where you might want to send messages to all users in a particular chat room, or in multiplayer games where players are divided into different groups or sessions.


Grouping Clients:

The .join method allows you to group multiple clients together under a common room name. This makes it easier to manage communication between related clients.
Example: socket.join('room1');

Targeted Broadcasting:

Once clients have joined a room, you can broadcast messages to all clients in that room without sending the message to every connected client.
Example: io.to('room1').emit('message', 'Hello room1!');

![Alt text](<Screenshot 2024-05-22 at 12.09.15 PM.png>) ![Alt text](<Screenshot 2024-05-22 at 12.09.06 PM.png>) ![Alt text](<Screenshot 2024-05-22 at 12.08.58 PM.png>) ![Alt text](<Screenshot 2024-05-22 at 11.36.02 AM.png>) ![Alt text](<Screenshot 2024-05-22 at 11.34.43 AM.png>) ![Alt text](<Screenshot 2024-05-22 at 11.34.27 AM.png>) ![Alt text](<Screenshot 2024-05-22 at 11.22.47 AM.png>) ![Alt text](<Screenshot 2024-05-22 at 11.22.09 AM.png>)
