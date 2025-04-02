"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const PRO_LIMIT = 20;
const FREE_LIMIT = 1;

export function useSubscription(refreshTrigger?: any) {
  const { user } = useUser();
  const userId = user?.id;

  const [hasActiveMembership, setHasActiveMembership] = useState<
    boolean | null
  >(null);
  const [hasSufficientCharacteristics, setHasSufficientCharacteristics] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userLimit, setUserLimit] = useState<number>();

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch(`/api/getUser?userId=${userId}`);
        const userData = await userRes.json();

        if (!userRes.ok) {
          throw new Error(userData.error || "Failed to fetch user");
        }

        setHasActiveMembership(userData.hasActiveMembership);
        setUserLimit(userData.hasActiveMembership ? PRO_LIMIT : FREE_LIMIT);

        // Fetch chatbot info
        const chatbotRes = await fetch(`/api/getChatbots?userId=${userId}`);
        const chatbotData = await chatbotRes.json();

        if (!chatbotRes.ok) {
          throw new Error(chatbotData.error || "Failed to fetch chatbot");
        }

        // Assuming chatbotData is either a single bot or array — adjust accordingly
        // const chatbot = Array.isArray(chatbotData)
        //   ? chatbotData[0]
        //   : chatbotData;

        // const characteristicsCount = chatbot?.characteristics?.length || 0;
        // setHasSufficientCharacteristics(characteristicsCount > 5);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, refreshTrigger]);

  return {
    hasActiveMembership,
    userLimit,
    loading,
    error,
  };
}
