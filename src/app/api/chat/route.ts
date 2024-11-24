import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: openrouter("gpt-3.5-turbo"),
      messages,
      maxTokens: 100,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Generation Error:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
