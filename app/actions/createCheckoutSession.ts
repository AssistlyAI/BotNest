"use server";
import getBaseUrl from "@/lib/getBaseUrl";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { userDetails } from "../upgrade/page";
import { prismaClient } from "@/lib/prisma";

export async function createCheckoutSession(userDetails: userDetails) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  //First check if the user already has a stripeustomerId\
  let stripeCustomerId;

  const user = await prismaClient.user.findUnique({
    where: { userId: userId },
  });

  stripeCustomerId = user?.stripeCustomerId || null;

  if (!stripeCustomerId) {
    //create new stripe customer
    const customer = await stripe.customers.create({
      email: userDetails.email,
      name: userDetails.name,
      metadata: {
        userId,
      },
    });

    await prismaClient.user.update({
      where: { userId: userId },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    stripeCustomerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_options: {
      card: {},
    },
    line_items: [
      {
        price: "price_1R8NcSPGRRSOJsPgKJm9wCEf",
        quantity: 1,
      },
    ],
    mode: "subscription",
    customer: stripeCustomerId,
    success_url: `${getBaseUrl()}/?upgrade=true`,
    cancel_url: `${getBaseUrl()}/upgrade`,
  });

  return session.id;
}
