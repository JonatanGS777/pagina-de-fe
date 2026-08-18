import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

export const CUBIT = 0.5;
const Y0 = 0.9; // nivel del piso del templo (sobre podio)
const YC = 0.5; // nivel del atrio interior

/* ------------------------------------------------------------------ */
/* Materiales                                                          */
/* ------------------------------------------------------------------ */
const mats = {
  stone: new THREE.MeshStandardMaterial({ color: 0xc9b894, roughness: 0.92 }),
  stoneLight: new THREE.MeshStandardMaterial({ color: 0xdcc9a2, roughness: 0.9 }),
  stoneDark: new THREE.MeshStandardMaterial({ color: 0x8f7f5f, roughness: 0.95 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xf2c14e, metalness: 0.92, roughness: 0.28 }),
  goldDark: new THREE.MeshStandardMaterial({ color: 0xd8a73c, metalness: 0.85, roughness: 0.38 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xb07d3f, metalness: 0.85, roughness: 0.45 }),
  bronzeDark: new THREE.MeshStandardMaterial({ color: 0x8a5f2e, metalness: 0.8, roughness: 0.5 }),
  copper: new THREE.MeshStandardMaterial({ color: 0xb46b3e, metalness: 0.9, roughness: 0.4 }),
  cedar: new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.8 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x1c1510, roughness: 0.9 }),
  veil: new THREE.MeshStandardMaterial({ color: 0x7b3fae, roughness: 0.5, transparent: true, opacity: 0.82 }),
  water: new THREE.MeshPhysicalMaterial({
    color: 0x2a6f9e, transparent: true, opacity: 0.92,
    metalness: 0.1, roughness: 0.05, clearcoat: 1,
  }),
  flame: new THREE.MeshBasicMaterial({
    color: 0xffb35c, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }),
  leaf: new THREE.MeshStandardMaterial({ color: 0x5c8a3a, roughness: 0.9, flatShading: true }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b4a2a, roughness: 1 }),
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
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg ?? 24), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function plane(w, h, mat, x, y, z, parent, rx = 0, ry = 0, rz = 0, dbl = true) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  if (dbl) mat.side = THREE.DoubleSide;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function label(text, pos, gold = false) {
  const el = document.createElement("div");
  el.className = "t3d-label" + (gold ? " gold" : "");
  el.textContent = text;
  const obj = new CSS2DObject(el);
  obj.position.set(pos[0], pos[1], pos[2]);
  return obj;
}

/* ---------- Texturas procedimentales ---------- */
function makePatternTex() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const x = c.getContext("2d");
  x.fillStyle = "#f2c14e";
  x.fillRect(0, 0, 128, 128);
  x.strokeStyle = "rgba(168,112,28,0.5)";
  x.lineWidth = 3;
  for (let i = -128; i < 256; i += 16) {
    x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 128, 128); x.stroke();
  }
  for (let i = -128; i < 256; i += 16) {
    x.beginPath(); x.moveTo(i, 128); x.lineTo(i + 128, 0); x.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
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
    parts.push({
      id, name, hebrew, ref, desc,
      cam: new THREE.Vector3(...cam), look: new THREE.Vector3(...look),
      group: g, label: lbl ? label(name, lbl, lblGold) : null,
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
    new THREE.CircleGeometry(220, 64),
    new THREE.MeshStandardMaterial({ color: 0x9c8a63, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.06;
  ground.receiveShadow = true;
  group.add(ground);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(950, 32, 20),
    new THREE.MeshBasicMaterial({ map: makeSky(), side: THREE.BackSide, fog: false, depthWrite: false })
  );
  scene.add(sky);

  /* Polvo dorado flotante */
  const dustGeo = new THREE.BufferGeometry();
  const dustN = 350;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 170;
    dustPos[i * 3 + 1] = Math.random() * 26;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 170;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xffe9b0, size: 0.32, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  scene.add(dust);
  const dustBase = dustGeo.attributes.position.array.slice();

  /* Roca dispersa al fondo */
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x7a6b4d, roughness: 1, flatShading: true });
  for (let i = 0; i < 26; i++) {
    const r = 150 + Math.random() * 90;
    const a = Math.random() * Math.PI * 2;
    const s = 4 + Math.random() * 12;
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
    rock.position.set(Math.cos(a) * r, -1 + Math.random() * 3, Math.sin(a) * r);
    rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    rock.castShadow = true;
    group.add(rock);
  }

  /* ====================== PODIO DEL TEMPLO =========================== */
  const podiumG = new THREE.Group();
  box([25, 0.4, 74], m("stoneLight"), 0, 0.7, 5, podiumG);          // 0.5 → 0.9
  box([27, 0.5, 1.6], m("stoneLight"), 0, 0.25, 41.2, podiumG);     // escalón frontal (antes flotaba: centro 0.45 con alto 0.5 dejaba la base en y=0.2)
  box([25, 0.55, 1.6], m("stoneLight"), 0, 0.275, 39.6, podiumG);   // 2.º escalón
  part("temple", "El Templo (Edificio)", "הֵיכָל", "1 Reyes 6:2",
    "El edificio principal del santuario: 60 codos de largo, 20 de ancho y 30 de alto (≈ 30 × 10 × 15 m), orientado al este sobre el monte Moriah. Muros de piedra con revestimiento de cedro y oro.",
    [32, 26, 50], [0, 9, 6], podiumG, [0, 17.6, 5], true);
  sel(podiumG, "temple");
  ghost(podiumG);

  /* ========================= MURIOS DEL TEMPLO ======================= */
  const stoneGold = () => [m("stone"), m("gold"), m("gold"), m("stone"), m("stone"), m("gold")];

  /* ---- Ulam (pórtico) ---- */
  const ulamG = new THREE.Group();
  box([1, 15, 10], m("stone"), 10.5, 8.4, 35, ulamG);
  box([1, 15, 10], m("stone"), -10.5, 8.4, 35, ulamG);
  box([20, 0.2, 10], m("stoneLight"), 0, 0.8, 35, ulamG);
  box([22, 0.55, 11.6], m("copper"), 0, 15.9, 35, ulamG);
  box([22.2, 0.25, 11.8], m("stoneDark"), 0, 16.3, 35, ulamG);
  box([1.4, 4, 0.5], m("cedar"), 8.6, 3.4, 39.9, ulamG);
  box([1.4, 4, 0.5], m("cedar"), -8.6, 3.4, 39.9, ulamG);
  box([1.4, 0.8, 0.5], m("cedar"), 8.6, 6.3, 39.9, ulamG);
  box([1.4, 0.8, 0.5], m("cedar"), -8.6, 6.3, 39.9, ulamG);
  part("ulam", "Ulam · Pórtico", "אוּלָם", "1 Reyes 6:3",
    "El pórtico de entrada: 20 codos de ancho por 10 de profundidad, en el frente oriental del templo. Aquí se alzaban las columnas de bronce Jaquín y Boaz.",
    [13, 6.5, 46], [0, 8, 37], ulamG, [0, 17.2, 37], true);
  sel(ulamG, "ulam");
  ghost(ulamG);

  /* ---- Hekal (Lugar Santo) ---- */
  const hekalG = new THREE.Group();
  {
    const nm = stoneGold(); nm[0] = m("stone");
    const sm = stoneGold(); sm[1] = m("stone");
    box([1, 15, 40], nm, 10.5, 8.4, 10, hekalG);   // muro N
    box([1, 15, 40], sm, -10.5, 8.4, 10, hekalG);  // muro S
    const emat = [m("stone"), m("stone"), m("stone"), m("stone"), m("stone"), m("gold")];
    box([2.5, 15, 1], emat, -6.25, 8.4, 30.5, hekalG);   // muro E, puerta 5×10
    box([2.5, 15, 1], emat, 6.25, 8.4, 30.5, hekalG);
    box([5, 5, 1], emat, 0, 13.4, 30.5, hekalG);
    box([20, 0.2, 40], m("stoneLight"), 0, 0.8, 10, hekalG);       // suelo
    plane(20, 40, m("goldDark"), 0, 15.86, 10, hekalG, Math.PI / 2); // techo dorado
    const d1 = box([2.5, 10, 0.15], m("gold"), 1.35, 5.9, 30.85, hekalG);
    const d2 = box([2.5, 10, 0.15], m("gold"), -1.35, 5.9, 30.85, hekalG);
    d1.rotation.y = -0.55; d2.rotation.y = 0.55;
    for (const z of [2, 14, 26]) {
      box([0.14, 2.4, 1.4], m("dark"), 10.05, 11.2, z, hekalG);
      box([0.14, 2.4, 1.4], m("dark"), -10.05, 11.2, z, hekalG);
    }
  }
  part("hekal", "Hekal · Lugar Santo", "הֵיכָל", "1 Reyes 6:17",
    "El Lugar Santo, de 40 × 20 codos, recubierto de oro. Contenía el altar del incienso, la mesa del pan de la proposición y diez candeleros de oro.",
    [0, 5.5, 26], [0, 7, -6], hekalG, [0, 17.2, 8], true);
  sel(hekalG, "hekal");
  ghost(hekalG);

  /* ---- Debir (Santo de los Santos) ---- */
  const debirG = new THREE.Group();
  {
    const nm = stoneGold(); nm[0] = m("stone");
    const sm = stoneGold(); sm[1] = m("stone");
    box([1, 15, 20], nm, 10.5, 8.4, -20, debirG);
    box([1, 15, 20], sm, -10.5, 8.4, -20, debirG);
    box([20, 15, 1], [m("stone"), m("stone"), m("stone"), m("stone"), m("gold"), m("stone")], 0, 8.4, -30.5, debirG);
    const emat = [m("stone"), m("stone"), m("stone"), m("stone"), m("stone"), m("gold")];
    box([1.75, 15, 1], emat, -8.125, 8.4, -9.5, debirG);  // muro E, puerta 3.5×7
    box([1.75, 15, 1], emat, 8.125, 8.4, -9.5, debirG);
    box([3.5, 8, 1], emat, 0, 11.9, -9.5, debirG);
    box([10, 1, 10], m("stoneLight"), 0, 1.4, -20, debirG);   // plataforma 2 codos
    box([9, 0.5, 0.5], m("stoneLight"), 0, 1.65, -9.85, debirG);
    box([10, 0.5, 0.5], m("stoneLight"), 0, 1.15, -9.35, debirG);
    box([1.55, 7, 0.12], m("gold"), 0.975, 5.4, -9.75, debirG);  // puertas doradas
    box([1.55, 7, 0.12], m("gold"), -0.975, 5.4, -9.75, debirG);
  }
  part("debir", "Debir · Santo de los Santos", "דְּבִיר", "1 Reyes 6:16-20",
    "El lugar más sagrado: un cubo perfecto de 20 codos, enteramente revestido de oro. En su oscuridad reposaba el Arca del Pacto, bajo la protección de dos querubines.",
    [0, 6, -4], [0, 9, -18], debirG, [0, 17.2, -20], true);
  sel(debirG, "debir");
  ghost(debirG);

  /* ---- Velo del Santuario ---- */
  const veilG = new THREE.Group();
  plane(10, 10, m("veil"), 0, 5.9, -9.55, veilG);
  plane(10, 10, m("veil"), 0, 5.9, -9.45, veilG);
  part("veil", "Velo del Santuario", "פָּרֹכֶת", "2 Crónicas 3:14",
    "El velo de azul, púrpura y carmesí, con querubines bordados, que separaba el Lugar Santo del Santo de los Santos.",
    [6, 5.5, -4], [0, 7, -10], veilG, [0, 7.6, -9.9]);
  sel(veilG, "veil");

  /* ---- Cubierta común ---- */
  const roofG = new THREE.Group();
  box([21.2, 0.55, 70], m("copper"), 0, 15.9, 5, roofG);
  box([0.3, 0.35, 70.4], m("stoneDark"), 10.75, 16.35, 5, roofG);
  box([0.3, 0.35, 70.4], m("stoneDark"), -10.75, 16.35, 5, roofG);
  box([21.8, 0.35, 0.3], m("stoneDark"), 0, 16.35, -30.2, roofG);
  box([21.8, 0.35, 0.3], m("stoneDark"), 0, 16.35, 40.2, roofG);
  part("temple-roof", "Cubierta y Parapetos", "גַּג", "1 Reyes 6:9",
    "El techo de madera y cobre con parapetos que coronaba el edificio de 30 codos de alto.",
    [26, 20, 52], [0, 16.5, 6], roofG, [0, 17.8, 5]);
  sel(roofG, "temple-roof");
  ghost(roofG);

  /* ---- Cámaras laterales (3 pisos) ---- */
  const chambersG = new THREE.Group();
  {
    const stories = [
      { depth: 2.4, y0: 0.9, y1: 3.4, ox: 12.2, oz: -31.2 },
      { depth: 1.9, y0: 3.4, y1: 5.9, ox: 11.95, oz: -30.95 },
      { depth: 1.4, y0: 5.9, y1: 8.4, ox: 11.7, oz: -30.7 },
    ];
    for (const s of stories) {
      box([s.depth, s.y1 - s.y0, 60], m("stone"), s.ox, (s.y0 + s.y1) / 2, 0, chambersG);
      box([s.depth, s.y1 - s.y0, 60], m("stone"), -s.ox, (s.y0 + s.y1) / 2, 0, chambersG);
      box([20, s.y1 - s.y0, s.depth - 0.4], m("stone"), 0, (s.y0 + s.y1) / 2, s.oz - 0.2, chambersG);
      box([s.depth, 0.15, 60], m("stoneDark"), s.ox, s.y1, 0, chambersG);
      box([s.depth, 0.15, 60], m("stoneDark"), -s.ox, s.y1, 0, chambersG);
      box([20, 0.15, s.depth - 0.4], m("stoneDark"), 0, s.y1, s.oz - 0.2, chambersG);
      for (const z of [-20, 0, 20]) {
        box([0.1, 0.7, 0.9], m("dark"), s.ox + s.depth / 2, (s.y0 + s.y1) / 2, z, chambersG);
        box([0.1, 0.7, 0.9], m("dark"), -(s.ox + s.depth / 2), (s.y0 + s.y1) / 2, z, chambersG);
      }
    }
  }
  part("chambers", "Cámaras Laterales", "יָצִיעַ", "1 Reyes 6:5-6",
    "Cámaras adosadas de tres pisos, de cinco codos de altura cada uno, alrededor del templo (menos el frente), para el tesoro y el servicio. Cada piso era un codo más angosto que el anterior.",
    [15, 9.5, 2], [0, 7, 2], chambersG, [13.8, 9.2, 0]);
  sel(chambersG, "chambers");
  ghost(chambersG);

  /* ---- Columnas Jaquín y Boaz ---- */
  const pillarsG = new THREE.Group();
  {
    const makePillar = (x, z) => {
      cylinder(1, 1, 9, 20, m("bronze"), x, 4.5 + Y0, z, pillarsG);
      for (const y of [1.1, 2.3, 3.4, 4.6, 5.7, 6.9]) {
        cylinder(1.04, 1.04, 0.08, 20, m("bronzeDark"), x, y + Y0, z, pillarsG);
      }
      cylinder(1.15, 1.15, 0.3, 20, m("bronzeDark"), x, 9.75 + Y0, z, pillarsG);
      cylinder(1.3, 0.85, 1.4, 20, m("bronze"), x, 10.6 + Y0, z, pillarsG);
      cylinder(1.35, 1.35, 0.5, 20, m("bronze"), x, 11.55 + Y0, z, pillarsG);
      cylinder(0.18, 0.18, 0.7, 12, m("gold"), x, 12.15 + Y0, z, pillarsG);
      cylinder(0.4, 0.4, 0.12, 16, m("gold"), x, 12.55 + Y0, z, pillarsG);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        cylinder(0.13, 0.13, 0.13, 8, m("bronzeDark"), x + Math.cos(a) * 1.18, 10.15 + Y0, z + Math.sin(a) * 1.18, pillarsG);
      }
    };
    makePillar(4.8, 36.5);  // Jaquín (sur, derecha)
    makePillar(-4.8, 36.5); // Boaz (norte, izquierda)
  }
  part("pillars", "Jaquín y Boaz", "יָכִין · בֹּעַז", "1 Reyes 7:15-21",
    "Las columnas de bronce del pórtico: 18 codos de alto, con capiteles de lirios, redes y granadas. «Jaquín» (Él establecerá) y «Boaz» (en Él la fuerza).",
    [10, 6, 42], [0, 10, 36], pillarsG, [4.8, 12.9, 36.5]);
  sel(pillarsG, "pillars");

  /* ---- Altar del holocausto ---- */
  const altarG = new THREE.Group();
  {
    const b = m("bronze");
    box([10, 1, 10], b, 0, 1.0, 45, altarG);
    box([8, 1, 8], b, 0, 2.0, 45, altarG);
    box([6, 1, 6], b, 0, 3.0, 45, altarG);
    for (const [x, z] of [[-2.6, 42.4], [2.6, 42.4], [-2.6, 47.6], [2.6, 47.6]]) {
      cylinder(0.2, 0.2, 0.45, 10, m("bronzeDark"), x, 3.62, z, altarG);
    }
    const ramp = box([3, 0.2, 6.5], b, 0, 1.75, 46.8, altarG);
    ramp.rotation.x = 0.4;
  }
  part("altar", "Altar del Holocausto", "מִזְבֵּחַ", "2 Crónicas 4:1",
    "Gran altar de bronce de 20 × 20 codos y 10 de alto, con cuatro cuernos en las esquinas y rampa por el este, donde se ofrecían los sacrificios.",
    [14, 5.5, 52], [0, 4, 45], altarG, [0, 4.2, 45], true);
  sel(altarG, "altar");

  /* ---- Mar de Bronce ---- */
  const seaG = new THREE.Group();
  {
    const X = 15, Z = 36;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
      const ox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 0.9), m("bronzeDark"));
      ox.position.set(X + Math.cos(a) * 5, 1.2 + YC, Z + Math.sin(a) * 5);
      ox.rotation.y = a + Math.PI / 2;
      ox.castShadow = true;
      seaG.add(ox);
    }
    cylinder(3.4, 2.8, 2.5, 28, m("bronze"), X, 2.6 + YC, Z, seaG);
    cylinder(0.35, 0.55, 0.4, 20, m("bronzeDark"), X, 4.25 + YC, Z, seaG);
    cylinder(4.6, 4.6, 0.4, 28, m("water"), X, 2.9 + YC, Z, seaG);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(5, 0.22, 12, 40), m("gold"));
    rim.position.set(X, 4.05 + YC, Z);
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    seaG.add(rim);
  }
  part("sea", "Mar de Bronce", "יָם", "1 Reyes 7:23-26",
    "Inmensa pila de bronce fundido: 10 codos de borde a borde y 5 de alto, con borde como cáliz de azucena. Descansaba sobre doce bueyes y contenía ≈ 40.000 litros de agua.",
    [22, 6, 41], [15, 3, 36], seaG, [15, 5.8, 36], true);
  sel(seaG, "sea");

  /* ---- Lavaderos sobre basas ---- */
  const laversG = new THREE.Group();
  for (const sx of [1, -1]) {
    for (let i = 0; i < 5; i++) {
      const z = 26 + i * 2;
      const x = 15.5 * sx;
      const base = box([1.5, 1.4, 1.5], m("bronze"), x, 0.7 + YC, z, laversG);
      base.rotation.y = 0.35;
      const w = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.7, 0.7, 18), m("bronze"));
      w.position.set(x, 1.75 + YC, z);
      w.castShadow = true;
      laversG.add(w);
      for (const [dx, dz] of [[0.5, 0.5], [-0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]]) {
        cylinder(0.08, 0.08, 0.4, 8, m("bronzeDark"), x + dx, 1.3 + YC, z + dz, laversG);
      }
    }
  }
  part("lavers", "Basas y Lavaderos", "כִּיֹּר", "1 Reyes 7:27-39",
    "Diez basas de bronce con lavaderos, cinco a cada lado del templo, para purificar los animales del sacrificio.",
    [21, 4, 38], [15.5, 2.5, 33], laversG, [15.5, 3.4, 33]);
  sel(laversG, "lavers");

  /* ---- Altar del incienso ---- */
  const incenseG = new THREE.Group();
  {
    /* Coordenadas locales al origen del grupo (antes venían con la
       posición de la sala horneada directo en cada box/cylinder, del
       mismo tamaño que el resto de la habitación a escala 1 codo = 1
       unidad, mientras el altar se dibujó a la mitad de esa escala -
       se ve pequeño respecto al Hekal). Se recentra en el origen local
       para poder escalar el objeto x2 sin moverlo de su sitio real. */
    const g = m("gold");
    box([0.5, 1, 0.5], g, 0, 0.5, 0, incenseG);
    box([0.6, 0.06, 0.6], m("goldDark"), 0, 1.03, 0, incenseG);
    for (const [x, z] of [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]]) {
      cylinder(0.04, 0.04, 0.16, 8, g, x, 1.14, z, incenseG);
    }
  }
  incenseG.scale.setScalar(2);
  incenseG.position.set(0, Y0, -7);
  part("incense", "Altar del Incienso", "מִזְבַּח הַקְּטֹרֶת", "1 Reyes 7:48",
    "Altar de madera de cedro revestido de oro, de un codo, colocado ante el velo del Santuario; sobre él ardía el incienso cada mañana y cada tarde.",
    [6, 4.5, 12], [0, 5, -7], incenseG, [0, 2.7, -7]);
  sel(incenseG, "incense");

  /* ---- Mesa del pan de la proposición ---- */
  const tableG = new THREE.Group();
  {
    /* Coordenadas locales, recentradas en (-7, Y0, 12) - mismo problema
       de escala que el candelero/altar del incienso/arca: "2 × 1 codos"
       real quedó dibujada como 1 × 0.5. */
    for (const [x, z] of [[0.45, -0.15], [0.45, 0.15], [-0.45, -0.15], [-0.45, 0.15]]) {
      box([0.1, 0.85, 0.1], m("gold"), x, 1.325, z, tableG);   // patas
    }
    box([0.9, 0.08, 0.4], m("goldDark"), 0, 1.74, 0, tableG); // bastidor
    box([1, 0.06, 0.5], m("gold"), 0, 1.81, 0, tableG);       // tablero
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 6; c++) {
        box([0.15, 0.09, 0.1], m("cedar"), c * 0.29 - 0.05, 1.895, -0.18 + r * 0.36, tableG);
      }
    }
  }
  tableG.scale.setScalar(2);
  tableG.position.set(-7, Y0, 12);
  part("table", "Mesa del Pan de la Proposición", "שֻׁלְחָן", "1 Reyes 7:48",
    "Mesa de oro, de 2 × 1 codos, al lado norte del Lugar Santo, con los doce panes de la proposición renovados cada sábado.",
    [7, 4, 14], [-7, 3.5, 12], tableG, [-7, 2.7, 12]);
  sel(tableG, "table");

  /* ---- Diez candeleros (menorás) ---- */
  const menorotG = new THREE.Group();
  {
    const gold = m("gold");
    const armCurve = (y0, dy) => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, y0, 0),
      new THREE.Vector3(0.35, y0 + dy * 0.4, 0),
      new THREE.Vector3(0.45, y0 + dy, 0),
      new THREE.Vector3(0.45, y0 + dy + 0.18, 0),
    ]);
    /* Geometría local al origen de cada candelero (antes venía con
       "+ Y0" horneado directo, a la mitad del tamaño real de la sala -
       se ve pequeño junto al resto del Hekal). Y0 pasa a ser la
       posición del grupo, y cada candelero se escala x2 en su sitio. */
    for (const sx of [1, -1]) {
      for (const z of [4, 9, 14, 19, 24]) {
        const g = new THREE.Group();
        cylinder(0.42, 0.5, 0.12, 14, m("goldDark"), 0, 0.06, 0, g);
        cylinder(0.07, 0.09, 1.5, 10, gold, 0, 0.87, 0, g);
        for (const s of [1, -1]) {
          for (let i = 0; i < 3; i++) {
            const y0 = 0.55 + i * 0.28;
            const tube = new THREE.Mesh(
              new THREE.TubeGeometry(armCurve(y0, 0.55), 14, 0.034, 6),
              gold
            );
            tube.rotation.y = s === 1 ? 0 : Math.PI;
            g.add(tube);
            cylinder(0.06, 0.04, 0.2, 8, m("flame"), s * 0.45, y0 + 0.73, 0, g, false);
          }
        }
        cylinder(0.06, 0.04, 0.22, 8, m("flame"), 0, 1.6, 0, g, false);
        g.scale.setScalar(2);
        g.position.set(7 * sx, Y0, z);
        menorotG.add(g);
      }
    }
  }
  part("menorot", "Diez Candeleros de Oro", "מְנוֹרָה", "1 Reyes 7:49",
    "Diez candeleros de oro de siete brazos, cinco a cada lado del Lugar Santo, encendidos para alumbrar el santuario día y noche.",
    [8, 4, 26], [0, 4, 20], menorotG, [0, 3, 20]);
  sel(menorotG, "menorot");

  /* ---- Arca del Pacto (sobre plataforma del Debir, piso 1.9) ---- */
  const arkG = new THREE.Group();
  {
    /* Coordenadas locales, recentradas en (0, 1.9, -20) - el piso de la
       plataforma del Debir - para poder escalar x2 en su sitio (mismo
       problema del candelero/altar del incienso: se dibujó a la mitad
       de la escala real del edificio). */
    const g = m("gold");
    box([1.25, 0.75, 0.75], g, 0, 0.375, 0, arkG);
    box([1.5, 0.1, 0.95], m("goldDark"), 0, 0.8, 0, arkG);
    cylinder(0.025, 0.025, 2.6, 8, g, 0, 0.3, 0, arkG);
    for (const [x, z] of [[-0.45, -0.38], [0.45, -0.38], [-0.45, 0.38], [0.45, 0.38]]) {
      cylinder(0.06, 0.06, 0.09, 10, m("bronzeDark"), x, 0.2, z, arkG);
    }
    /* querubines del propiciatorio: alas extendidas hacia arriba (Éx 25:20) */
    for (const sx of [1, -1]) {
      const cg = new THREE.Group();
      cg.position.set(sx * 0.55, 1.12, 0);
      cg.rotation.y = -sx * Math.PI / 2 + sx * 0.25;
      const gd = m("goldDark");
      box([0.22, 0.5, 0.24], g, 0, 0.25, 0, cg);          // cuerpo
      cylinder(0.1, 0.1, 0.15, 10, g, 0, 0.57, 0, cg);    // cabeza
      box([0.16, 0.1, 0.16], gd, 0, 0.66, 0, cg);         // tocado
      for (const w of [1, -1]) {                          // alas alzadas
        const wing = box([0.06, 0.45, 0.24], g, w * 0.16, 0.42, 0, cg);
        wing.rotation.z = -w * 0.9;
      }
      for (const w of [1, -1]) {                          // alas menores
        const w2 = box([0.05, 0.3, 0.18], gd, w * 0.18, 0.36, 0, cg);
        w2.rotation.z = -w * 0.55;
      }
      arkG.add(cg);
    }
    halo(0, 2.0, 0, 1.6, 0.35, arkG);                     // resplandor sobre el Arca
  }
  arkG.scale.setScalar(2);
  arkG.position.set(0, 1.9, -20);
  part("ark", "Arca del Pacto", "אֲרוֹן הַבְּרִית", "Éxodo 25:10-22",
    "Cofre de madera de acacia revestida de oro (2.5 × 1.5 codos) con el propiciatorio y dos querubines, depositado en el Santo de los Santos con las tablas de la Ley.",
    [0, 6, -7], [0, 7.5, -20], arkG, [0, 3.9, -20], true);
  sel(arkG, "ark");

  /* ---- Querubines gigantes (sobre plataforma 1.9) ---- */
  const cherubimG = new THREE.Group();
  {
    const gold = m("gold");
    const gd = m("goldDark");
    const gP = new THREE.MeshStandardMaterial({ map: makePatternTex(), metalness: 0.92, roughness: 0.3 });

    /* alas emplumadas: 5 hileras escalonadas por ala (10 codos cada una) */
    const mkWing = (span) => {
      const wg = new THREE.Group();
      const lens = [span, span - 0.8, span - 1.6, span - 2.4, span - 3.2];
      lens.forEach((len, i) => {
        const tier = new THREE.Mesh(
          new THREE.BoxGeometry(len, 0.16, 2.3),
          i % 2 ? gd : gold
        );
        tier.position.set(0.72 + len / 2 - 0.12, 4.35 + i * 0.26, 0);
        tier.rotation.z = 0.02 + i * 0.028;
        tier.castShadow = true;
        wg.add(tier);
        const tip = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.14, 2.12),
          i % 2 ? gd : gold
        );
        tip.position.set(0.72 + len - 0.02, 4.35 + i * 0.26 - 0.06, 0);
        tip.rotation.z = 0.02 + i * 0.028;
        tip.castShadow = true;
        wg.add(tip);
      });
      return wg;
    };

    for (const sx of [1, -1]) {
      const x = sx * 4.6;
      /* pedestal dorado */
      box([4, 0.35, 2.6], gd, x, 2.0, -20, cherubimG);
      box([3.6, 0.12, 2.2], gold, x, 2.25, -20, cherubimG);
      /* pies y piernas */
      box([0.55, 0.4, 0.75], gold, x - 0.32, 2.5, -20, cherubimG);
      box([0.55, 0.4, 0.75], gold, x + 0.32, 2.5, -20, cherubimG);
      box([0.35, 1.1, 0.6], gold, x - 0.32, 3.25, -20, cherubimG);
      box([0.35, 1.1, 0.6], gold, x + 0.32, 3.25, -20, cherubimG);
      /* torso con grabados dorados */
      const torso = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.75, 1.15), [gold, gold, gold, gold, gP, gP]);
      torso.position.set(x, 4.62, -20);
      torso.castShadow = true;
      cherubimG.add(torso);
      box([1.45, 0.3, 1.25], gd, x, 3.85, -20, cherubimG);  // cinturón
      box([1.45, 0.5, 1.25], gold, x, 5.25, -20, cherubimG); // pectoral
      cylinder(0.3, 0.34, 0.4, 12, gd, x, 5.7, -20, cherubimG); // cuello
      /* cabeza: rostro con ojos, tocado y corona */
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.52, 20, 14), gold);
      head.position.set(x, 6.15, -20);
      head.castShadow = true;
      cherubimG.add(head);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.06, 8, 20), gd);
      band.position.set(x, 6.2, -20);
      band.rotation.x = Math.PI / 2;
      cherubimG.add(band);
      box([0.09, 0.05, 0.02], m("dark"), x - 0.17, 6.18, -19.65, cherubimG); // ojos
      box([0.09, 0.05, 0.02], m("dark"), x + 0.17, 6.18, -19.65, cherubimG);
      box([0.05, 0.24, 0.03], gd, x, 6.0, -19.62, cherubimG);  // nariz
      box([0.34, 0.16, 0.03], gd, x, 5.86, -19.62, cherubimG); // boca
      box([1.1, 0.45, 1.1], gd, x, 6.5, -20, cherubimG);      // cabellera
      cylinder(0.1, 0.14, 0.3, 10, gold, x, 6.85, -20, cherubimG); // corona
      /* brazos en gesto de bendición (manos al frente) */
      box([1.0, 0.42, 0.42], gold, x + sx * 1.18, 4.75, -20, cherubimG);  // brazo
      box([0.36, 0.8, 0.36], gold, x + sx * 0.95, 5.45, -20, cherubimG);  // antebrazo
      box([0.42, 0.38, 0.5], gold, x + sx * 0.95, 5.95, -20, cherubimG);  // mano
      /* alas: interior toca al centro, exterior roza la pared (1 R 6:24-27) */
      const wi = mkWing(4.0); wi.position.x = x; wi.scale.x = -sx; cherubimG.add(wi);
      const wo = mkWing(4.7); wo.position.x = x; wo.scale.x = sx; cherubimG.add(wo);
      /* halo */
      halo(x, 6.35, -20.9, 5.2, 0.45, cherubimG);
    }
  }
  part("cherubim", "Querubines del Santuario", "כְּרוּבִים", "1 Reyes 6:23-28",
    "Dos querubines de madera de olivo revestidos de oro, de 10 codos de alto y alas de 10 codos con plumas talladas en capas; las alas interiores se tocaban en el centro y las exteriores rozaban las paredes del Debir.",
    [6.5, 5, -15], [0, 6.2, -20], cherubimG, [4.6, 9.8, -20]);
  sel(cherubimG, "cherubim");

  /* ========================= ATRIO INTERIOR ========================= */
  const innerCourtG = new THREE.Group();
  {
    box([90, 0.5, 90], m("stoneLight"), 0, 0.25, 5, innerCourtG); // suelo, top 0.5
    const wall = (len, th, h, x, z, alongZ, open) => {
      const half = (len - open) / 2;
      const off = half / 2 + open / 2;
      if (alongZ) {
        box([half, h, th], m("stone"), x, 0.5 + h / 2, z + off, innerCourtG);
        box([half, h, th], m("stone"), x, 0.5 + h / 2, z - off, innerCourtG);
      } else {
        box([th, h, half], m("stone"), x + off, 0.5 + h / 2, z, innerCourtG);
        box([th, h, half], m("stone"), x - off, 0.5 + h / 2, z, innerCourtG);
      }
      if (open > 0) {
        const lint = open + 2 * th + 0.8;
        if (alongZ) box([th + 0.8, 1.2, lint], m("stoneDark"), x, 0.5 + h + 0.6, z, innerCourtG);
        else box([lint, 1.2, th + 0.8], m("stoneDark"), x, 0.5 + h + 0.6, z, innerCourtG);
      }
    };
    wall(90, 0.8, 2.5, 0, -40, false, 0);   // muro O
    wall(90, 0.8, 2.5, 0, 50, false, 12);   // muro E con puerta
    wall(90, 0.8, 2.5, -45, 5, true, 14);   // muro N con puerta
    wall(90, 0.8, 2.5, 45, 5, true, 14);    // muro S con puerta
    box([1.2, 4, 1.6], m("stoneDark"), -6.6, 4.3, 50, innerCourtG); // machones de la Puerta E
    box([1.2, 4, 1.6], m("stoneDark"), 6.6, 4.3, 50, innerCourtG);
    box([16, 0.5, 2.4], m("stoneLight"), 0, 0.25, 51.2, innerCourtG); // escalones
    box([18, 0.5, 2.4], m("stoneLight"), 0, 0.25, 53.4, innerCourtG);
  }
  part("court-inner", "Atrio de los Sacerdotes", "חֲצַר הַכֹּהֲנִים", "2 Crónicas 4:9",
    "El atrio interior (100 × 100 codos), pavimentado con piedra, donde estaban el altar del holocausto, el Mar de bronce y los lavaderos. Solo los sacerdotes podían entrar.",
    [38, 19, 58], [0, 7, 10], innerCourtG, [35, 2.2, 28], true);
  sel(innerCourtG, "court-inner");

  /* ========================= ATRIO GRANDE ========================= */
  const greatCourtG = new THREE.Group();
  {
    box([160, 0.5, 160], m("stone"), 0, 0.25, 0, greatCourtG);
    const gWall = (len, x, z, open, alongZ) => {
      const segs = [{ from: -len / 2, to: -open / 2 }, { from: open / 2, to: len / 2 }];
      for (const s of segs) {
        const l = s.to - s.from;
        const c = (s.from + s.to) / 2;
        if (alongZ) {
          box([1, 4, l], m("stone"), x, 2, c, greatCourtG);
          for (let p = s.from + 3; p < s.to - 2; p += 6) box([1, 0.9, 1.4], m("stoneDark"), x, 4.45, p, greatCourtG);
        } else {
          box([l, 4, 1], m("stone"), c, 2, z, greatCourtG);
          for (let p = s.from + 3; p < s.to - 2; p += 6) box([1.4, 0.9, 1], m("stoneDark"), p, 4.45, z, greatCourtG);
        }
      }
      const lint = open + 2;
      if (alongZ) {
        const gx = x + (x < 0 ? 4.5 : -4.5);
        box([1, 1.2, lint], m("stoneDark"), x, 4.6, 0, greatCourtG);
        box([7, 2.6, open + 6], m("stoneLight"), gx, 6.6, 0, greatCourtG);
      } else {
        const gz = z + (z > 0 ? -4.5 : 4.5);
        box([lint, 1.2, 1], m("stoneDark"), 0, 4.6, z, greatCourtG);
        box([open + 6, 2.6, 7], m("stoneLight"), 0, 6.6, gz, greatCourtG);
      }
    };
    gWall(160, 0, 80, 16, false);
    gWall(160, 0, -80, 16, false);
    gWall(160, -80, 0, 16, true);
    gWall(160, 80, 0, 16, true);
    for (const [x, z] of [[-80, -80], [80, -80], [-80, 80], [80, 80]]) {
      box([5, 6, 5], m("stoneLight"), x, 3, z, greatCourtG);
    }
    /* cámaras del atrio */
    const rooms = [
      { x: 0, z: 76.5, ry: 0 },
      { x: 0, z: -76.5, ry: 0 },
      { x: -76.5, z: 0, ry: Math.PI / 2 },
      { x: 76.5, z: 0, ry: Math.PI / 2 },
    ];
    for (const r of rooms) {
      const g = new THREE.Group();
      const segs = [{ from: -60, to: -20 }, { from: -15, to: 15 }, { from: 20, to: 60 }];
      for (const s of segs) {
        const l = s.to - s.from;
        const c = (s.from + s.to) / 2;
        box([l, 3.5, 1], m("stoneDark"), c, 1.75, 0, g);
        box([l, 0.2, 1.2], m("cedar"), c, 3.6, 0, g);
        for (let i = 0; i < 3; i++) {
          const dx = s.from + (l * (i + 0.5)) / 3;
          box([0.05, 2, 1.05], m("dark"), dx, 1.75, 0, g);
        }
      }
      g.rotation.y = r.ry;
      g.position.set(r.x, 0.5, r.z);
      greatCourtG.add(g);
    }
    /* palmeras */
    const makePalm = (x, z, s) => {
      const g = new THREE.Group();
      const trunk = cylinder(0.22, 0.3, 4.4 * s, 8, m("trunk"), 0, 2.2 * s, 0, g);
      trunk.rotation.z = (Math.random() - 0.5) * 0.18;
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const fr = box([4.4 * s, 0.16, 0.9 * s], m("leaf"), Math.cos(a) * 2.1 * s, 4.3 * s, Math.sin(a) * 2.1 * s, g);
        fr.rotation.z = Math.cos(a) * 0.5 * s - 0.45;
        fr.rotation.x = Math.sin(a) * 0.35 * s;
      }
      g.position.set(x, 0.5, z);
      greatCourtG.add(g);
    };
    for (const [x, z, s] of [[-60, 62, 1.4], [60, 62, 1.2], [-60, -62, 1.3], [60, -62, 1.5],
      [-30, 70, 1.1], [30, 70, 1.2], [-70, 30, 1.2], [70, 30, 1.1], [0, -68, 1.3], [0, 68, 1.4]]) {
      makePalm(x, z, s);
    }
  }
  part("court-great", "Atrio Grande", "הֶחָצֵר הַגְּדוֹלָה", "1 Reyes 7:9-12",
    "El gran atrio que rodeaba el santuario, cerrado por muros almenados, puertas y cámaras. Aquí se reunía la asamblea de Israel.",
    [72, 24, 92], [0, 6, 10], greatCourtG, [72, 2.2, 60], true);
  sel(greatCourtG, "court-great");

  /* ---- Puertas y escalinata ---- */
  const gatesG = new THREE.Group();
  {
    box([22, 3, 9], m("cedar"), 0, 6.5, 84.5, gatesG);       // pabellón de la Puerta Oriental
    box([24, 1, 10], m("stoneDark"), 0, 8.5, 84.5, gatesG);
    box([26, 0.8, 11], m("copper"), 0, 9.4, 84.5, gatesG);
    for (const sx of [1, -1]) {
      box([6, 3, 0.4], m("bronze"), sx * 6, 1.5, 83.8, gatesG);
      box([6, 3, 0.4], m("bronze"), sx * 6, 1.5, 85.2, gatesG);
    }
    box([14, 2, 1.2], m("cedar"), 0, 6.5, 51, gatesG);       // puertas atrio interior
    box([1.2, 2, 14], m("cedar"), -45.6, 6.5, 0, gatesG);
    box([1.2, 2, 14], m("cedar"), 45.6, 6.5, 0, gatesG);
    for (let i = 0; i < 6; i++) {
      box([15 - i * 2, 0.3, 1.6], m("stoneLight"), 0, -0.15 - i * 0.3, 82.2 + i * 1.5, gatesG);
    }
  }
  part("gates", "Puertas y Escalinata", "שַׁעַר", "2 Crónicas 4:9",
    "Las puertas de los atrios. La Puerta Oriental era la entrada ceremonial principal, flanqueada por torres y machones, con la gran escalinata que ascendía desde la plaza.",
    [30, 10, 76], [0, 6, 55], gatesG, [0, 10.6, 86], true);
  sel(gatesG, "gates");

  /* ---- Etiquetas extra ---- */
  const extra = new THREE.Group();
  group.add(extra);
  extra.add(label("Jaquín", [4.8, 13.1, 36.5]));
  extra.add(label("Boaz", [-4.8, 13.1, 36.5]));
  extra.add(label("Cámaras (3 pisos)", [-13.8, 9.2, 0]));

  return { parts, selectables, ghostShell, dust: { points: dust, base: dustBase }, scene: group };
}

/* ------------------------------------------------------------------ */
/* Cielo degradado                                                     */
/* ------------------------------------------------------------------ */
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
