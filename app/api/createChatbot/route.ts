import { prismaClient } from "@/lib/prisma";
import { stat } from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { title, userId } = await req.json();
  try {
    await prismaClient.chat.create({
      data: {
        title,
        userId,
      },
    });
    return NextResponse.json(
      {
        message: "Chatbot created successfully!",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: `Errro creating the chatbot: ${(e as Error).message}`,
      },
      { status: 400 }
    );
  }
}
