"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

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

        // Fetch chatbot info
        const chatbotRes = await fetch(`/api/getChatbot?userId=${userId}`);
        const chatbotData = await chatbotRes.json();

        if (!chatbotRes.ok) {
          throw new Error(chatbotData.error || "Failed to fetch chatbot");
        }

        // Assuming chatbotData is either a single bot or array — adjust accordingly
        const chatbot = Array.isArray(chatbotData)
          ? chatbotData[0]
          : chatbotData;

        const characteristicsCount = chatbot?.characteristics?.length || 0;
        setHasSufficientCharacteristics(characteristicsCount > 5);
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
    hasSufficientCharacteristics,
    loading,
    error,
  };
}
