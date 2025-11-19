// /api/csv.js — UseClevr Advanced CSV Analysis Engine
// -------------------------------------------------------------
// Vercel Serverless Function
// Extracts insights + KPIs in structured JSON
// Uses OpenAI gpt-4.1 for high-quality analysis

import OpenAI from "openai";

// Disable default body parser → enable raw file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

// Read raw request body
async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// Extract CSV text from uploaded file
function extractCSV(buffer) {
  const text = buffer.toString("utf8");
  const firstBreak = text.indexOf("\n");
  return text.substring(firstBreak + 1);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const buffer = await readRawBody(req);
    const csvText = extractCSV(buffer).trim();

    if (!csvText || csvText.length < 5) {
      return res.status(400).json({ error: "Invalid or empty CSV." });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // AI Prompt
    const prompt = `
You are UseClevr's advanced data analyst.
Analyze this CSV STRICTLY and return:

1. A short summary (max 3 sentences)
2. EXACT 3 KPIs (short, numeric)
3. One key insight
4. One recommendation

CSV DATA:
${csvText}

Return ONLY JSON:
{
  "summary": "...",
  "kpis": ["...", "...", "..."],
  "insight": "...",
  "recommendation": "..."
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    let jsonResponse = completion.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(jsonResponse);
    } catch (e) {
      // fallback: if AI returned messy JSON, fix it
      jsonResponse = jsonResponse
        .replace(/[\n\r]/g, " ")
        .replace(/```json/g, "")
        .replace(/```/g, "");

      parsed = JSON.parse(jsonResponse);
    }

    return res.status(200).json({
      reply: parsed.summary,
      kpis: parsed.kpis,
      insight: parsed.insight,
      recommendation: parsed.recommendation,
    });

  } catch (err) {
    console.error("CSV ANALYSIS ERROR:", err);
    return res.status(500).json({
      error: "Failed to analyze CSV."
    });
  }
}
