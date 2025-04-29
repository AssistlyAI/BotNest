// /app/api/messages/[chatSessionId]/route.ts
import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chatSessionId: string }> }
) {
  const { chatSessionId } = await params;
  if (!chatSessionId) {
    return NextResponse.json(
      { error: "Missing chatSessionId" },
      { status: 400 }
    );
  }

  try {
    const messages = await prismaClient.message.findMany({
      where: { chatSessionId },
      orderBy: { created_at: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
