import { EventModel, OrderModel, UserModel } from "../database/postgres.js";
const createEvent = async (body, userId, publishStatus, customerId) => {
  const payload = {
    ...body,
    userId,
    publishStatus: publishStatus,
    customerId: customerId,
  };
  return await EventModel.create(payload);
};

const getStatusOfEventInvitation = async (eventId, approvalStatus, status) => {
  return await EventModel.update(
    {
      approved: approvalStatus,
      status: status,
    },
    { where: { _id: eventId } }
  );
};

const findEventById = async (id) => {
  return await EventModel.findByPk(id);
};

const findEventByuserId = async (userId) => {
  return await EventModel.findAll({
    where: {
      userId: userId,
    },
  });
};

const updateEventById = async (data, id) => {
  return await EventModel.update(data, {
    where: {
      _id: id,
    },
  });
};

const deleteEvent = async (id) => {
  return await EventModel.destroy({
    where: {
      _id: id,
    },
  });
};

export {
  createEvent,
  getStatusOfEventInvitation,
  findEventById,
  findEventByuserId,
  updateEventById,
  deleteEvent,
};
