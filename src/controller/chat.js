import { findEventById } from "../services/event.service.js";
import { findUserById } from "../services/user.service.js";
import {
  errorResponseHelper,
  serverErrorHelper,
  successResponseHelper,
} from "../helpers/utilityHelper.js";
import {
  createMessage,
  findChatById,
  updateChatById,
  deleteChatById,
} from "../services/chat.service.js";
import { onlineUsers } from "../loaders/socket_loader.js";
import { notificationUser } from "../helpers/notification.js";
const createChat = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { id } = req.user;
    const onlineUser = onlineUsers();
    const { message, eventId } = req.body;
    let role;
    const users = Array.from(onlineUser.keys());
    const user = await findUserById(id);

    const event = await findEventById(eventId);
    if (event.userId === id) {
      role = "organizer";
    } else {
      role = "attendee";
    }
    const chat = await createMessage(role, message, eventId, id);
    if (!chat) {
      errorResponseHelper(res, { error: "error in saving chat" });
    }

    const socketUser = Array.from(onlineUser.values());
    const messageSend = socketUser.map(async (socketId) => {
      await notificationUser(io, message, socketId);
    });
    const notification = await Promise.all(messageSend);
    if (!notification) {
      errorResponseHelper(res, { error: "Notification not send" });
    }

    if (chat && notification) {
      successResponseHelper(res, {
        message: "Notification has been sent you users",
      });
    }
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await findChatById(chatId);
    if (!chat) {
      errorResponseHelper(res, { error: "chat not found" });
    }
    successResponseHelper(res, chat);
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

const editChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const chat = await findChatById(id);
    if (!chat) {
      return errorResponseHelper(res, { error: "no chat found" });
    }
    const payload = {
      ...chat,
      message: message,
    };
    const [updated] = await updateChatById(payload, id);
    if (updated >= 1) {
      successResponseHelper(res, { message: "message has been updated" });
    }
    errorResponseHelper(res, {
      error: "message not Updated Or message not found",
    });
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

const getDeletedChatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chat = await findChatById(id);
    if (!chat) {
      errorResponseHelper(res, { error: "chat not found" });
    }
    const deleted = await deleteChatById(id);

    if (!deleted) {
      errorResponseHelper(res, { error: "message not deleted" });
    }
    successResponseHelper(res, { error: "chat has been deleted" });
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

export { createChat, getChatById, editChatById, getDeletedChatById };
