import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";
import { runClevrBot } from "./clevrBot.js";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const reply = await runClevrBot(client, req.body.message);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(3000, () => console.log("UseClevr Bot API running..."));
