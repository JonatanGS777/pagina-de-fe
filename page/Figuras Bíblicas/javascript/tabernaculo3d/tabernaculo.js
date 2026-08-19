import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

export const CUBIT = 0.5;
/* Factor de escala aplicado a todo el modelo (grupo raíz) para dar más
   espacio de navegación en el interior sin retocar cada coordenada a
   mano. Todo lo que se calcule en coordenadas de mundo fuera del grupo
   (cámaras de vuelo, colisión del modo caminata en main.js) debe
   multiplicarse por este mismo factor. */
export const SCALE = 1.4;
const Y0 = 0; // nivel del suelo del atrio

/* ------------------------------------------------------------------ */
/* Materiales                                                          */
/* ------------------------------------------------------------------ */
const mats = {
  linen: new THREE.MeshStandardMaterial({ color: 0xf4eeda, roughness: 0.95 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.92, roughness: 0.28 }),
  goldDark: new THREE.MeshStandardMaterial({ color: 0xd8a73c, metalness: 0.85, roughness: 0.38 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xd8dde2, metalness: 0.95, roughness: 0.22 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xa86f33, metalness: 0.85, roughness: 0.45 }),
  bronzeDark: new THREE.MeshStandardMaterial({ color: 0x7d5126, metalness: 0.8, roughness: 0.5 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.8 }),
  sand: new THREE.MeshStandardMaterial({ color: 0xc9ae7e, roughness: 1 }),
  courtFloor: new THREE.MeshStandardMaterial({ color: 0xb5986a, roughness: 1 }),
  water: new THREE.MeshPhysicalMaterial({
    color: 0x3d7dae, transparent: true, opacity: 0.9,
    metalness: 0.1, roughness: 0.05, clearcoat: 1,
  }),
  flame: new THREE.MeshBasicMaterial({
    color: 0xffb35c, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }),
  smoke: new THREE.MeshBasicMaterial({
    color: 0xfff7e6, transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }),
};
const m = (name) => mats[name].clone();

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function box(size, mat, x, y, z, parent, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function cylinder(rt, rb, h, seg, mat, x, y, z, parent, cast = true) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg ?? 16), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function cone(rt, h, seg, mat, x, y, z, parent, cast = true) {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(rt, h, seg ?? 16), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function sphere(r, seg, mat, x, y, z, parent, cast = true) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg ?? 20, seg ?? 14), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function plane(w, h, mat, x, y, z, parent, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mat.side = THREE.DoubleSide;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function label(text, pos, gold = false) {
  const el = document.createElement("div");
  el.className = "label" + (gold ? " gold" : "");
  el.textContent = text;
  const obj = new CSS2DObject(el);
  obj.position.set(pos[0], pos[1], pos[2]);
  return obj;
}

/* ---------- Texturas procedimentales ---------- */
function makeGlowTex() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(64, 64, 4, 64, 64, 62);
  g.addColorStop(0, "rgba(255,240,190,1)");
  g.addColorStop(0.35, "rgba(255,216,130,0.5)");
  g.addColorStop(1, "rgba(255,200,100,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function halo(x, y, z, scale, opacity = 0.4, parent) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTex(), transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  s.position.set(x, y, z);
  s.scale.setScalar(scale);
  parent.add(s);
  return s;
}
function makeSky() {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 512;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#2a3a5c");
  g.addColorStop(0.45, "#6d86a8");
  g.addColorStop(0.68, "#c9a86b");
  g.addColorStop(0.8, "#e8cd9a");
  g.addColorStop(1, "#efd9ad");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* Bordado del atrio / tienda: bandas azul, púrpura, carmesí */
function makeLinenTex(withCherub = false) {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const x = c.getContext("2d");
  x.fillStyle = "#f2ecd9";
  x.fillRect(0, 0, 256, 256);
  x.fillStyle = "rgba(0,0,0,0.045)";
  for (let i = 0; i < 260; i += 16) {
    x.fillRect(0, i, 256, 1);
    x.fillRect(i, 0, 1, 256);
  }
  const bands = ["#2f4f8f", "#7b3fae", "#b03a2c"];
  for (let i = 0; i < 3; i++) {
    x.fillStyle = bands[i];
    x.fillRect(32 + i * 64, 0, 7, 256);
    x.fillRect(224, 0, 7, 256);
  }
  if (withCherub) {
    for (let cx = 48; cx < 256; cx += 96) {
      for (let cy = 56; cy < 256; cy += 128) drawCherub(x, cx, cy, 30);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function drawCherub(x, cx, cy, s) {
  const g = "#d8b56a", blue = "#2f4f8f", purp = "#7b3fae";
  x.fillStyle = g;
  x.beginPath();
  x.arc(cx, cy - s * 0.5, s * 0.32, 0, Math.PI * 2);
  x.fill();
  x.beginPath();
  x.moveTo(cx - s * 0.55, cy + s * 0.1);
  x.lineTo(cx, cy + s * 0.95);
  x.lineTo(cx + s * 0.55, cy + s * 0.1);
  x.closePath();
  x.fill();
  x.strokeStyle = blue;
  x.lineWidth = 4;
  x.beginPath();
  x.arc(cx - s * 0.45, cy - s * 0.2, s * 0.6, -Math.PI * 0.35, Math.PI * 0.55);
  x.stroke();
  x.strokeStyle = purp;
  x.beginPath();
  x.arc(cx + s * 0.45, cy - s * 0.2, s * 0.6, Math.PI * 0.45, Math.PI * 1.35);
  x.stroke();
}
function makeFibrousTex(base, dark, streakAlpha = 0.16) {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 128;
  const x = c.getContext("2d");
  x.fillStyle = base;
  x.fillRect(0, 0, 256, 128);
  x.strokeStyle = dark;
  x.globalAlpha = streakAlpha;
  x.lineWidth = 1.2;
  for (let i = 0; i < 340; i++) {
    x.beginPath();
    const y = Math.random() * 128;
    x.moveTo(Math.random() * 256, y);
    x.lineTo(Math.random() * 256, y + (Math.random() - 0.5) * 5);
    x.stroke();
  }
  x.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function makeSandTex() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const x = c.getContext("2d");
  x.fillStyle = "#c9ae7e";
  x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    x.fillStyle = `rgba(${90 + Math.random() * 60},${70 + Math.random() * 50},${40 + Math.random() * 30},${0.2 + Math.random() * 0.2})`;
    x.fillRect(Math.random() * 256, Math.random() * 256, 1.6, 1.6);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function makeVeilTex() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const x = c.getContext("2d");
  x.fillStyle = "#ede5cd";
  x.fillRect(0, 0, 256, 256);
  const bands = ["#2f4f8f", "#7b3fae", "#b03a2c"];
  for (let i = 0; i < 256; i += 64) {
    x.fillStyle = bands[i / 64];
    x.fillRect(i, 0, 10, 256);
    x.fillStyle = "rgba(0,0,0,0.05)";
    x.fillRect(i + 10, 0, 6, 256);
  }
  for (let cx = 44; cx < 256; cx += 128) {
    for (let cy = 56; cy < 256; cy += 128) drawCherub(x, cx, cy, 34);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Construcción del mundo                                              */
/* ------------------------------------------------------------------ */
export function buildWorld(scene) {
  const parts = [];
  const selectables = [];
  const ghostShell = [];
  const group = new THREE.Group();
  scene.add(group);

  function part(id, name, hebrew, ref, desc, cam, look, g, lbl, lblGold = false) {
    group.add(g);
    /* cam/look/lbl son coordenadas de mundo (fuera del grupo escalado),
       así que hay que escalarlas a mano para que sigan encuadrando la
       pieza correcta tras aplicar group.scale al final de buildWorld(). */
    parts.push({
      id, name, hebrew, ref, desc,
      cam: new THREE.Vector3(...cam).multiplyScalar(SCALE),
      look: new THREE.Vector3(...look).multiplyScalar(SCALE),
      group: g, label: lbl ? label(name, lbl.map((v) => v * SCALE), lblGold) : null,
    });
    return g;
  }
  function sel(obj, id) {
    obj.traverse((o) => {
      if (o.isMesh) { o.userData.partId = id; selectables.push(o); }
    });
  }
  function ghost(g) {
    g.traverse((o) => {
      if (o.isMesh) {
        o.userData._ghostMats = o.material;
        o.userData._ghostFlags = {
          transparent: o.material.transparent, opacity: o.material.opacity, depthWrite: o.material.depthWrite,
        };
        ghostShell.push(o);
      }
    });
  }

  /* =========================== SUELO Y CIELO ========================= */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(120, 64),
    new THREE.MeshStandardMaterial({ map: makeSandTex(), roughness: 1 })
  );
  ground.material.map.wrapS = THREE.RepeatWrapping;
  ground.material.map.wrapT = THREE.RepeatWrapping;
  ground.material.map.repeat.set(9, 5);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.06;
  ground.receiveShadow = true;
  group.add(ground);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(900, 32, 20),
    new THREE.MeshBasicMaterial({ map: makeSky(), side: THREE.BackSide, fog: false, depthWrite: false })
  );
  scene.add(sky);

  /* Polvo dorado flotante */
  const dustGeo = new THREE.BufferGeometry();
  const dustN = 260;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 120;
    dustPos[i * 3 + 1] = Math.random() * 12;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xf2d9a0, size: 0.14, transparent: true, opacity: 0.55,
      depthWrite: false, sizeAttenuation: true,
    })
  );
  scene.add(dust);
  const dustBase = dustGeo.attributes.position.array.slice();

  /* =========================== EL ATRIO ============================== */
  const courtW = 50, courtD = 25, courtH = 2.5;
  const hangMat = () => {
    const mm = m("linen");
    mm.map = makeLinenTex();
    return mm;
  };

  /* --- Columnas: madera revestida de plata, basas de bronce --- */
  const columnsG = new THREE.Group();
  function courtPillar(x, z, g) {
    const cg = new THREE.Group();
    cylinder(0.1, 0.1, courtH - 0.36, 12, m("wood"), 0, (courtH - 0.36) / 2 + 0.2, 0, cg);
    cylinder(0.12, 0.1, 0.2, 12, m("silver"), 0, courtH - 0.06, 0, cg);
    cylinder(0.13, 0.15, 0.24, 12, m("bronze"), 0, 0.12, 0, cg);
    cg.position.set(x, 0, z);
    g.add(cg);
    return cg;
  }
  const pillarX = [], pillarZ = [];
  for (let i = 0; i < 20; i++) {
    const z = -11.875 + i * 1.25;
    courtPillar(25, z, columnsG);
    courtPillar(-25, z, columnsG);
    pillarX.push(25); pillarX.push(-25); pillarZ.push(z); pillarZ.push(z);
  }
  for (let i = 0; i < 40; i++) {
    const x = -24.375 + i * 1.25;
    courtPillar(x, -12.5, columnsG);
    pillarX.push(x); pillarZ.push(-12.5);
  }
  courtPillar(-25, 12.5, columnsG); courtPillar(25, 12.5, columnsG);
  courtPillar(-25, -12.5, columnsG); courtPillar(25, -12.5, columnsG);
  pillarX.push(-25, 25, -25, 25); pillarZ.push(12.5, 12.5, -12.5, -12.5);

  /* --- Cortinas de lino del atrio (entre columnas) --- */
  const atrioG = new THREE.Group();
  function hangBetween(a, b) {
    const w = a.distanceTo(b);
    const mm = hangMat();
    mm.map.repeat.set(w / 1.25, 1);
    const h = plane(w, courtH, mm, (a.x + b.x) / 2, courtH / 2 + 0.02, (a.z + b.z) / 2, atrioG, 0, Math.atan2(-(b.z - a.z), b.x - a.x));
    h.castShadow = true;
    return h;
  }
  const runs = [
    { wall: 25, from: -11.875, to: 11.875, axis: "z" },
    { wall: -25, from: -11.875, to: 11.875, axis: "z" },
    { wall: -12.5, from: -25, to: 25, axis: "x" },
    { wall: 12.5, from: -25, to: -5, axis: "x" },
    { wall: 12.5, from: 5, to: 25, axis: "x" },
  ];
  for (const r of runs) {
    const pts = [];
    if (r.axis === "z") {
      for (let z = r.from; z <= r.to + 1e-6; z += 1.25) pts.push(new THREE.Vector3(r.wall, 0, z));
    } else {
      for (let x = r.from; x <= r.to + 1e-6; x += 1.25) pts.push(new THREE.Vector3(x, 0, r.wall));
    }
    for (let i = 0; i < pts.length - 1; i++) hangBetween(pts[i], pts[i + 1]);
  }

  /* --- Puerta del atrio (lado este, 20 codos) --- */
  const puertaG = new THREE.Group();
  const gateMat = m("linen");
  gateMat.map = makeVeilTex();
  gateMat.map.repeat.set(2.5, 1);
  for (const gx of [-5, -1.667, 1.667, 5]) {
    const pg = new THREE.Group();
    cylinder(0.13, 0.13, courtH - 0.32, 12, m("wood"), 0, (courtH - 0.32) / 2 + 0.18, 0, pg);
    cylinder(0.15, 0.13, 0.2, 12, m("silver"), 0, courtH - 0.04, 0, pg);
    cylinder(0.16, 0.19, 0.26, 12, m("bronze"), 0, 0.13, 0, pg);
    pg.position.set(gx, 0, 12.5);
    puertaG.add(pg);
  }
  const gatePlane = plane(10, courtH, gateMat, 0, courtH / 2 + 0.02, 12.47, puertaG, 0, 0, 0);
  gatePlane.castShadow = true;

  /* =========================== LA TIENDA ============================= */
  const tentW = 5, tentD = 15, tentH = 5; // 10 × 30 × 10 codos
  const zWest = -9.5, zEast = 5.5;
  const veilZ = -4.5;
  /* Éxodo sitúa el arca detrás del velo, pero no fija su distancia de la
     pared occidental. La posición central evita convertir una decisión
     reconstructiva en una falsa precisión y mantiene todo el mueble dentro. */
  const holyOfHoliesZ = (zWest + veilZ) / 2;

  /* --- Tablas de acacia revestidas de oro + basas de plata --- */
  const tablasG = new THREE.Group();
  function tabla(x, z, ry = 0) {
    const tg = new THREE.Group();
    box([0.75, tentH, 0.42], m("goldDark"), 0, tentH / 2, 0, tg);
    box([0.2, 0.16, 0.2], m("gold"), 0, 0.08, 0, tg);
    box([0.2, 0.16, 0.2], m("gold"), 0, 0.08, 0.16, tg);
    const sok = box([0.62, 0.34, 0.62], m("silver"), 0, 0.17, 0, tg);
    sok.position.set(0, 0.17, 0);
    tg.position.set(x, 0, z);
    tg.rotation.y = ry;
    tablasG.add(tg);
    return tg;
  }
  for (let i = 0; i < 20; i++) {
    const z = zWest + 0.125 + i * 0.75;
    tabla(2.5, z);
    tabla(-2.5, z);
  }
  for (let i = 0; i < 6; i++) {
    const x = -1.875 + i * 0.75;
    tabla(x, zWest);
  }
  tabla(2.5, zWest, Math.PI / 2);
  tabla(-2.5, zWest, Math.PI / 2);

  /* --- Barras (4 cortas + 1 de en medio, cada pared) --- */
  const barrasG = new THREE.Group();
  const barY = [0.85, 1.7, 2.5, 3.3, 4.1];
  for (const sx of [2.53, -2.53]) {
    box([0.16, 0.16, tentD + 0.1], m("gold"), sx, 2.5, (zWest + zEast) / 2, barrasG);
    for (const y of barY) {
      if (y === 2.5) continue;
      for (let i = 0; i < 4; i++) {
        box([0.16, 0.16, 3.71], m("gold"), sx, y, zWest + 0.02 + i * 3.75 + 1.875, barrasG);
      }
    }
  }
  for (const y of barY) {
    box([5.02, 0.16, 0.16], m("gold"), 0, y, zWest - 0.05, barrasG);
  }

  /* --- Cubiertas: lino bordado, pelo de cabra, pieles rojas y tejones --- */
  const tiendaG = new THREE.Group();
  const linenMat = m("linen");
  linenMat.map = makeLinenTex(true);
  const ceil = plane(tentW - 0.15, tentD - 0.15, linenMat, 0, tentH + 0.04, (zWest + zEast) / 2, tiendaG, -Math.PI / 2, 0, 0);
  ceil.castShadow = true;
  const goatTex = makeFibrousTex("#a08a5e", "#5d4c2c");
  const nPanels = 11;
  const panelW = tentW / nPanels;
  for (let i = 0; i < nPanels; i++) {
    const px = -tentW / 2 + panelW / 2 + i * panelW;
    const pm = m("linen");
    pm.color.set(0xa08a5e);
    pm.map = goatTex;
    pm.map.repeat.set(3, 4);
    const p = box([panelW - 0.02, 0.06, tentD + 0.6], pm, px, tentH + 0.34, (zWest + zEast) / 2, tiendaG);
    p.rotation.x = (i % 2 === 0 ? 1 : -1) * 0.018;
  }
  const ramMat = m("linen");
  ramMat.color.set(0x7c2f24);
  ramMat.map = makeFibrousTex("#7c2f24", "#4a1a12", 0.3);
  const sealMat = m("linen");
  sealMat.color.set(0x57534a);
  sealMat.map = makeFibrousTex("#57534a", "#2e2b26", 0.25);
  const tentCenterZ = (zWest + zEast) / 2;

  /* Las cortinas no eran solo un techo. La capa de lino descendía por
     dentro y la de pelo de cabra cubría los costados y la parte posterior
     (Éxodo 26:12–13). Los pequeños desplazamientos evitan z-fighting. */
  for (const side of [-1, 1]) {
    plane(tentD - 0.1, tentH - 0.45, linenMat.clone(), side * (tentW / 2 + 0.015), tentH / 2 + 0.225, tentCenterZ, tiendaG, 0, Math.PI / 2, 0);

    const goatSideMat = m("linen");
    goatSideMat.color.set(0xa08a5e);
    goatSideMat.map = goatTex;
    plane(tentD + 0.55, tentH, goatSideMat, side * (tentW / 2 + 0.075), tentH / 2, tentCenterZ, tiendaG, 0, Math.PI / 2, 0);
  }
  plane(tentW - 0.1, tentH - 0.45, linenMat.clone(), 0, tentH / 2 + 0.225, zWest - 0.225, tiendaG);
  const goatBackMat = m("linen");
  goatBackMat.color.set(0xa08a5e);
  goatBackMat.map = goatTex;
  plane(tentW + 0.35, tentH, goatBackMat, 0, tentH / 2, zWest - 0.29, tiendaG);

  /* Las dimensiones exactas de las dos cubiertas de pieles no se indican;
     se muestran como capas superiores completas sin inventar una caída. */
  box([tentW + 0.18, 0.05, tentD + 0.78], ramMat.clone(), 0, tentH + 0.46, tentCenterZ, tiendaG);
  box([tentW + 0.34, 0.06, tentD + 0.94], sealMat.clone(), 0, tentH + 0.56, tentCenterZ, tiendaG);

  /* --- Pantalla de la puerta (5 columnas, este) --- */
  const pantallaG = new THREE.Group();
  const scMat = m("linen");
  scMat.map = makeVeilTex();
  scMat.map.repeat.set(1.2, 1);
  for (const px of [-2.5, -1.25, 0, 1.25, 2.5]) {
    const pg = new THREE.Group();
    cylinder(0.09, 0.09, tentH - 0.3, 12, m("gold"), 0, (tentH - 0.3) / 2 + 0.15, 0, pg);
    cylinder(0.12, 0.12, 0.22, 12, m("gold"), 0, tentH - 0.04, 0, pg);
    cylinder(0.15, 0.18, 0.28, 12, m("silver"), 0, 0.14, 0, pg);
    pg.position.set(px, 0, zEast);
    pantallaG.add(pg);
  }
  const scPlane = plane(tentW + 0.02, tentH, scMat, 0, tentH / 2, zEast - 0.06, pantallaG);
  scPlane.castShadow = true;

  /* --- El Velo (Lugar Santísimo, 4 columnas) --- */
  const veloG = new THREE.Group();
  const veilMat = m("linen");
  veilMat.map = makeVeilTex();
  for (const px of [-2.5, -0.833, 0.833, 2.5]) {
    const pg = new THREE.Group();
    cylinder(0.09, 0.09, tentH - 0.3, 12, m("gold"), 0, (tentH - 0.3) / 2 + 0.15, 0, pg);
    cylinder(0.12, 0.12, 0.22, 12, m("gold"), 0, tentH - 0.04, 0, pg);
    cylinder(0.15, 0.18, 0.28, 12, m("silver"), 0, 0.14, 0, pg);
    pg.position.set(px, 0, veilZ);
    veloG.add(pg);
  }
  const veilPlane = plane(tentW + 0.02, tentH, veilMat, 0, tentH / 2, veilZ + 0.05, veloG);
  veilPlane.castShadow = true;

  /* --- Suelos interiores --- */
  const floorMat = m("courtFloor");
  floorMat.map = makeSandTex();
  floorMat.map.wrapS = THREE.RepeatWrapping;
  floorMat.map.wrapT = THREE.RepeatWrapping;
  floorMat.map.repeat.set(4, 2);
  const floorSanto = plane(tentW - 0.12, zEast - veilZ - 0.12, floorMat.clone(), 0, 0.02, (veilZ + zEast) / 2, group, -Math.PI / 2, 0, 0);
  const floorSantisimo = plane(tentW - 0.12, veilZ - zWest - 0.12, floorMat.clone(), 0, 0.02, holyOfHoliesZ, group, -Math.PI / 2, 0, 0);

  /* =========================== MOBILIARIO ============================ */

  /* --- Candelero de oro (sur, 7 lámparas) --- */
  const candeleroG = new THREE.Group();
  const goldM = () => m("gold");
  function branch(p1, p2) {
    const dir = p2.clone().sub(p1);
    const len = dir.length();
    const g = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.028, len, 8), goldM());
    g.position.copy(p1).add(p2).multiplyScalar(0.5);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    candeleroG.add(g);
    sphere(0.05, 12, goldM(), p2.x, p2.y, p2.z, candeleroG);
  }
  cylinder(0.09, 0.13, 0.14, 10, goldM(), 0, 0.07, 0, candeleroG);
  cylinder(0.05, 0.09, 1.5, 10, goldM(), 0, 0.9, 0, candeleroG);
  const lampPts = [];
  for (let k = 1; k <= 3; k++) {
    const a = new THREE.Vector3(1 * k * 0.3, 1.62 + k * 0.16, 0);
    lampPts.push(a);
    branch(new THREE.Vector3(0, 0.75, 0), a);
    const b = new THREE.Vector3(-1 * k * 0.3, 1.62 + k * 0.16, 0);
    lampPts.push(b);
    branch(new THREE.Vector3(0, 0.75, 0), b);
  }
  lampPts.push(new THREE.Vector3(0, 1.95, 0));
  for (const lp of lampPts) {
    cylinder(0.075, 0.045, 0.07, 10, goldM(), lp.x, lp.y + 0.05, lp.z, candeleroG);
    cone(0.035, 0.13, 8, m("flame"), lp.x, lp.y + 0.16, lp.z, candeleroG);
    halo(lp.x, lp.y + 0.2, lp.z, 0.55, 0.3, candeleroG);
  }
  candeleroG.position.set(1.5, 0, -3.5);

  /* --- Mesa de los panes de la proposición (norte) --- */
  const mesaG = new THREE.Group();
  const top = box([1.02, 0.07, 0.52], goldM(), 0, 0.78, 0, mesaG);
  box([1.08, 0.04, 0.58], goldM(), 0, 0.75, 0, mesaG);
  for (const lx of [-0.42, 0.42]) for (const lz of [-0.18, 0.18]) {
    cylinder(0.03, 0.04, 0.7, 8, goldM(), lx, 0.36, lz, mesaG);
  }
  box([0.9, 0.03, 0.04], goldM(), 0, 0.36, 0, mesaG);
  const loaf = (x, y, z, r) => {
    const l = cylinder(r, r, 0.035, 14, m("linen"), x, y, z, mesaG);
    l.material.color.set(0xead9a8);
    l.material.roughness = 0.9;
    return l;
  };
  for (let i = 0; i < 6; i++) {
    loaf(-0.18, 0.83 + i * 0.038, -0.12, 0.085);
    loaf(0.18, 0.83 + i * 0.038, -0.12, 0.085);
  }
  for (const sx of [-0.18, 0.18]) {
    cylinder(0.035, 0.035, 0.04, 10, goldM(), sx, 1.06, -0.12, mesaG);
  }
  const mesaPole = (z0, len) => {
    const p = cylinder(0.022, 0.022, len, 10, goldM(), 0, 0.17, z0, mesaG);
    p.rotation.z = Math.PI / 2;
  };
  mesaPole(-0.22, 2.4);
  mesaPole(0.22, 2.4);
  mesaG.position.set(-1.5, 0, -3.5);

  /* --- Altar del incienso (frente al velo) --- */
  const incensarioG = new THREE.Group();
  box([0.5, 1.0, 0.5], goldM(), 0, 0.5, 0, incensarioG);
  box([0.58, 0.08, 0.58], goldM(), 0, 0.96, 0, incensarioG);
  box([0.62, 0.06, 0.62], goldM(), 0, 0.18, 0, incensarioG);
  for (const cx of [-0.25, 0.25]) for (const cz of [-0.25, 0.25]) {
    cone(0.05, 0.14, 8, goldM(), cx, 1.08, cz, incensarioG);
  }
  for (const sx of [-0.3, 0.3]) cylinder(0.015, 0.015, 0.12, 8, goldM(), sx, 0.5, 0, incensarioG);
  const inciPole = (z0) => {
    const p = cylinder(0.018, 0.018, 1.8, 10, goldM(), 0, 0.34, z0, incensarioG);
    p.rotation.z = Math.PI / 2;
  };
  inciPole(-0.16);
  inciPole(0.16);
  const smokeTex = makeGlowTex();
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: smokeTex, transparent: true, opacity: 0.28 - i * 0.035,
      blending: THREE.AdditiveBlending, depthWrite: false,
      color: 0xfff3dc,
    }));
    s.position.set((Math.random() - 0.5) * 0.25, 1.5 + i * 0.3, (Math.random() - 0.5) * 0.25);
    s.scale.setScalar(0.5 + i * 0.32);
    incensarioG.add(s);
  }
  incensarioG.position.set(0, 0, -4.15);

  /* --- Arca del Pacto (Lugar Santísimo) --- */
  const arcaG = new THREE.Group();
  const arkBox = box([1.25, 0.75, 0.75], goldM(), 0, 0.375, 0, arcaG);
  box([1.31, 0.06, 0.81], goldM(), 0, 0.72, 0, arcaG);
  for (const rx of [-0.55, 0.55]) for (const rz of [-0.28, 0.28]) {
    cylinder(0.045, 0.045, 0.09, 12, goldM(), rx, 0.06, rz, arcaG);
  }
  for (const rz of [-0.28, 0.28]) {
    const pole = cylinder(0.022, 0.022, 3.4, 10, goldM(), 0, 0.1, rz, arcaG);
    pole.rotation.z = Math.PI / 2;
  }
  arcaG.position.set(0, 0, holyOfHoliesZ);

  /* --- Propiciatorio y querubines --- */
  const propG = new THREE.Group();
  box([1.25, 0.06, 0.75], goldM(), 0, 0.03, 0, propG);
  function cherub(side) {
    const cg = new THREE.Group();
    sphere(0.09, 14, goldM(), 0, 0.26, 0, cg);
    cone(0.075, 0.22, 10, goldM(), 0, 0.36, 0, cg);
    sphere(0.05, 10, goldM(), 0, 0.49, 0, cg);
    const w1 = box([0.56, 0.045, 0.34], goldM(), side * -0.2, 0.42, 0, cg);
    w1.rotation.z = side * 0.3;
    const w2 = box([0.55, 0.045, 0.34], goldM(), side * 0.8, 0.38, 0, cg);
    w2.rotation.z = side * -0.25;
    cg.position.x = side * 0.52;
    propG.add(cg);
    return cg;
  }
  cherub(1);
  cherub(-1);
  propG.position.set(0, 0.75, holyOfHoliesZ);
  halo(0, 0.4, 0, 1.9, 0.28, propG);

  /* --- Altar del holocausto (bronce) --- */
  const altarG = new THREE.Group();
  const aM = () => m("bronze");
  box([2.5, 0.16, 2.5], aM(), 0, 1.42, 0, altarG);
  box([2.32, 1.14, 2.32], aM(), 0, 0.78, 0, altarG);
  box([2.66, 0.14, 2.66], aM(), 0, 0.22, 0, altarG);
  for (const cx of [-1.25, 1.25]) for (const cz of [-1.25, 1.25]) {
    cone(0.16, 0.5, 8, aM(), cx, 1.78, cz, altarG);
  }
  for (const sx of [-1.15, 1.15]) cylinder(0.04, 0.04, 0.16, 8, aM(), sx, 0.62, 0, altarG);
  const aPole = cylinder(0.05, 0.05, 4.6, 10, aM(), 0, 0.62, 0, altarG);
  aPole.rotation.z = Math.PI / 2;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const log = cylinder(0.085, 0.1, 0.95, 8, m("wood"), Math.cos(a) * 0.5, 1.53, Math.sin(a) * 0.5, altarG, true);
    log.rotation.set(Math.PI / 2, 0, (a + 0.6) * 0.7);
  }
  for (let i = 0; i < 5; i++) {
    cone(0.1 + Math.random() * 0.12, 0.5 + Math.random() * 0.4, 8, m("flame"), (Math.random() - 0.5) * 1.1, 1.9 + Math.random() * 0.25, (Math.random() - 0.5) * 1.1, altarG);
  }
  halo(0, 2.15, 0, 2.4, 0.5, altarG);
  altarG.position.set(0, 0, 7.9);

  /* --- Fuente de bronce (sur, entre el altar y la tienda) --- */
  const fuenteG = new THREE.Group();
  const bowl = cylinder(0.72, 0.5, 0.55, 20, m("bronze"), 0, 0.75, 0, fuenteG);
  bowl.material.side = THREE.DoubleSide;
  box([1.0, 0.09, 1.0], m("bronze"), 0, 0.48, 0, fuenteG);
  cylinder(0.16, 0.2, 0.5, 12, m("bronze"), 0, 0.2, 0, fuenteG);
  cylinder(0.5, 0.58, 0.14, 16, m("bronzeDark"), 0, 0.06, 0, fuenteG);
  cylinder(0.62, 0.62, 0.05, 20, m("water"), 0, 1.02, 0, fuenteG);
  fuenteG.position.set(-3.55, 0, 6.35);

  /* --- Suelos de los recintos (partes) --- */
  const santoSG = new THREE.Group();
  santoSG.add(floorSanto);
  const santisimoSG = new THREE.Group();
  santisimoSG.add(floorSantisimo);

  /* =========================== REGISTRO ============================== */
  sel(columnsG, "columnas");
  sel(atrioG, "atrio");
  sel(puertaG, "puerta-atrio");
  sel(tablasG, "tablas");
  sel(barrasG, "barras");
  sel(tiendaG, "tienda");
  sel(pantallaG, "pantalla");
  sel(veloG, "velo");
  sel(santoSG, "lugar-santo");
  sel(santisimoSG, "lugar-santisimo");
  sel(candeleroG, "candelero");
  sel(mesaG, "mesa");
  sel(incensarioG, "incensario");
  sel(arcaG, "arca");
  sel(propG, "propiciatorio");
  sel(altarG, "altar");
  sel(fuenteG, "fuente");
  for (const g of [tablasG, barrasG, tiendaG, pantallaG, veloG]) ghost(g);

  part("atrio", "El atrio", "חָצֵר", "Éxodo 27:9–19", "Recinto de 100 × 50 codos cercado con cortinas de lino torcido, sostenidas por columnas con basas de bronce, ganchos y molduras de plata.", [0, 14, 20], [0, 2, 2], atrioG, [13, 4.0, -8]);
  part("puerta-atrio", "Puerta del atrio", "שַׁעַר", "Éxodo 27:16", "Entrada oriental de 20 codos de ancho, con una cortina bordada de azul, púrpura, carmesí y lino torcido, sostenida por cuatro columnas.", [0, 4.5, 15.5], [0, 1.8, 12.5], puertaG, [0, 4.2, 13.4]);
  part("columnas", "Columnas y postes", "עַמּוּדִים", "Éxodo 27:10–19", "Sesenta columnas rodeaban el atrio, con basas de bronce, ganchos y molduras de plata. Éxodo no especifica el material de las columnas.", [12, 4.5, 3], [6, 1.5, 0], columnsG, [18, 3.8, 10]);
  part("altar", "Altar del holocausto", "מִזְבֵּחַ", "Éxodo 27:1–8", "Altar de 5 × 5 × 3 codos, hecho de madera de acacia y recubierto de bronce, con cuernos, enrejado, argollas y varas para transportarlo.", [0, 4.0, 11.5], [0, 0.9, 7.9], altarG, [0, 3.2, 7.1], true);
  part("fuente", "Fuente de bronce", "כִּיּוֹר", "Éxodo 30:17–21", "Fuente de bronce con su base, situada entre el altar y la entrada de la tienda, donde Aarón y sus hijos debían lavarse antes del ministerio.", [-4.6, 2.3, 6.35], [-3.55, 0.9, 6.35], fuenteG, [-3.55, 2.3, 5.6]);
  part("tienda", "La tienda y sus cubiertas", "אֹהֶל מוֹעֵד", "Éxodo 26:1–14", "Cuatro capas protegían la tienda: lino con querubines, pelo de cabra, pieles de carnero teñidas de rojo y una cubierta exterior cuyo material exacto es discutido.", [11, 7.5, 1], [0, 3.2, -2], tiendaG, [0, 6.6, -2]);
  part("tablas", "Tablas y basas de plata", "קְרָשִׁים", "Éxodo 26:15–30", "Cuarenta y ocho tablas de acacia revestidas de oro, de 10 codos de alto y con dos espigas cada una, se asentaban sobre 96 basas de plata.", [0, 3.0, -13.0], [0, 2.5, -9.5], tablasG, [-3.9, 3.6, -2]);
  part("barras", "Barras de la estructura", "בְּרִיחִים", "Éxodo 26:26–29", "Cinco barras de acacia revestidas de oro reforzaban cada lado; la barra central atravesaba las tablas de un extremo al otro.", [4.6, 3.6, -1.4], [2.5, 3.1, -2], barrasG, [3.9, 4.3, -2]);
  part("pantalla", "Cortina de entrada", "מָסָךְ", "Éxodo 26:36–37", "Cortina bordada que cerraba la tienda al oriente, colgada de cinco columnas de acacia revestidas de oro y asentadas sobre basas de bronce.", [0, 3.0, 7.5], [0, 2.5, 5.5], pantallaG, [0, 4.1, 5.6]);
  part("velo", "El velo", "פָּרֹכֶת", "Éxodo 26:31–33", "Cortina de azul, púrpura y carmesí con querubines, sostenida por cuatro columnas de acacia revestidas de oro, que separaba el lugar santo del lugar santísimo.", [3.6, 2.4, -3.9], [0, 2.5, -4.5], veloG, [0, 4.4, -3.9], true);
  part("lugar-santo", "Lugar santo", "קֹדֶשׁ", "Éxodo 26:33–35", "Primera cámara de la tienda, de 20 × 10 codos: contenía el candelero al sur, la mesa de los panes al norte y el altar del incienso ante el velo.", [2.2, 2.6, -2], [0, 2.2, -3.5], santoSG, [0, 4.2, -3.4]);
  part("candelero", "Candelero de oro", "מְנוֹרָה", "Éxodo 25:31–40", "Candelero de un talento de oro labrado a martillo, con una caña central, seis brazos, copas en forma de flor de almendro y siete lámparas.", [2.6, 2.0, -3.9], [1.5, 1.1, -3.5], candeleroG, [1.6, 2.5, -3.6], true);
  part("mesa", "Mesa de los panes", "שֻׁלְחָן", "Éxodo 25:23–30", "Mesa de acacia revestida de oro, de 2 × 1 × 1,5 codos, destinada al pan de la presencia y situada al norte del lugar santo.", [-2.6, 2.0, -3.7], [-1.5, 0.95, -3.5], mesaG, [-1.6, 2.0, -3.6]);
  part("incensario", "Altar del incienso", "מִזְבַּח הַקְּטֹרֶת", "Éxodo 30:1–10", "Altar de oro de 1 × 1 × 2 codos, con cuernos y situado delante del velo, donde se quemaba incienso aromático cada mañana y cada tarde.", [2.0, 2.4, -3.65], [0, 1.05, -4.15], incensarioG, [0, 2.2, -3.95]);
  part("lugar-santisimo", "Lugar santísimo", "קֹדֶשׁ קֳדָשִׁים", "Éxodo 26:33–34 · Levítico 16", "Cámara cúbica de 10 × 10 × 10 codos detrás del velo. Allí estaba el arca, y el sumo sacerdote entraba una vez al año en el Día de la Expiación.", [0, 2.9, -5.2], [0, 1.6, -7.5], santisimoSG, [0, 4.2, -7]);
  part("arca", "Arca del pacto", "אֲרוֹן", "Éxodo 25:10–16", "Cofre de acacia revestido de oro, de 2,5 × 1,5 × 1,5 codos, con moldura, cuatro argollas y varas; contenía las tablas del testimonio.", [0, 2.2, holyOfHoliesZ + 1.6], [0, 1.0, holyOfHoliesZ], arcaG, [0, 1.9, holyOfHoliesZ + 0.1]);
  part("propiciatorio", "Propiciatorio y querubines", "כַּפֹּרֶת", "Éxodo 25:17–22", "Cubierta de oro puro con dos querubines labrados en una sola pieza, cuyas alas cubrían el propiciatorio; allí Dios prometió encontrarse con su pueblo.", [1.8, 2.2, holyOfHoliesZ + 1.2], [0, 1.35, holyOfHoliesZ], propG, [0.8, 2.35, holyOfHoliesZ + 0.1], true);

  group.scale.setScalar(SCALE);
  return {
    parts,
    selectables,
    ghostShell,
    dust: { points: dust, base: dustBase },
    scene: group,
    layout: {
      holyOfHolies: {
        minX: (-tentW / 2 + 0.22) * SCALE,
        maxX: (tentW / 2 - 0.22) * SCALE,
        minZ: (zWest + 0.22) * SCALE,
        maxZ: (veilZ - 0.1) * SCALE,
      },
    },
  };
}
