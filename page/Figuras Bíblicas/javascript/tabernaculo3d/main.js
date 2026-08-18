import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildWorld, SCALE } from "./tabernaculo.js?v=3";
import { buildUI } from "./ui.js";

/* ------------------------------------------------------------------ */
const wrap = document.getElementById("canvas-wrap");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
wrap.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xe8d5a8, 260, 720);

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 2000);
const OVERVIEW_POS = new THREE.Vector3(0, 30, 52).multiplyScalar(SCALE);
const OVERVIEW_TARGET = new THREE.Vector3(0, 2.5, 0).multiplyScalar(SCALE);
camera.position.copy(OVERVIEW_POS);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* ---------- Luces ---------- */
scene.add(new THREE.HemisphereLight(0x9fc0ec, 0x8a7145, 0.55));
const sun = new THREE.DirectionalLight(0xfff0d0, 2.2);
sun.position.set(50, 85, 75);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -60; sun.shadow.camera.right = 60;
sun.shadow.camera.top = 60; sun.shadow.camera.bottom = -60;
sun.shadow.camera.near = 5; sun.shadow.camera.far = 260;
sun.shadow.bias = -0.0004;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xbfd4ff, 0.35);
fill.position.set(-45, 25, -40);
scene.add(fill);
const candeleroLight = new THREE.PointLight(0xffd9a0, 16, 12, 2);
candeleroLight.position.set(1.5, 2.2, 5);
scene.add(candeleroLight);
const arcaLight = new THREE.PointLight(0xffe3b0, 14, 10, 2);
arcaLight.position.set(0, 1.8, -1.25);
scene.add(arcaLight);
const altarLight = new THREE.PointLight(0xff8a4a, 18, 14, 2);
altarLight.position.set(0, 1.8, 7);
scene.add(altarLight);

/* ---------- Mundo ---------- */
const world = buildWorld(scene);
window.__world = world;
const parts = world.parts;
const byId = {};
for (const p of parts) byId[p.id] = p;

/* ---------- Controles ---------- */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(OVERVIEW_TARGET);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 0.6 * SCALE;
controls.maxDistance = 200;
controls.maxPolarAngle = 1.53;
controls.update();

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.pointerEvents = "none";
wrap.appendChild(labelRenderer.domElement);
for (const p of parts) if (p.label) scene.add(p.label);

/* ---------- Estado ---------- */
let selectedId = null;
let fly = null; // {p0,t0,p1,t1,time,dur}
let walkMode = false;
const tooltip = document.getElementById("tooltip");
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;

/* ---------- UI ---------- */
const ui = buildUI(parts, {
  select: (id) => selectPart(id, true),
  deselect: deselect,
});

/* Paredes, velos y mobiliario interior: al elegir cualquiera de estas
   partes se activa "Ver interior" automáticamente, para que las paredes
   no bloqueen la vista al acercarse o al orbitar desde otro ángulo. */
const INTERIOR_IDS = new Set([
  "lugar-santo", "lugar-santisimo", "candelero", "mesa", "incensario",
  "arca", "propiciatorio", "tablas", "barras", "pantalla", "velo",
]);

function selectPart(id, doFly) {
  if (walkMode) return;
  deselect(false);
  const p = byId[id];
  if (!p) return;
  selectedId = id;
  highlight(p.group, 0x3a2400, 0.55);
  ui.showInfo(id);
  ui.highlight(id);
  if (INTERIOR_IDS.has(id) && !tglGhost.checked) {
    tglGhost.checked = true;
    tglGhost.dispatchEvent(new Event("change"));
  }
  if (doFly && document.getElementById("tgl-fly").checked) {
    flyTo(p.cam, p.look, 1.35);
  }
}
function deselect(clearInfo = true) {
  if (selectedId) highlight(byId[selectedId].group, 0x000000, 0);
  selectedId = null;
  ui.highlight(null);
  if (clearInfo) ui.hideInfo();
}
function highlight(group, color, intensity) {
  group.traverse((o) => {
    if (o.isMesh) {
      const mat = o.material;
      const list = Array.isArray(mat) ? mat : [mat];
      for (const mm of list) {
        if (mm.emissive) {
          if (!mm.userData._e) mm.userData._e = mm.emissive.getHex();
          mm.emissive.setHex(color);
          mm.emissiveIntensity = intensity;
        }
      }
    }
  });
}

/* ---------- Vuelo de cámara ---------- */
function flyTo(pos, look, dur) {
  fly = {
    p0: camera.position.clone(),
    t0: controls.target.clone(),
    p1: pos.clone(),
    t1: look.clone(),
    time: 0,
    dur: dur ?? 1.3,
  };
}
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function tickFly(dt) {
  if (!fly) return;
  fly.time += dt;
  const k = Math.min(1, fly.time / fly.dur);
  const e = ease(k);
  camera.position.lerpVectors(fly.p0, fly.p1, e);
  controls.target.lerpVectors(fly.t0, fly.t1, e);
  if (k >= 1) fly = null;
}

/* ---------- Clic: seleccionar ---------- */
renderer.domElement.addEventListener("pointerdown", (ev) => {
  if (ev.button !== 0 || walkMode) return;
  pointer.x = (ev.clientX / innerWidth) * 2 - 1;
  pointer.y = -(ev.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(world.selectables, false);
  const hit = hits.find((h) => h.object.userData.partId && h.object.visible);
  if (hit) selectPart(hit.object.userData.partId, true);
  else deselect();
});

/* ---------- Hover ---------- */
renderer.domElement.addEventListener("pointermove", (ev) => {
  pointer.x = (ev.clientX / innerWidth) * 2 - 1;
  pointer.y = -(ev.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(world.selectables, false);
  const hit = hits.find((h) => h.object.userData.partId && h.object.visible);
  const id = hit ? hit.object.userData.partId : null;
  if (id !== hovered) {
    hovered = id;
    renderer.domElement.style.cursor = id ? "pointer" : "grab";
    if (id) {
      tooltip.textContent = byId[id].name;
      tooltip.classList.remove("hidden");
      tooltip.style.left = ev.clientX + "px";
      tooltip.style.top = ev.clientY + "px";
    } else tooltip.classList.add("hidden");
  } else if (id) {
    tooltip.style.left = ev.clientX + "px";
    tooltip.style.top = ev.clientY + "px";
  }
});

/* ---------- Botones ---------- */
document.getElementById("btn-enter").addEventListener("click", () => {
  document.getElementById("intro").classList.add("fade");
  flyTo(OVERVIEW_POS, OVERVIEW_TARGET, 2.2);
});
document.getElementById("btn-overview").addEventListener("click", () => {
  if (walkMode) exitWalk();
  flyTo(OVERVIEW_POS, OVERVIEW_TARGET, 1.6);
});
const btnRotate = document.getElementById("btn-rotate");
btnRotate.addEventListener("click", () => {
  controls.autoRotate = !controls.autoRotate;
  btnRotate.classList.toggle("active", controls.autoRotate);
});
document.getElementById("btn-help").addEventListener("click", () => {
  document.getElementById("help-overlay").classList.remove("hidden");
});
document.getElementById("btn-help-close").addEventListener("click", () => {
  document.getElementById("help-overlay").classList.add("hidden");
});

/* etiquetas */
const tglLabels = document.getElementById("tgl-labels");
tglLabels.addEventListener("change", () => {
  labelRenderer.domElement.style.display = tglLabels.checked ? "" : "none";
});
/* ver interior */
const tglGhost = document.getElementById("tgl-ghost");
tglGhost.addEventListener("change", () => {
  const on = tglGhost.checked;
  for (const o of world.ghostShell) {
    const mats = o.userData._ghostMats;
    const list = Array.isArray(mats) ? mats : [mats];
    for (const mm of list) {
      mm.transparent = on;
      mm.opacity = on ? 0.16 : o.userData._ghostFlags.opacity;
      mm.depthWrite = !on;
    }
  }
});

/* ---------- Modo caminata ---------- */
const btnWalk = document.getElementById("btn-walk");
const walkHint = document.getElementById("walk-hint");
const keys = {};
let yaw = -Math.PI / 2, pitch = 0;
let walkY = 1.7 * SCALE;

function enterWalk() {
  walkMode = true;
  controls.enabled = false;
  yaw = camera.rotation.y;
  pitch = camera.rotation.x;
  walkY = Math.max(1.7 * SCALE, camera.position.y);
  btnWalk.classList.add("active");
  walkHint.classList.remove("hidden");
  renderer.domElement.requestPointerLock();
  if (!tglGhost.checked) {
    tglGhost.checked = true;
    tglGhost.dispatchEvent(new Event("change"));
  }
}
function exitWalk() {
  walkMode = false;
  controls.enabled = true;
  btnWalk.classList.remove("active");
  walkHint.classList.add("hidden");
}
btnWalk.addEventListener("click", () => {
  if (walkMode) exitWalk();
  else enterWalk();
});
document.addEventListener("pointerlockchange", () => {
  if (!document.pointerLockElement && walkMode) exitWalk();
});
renderer.domElement.addEventListener("click", () => {
  if (walkMode && !document.pointerLockElement) renderer.domElement.requestPointerLock();
});
document.addEventListener("mousemove", (ev) => {
  if (!walkMode || !document.pointerLockElement) return;
  yaw -= ev.movementX * 0.0024;
  pitch -= ev.movementY * 0.0024;
  pitch = Math.max(-1.4, Math.min(1.4, pitch));
});
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

/* Paredes sólidas de la tienda (tablas de acacia), ver tabernaculo.js:
   tentW=5, zWest=-9.5, zEast=5.5. Un pequeño margen de seguridad (0.24)
   sobre el grosor real de la tabla (0.21) evita que la cámara del modo
   caminata quede incrustada dentro de la geometría. */
const TENT_WALLS = [
  { x0: -2.75, x1: 2.75, z0: -9.9, z1: -9.1 },  // pared oeste (fondo, tras el Lugar Santísimo)
  { x0: 2.08, x1: 2.92, z0: -9.5, z1: 5.5 },    // pared sur (tablas a x=2.5, ancho de tabla 0.75)
  { x0: -2.92, x1: -2.08, z0: -9.5, z1: 5.5 },  // pared norte (tablas a x=-2.5)
].map((w) => ({ x0: w.x0 * SCALE, x1: w.x1 * SCALE, z0: w.z0 * SCALE, z1: w.z1 * SCALE }));
function resolveWallCollision(x, z) {
  for (const w of TENT_WALLS) {
    if (x > w.x0 && x < w.x1 && z > w.z0 && z < w.z1) {
      const d = [x - w.x0, w.x1 - x, z - w.z0, w.z1 - z];
      const min = Math.min(...d);
      if (min === d[0]) x = w.x0;
      else if (min === d[1]) x = w.x1;
      else if (min === d[2]) z = w.z0;
      else z = w.z1;
    }
  }
  return { x, z };
}
function tickWalk(dt) {
  if (!walkMode || !document.pointerLockElement) return;
  const f = Number(keys["KeyW"]) - Number(keys["KeyS"]);
  const r = Number(keys["KeyD"]) - Number(keys["KeyA"]);
  if (f || r) {
    const speed = 7 * SCALE * dt;
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    const next = resolveWallCollision(
      camera.position.x + (-sin * f + cos * r) * speed,
      camera.position.z + (-cos * f - sin * r) * speed
    );
    camera.position.x = next.x;
    camera.position.z = next.z;
  }
  camera.position.x = Math.max(-27 * SCALE, Math.min(27 * SCALE, camera.position.x));
  camera.position.z = Math.max(-14.5 * SCALE, Math.min(14.5 * SCALE, camera.position.z));
  camera.position.y = walkY;
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
}

/* ---------- Loop ---------- */
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  controls.update();
  tickFly(dt);
  tickWalk(dt);

  /* polvo */
  const attr = world.dust.points.geometry.attributes.position;
  const pos = attr.array;
  for (let i = 0; i < pos.length; i += 3) {
    pos[i + 1] += dt * 0.25;
    if (pos[i + 1] > 12) pos[i + 1] = world.dust.base[i + 1] * 0.9;
    pos[i] += dt * 0.1;
    if (pos[i] > 60) pos[i] = -60;
  }
  attr.needsUpdate = true;

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
animate();

/* ---------- Resize ---------- */
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

/* ---------- Teclas globales ---------- */
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && walkMode) exitWalk();
  if (e.key === "o" || e.key === "O") btnRotate.click();
  if (e.key === "r" || e.key === "R") {
    if (walkMode) exitWalk();
    flyTo(OVERVIEW_POS, OVERVIEW_TARGET, 1.6);
  }
  if (e.key === "f" || e.key === "F") {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
});

/* ---------- Integración con la página (sección "Componentes") ---------- */
if (document.getElementById("parts-grid")) {
  const GRID = [
    { cat: "atrio", ids: ["atrio", "puerta-atrio", "columnas", "altar", "fuente", "tienda"] },
    { cat: "estructura", ids: ["tablas", "barras", "pantalla", "velo"] },
    { cat: "santuario", ids: ["lugar-santo", "candelero", "mesa", "incensario", "lugar-santisimo", "arca", "propiciatorio"] },
  ];
  const grid = document.getElementById("parts-grid");
  const catsOf = (id) => GRID.filter((g) => g.ids.includes(id)).map((g) => g.cat);
  function renderGrid(filter) {
    grid.innerHTML = "";
    for (const p of parts) {
      const cats = catsOf(p.id);
      if (filter !== "all" && !cats.includes(filter)) continue;
      const card = document.createElement("button");
      card.className = "part-card";
      card.innerHTML = `<span class="pc-name">${p.name}</span><span class="pc-ref">${p.ref}</span><p>${p.desc}</p>`;
      card.addEventListener("click", () => {
        selectPart(p.id, true);
        document.getElementById("intro").classList.add("fade");
      });
      grid.appendChild(card);
    }
  }
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      renderGrid(b.dataset.filter);
    });
  });
  renderGrid("all");
}

/* ---------- Self-test (solo con ?selftest) ---------- */
if (new URLSearchParams(location.search).has("selftest")) {
  renderer.preserveDrawingBuffer = true;
  const errors = [];
  addEventListener("error", (e) => errors.push(String(e.message)));
  const ticker = setInterval(() => { // bucle síncrono (sin depender de rAF)
    controls.update();
    tickFly(0.02);
    tickWalk(0.02);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }, 30);
  setTimeout(() => selectPart("arca", true), 1000);
  setTimeout(() => selectPart("candelero", true), 2600);
  setTimeout(() => {
    try {
      clearInterval(ticker);
      renderer.render(scene, camera);
    const ctx2d = document.createElement("canvas").getContext("2d");
    ctx2d.drawImage(renderer.domElement, 0, 0, 160, 90);
    const px = ctx2d.getImageData(0, 0, 160, 90).data;
    const seen = new Set();
    let lum = 0;
    for (let i = 0; i < px.length; i += 4) {
      const k = (px[i] >> 4) + "-" + (px[i + 1] >> 4) + "-" + (px[i + 2] >> 4);
      seen.add(k);
      lum += (px[i] + px[i + 1] + px[i + 2]) / 3;
    }
    const missing = [];
    for (const p of parts) if (!p.group || p.group.children.length === 0) missing.push(p.id);
    const info = {
      webgl: !!renderer.getContext(),
      meshes: world.selectables.length,
      parts: parts.length,
      missingGroups: missing,
      labels: parts.filter((p) => p.label).length,
      ghostMeshes: world.ghostShell.length,
      pixels: { unique: seen.size, avgLum: +(lum / (px.length / 4)).toFixed(1) },
      camera: camera.position.toArray().map((v) => +v.toFixed(1)),
      target: controls.target.toArray().map((v) => +v.toFixed(1)),
      selected: selectedId,
      errors,
    };
    const el = document.createElement("pre");
    el.id = "selftest";
    el.textContent = JSON.stringify(info);
    document.body.appendChild(el);
    } catch (e) {
      const pre = document.createElement("pre");
      pre.id = "selftest";
      pre.textContent = "ERR: " + (e?.stack || e?.message || String(e));
      document.body.appendChild(pre);
    }
  }, 4200);
}
