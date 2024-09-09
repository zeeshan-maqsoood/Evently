import { Server as SocketIO } from "socket.io";
const onlineUser = new Map();

const createSocketServer = (server) => {
  console.log(onlineUser, "onlineUser");
  const io = new SocketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("msg", (message) => {
      console.log(message, "message");
    });
    const userId = socket.handshake.query.userId;
    console.log(userId, "userId");
    if (userId) {
      onlineUser.set(userId, socket.id);
    } else {
      console.log("no id provided");
    }
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      onlineUser.forEach((socketKey, key) => {
        if (socketKey === socket.id) {
          onlineUser.delete(key);
          console.log(`User ${key} disconnected`);
        }
      });
    });
    console.log(onlineUser, "onlineUser");
    socket.on("message", (message) => {
      console.log("Received message:", message);
      io.emit("message", message); // Broadcast the message to all clients
    });
  });

  return io;
};

const onlineUsers = () => {
  return onlineUser;
};

export { createSocketServer, onlineUsers };
