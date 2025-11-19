import OpenAI from "openai";

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } }
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `
You are the official UseClevr Assistant.
You help users understand:
- pricing
- CSV analysis
- features
- benefits
Keep messages short, clean, professional.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
}
