// Elements
const launcher = document.getElementById("central-launcher");
const panel = document.getElementById("central-panel");
const closeBtn = document.getElementById("panel-close");
const input = document.getElementById("user-input");
const send = document.getElementById("send-btn");
const responseBox = document.getElementById("smart-response");
const csvBtn = document.querySelector(".csv-btn");
const csvInput = document.getElementById("csv-file");
const kpiBox = document.getElementById("kpi-cards");

// Open panel
launcher.onclick = () => {
  panel.classList.remove("hidden");
};

// Close panel
closeBtn.onclick = () => {
  panel.classList.add("hidden");
};

// Text message
async function sendMessage(msg) {
  responseBox.textContent = "...";

  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await r.json();
  responseBox.textContent = data.reply;
}

send.onclick = () => {
  const msg = input.value;
  if (!msg) return;
  sendMessage(msg);
  input.value = "";
};

// CSV upload
csvBtn.onclick = () => csvInput.click();

csvInput.onchange = async () => {
  const file = csvInput.files[0];
  const form = new FormData();
  form.append("file", file);

  responseBox.textContent = "Analyzing CSV...";

  const r = await fetch("/api/csv", {
    method: "POST",
    body: form
  });

  const data = await r.json();

  responseBox.textContent = data.reply;

  if (data.kpis) {
    kpiBox.classList.remove("hidden");
    document.getElementById("kpi-1").textContent = data.kpis[0];
    document.getElementById("kpi-2").textContent = data.kpis[1];
    document.getElementById("kpi-3").textContent = data.kpis[2];
  }
};
