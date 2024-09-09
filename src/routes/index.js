import { Router } from "express";
import UserRouter from "./user.js";
import EventRouter from "./events.js";
import ChatRouter from "./chat.js";
import OrderRouter from "./order.js";
import webhookRouter from "./webhook.js"
const routes = Router();
routes.use("/user/auth", UserRouter);
routes.use("/event", EventRouter);
routes.use("/chat", ChatRouter);
routes.use("/order", OrderRouter);
routes.use("/stripe",webhookRouter)
export default routes;
