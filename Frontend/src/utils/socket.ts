import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (roomId?: string , username?:string): Socket => {
    if (!socket) {
        socket = io("https://talkio-ssy0.onrender.com", {
            reconnection: true, // Enables auto-reconnection
            reconnectionAttempts: 5, // Retry 5 times before failing
            reconnectionDelay: 2000, // Wait 2 seconds before retrying
        });

        socket.on("connect", () => {
            console.log("Connected to WebSocket server:", socket?.id);


            if (roomId) {
                socket?.emit("join-room", {roomId,username});
                console.log(`Username: ${username}, Rejoining room: ${roomId}`);
            }
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server.");
            socket = null; 
        });
    }

    return socket;
};

export const getSocket = (): Socket | null => {
    return socket;
};
