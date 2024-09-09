import jwt from "jsonwebtoken";
import { config } from "../config/globalenv.js";
import { errorResponseHelper } from "../helpers/utilityHelper.js";
const secret_key = config.forget_password_secret_key;

const middlewareForForgetPassword = (req, res, next) => {
  const token = req.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    errorResponseHelper(res, { error: "token is not provided" });
  }
  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      errorResponseHelper(res, { error: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};

export default middlewareForForgetPassword;
