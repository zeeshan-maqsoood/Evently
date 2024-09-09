import {
  findUserByEmail,
  userCreate,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
  updateUserByPassword,
} from "../services/user.service.js";
import { generateHashPassword, comparePassword } from "../helpers/bcrypt.js";
import {
  generateSendCodeJwtToken,
  generateVerifyCodeJWTToken,
  generateAuthJWTToken,
  generateForgetPasswordJWTToken,
  generateVerifyOtpForForgetPassword,
} from "../helpers/jwt.js";
import { sendOTPEmail, generateOTP } from "../helpers/sendMail.js";
import {
  errorResponseHelper,
  serverErrorHelper,
  successResponseHelper,
} from "../helpers/utilityHelper.js";
import { v4 as uuid } from "uuid";
import { response } from "express";
const sendOtpCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await findUserByEmail(email);
    if (existUser) {
      return errorResponseHelper(res, { error: "Email is Already Exists" });
    }
    const subject = "Your Otp verification Code";
    const code = generateOTP();
    const payload = {
      email: email,
      otpCode: code,
    };
    const token = generateSendCodeJwtToken(payload);

    await sendOTPEmail(email, code, subject);

    successResponseHelper(res, {
      message: "Verification Code has been sent to your email",
      token,
    });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};
const verifyOtpForUser = async (req, res) => {
  const { otp } = req.body;
  const { email, otpCode } = req.user;
  try {
    if (otpCode !== otp) {
      return errorResponseHelper(res, { error: "Invalid OTP" });
    }
    const payload = {
      email: email,
    };
    const token = await generateVerifyCodeJWTToken(payload);

    return successResponseHelper(res, {
      message: "OTP verified successfully",
      token,
      payload,
    });
  } catch (error) {
    console.log(error, "error");
    return serverErrorHelper(res, error);
  }
};
const createAccountOfUser = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const { email } = req.user;
    const hashedPassword = await generateHashPassword(password);
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      isVerified: true,
    };

    const user = await userCreate(payload);
    if (!user) {
      return errorResponseHelper(res, { error: "User not found" });
    }
    const jwtPayload = {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified,
    };

    const token = generateAuthJWTToken(jwtPayload);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      token: token,
    };
    return successResponseHelper(res, data);
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};
const signInForUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponseHelper(res, { error: "Invalid Credentials" });
    }

    const isMatchPassword = await comparePassword(password, user.password);

    if (!isMatchPassword) {
      return errorResponseHelper(res, { error: "Invalid Credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified,
    };
    const token = await generateAuthJWTToken(payload);
    const data = {
      ...payload,
      token: token,
    };

    return successResponseHelper(res, data);
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await findAllUsers();
    if (!user) {
      return errorResponseHelper(res, { error: "NO User Found" });
    }
    return successResponseHelper(res, user);
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await findUserById(id);
    if (!user) {
      return errorResponseHelper(res, { error: "NO User Found" });
    }
    return successResponseHelper(res, user);
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(id, req.body);
    const [data] = updatedUser;
    if (data > 0) {
      return successResponseHelper(res, {
        message: "user data updated Successfully",
      });
    } else {
      return errorResponseHelper(res, { error: "User Not Found" });
    }
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    if (deletedUser === 0) {
      return errorResponseHelper(res, {
        error: "User not found or error in deleting data",
      });
    }
    return successResponseHelper(res, { message: "user deleted Successfully" });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findEmail = await findUserByEmail(email);
    if (!findEmail) {
      errorResponseHelper(res, { error: "NO Email Found" });
    }
    const code = generateOTP();
    const payload = {
      email: findEmail.email,
      otpCode: code,
    };
    const token = generateForgetPasswordJWTToken(payload);

    const response = {
      message: "invitation code has been sent to your email",
      token: token,
    };
    successResponseHelper(res, { response });
  } catch (error) {
    errorResponseHelper(res, error);
  }
};

const verifyOtpCodeForForgetPassword = (req, res) => {
  try {
    const { email, otpCode } = req.user;
    const { otp } = req.body;
    if (otp !== otpCode) {
      return errorResponseHelper(res, { error: "Invalid Otp" });
    }
    const payload = {
      email: email,
    };
    const token = generateVerifyOtpForForgetPassword(payload);
    const responseMessage = {
      message: "Otp has been verified",
      token,
    };
    successResponseHelper(res, responseMessage);
  } catch (error) {
    console.log(error, "error");
    serverErrorHelper(res, error);
  }
};

const newPasswordCreateForUser = async (req, res) => {
  try {
    const { email } = req.user;
    const { password } = req.body;
    const hashedPassword = generateHashPassword(password);
    const [updated] = await updateUserByPassword(email, hashedPassword);
    if (updated < 1) {
      return errorResponseHelper(res, { error: "password not saved" });
    }
    return successResponseHelper(res, { message: "password has been updated" });
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

export {
  sendOtpCode,
  verifyOtpForUser,
  signInForUser,
  findAllUsers,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createAccountOfUser,
  forgetPassword,
  verifyOtpCodeForForgetPassword,
  newPasswordCreateForUser,
};
