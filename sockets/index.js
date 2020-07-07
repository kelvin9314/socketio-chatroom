const express = require("express");
const SocketServer = require("socket.io");

const app = express();
app.io = new SocketServer();

let userCounter = 0;

module.exports = (io) => {
  io.on("connection", (socket) => {
    let isUserAdded = false;
    socket.broadcast.emit("hi");
    console.log("New client connected");
    socket.on("add user", (userName) => {
      if (isUserAdded) return;
      socket.userName = userName;
      isUserAdded = true;
      userCounter += 1;
      console.log(userName);

      socket.broadcast.emit("user joined", {
        userName: userName,
        userCounter,
      });
    });

    socket.on("new message", (data) => {
      const { userName, message } = data;
      console.log(userName, message);
      socket.broadcast.emit("new message", {
        userName,
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
