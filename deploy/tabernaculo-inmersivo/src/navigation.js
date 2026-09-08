// Metros convencionales: x positivo = sur; z positivo = este.
export const zones = {
  exterior: { name: 'Exterior', eye: [0, 1.65, 29], look: [0, 1.65, 20], view: [33, 30, 45], target: [0, 0, 1] },
  atrio: { name: 'Atrio', eye: [3, 1.65, 20], look: [0, 1.2, 14], view: [20, 20, 30], target: [0, 0, 10] },
  santo: { name: 'Lugar Santo', eye: [0.6, 1.65, -4], look: [0, 1.2, -10], view: [7, 10, 0], target: [0, 0, -7] },
  santisimo: { name: 'Lugar Santísimo', eye: [0, 1.65, -13.2], look: [0, 0.95, -15], view: [7, 9, -10], target: [0, 0, -15] },
};
export function zoneAt(x, z) {
  if (Math.abs(x) > 12.5 || z > 25 || z < -25) return 'exterior';
  if (Math.abs(x) < 2.5 && z <= -2.5 && z >= -17.5) return z < -12.5 ? 'santisimo' : 'santo';
  return 'atrio';
}
// Bounding rectangles leave open doorways but keep people out of walls/furniture.
export const obstacles = [
  [-12.65, -12.35, -25, 25], [12.35, 12.65, -25, 25], [-12.5, 12.5, -25.15, -24.85],
  [-12.5, -5, 24.85, 25.15], [5, 12.5, 24.85, 25.15],
  [-2.7, -2.3, -17.7, -2.5], [2.3, 2.7, -17.7, -2.5], [-2.7, 2.7, -17.7, -17.3],
  [-1.4, 1.4, 12.6, 15.4], [-0.8, 0.8, 5.2, 6.8],
  [-2.15, -0.85, -7.4, -6.6], [1.2, 1.9, -8, -6],
  [-0.4, 0.4, -11.4, -10.6], [-0.8, 0.8, -15.6, -14.4],
  // Central entrance column; pass on either side as in the five-post screen.
  [-0.12, 0.12, -2.64, -2.36],
  [-1.37, -1.13, -2.64, -2.36], [1.13, 1.37, -2.64, -2.36],
  [-.953, -.713, -12.64, -12.36], [.713, .953, -12.64, -12.36],
  [-1.79, -1.55, 24.85, 25.15], [1.55, 1.79, 24.85, 25.15],
];
export function canStand(x, z, radius = 0.22) {
  return Math.abs(x) < 42 && Math.abs(z) < 44 && !obstacles.some(([a,b,c,d]) => x > a-radius && x < b+radius && z > c-radius && z < d+radius);
}
export function move(position, dx, dz) {
  // Substeps prevent tunnelling if a frame stalls; separate axes permit sliding.
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.1));
  for (let i = 0; i < steps; i++) {
    if (canStand(position.x + dx / steps, position.z)) position.x += dx / steps;
    if (canStand(position.x, position.z + dz / steps)) position.z += dz / steps;
  }
  return position;
}

