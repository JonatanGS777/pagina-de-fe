// +x = sur, +z = este. Un codo convencional = 0,5 m. Suelo del templo: 1,2 m.
export const zones={
  exterior:{name:'Atrio',eye:[0,1.65,39],look:[0,5,7],view:[53,40,64],target:[0,4,3]},
  portico:{name:'Pórtico',eye:[0,2.85,8],look:[0,4,0],view:[23,18,34],target:[0,6,6]},
  hekal:{name:'Hekal',eye:[0,2.85,2],look:[0,3,-10],view:[16,24,10],target:[0,3,-5]},
  debir:{name:'Debir',eye:[0,2.85,-16.3],look:[0,2.5,-20.5],view:[13,19,-11],target:[0,3,-20]},
};
export function floorHeight(x,z){
  if(Math.abs(x)<=10&&z>=-29&&z<=11)return 1.2;
  if(Math.abs(x)<=3.2&&z>11&&z<15)return (15-z)*.3;
  return 0;
}
export function zoneAt(x,z){if(Math.abs(x)<5&&z>=-25&&z<=5)return z< -15?'debir':'hekal';if(Math.abs(x)<5&&z>5&&z<=11)return 'portico';return 'exterior';}
export const obstacles=[
  // Perimeter with the eastern entrance open.
  [-26.3,-25.7,-34,43],[25.7,26.3,-34,43],[-26,26,-34.3,-33.7],[-26,-5,42.7,43.3],[5,26,42.7,43.3],
  // Raised terrace edges, reached by the eastern staircase only.
  [-10.25,-9.75,-29,11],[9.75,10.25,-29,11],[-10,10,-29.25,-28.75],[-10,-3.2,10.8,11.2],[3.2,10,10.8,11.2],
  // Main walls, side chambers, portal and dividing wall; doors open on axis.
  [-9,-4.85,-28,5],[4.85,9,-28,5],[-5,5,-25.5,-24.85],
  [-5,-1.8,4.85,5.5],[1.8,5,4.85,5.5],[-5,-1.8,-15.25,-14.85],[1.8,5,-15.25,-14.85],
  [-5.4,-4.85,5,10],[4.85,5.4,5,10],
  // Altar, sea and two freestanding columns.
  [-5.1,5.1,18.9,29.1],[8.7,15.3,12.7,19.3],
  [2.45,4.55,7.95,10.05],[-4.55,-2.45,7.95,10.05],
  [-.85,.85,-12.35,-10.65],[-.85,.85,-20.6,-19.4],
  [-3.05,-1.95,-21,-19],[1.95,3.05,-21,-19],
];
for(const x of [-16,16])for(const z of [-13,-7,-1,5,11])obstacles.push([x-1.2,x+1.2,z-1.2,z+1.2]);
for(const x of [-3.5,3.5])for(let i=0;i<5;i++){
  const z=1-i*3.4;obstacles.push([x-.6,x+.6,z-.45,z+.45]);
  obstacles.push([x-.8,x+.8,z-2.2,z-1.2]);
}
export function canStand(x,z,r=.25){return Math.abs(x)<48&&z> -47&&z<54&&!obstacles.some(([a,b,c,d])=>x>a-r&&x<b+r&&z>c-r&&z<d+r);}
export function move(p,dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.1));for(let i=0;i<steps;i++){
  if(canStand(p.x+dx/steps,p.z)&&Math.abs(floorHeight(p.x+dx/steps,p.z)-floorHeight(p.x,p.z))<.25)p.x+=dx/steps;
  if(canStand(p.x,p.z+dz/steps)&&Math.abs(floorHeight(p.x,p.z+dz/steps)-floorHeight(p.x,p.z))<.25)p.z+=dz/steps;
}return p;}
