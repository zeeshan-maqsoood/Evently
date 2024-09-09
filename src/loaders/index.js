import sequelization from "./postgres_loader.js";
import { createSocketServer } from "./socket_loader.js";
import expressLoader from "./express-loader.js";
const loader = async (app, server) => {
  await sequelization();
  expressLoader(app);
  const io = createSocketServer(server);
  app.set("io", io);
};

export { loader };
