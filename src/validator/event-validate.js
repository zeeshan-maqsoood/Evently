import Joi from "joi";
import { errorResponseHelper } from "../helpers/utilityHelper.js";

const createEventValidator = (req, res, next) => {
  const schema = Joi.object({
    eventName: Joi.string().required(),
    eventDescription: Joi.string().required(),
    eventDate: Joi.date().iso().required(),
    location: Joi.string().required(),
    invitedIds: Joi.array().items(Joi.string().required()),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, { message: error.details[0].message });
  } else {
    next();
  }
};

const approvalStatusValidator = (req, res, next) => {
  const { status } = req.body;
  const approvalStatus = ["accepted", "rejected"];
  const schema = Joi.object({
    approve: Joi.boolean().required(),
    eventId: Joi.string().required(),
    status: Joi.string().required(),
  });
  if (!approvalStatus.includes(status)) {
    return errorResponseHelper(res, {
      error: "status must be accepted or rejected",
    });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    errorResponseHelper(res, { message: error.details[0].message });
  } else {
    next();
  }
};

const updateEventValidator = (req, res, next) => {
  const schema = Joi.object({
    eventName: Joi.string().required(),
    eventDescription: Joi.string().required(),
    eventDate: Joi.string().required(),
    location: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, { error: error.details[0].message });
  } else {
    next();
  }
};

export { createEventValidator, approvalStatusValidator, updateEventValidator };
