import bcrypt from "bcrypt";
import { config } from "../config/globalenv.js";

const saltRound = parseInt(config.salt, 10);

const generateHashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRound);
  return hash;
};

const comparePassword = async (password, hashPassword) => {
  if (!password || !hashPassword) {
    throw new Error("Password and hashPassword are required");
  }
  const matchedPassword = await bcrypt.compare(password, hashPassword);
  console.log(matchedPassword);
  return matchedPassword;
};

export { generateHashPassword, comparePassword };
