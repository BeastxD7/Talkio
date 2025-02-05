import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"

const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin : ["http://localhost:5173", "https://talkiobybeast.vercel.app"],
        methods:["GET" , "POST"],
        credentials:true
    }
 });


 const rooms:string[] = [];


 app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
  });

io.on("connection", (socket) => {
    console.log(`socket Connected with ID: ${socket.id}`);

    socket.on("message" , ({message, username,roomId}) => {
        console.log(`username: ${username}, Recieved Message: ${message}`);
        io.to(roomId).emit("message" , {message , username})
        console.log('message event emmited to client.');
        

    })

    socket.on("create-room" , ({username , roomId}) => {
        if(rooms.includes(roomId)){
            socket.emit("create-room-response", {message: "Already Room Exists!"});
            return;
        }

        socket.join(roomId);
        rooms.push(roomId);
        socket.emit("create-room-response", {message: "Room Created Succesfull"});
    })

    socket.on("join-room" , ({username , roomId}) => {
        if(rooms.includes(roomId)){
            const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
            console.log(`roomsize: ${roomSize}`);
            
            socket.join(roomId);
            io.to(roomId).emit(`join-notify` , {message: `${username} joined the Room`,id:socket.id})
            socket.emit("join-room-response", {message: "Room Joined Succesfull"});
            console.log(io.sockets.adapter.rooms);
            return;
        }

        socket.emit("join-room-response", {message: "Room Doesn't Exists!"});
        
    })



    socket.on("disconnect", () => {
        console.log(`Socket Disconnected: ${socket.id}`);
    
        rooms.forEach((roomId) => {
            const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    
            if (roomSize === 0) {
                const roomIndex = rooms.indexOf(roomId);
                if (roomIndex !== -1) {
                    rooms.splice(roomIndex, 1);
                    console.log(`Room ${roomId} deleted because it became empty.`);
                }
            }
        });
    });
    


});

httpServer.listen(3000, () => {
    console.log(`server running in port: 3000`);
    
});