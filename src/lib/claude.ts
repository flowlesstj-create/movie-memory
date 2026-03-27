import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function generateMovieFact(movie: string): Promise<string> {
  let message;
  try {
    message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `You are a movie expert. Provide one interesting and little-known fact about the movie "${movie}". Keep it concise (2-3 sentences). If you don't recognize the movie, say so politely.`,
        },
      ],
    });
  } catch (err) {
    console.error("Claude API error:", err);
    throw new Error("Failed to generate movie fact");
  }

  if (!message.content || message.content.length === 0) {
    throw new Error("Empty response from Claude");
  }
  const block = message.content[0];
  if (block.type !== "text" || !block.text.trim()) {
    throw new Error("Empty response from Claude");
  }

  return block.text.trim();
}
