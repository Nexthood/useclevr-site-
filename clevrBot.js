// ===============================
// FILE: script.js (FRONTEND JS - CLEAN & CORRECT)
// ===============================

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (data.reply) addMessage(data.reply, "bot");
    else addMessage("(No response)", "bot");

  } catch (err) {
    addMessage("Server error. Check connection.", "bot");
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ===============================
// FILE: clevrBot.js (Core Bot Logic - CLEAN & CORRECT)
// ===============================

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
        content: "You are UseClevr Bot. Respond short, clear, max 2–3 sentences."
      },
      {
        role: "user",
        content: cleanInput
      }
    ]
  });

  return completion.choices[0].message.content;
}

// END OF USECLEVR BOT REPO
