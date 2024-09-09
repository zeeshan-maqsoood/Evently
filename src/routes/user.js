import { Router } from "express";
import {
  sendOtpValidator,
  signInValidator,
  updateUserValidator,
  verifyCodeValidator,
  createAccountValidator,
  forgetPasswordValidator,
  validateVerifyOtpCodeForForgetPassword,
  validateCreatePassword,
} from "../validator/auth-validate.js";
const router = Router();
import {
  sendOtpCode,
  verifyOtpForUser,
  signInForUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createAccountOfUser,
  forgetPassword,
  verifyOtpCodeForForgetPassword,
  newPasswordCreateForUser,
} from "../controller/user.js";
import sendOtpMiddleware from "../middleware/sendOtp.js";
import verifyOtpMiddleware from "../middleware/verifyOtp.js";
import authMiddleware from "../middleware/auth.js";
import middlewareForForgetPassword from "../middleware/forgetPassword.js";
import verifyOtpForForgetPasswordMiddleware from "../middleware/verifyForgetPassword.js";
router.post("/send-otp", sendOtpValidator, sendOtpCode);
router.post(
  "/verify-otp",
  [verifyCodeValidator, sendOtpMiddleware],
  verifyOtpForUser
);
router.post(
  "/create-account",
  [createAccountValidator, verifyOtpMiddleware],
  createAccountOfUser
);
router.post("/login", [signInValidator], signInForUser);
router.get("/all-users", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put(
  "/update-user/:id",
  [updateUserValidator, authMiddleware],
  updateUserById
);
router.delete("/delete-user/:id", authMiddleware, deleteUserById);
router.post("/forget-password", forgetPasswordValidator, forgetPassword);
router.post(
  "/forget-password/verify-otp",
  [middlewareForForgetPassword, validateVerifyOtpCodeForForgetPassword],
  verifyOtpCodeForForgetPassword
);
router.post(
  "/create-password",
  [validateCreatePassword, verifyOtpForForgetPasswordMiddleware],
  newPasswordCreateForUser
);

export default router;
