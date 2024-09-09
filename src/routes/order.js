import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { createOrders } from "../controller/order.js";
import { validateCreateCustomer } from "../validator/stripe-auth-validate.js";
const router = Router();
router.post(
  "/create-orders",
  [authMiddleware, validateCreateCustomer],
  createOrders
);

export default router;
