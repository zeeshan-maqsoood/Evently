import Joi from "joi";
import { errorResponseHelper } from "../helpers/utilityHelper.js";
const validatePaymentIntent = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    customerId: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, { message: error.details[0].message });
  }
  next();
};

const validateCreateCustomer = (req, res, next) => {
  const schema = Joi.object({
    eventId: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, { error: error.details[0].message });
  }
  next();
};

export { validatePaymentIntent, validateCreateCustomer };
