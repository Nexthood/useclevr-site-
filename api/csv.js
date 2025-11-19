// /api/csv.js — UseClevr Advanced CSV Analysis Engine // ------------------------------------------------------------- // Vercel Serverless Function // Extracts insights + KPIs in structured JSON // Uses OpenAI gpt-4.1 for high‑quality analysis

import OpenAI from "openai";

// Disable default body parser → enable raw file upload export const config = { api: { bodyParser: false, }, };

// Helper: read multipart form-data into buffer async function readRawBody(req) { return new Promise((resolve, reject) => { let chunks = []; req.on("data", (c) => chunks.push(c)); req.on("end", () => resolve(Buffer.concat(chunks))); req.on("error", reject); }); }

// Helper: extract CSV content from multipart upload function extractCSV(buffer) { const text = buffer.toString("utf8"); const firstBreak = text.indexOf("\n"); return text.substring(firstBreak + 1); }

export default async function handler(req, res) { if (req.method !== "POST") { return res.status(405).json({ error: "Method not allowed" }); }

try { // Read raw upload const buffer = await readRawBody(req); const csvText = extractCSV(buffer).trim();

if (!csvText || csvText.length < 5) {
  return res.status(400).json({ error: "Invalid or empty CSV." });
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ADVANCED CSV ANALYSIS PROMPT
const prompt = `

You are UseClevr's advanced data analyst. Analyze this CSV STRICTLY and return:

1. A short, clean summary (3 sentences max).


2. EXACT 3 KPI values, formatted SHORT. Examples:

Revenue Growth: +12%

Avg. Order Value: $47

Churn Rate: 2.1%



3. A "Key Insight" (1 sentence).


4. A "Recommendation" (1 actionable sentence).



CSV DATA: ${csvText}

Return JSON ONLY in this format ↓↓↓ { "summary": "...", "kpis": ["KPI1", "KPI2", "KPI3"], "insight": "...", "recommendation": "..." } `;

const completion = await client.chat.completions.create({
  model: "gpt-4.1", // higher quality for structured output
  temperature: 0.2,
  response_format: { type: "json_object" },
  messages: [
    { role: "user", content: prompt }
  ],
});

const json = completion.choices?.[0]?.message?.content;
const parsed = JSON.parse(json);

return res.status(200).json({
  reply: parsed.summary,
  kpis: parsed.kpis,
  insight: parsed.insight,
  recommendation: parsed.recommendation,
});

} catch (err) { console.error("CSV ANALYSIS ERROR:", err); return res.status(500).json({ error: "Failed to analyze CSV." }); } }
