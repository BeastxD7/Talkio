"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const rooms = [];
io.on("connection", (socket) => {
    console.log(`socket Connected with ID: ${socket.id}`);
    socket.on("message", (message) => {
        console.log(`socket ID: ${socket.id}, Recieved Message: ${message}`);
    });
    socket.on("create-room", ({ username, roomId }) => {
        if (rooms.includes(roomId)) {
            socket.emit("create-room-response", { message: "Already Room Exists!" });
            return;
        }
        socket.join(roomId);
        rooms.push(roomId);
        socket.emit("create-room-response", { message: "Room Created Succesfull" });
    });
    socket.on("join-room", ({ username, roomId }) => {
        if (rooms.includes(roomId)) {
            socket.join(roomId);
            io.to(roomId).emit(`join-notify`, { message: `${username} joined the Room`, id: socket.id });
            socket.emit("join-room-response", { message: "Room Joined Succesfull" });
            return;
        }
        socket.emit("join-room-response", { message: "Room Doesn't Exists!" });
    });
    socket.on("disconnect", () => {
        console.log(`socket Disconnected.`);
    });
});
httpServer.listen(3000, () => {
    console.log(`server running in port: 3000`);
});
