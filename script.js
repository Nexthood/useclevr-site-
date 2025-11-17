const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typingDiv = document.getElementById("typing");
const floatingBtn = document.getElementById("floating-button");
const widget = document.getElementById("chat-widget");
const closeBtn = document.getElementById("close-widget");

// Open widget
floatingBtn.onclick = () => {
  widget.classList.remove("hidden");
};

// Close widget
closeBtn.onclick = () => {
  widget.classList.add("hidden");
};

// Add message helper
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
    addMessage("Error contacting server.", "bot");
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
