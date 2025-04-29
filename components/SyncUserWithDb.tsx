"use client";
import { prismaClient } from "@/lib/prisma";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

function SyncUserWithDb() {
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!user || !isLoaded) return;

    const sync = async () => {
      await fetch("/api/sync-user", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          userName: user.fullName,
          userEmail: user.primaryEmailAddress?.emailAddress,
        }),
      });
    };

    sync();
  }, [user, isLoaded]);

  return null;
}

export default SyncUserWithDb;
