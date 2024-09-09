import { Router } from "express";
import {
  createEventValidator,
  approvalStatusValidator,
  updateEventValidator,
} from "../validator/event-validate.js";
import { validatePaymentIntent } from "../validator/stripe-auth-validate.js";
import authMiddleware from "../middleware/auth.js";
import {
  createEventsOfUsers,
  sendApprovalReply,
  getEventsById,
  getEventByUserId,
  updateEventController,
  deleteEventById,
} from "../controller/event.js";
const router = Router();

router.post(
  "/create",
  [createEventValidator, authMiddleware],
  createEventsOfUsers
);
router.post(
  "/approval-reply",
  [authMiddleware, approvalStatusValidator],
  sendApprovalReply
);
router.get("/getEventbyId/:id", authMiddleware, getEventsById);
router.get("/getEventByUserId/:id", authMiddleware, getEventByUserId);
router.put(
  "/update-event/:id",
  [updateEventValidator, authMiddleware],
  updateEventController
);
router.delete("/delete-event/:id", authMiddleware, deleteEventById);

export default router;
