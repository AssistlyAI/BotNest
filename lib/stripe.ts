import Stripe from "stripe";

const stripeAccessKey = process.env.STRIPE_API_KEY;

if (!stripeAccessKey) {
  throw new Error("STRIPE_API_KEY not set");
}

const stripe = new Stripe(stripeAccessKey);

export default stripe;
