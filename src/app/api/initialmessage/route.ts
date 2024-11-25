export async function GET() {
  try {
    return Response.json({
      id: "initial_m",
      content: "Hello Welcome to LangBook 🥳, how can i help you?",
      role: "assistant",
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to get initial message" },
      { status: 500 }
    );
  }
}
