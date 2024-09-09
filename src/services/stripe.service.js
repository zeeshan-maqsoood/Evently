import Stripe from "stripe";
import { config } from "dotenv";
// Initialize Stripe with your secret key
const Config = config();
const stripe = new Stripe(Config.parsed.STRIPE_SECRET_KEY);
// Function to create a customer
const createCustomer = async (email, description) => {
  try {
    return await stripe.customers.create({
      email: email,
      description: description,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Function to create a PaymentIntent
const createPaymentIntent = async (amount, currency, metadata) => {
  try {
    return await stripe.paymentIntents.create({
      amount: parseInt(amount, 10), // Convert amount to integer
      currency: currency,
      metadata: metadata, // Pass metadata object here
      automatic_payment_methods:{enabled:true}
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export { createCustomer, createPaymentIntent };
