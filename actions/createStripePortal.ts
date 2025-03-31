"use server";

import getBaseUrl from "@/lib/getBaseUrl";
import { prismaClient } from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

async function createStripePortal() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  const user = await prismaClient.user.findUnique({
    where: { userId },
  });
  const customerId = user?.stripeCustomerId;

  if (!customerId) {
    throw new Error("Stripe customer not found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${getBaseUrl()}`,
  });

  return session.url;
}

export default createStripePortal;
