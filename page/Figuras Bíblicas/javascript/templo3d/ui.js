const CATS = [
  { name: "El edificio", ids: ["temple", "temple-roof", "ulam", "hekal", "debir", "chambers", "pillars", "veil"] },
  { name: "Mobiliario sagrado", ids: ["altar", "sea", "lavers", "incense", "table", "menorot", "ark", "cherubim"] },
  { name: "Los atrios", ids: ["court-inner", "court-great", "gates"] },
];

export function buildUI(parts, api) {
  const list = document.getElementById("part-list");
  const byId = {};
  for (const p of parts) byId[p.id] = p;

  const btns = {};
  for (const cat of CATS) {
    const h = document.createElement("div");
    h.className = "cat";
    h.textContent = cat.name;
    list.appendChild(h);
    for (const id of cat.ids) {
      const p = byId[id];
      if (!p) continue;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "part-btn";
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<span class="dot"></span><span>${p.name}</span>`;
      b.addEventListener("click", () => api.select(p.id));
      list.appendChild(b);
      btns[id] = b;
    }
  }

  const infoCard = document.getElementById("info-card");
  const infoName = document.getElementById("info-name");
  const infoHeb = document.getElementById("info-hebrew");
  const infoRef = document.getElementById("info-ref");
  const infoDesc = document.getElementById("info-desc");
  document.getElementById("btn-info-close").addEventListener("click", () => api.deselect());

  function highlight(id) {
    for (const [k, b] of Object.entries(btns)) {
      const active = k === id;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    }
  }
  function showInfo(id) {
    const p = byId[id];
    if (!p) return;
    infoName.textContent = p.name;
    infoHeb.textContent = p.hebrew;
    infoRef.textContent = p.ref;
    infoDesc.textContent = p.desc;
    infoCard.classList.remove("hidden");
  }
  function hideInfo() { infoCard.classList.add("hidden"); }

  const panel = document.getElementById("panel");
  const panelBtn = document.getElementById("btn-panel-close");
  function setPanelCollapsed(collapsed) {
    panel.classList.toggle("collapsed", collapsed);
    panelBtn.textContent = collapsed ? "☰" : "✕";
    panelBtn.title = collapsed ? "Mostrar partes" : "Ocultar";
    panelBtn.setAttribute("aria-label", collapsed ? "Mostrar lista de partes" : "Ocultar lista de partes");
    panelBtn.setAttribute("aria-expanded", String(!collapsed));
  }
  panelBtn.addEventListener("click", () => setPanelCollapsed(!panel.classList.contains("collapsed")));
  setPanelCollapsed(window.innerWidth <= 860);

  return { highlight, showInfo, hideInfo, setPanelCollapsed, btns };
}
