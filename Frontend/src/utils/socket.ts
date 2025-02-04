import { io, Socket } from "socket.io-client";

 let socket:Socket | null = null;

export const connectSocket = () => {
     if(!socket){
        socket = io("http://localhost:3000");
     }
    return socket;
    }


export const getSocket = ():Socket | null => {
    return socket;
    }