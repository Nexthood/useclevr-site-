// ===============================
// UseClevr Bot - script.js (FRONTEND)
// ===============================

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message bubble
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message to backend
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
    else addMessage("(No response from server)", "bot");

  } catch (error) {
    addMessage("❌ Server Offline — Check your backend!", "bot");
  }
}

// Click button
sendBtn.onclick = sendMessage;

// Press Enter
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
