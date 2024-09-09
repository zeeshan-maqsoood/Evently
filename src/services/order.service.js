import { OrderModel } from "../database/postgres.js";

const createOrder = async (eventId, userId, amount, currency) => {
  return await OrderModel.create({ eventId, userId, amount, currency });
};

const updateOrderByPaymentIntentId = async (orderId, paymentIntentId) => {
  const updatedOrder = await OrderModel.update(
    { paymentIntend_id: paymentIntentId },
    {
      where: {
        _id: orderId,
      },
    }
  );
  return updatedOrder;
};

export { createOrder, updateOrderByPaymentIntentId };
