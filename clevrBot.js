// ===============================
// UseClevr Bot (SUPER SIMPLE VERSION)
// Works by just opening index.html
// No backend, no npm, no server
// ===============================

// ---------- FILE: index.html ----------
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UseClevr Bot</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="chat-avatar"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=UseClevr"/></div>
  <div id="chat-container">

  <div id="chat-container">
    <div id="messages"></div>

    <div id="input-area">
      <input id="user-input" type="text" placeholder="Ask something...">
      <button id="send-btn">Send</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
</html>
*/


// ---------- FILE: script.js ----------
/*
async function sendMessage() {
  const input = document.getElementById("user-input");
  const messagesDiv = document.getElementById("messages");
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = text;
  messagesDiv.appendChild(userDiv);

  input.value = "";

  // Call OpenAI directly
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      max_tokens: 120,
      messages: [
        { role: "system", content: "You are UseClevr Bot — explain clearly what UseClevr does. Start each new chat with a friendly welcome message like: 'Welcome to UseClevr — your AI data assistant! Upload a CSV or ask a question, and I’ll generate dashboards, insights, and clear explanations.' Include features when relevant: instant CSV insights, automated dashboards, summaries, chart generation, anomaly detection, KPI extraction, business metrics, and natural-language analysis.

When users ask about pricing, explain UseClevr's offering clearly and simply. When new users appear, ask one or two onboarding questions (e.g., 'What type of data are you working with?' or 'What insights do you want to explore?'). Maintain a friendly, professional, simple brand tone." },
        { role: "user", content: text }
      ]
    })
  });

  const data = await response.json();

  const botDiv = document.createElement("div");
  botDiv.className = "message bot";

  if (data.choices) {
    botDiv.textContent = data.choices[0].message {
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.4;
  max-width: 85%;
  word-wrap: break-word;
} else {
    botDiv.textContent = "Error: " + (data.error?.message || "Unknown error");
  }

  messagesDiv.appendChild(botDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById("send-btn").onclick = sendMessage;

document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
*/


// ---------- FILE: style.css ----------
/*
body {
  background: #05050a;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

#chat-container {
  width: 320px;
  height: 480px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 20px;
  padding: 14px;
  box-shadow: 0 10px 35px rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
}

#messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 12px;
  padding: 6px;
}

.message {
  padding: 8px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
}

.user {
  background: #00d4ff;
  color: black;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.bot {
  background: rgba(255,255,255,0.15);
  border-bottom-left-radius: 4px;
}

#input-area {
  display: flex;
  gap: 8px;
}

#user-input {
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: white;
}

#send-btn {
  padding: 10px 16px;
  border-radius: 12px;
  background: #00d4ff;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
*/
