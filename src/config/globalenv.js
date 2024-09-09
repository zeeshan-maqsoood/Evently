import { configDotenv } from "dotenv";
const process = configDotenv();
const config = {
  database_name: process.parsed.DATABASE_NAME,
  database_username: process.parsed.DATABASE_USERNAME,
  database_password: process.parsed.DATABASE_PASSWORD,
  database_host: process.parsed.DATABASE_HOST,
  database_dialect: process.parsed.DATABASE_DIALECT,
  salt: process.parsed.JWT_SALTROUND,
  sendOtp_jwt_secret_key: process.parsed.SENT_OTP_JWT_SECRET_KEY,
  verifyOtp_jwt_secret_key: process.parsed.VERIFY_OTP_JWT_SECRET_KEY,
  auth_jwt_secret_key: process.parsed.AUTH_JWT_SECRET_KEY,
  gmailUser: process.parsed.GMAIL_USER,
  gmailPassword: process.parsed.GMAIL_PASSWORD,
  forget_password_secret_key: process.parsed.FORGET_PASSWORD_JWT_SECRET_KEY,
  forget_password_verify_otp_secret_key:
    process.parsed.FORGET_PASSWORD_VERIFY_CODE_JWT_SECRET_KEY,
  stripe_secret_key: process.parsed.STRIPE_SECRET_KEY,
};
export { config };
