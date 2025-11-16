import OpenAI from "openai";

export async function runClevrBot(client, userMessage) {
  if (!client) throw new Error("OpenAI client missing");

  const cleanInput = (userMessage || "").toString().slice(0, 300);

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    max_tokens: 120,
    messages: [
      {
        role: "system",
        content: "You are UseClevr Bot. Respond short, clear, maximum 2–3 sentences."
      },
      {
        role: "user",
        content: cleanInput
      }
    ]
  });

  return completion.choices[0].message.content;
}
