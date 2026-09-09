import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {zones,zoneAt,canStand,move,floorHeight} from '../src/navigation.js';
import {elements,sections,byId,tour,questions,resolvePart} from '../src/content.js';

test('Every destination is accessible at the correct floor height',()=>{
  for(const [id,z]of Object.entries(zones)){
    const [x,y,depth]=z.eye;assert.ok(canStand(x,depth),id);assert.equal(zoneAt(x,depth),id);assert.ok(Math.abs(y-floorHeight(x,depth)-1.65)<1e-9);
  }
});
test('Walk from the court around the altar, up the stairs, into the Debir and out',()=>{
  const p={x:0,z:39};
  const route=[[7,0],[0,-23],[-7,0],[0,-8],[0,-18],[1.3,0],[0,-3.5],[-1.3,0],[0,-3.5]];
  for(const [dx,dz]of route)move(p,dx,dz);
  assert.equal(zoneAt(p.x,p.z),'debir');assert.ok(Math.abs(p.z+17)<1e-6);assert.equal(floorHeight(p.x,p.z),1.2);
  for(const [dx,dz]of route.toReversed())move(p,-dx,-dz);
  assert.equal(zoneAt(p.x,p.z),'exterior');assert.ok(Math.abs(p.z-39)<1e-6);assert.equal(floorHeight(p.x,p.z),0);
});
test('Stairs rise smoothly, terrace sides and large obstacles cannot be crossed',()=>{
  assert.equal(floorHeight(0,15),0);assert.ok(Math.abs(floorHeight(0,13)-.6)<1e-6);assert.equal(floorHeight(0,11),1.2);
  const side={x:12,z:0};move(side,-9,0);assert.ok(side.x>10);
  const altar={x:0,z:35};move(altar,0,-30);assert.ok(altar.z>29);
  const wall={x:0,z:-23};move(wall,0,-20);assert.ok(wall.z>-25);
});
test('All twenty learning elements appear once in the catalog',()=>{
  assert.equal(elements.length,20);assert.equal(new Set(elements.map(e=>e.id)).size,20);
  assert.deepEqual(sections.flatMap(s=>s.ids).sort(),elements.map(e=>e.id).sort());
  for(const e of elements){assert.ok(e.ref&&e.detail&&e.observe);assert.equal(e.point.length,3);assert.equal(e.view.length,3);}
});
test('Tour and six questions reference valid elements and answers',()=>{
  assert.equal(tour.length,18);assert.equal(questions.length,6);for(const id of tour)assert.ok(byId[id]);
  for(const q of questions){assert.ok(byId[q.id]);assert.ok(q.correct>=0&&q.correct<q.answers.length);}
});
test('Actual links in the existing Solomon study map to the new viewer',()=>{
  const html=fs.readFileSync(new URL('../../../page/Figuras Bíblicas/templo-figuras.html',import.meta.url),'utf8');
  const matches=[...html.matchAll(/temple-3d\.html\?part=([^"\s]+)/g)];assert.ok(matches.length>=9);
  for(const [,id]of matches)assert.ok(resolvePart(id),id);
  for(const bad of [null,'','constructor','__proto__','no-existe'])assert.equal(resolvePart(bad),null);
});
