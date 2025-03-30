"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import getStripe from "@/lib/stripe-js";
// import { createCheckoutSession } from "@/actions/createCheckoutSession";
// import createStripePortal from "@/actions/createStripePortal";
// import { Button } from "@/components/ui/button";
// import { useSubscription } from "@/hooks/useSubscription";
// import getStripe from "@/lib/stripe-js";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { createCheckoutSession } from "../actions/createCheckoutSession";

export type userDetails = {
  email: string;
  name: string;
};

function PricingPage() {
  const { user } = useUser();
  const router = useRouter();
  //pull the user's subscription.
  const { loading, hasActiveMembership } = useSubscription();
  const [isPending, setTransition] = useTransition();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: userDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    };

    //Load Stripe
    setTransition(async () => {
      const stripe = await getStripe();
      if (hasActiveMembership) {
        //create the stripe portal
        // const stripePortalUrl = await createStripePortal();
        // return router.push(stripePortalUrl);
      }
      const sessionId = await createCheckoutSession(userDetails);
      await stripe?.redirectToCheckout({
        sessionId,
      });
    });
  };
  return (
    <div className="flex-1">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-semibold leading-7 text-base text-indigo-600">
            pricing
          </h2>
          <p className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Find the Right Plan for Your Organization
          </p>
        </div>
        <p className="max-w-2xl mx-auto text-center mt-6 px-10 leading-8 text-lg text-gray-600">
          Whether you’re just getting started or need advanced features, we’ve
          got a plan to fit your needs.
        </p>
        <div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:max-w-2xl lg:max-w-4xl">
          {/* FREE */}
          <div className="ring-1 ring-gray-200 p-8 h-fit rounded-3xl pb-12">
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              Start Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray">
              Explore core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                Free
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Create up to 2 chatbots
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                25 total user sessions per month
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Basic session logs only
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                No advanced analytics
              </li>
            </ul>
          </div>
          {/* PRO */}
          <div className="ring-2 ring-indigo-600 rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-indigo-600">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Maximize the Productivity with Pro Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $5.99
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                / month
              </span>
            </p>
            <Button
              variant="ghost"
              className="bg-indigo-600 w-full text-white hover:bg-indigo-500 mt-6 py-2 block
              rounded-md text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading || isPending}
              onClick={handleUpgrade}
            >
              {isPending || loading
                ? "Loading..."
                : hasActiveMembership
                  ? "Manage Plan"
                  : "Upgrade to Pro"}
              Upgrade to Pro
            </Button>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Unlimited chatbots
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Unlimited user sessions
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Priority support
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                Train your chatbot with unlimited Parameters
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-6 text-indigo-600" />
                24-hour support response time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
