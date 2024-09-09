import express from "express";
import http from "http";
import { loader } from "./loaders/index.js";
import { config } from "./config/globalenv.js";
import { createSocketServer } from "./loaders/socket_loader.js";
console.log(config);
const app = express();
const server = http.createServer(app);

loader(app, server);
const io = createSocketServer(server);
app.set("io", io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
