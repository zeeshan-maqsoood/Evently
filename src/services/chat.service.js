import { ChatModel } from "../database/postgres.js";

const createMessage = async (role, message, eventId, userId) => {
  return await ChatModel.create({ role, message, eventId, userId });
};

const findChatById = async (id) => {
  return await ChatModel.findByPk(id);
};

const updateChatById = async (data, id) => {
  return await ChatModel.update(data, {
    where: {
      _id: id,
    },
  });
};

const deleteChatById = async (id) => {
  return await ChatModel.destroy({
    where: {
      _id: id,
    },
  });
};

export { createMessage, findChatById, updateChatById, deleteChatById };
