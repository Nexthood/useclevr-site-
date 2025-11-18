<!-- index.html - Cool Popup Window Version --><!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UseClevr Bot</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>  <!-- Floating Button -->  <div id="chat-launcher">
    <img src="./assets/avatar.png" alt="Avatar" />
  </div>  <!-- Popup Chat Window -->  <div id="chat-popup" class="hidden">
    <div class="popup-header">
      <img src="./assets/avatar.png" />
      <span>UseClevr Assistant</span>
      <button id="close-popup">×</button>
    </div><div id="messages"></div>

<div id="typing" class="hidden">UseClevr is typing...</div>

<div class="popup-input">
  <input id="user-input" placeholder="Ask something..." />
  <button id="send-btn">Send</button>
</div>

  </div>  <script src="script.js"></script></body>
</html><!-- style.css - Cool Popup Visual Style --><style>
body {
  background: #0a0a1f;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

#chat-launcher {
  position: fixed;
  bottom: 22px;
  right: 22px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
  transition: 0.3s;
}

#chat-launcher:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.85);
}

#chat-launcher img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#chat-popup {
  position: fixed;
  bottom: 110px;
  right: 22px;
  width: 340px;
  height: 480px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 45px rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity .25s, transform .25s;
}

.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
}

.popup-header {
  display: flex;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.popup-header img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 10px;
}

.popup-header span {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

#close-popup {
  margin-left: auto;
  font-size: 22px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

#messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  color: white;
}

.message {
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 10px;
  max-width: 85%;
  font-size: 14px;
}

.message.user {
  background: rgba(0, 212, 255, 0.25);
  align-self: flex-end;
}

.message.bot {
  background: rgba(255,255,255,0.12);
  align-self: flex-start;
}

.popup-input {
  display: flex;
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.15);
}

.popup-input input {
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
}

.popup-input button {
  margin-left: 8px;
  background: #00d4ff;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  color: black;
}
</style><!-- script.js - Updated to Support Popup --><script>
const launcher = document.getElementById("chat-launcher");
const popup = document.getElementById("chat-popup");
const closeBtn = document.getElementById("close-popup");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typingDiv = document.getElementById("typing");

launcher.onclick = () => popup.classList.remove("hidden");
closeBtn.onclick = () => popup.classList.add("hidden");

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
  typingDiv.classList.remove("hidden");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    typingDiv.classList.add("hidden");

    if (data.reply) addMessage(data.reply, "bot");
    else addMessage("(No response)", "bot");

  } catch (err) {
    typingDiv.classList.add("hidden");
    addMessage("Server error.", "bot");
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
</script>
