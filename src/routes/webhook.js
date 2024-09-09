import express from 'express';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { config } from '../config/globalenv.js';

// Replace with your actual Stripe secret key and webhook signing secret
const stripe = new Stripe(config.stripe_secret_key, { apiVersion: '2022-08-01' });
const endpointSecret = "whsec_3bee681702a70d7a85ed7017d1919672f612f5de6cd2c9ae94476265f3e9adba";

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const buf = await buffer(req);
    const payload = buf.toString();
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('PaymentIntent was successful!');
      // Handle the event
      break;
    case 'payment_method.attached':
      console.log('PaymentMethod was attached to a Customer!');
      // Handle the event
      break;
    // Add more case statements to handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
