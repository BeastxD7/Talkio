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
        origin: ["http://localhost:5173", "https://talkiobybeast.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});
const rooms = [];
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});
io.on("connection", (socket) => {
    console.log(`socket Connected with ID: ${socket.id}`);
    socket.on("message", ({ message, username, roomId }) => {
        console.log(`username: ${username}, Recieved Message: ${message}`);
        io.to(roomId).emit("message", { message, username });
        console.log('message event emmited to client.');
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
        var _a;
        if (rooms.includes(roomId)) {
            const roomSize = ((_a = io.sockets.adapter.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.size) || 0;
            console.log(`roomsize: ${roomSize}`);
            socket.join(roomId);
            io.to(roomId).emit(`join-notify`, { message: `${username} joined the Room`, id: socket.id });
            socket.emit("join-room-response", { message: "Room Joined Succesfull" });
            console.log(io.sockets.adapter.rooms);
            return;
        }
        socket.emit("join-room-response", { message: "Room Doesn't Exists!" });
    });
    socket.on("disconnect", () => {
        console.log(`Socket Disconnected: ${socket.id}`);
        rooms.forEach((roomId) => {
            var _a;
            const roomSize = ((_a = io.sockets.adapter.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.size) || 0;
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
