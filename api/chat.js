import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const userMessage = req.body.message || "";

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      max_tokens: 120,
      messages: [
        { role: "system", content: "You are UseClevr Bot. Answer short and helpful." },
        { role: "user", content: userMessage }
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
