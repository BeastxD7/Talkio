import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"

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


io.on("connection", (user) => {
    console.log(`User Connected with ID: ${user.id}`);

    user.on("message" , (message) => {
        console.log(`User ID: ${user.id}, Recieved Message: ${message}`);
    })


    user.on("disconnect" , () => {
        console.log(`User Disconnected.`);
        
    })
});

httpServer.listen(3000, () => {
    console.log(`server running in port: 3000`);
    
});