"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("error", (err) => {
    console.error("WebSocket server error:", err);
});
wss.on("connection", (socket) => {
    userCount++;
    console.log(`user connected! usercount:#${userCount} `);
    socket.send("Welcome to the server");
    socket.on("message", (message) => {
        try {
            console.log(`Received message: ${message}`);
            socket.send(`server: ${message}`);
        }
        catch (error) {
            console.error("Error handling message:", error);
            socket.send("An error occurred while processing your message.");
        }
    });
    socket.on("error", (err) => {
        console.error("Error with client socket:", err);
    });
    socket.on("close", () => {
        userCount--;
        console.log(`user disconnected! usercount:#${userCount} `);
    });
});
