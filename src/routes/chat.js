import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createMessageValidator,
  validateEditChat,
} from "../validator/chat-validate.js";
import {
  createChat,
  getChatById,
  editChatById,
  getDeletedChatById,
} from "../controller/chat.js";
const router = Router();

router.post(
  "/create-message",
  [authMiddleware, createMessageValidator],
  createChat
);
router.get("/:chatId", authMiddleware, getChatById);
router.put("/edit/:id", [authMiddleware, validateEditChat], editChatById);
router.delete("/delete/:id", authMiddleware, getDeletedChatById);

export default router;
