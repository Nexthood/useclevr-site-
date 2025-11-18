// /api/csv.js
import OpenAI from "openai";

// Enable file parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read multipart form-data
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
    req.on("error", reject);
  });
}

// Extract CSV text from multipart request
function extractCSV(buffer) {
  const text = buffer.toString("utf8");

  const csvStart = text.indexOf("\n"); // skip headers
  return text.substring(csvStart + 1);
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse form and extract CSV
    const buffer = await parseForm(req);
    const csvText = extractCSV(buffer);

    if (!csvText || csvText.trim().length < 5) {
      return res.status(400).json({ error: "Invalid CSV file" });
    }

    // Initialize AI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Generate insights based on CSV text
    const prompt = `
You are a business data analyst. 
Analyze the following CSV data and extract:

1. Summary (3 sentences)
2. Top 3 trends
3. Top 3 anomalies
4. Relevant KPIs (numbers only)
5. One actionable recommendation

CSV DATA:
${csvText}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.3,
    });

    const aiReply = completion.choices?.[0]?.message?.content || "No data found.";

    return res.status(200).json({
      reply: aiReply,
    });

  } catch (err) {
    console.error("CSV API Error:", err);
    return res.status(500).json({
      error: "Failed to analyze CSV",
    });
  }
}

