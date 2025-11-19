import OpenAI from "openai";

export const config = {
  api: { bodyParser: false }
};

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function extractCSV(buffer) {
  const text = buffer.toString("utf8");
  const firstBreak = text.indexOf("\n");
  return text.substring(firstBreak + 1);
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const buffer = await readRawBody(req);
    const csv = extractCSV(buffer);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are UseClevr's data analyst.
Analyze CSV and return:
- summary (3 sentences)
- EXACT 3 KPIs
- 1 insight
- 1 recommendation

CSV:
${csv}

Return ONLY JSON.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }]
    });

    const parsed = JSON.parse(completion.choices[0].message.content);

    return res.status(200).json({
      reply: parsed.summary,
      kpis: parsed.kpis,
      insight: parsed.insight,
      recommendation: parsed.recommendation
    });
  } catch (err) {
    return res.status(500).json({ error: "CSV error" });
  }
}
