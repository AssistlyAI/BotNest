"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useRouter } from "next/navigation";
import createStripePortal from "@/actions/createStripePortal";

function UpgradeButoon() {
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const handleAccount = () => {
    setTransition(async () => {
      const stripePortalUrl = await createStripePortal();
      router.push(stripePortalUrl);
    });
  };

  if (!hasActiveMembership && !loading) {
    return (
      <Button asChild variant="default" className="border-indigo-600">
        <Link href="/upgrade">
          Upgrade <StarIcon className="ml-3 fill-indigo-600 text-white" />
        </Link>
      </Button>
    );
  }

  if (loading) {
    <Button variant="default" className="border-indigo-600">
      <Loader2Icon className="animate-spin" />
    </Button>;
  }

  return (
    <Button
      disabled={isPending}
      className="!border-indigo-600 !bg-indigo-600"
      onClick={handleAccount}
      variant="default"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <p>
          <span className="font-extrabold">PRO </span>Account
        </p>
      )}
    </Button>
  );
}

export default UpgradeButoon;
