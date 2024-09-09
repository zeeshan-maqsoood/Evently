import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { config } from "../config/globalenv.js";

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const notificationLinkSend = () => {
  return "localhost:3000/api/event//status";
};

// Send OTP email
const sendOTPEmail = async (recipientEmail, value, subject) => {
  // Create a transporter object using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.gmailUser,
      pass: config.gmailPassword,
    },
  });

  // Email options
  const mailOptions = {
    from: config.gmailUser,
    to: recipientEmail,
    subject: subject,
    text: value,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

export { sendOTPEmail, generateOTP, notificationLinkSend };
