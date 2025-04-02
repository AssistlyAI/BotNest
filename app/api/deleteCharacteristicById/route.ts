import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prismaClient.chatbotCharacteristics.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        message: `Succesfully deleted the characteristic with ID:${id}`,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: `Error deleting chatbot: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}
