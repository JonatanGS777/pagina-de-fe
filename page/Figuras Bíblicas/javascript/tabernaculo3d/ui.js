const CATS = [
  { name: "El Atrio", ids: ["atrio", "puerta-atrio", "columnas", "altar", "fuente", "tienda"] },
  { name: "La Estructura", ids: ["tablas", "barras", "pantalla", "velo"] },
  { name: "El Santuario", ids: ["lugar-santo", "candelero", "mesa", "incensario", "lugar-santisimo", "arca", "propiciatorio"] },
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
      b.className = "part-btn";
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
    for (const [k, b] of Object.entries(btns)) b.classList.toggle("active", k === id);
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
  panelBtn.addEventListener("click", () => {
    const collapsed = panel.classList.toggle("collapsed");
    panelBtn.textContent = collapsed ? "☰" : "✕";
    panelBtn.title = collapsed ? "Mostrar partes" : "Ocultar";
  });

  return { highlight, showInfo, hideInfo, btns };
}
