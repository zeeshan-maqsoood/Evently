import jwt from "jsonwebtoken";
import { config } from "../config/globalenv.js";
import {
  errorResponseHelper,
  serverErrorHelper,
} from "../helpers/utilityHelper.js";
const secretKey = config.forget_password_verify_otp_secret_key;

const verifyOtpForForgetPasswordMiddleware = (req, res, next) => {
  try {
    const token = req.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponseHelper(res, { error: "No Token Provided" });
    }

    jwt.verify(token, secretKey, (error, user) => {
      if (error) {
        return errorResponseHelper(res, { error: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

export default verifyOtpForForgetPasswordMiddleware;
