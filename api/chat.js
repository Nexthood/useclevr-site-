import OpenAI from "openai";
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // Load UseClevr Knowledge Brain
    const brainPath = path.join(process.cwd(), "data", "brain.json");
    const brainData = await fs.readFile(brainPath, "utf8");
    const brain = JSON.parse(brainData);

    // Merge user message
    const userMessage = req.body.message || "";

    // Build system prompt using brain.json
    const systemPrompt = `
You are UseClevr Bot — the official assistant for the UseClevr company.

Always answer:
- professionally  
- short and clear  
- helpful  
- friendly  
- confident  
- aligned with UseClevr branding  

Here is the official company knowledge:

Company Info:
${JSON.stringify(brain.company, null, 2)}

Products:
${JSON.stringify(brain.products, null, 2)}

Pricing:
${JSON.stringify(brain.pricing, null, 2)}

FAQ:
${JSON.stringify(brain.faq, null, 2)}

Branding Style:
${JSON.stringify(brain.branding, null, 2)}

If the user asks something outside these topics, answer generally but keep the UseClevr tone.
    `;

    // Send to OpenAI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Server Error" });
  }
}
