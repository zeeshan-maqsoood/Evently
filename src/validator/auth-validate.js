import Joi from "joi";
import { errorResponseHelper } from "../helpers/utilityHelper.js";
const sendOtpValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, {
      message: error.details[0].message,
    });
  } else {
    next();
  }
};
const verifyCodeValidator = (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, {
      message: error.details[0].message,
    });
  } else {
    next();
  }
};

const createAccountValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    errorResponseHelper(res, {
      message: error.details[0].message,
    });
  } else {
    next();
  }
};

const signInValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponseHelper(res, {
      message: error.details[0].message,
    });
  } else {
    next();
  }
};

const updateUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    errorResponseHelper(res, {
      message: error.details[0].message,
    });
  } else {
    next();
  }
};

const forgetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    errorResponseHelper(res, { message: error.details[0].message });
  } else {
    next();
  }
};

const validateVerifyOtpCodeForForgetPassword = (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    errorResponseHelper(res, { message: error.details[0].message });
  }
  next();
};

const validateCreatePassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    errorResponseHelper(res, { message: error.details[0].message });
  } else {
    next();
  }
};

export {
  sendOtpValidator,
  createAccountValidator,
  signInValidator,
  updateUserValidator,
  verifyCodeValidator,
  forgetPasswordValidator,
  validateVerifyOtpCodeForForgetPassword,
  validateCreatePassword,
};
