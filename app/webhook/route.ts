import { prismaClient } from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const headerList = headers();
  const body = await req.text();
  const signature = (await headerList).get("stripe-signature");

  if (!signature) {
    return new Response("No Signature", { status: 400 });
  }
  if (!process.env.WEB_HOOK_SECRET) {
    console.log("Stripe webhook secret is not set");
    return new NextResponse("Stripe webhook secret is not set", {
      status: 400,
    });
  }
  //  console.log("DEBUG, The webhook is triggering");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEB_HOOK_SECRET
    );
  } catch (err) {
    console.log(`webhook error,${err}`);
    return new NextResponse(`webhook error,${err}`, { status: 400 });
  }

  const getUserDetails = async (customerId: string) => {
    const user = await prismaClient.user.findUnique({
      where: { userId: customerId },
    });

    if (!user) {
      return null;
    }

    return user;
  };
  switch (event.type) {
    case "checkout.session.completed":
    case "payment_intent.succeeded": {
      const invoice = event.data.object;
      const customerId = invoice.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        return new NextResponse("User not found", { status: 404 });
      }

      await prismaClient.user.update({
        where: {
          id: userDetails?.id,
        },
        data: {
          hasActiveMembership: true,
        },
      });
      console.log("updated db");
      break;
    }
    case "customer.subscription.deleted":
    case "payment_intent.canceled": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        return new NextResponse("User not found", { status: 404 });
      }

      await prismaClient.user.update({
        where: {
          id: userDetails?.id,
        },
        data: {
          hasActiveMembership: false,
        },
      });

      break;
    }

    default:
      console.log("Unhandled event type: ", event.type);
  }
  return NextResponse.json({ message: "Webhook Received" });
}
