import jwt from "jsonwebtoken";
import { config } from "../config/globalenv.js";
import {
  errorResponseHelper,
  serverErrorHelper,
} from "../helpers/utilityHelper.js";

const secretKey = config.sendOtp_jwt_secret_key;

const sendOtpMiddleware = (req, res, next) => {
  try {
    const token = req.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponseHelper(res, { error: "Token is not provided" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return errorResponseHelper(res, { error: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

export default sendOtpMiddleware;
