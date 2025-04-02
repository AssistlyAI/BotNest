import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: NextRequest) {
  const { name, chat_session_id, chatbot_id, content } = await req.json();
  try {
    const chatbot = await prismaClient.chatbot.findUnique({
      where: { id: chatbot_id },
      include: { characteristics: true }, // <-- Include characteristics here
    });

    if (!chatbot) {
      return NextResponse.json({ error: "chatbot not found" }, { status: 404 });
    }

    const messagesData = await prismaClient.message.findMany({
      where: { chatSessionId: chat_session_id },
      orderBy: { created_at: "asc" },
    });

    //Fromatting the previous messages data into the form of data that open ai completions api accepts.
    const formattedPreviousMessages: ChatCompletionMessageParam[] =
      messagesData.map((message) => ({
        role: message.sender === "ai" ? "system" : "user",
        name: message.sender === "ai" ? "system" : name,
        content: message.content,
      }));

    // Step 3: Construct system prompt from chatbot characteristics
    const systemPrompt = chatbot.characteristics
      .map((characteristic) => characteristic.content)
      .join(" + ");

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        name: "system",
        content: `You are a helpful assistant talking to ${name}.If a generic question is asked which is not relevant or in the same scope or domain
      as the points in mentioned in the key information section,kindly inform the user they are only allowed to search for a specified content.Use Emoji's where possible.
      Here is some key information that you need to be aware of,these are elements you may be asked about: ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      {
        role: "user",
        name: name,
        content: content,
      },
    ];

    //step 3: Send the message to the openai completion API.
    const openaiResponse = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    const aiResponse = openaiResponse?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to generate AI Response" },
        { status: 404 }
      );
    }

    //step 4:save the user's message in the databse.
    // Step 5: Save user message
    await prismaClient.message.create({
      data: {
        chatSessionId: chat_session_id,
        content,
        sender: "user",
      },
    });

    // Step 6: Save AI message
    const aiMessage = await prismaClient.message.create({
      data: {
        chatSessionId: chat_session_id,
        content: aiResponse,
        sender: "ai",
      },
    });

    // Step 7: Return AI response
    return NextResponse.json({
      id: aiMessage.id,
      content: aiResponse,
    });
  } catch (error) {
    console.log("Error sending the message: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
