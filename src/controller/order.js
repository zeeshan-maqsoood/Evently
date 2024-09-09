import { findEventById } from "../services/event.service.js";
import {
  errorResponseHelper,
  successResponseHelper,
  serverErrorHelper,
} from "../helpers/utilityHelper.js";
import {
  createOrder,
  updateOrderByPaymentIntentId,
} from "../services/order.service.js";
import { createPaymentIntent } from "../services/stripe.service.js";

const createOrders = async (req, res) => {
  try {
    const { eventId, amount, currency } = req.body;

    // Retrieve event details
    const events = await findEventById(eventId);
    if (!events) {
      return errorResponseHelper(res, { error: "Event not found" });
    }

    const { userId } = events;

    // Create an order
    const order = await createOrder(eventId, userId, amount, currency);
    if (!order) {
      return errorResponseHelper(res, { error: "Error saving order" });
    }

    // Create a payment intent
    const metadata = { id: order._id, userId: userId };
    const payment = await createPaymentIntent(amount, currency, metadata);
    console.log(payment,"payment")
    if (!payment) {
      return errorResponseHelper(res, { error: "Error creating payment" });
    }

    // Update the order with the payment intent ID
    const [updatedOrder] = await updateOrderByPaymentIntentId(
      order._id,
      payment.id
    );
    if (updatedOrder < 1) {
      return errorResponseHelper(res, { error: "Order not updated" });
    }

    // Respond with success
    successResponseHelper(res, {
      success: true,
      message: "Order has been created",
      payment: payment,
    });
  } catch (error) {
    // Handle unexpected errors
    serverErrorHelper(res, error);
  }
};

export { createOrders };
