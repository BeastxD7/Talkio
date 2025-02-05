import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"
import { log } from "console";

const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin : "*",
        methods:["GET" , "POST"],
        credentials:true
    }
 });


 const rooms:string[] = [];

io.on("connection", (socket) => {
    console.log(`socket Connected with ID: ${socket.id}`);

    socket.on("message" , (message) => {
        console.log(`socket ID: ${socket.id}, Recieved Message: ${message}`);
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
            socket.join(roomId);
            io.to(roomId).emit(`join-notify` , {message: `${username} joined the Room`,id:socket.id})
            socket.emit("join-room-response", {message: "Room Joined Succesfull"});
            return;
        }

        socket.emit("join-room-response", {message: "Room Doesn't Exists!"});
        
    })


    
    socket.on("disconnect" , () => {
        console.log(`socket Disconnected.`);
        
    })

});

httpServer.listen(3000, () => {
    console.log(`server running in port: 3000`);
    
});