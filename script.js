  // USECLEVR SMART PANEL LOGIC (PREMIUM VERSION) // --------------------------------------------------

// ELEMENTS const launcher = document.getElementById("central-launcher"); const panel = document.getElementById("central-panel"); const closeBtn = document.getElementById("panel-close"); const input = document.getElementById("user-input"); const send = document.getElementById("send-btn"); const responseBox = document.getElementById("smart-response"); const csvBtn = document.querySelector(".csv-btn"); const csvInput = document.getElementById("csv-file"); const kpiBox = document.getElementById("kpi-cards");

// -------------------------------------------------- // OPEN / CLOSE PANEL // -------------------------------------------------- launcher.onclick = () => { panel.classList.remove("hidden"); panel.classList.add("fade-in"); };

closeBtn.onclick = () => { panel.classList.add("hidden"); };

// -------------------------------------------------- // TEXT MESSAGE LOGIC // -------------------------------------------------- async function sendMessage(msg) { kpiBox.classList.add("hidden"); // hide KPIs for non-CSV actions responseBox.textContent = "...";

try { const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg }) });

const data = await r.json();
responseBox.textContent = data.reply || "No response";

} catch (err) { responseBox.textContent = "Server error."; } }

send.onclick = () => { const msg = input.value.trim(); if (!msg) return; sendMessage(msg); input.value = ""; };

input.addEventListener("keypress", e => { if (e.key === "Enter") send.click(); });

// -------------------------------------------------- // CSV UPLOAD HANDLER // -------------------------------------------------- csvBtn.onclick = () => csvInput.click();

csvInput.onchange = async () => { const file = csvInput.files[0]; if (!file) return;

responseBox.textContent = "Analyzing CSV..."; kpiBox.classList.add("hidden");

const formData = new FormData(); formData.append("file", file);

try { const r = await fetch("/api/csv", { method: "POST", body: formData });

const data = await r.json();

// Show main AI text
responseBox.textContent = data.reply || "No insights";

// Inject KPI cards
if (data.kpis) {
  kpiBox.classList.remove("hidden");
  document.getElementById("kpi-1").textContent = data.kpis[0] || "";
  document.getElementById("kpi-2").textContent = data.kpis[1] || "";
  document.getElementById("kpi-3").textContent = data.kpis[2] || "";
}

} catch (err) { responseBox.textContent = "Error analyzing CSV."; } };

// -------------------------------------------------- // TESTIMONIAL ROTATOR // -------------------------------------------------- const testimonials = document.querySelectorAll(".t-item"); let tIndex = 0;

setInterval(() => { testimonials.forEach(t => t.classList.remove("active")); tIndex = (tIndex + 1) % testimonials.length; testimonials[tIndex].classList.add("active"); }, 4000);
