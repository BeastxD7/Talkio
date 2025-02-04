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
io.on("connection", (user) => {
    console.log(`User Connected with ID: ${user.id}`);
    user.on("message", (message) => {
        console.log(`User ID: ${user.id}, Recieved Message: ${message}`);
    });
    user.on("disconnect", () => {
        console.log(`User Disconnected.`);
    });
});
httpServer.listen(3000, () => {
    console.log(`server running in port: 3000`);
});
