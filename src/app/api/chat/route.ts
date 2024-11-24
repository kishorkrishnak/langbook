import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  try {
    const { text } = await generateText({
      model: openrouter("gpt-3.5-turbo"),
      prompt,
      maxTokens: 100,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Generation Error:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
