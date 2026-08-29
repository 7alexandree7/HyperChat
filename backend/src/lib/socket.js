import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: ENV_VARIABLES.ORIGIN || "http://localhost:5173" } });

function getReceiverSocketId(userId) {
    return onlineUsers[userId];
}

// Online users map = {userId: socketId}
const onlineUsers = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) onlineUsers[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {
        if (userId) delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    })
})

export { app, server, io, getReceiverSocketId };