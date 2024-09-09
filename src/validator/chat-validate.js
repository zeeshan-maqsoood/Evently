import Joi from "joi";
import { errorResponseHelper } from "../helpers/utilityHelper.js";

const createMessageValidator = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().required(),
    eventId: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, { error: error.details[0].message });
  }
  next();
};

const validateEditChat = async (req, res, next) => {
  const scheme = Joi.object({
    message: Joi.string().required(),
  });

  const { error } = scheme.validate(req.body);
  if (error) {
    errorResponseHelper(res, { message: error.details[0].message });
  }
  next();
};

export { createMessageValidator, validateEditChat };
