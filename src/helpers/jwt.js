import jwt from "jsonwebtoken";
import { config } from "../config/globalenv.js";
console.log(config, "config");
const sendCodeSecretKey = config.sendOtp_jwt_secret_key;
const verifyCodeSecretKey = config.verifyOtp_jwt_secret_key;
const auth_secret_key = config.auth_jwt_secret_key;
const forgetPassword_secret_key = config.forget_password_secret_key;
const verifyOtp_For_ForgetPassword =
  config.forget_password_verify_otp_secret_key;
const generateSendCodeJwtToken = (data) => {
  try {
    return jwt.sign(data, sendCodeSecretKey, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const generateVerifyCodeJWTToken = (data) => {
  try {
    return jwt.sign(data, verifyCodeSecretKey, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const generateAuthJWTToken = (data) => {
  try {
    return jwt.sign(data, auth_secret_key, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const generateForgetPasswordJWTToken = (data) => {
  try {
    return jwt.sign(data, forgetPassword_secret_key, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const generateVerifyOtpForForgetPassword = (data) => {
  try {
    return jwt.sign(data, verifyOtp_For_ForgetPassword, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export {
  generateSendCodeJwtToken,
  generateVerifyCodeJWTToken,
  generateAuthJWTToken,
  generateForgetPasswordJWTToken,
  generateVerifyOtpForForgetPassword,
};
