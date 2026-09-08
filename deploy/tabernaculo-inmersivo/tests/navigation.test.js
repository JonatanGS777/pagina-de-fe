import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canStand, move, zoneAt, zones } from '../src/navigation.js';
import { elements, byId, tour, sections, questions, resolvePart } from '../src/content.js';

test('Every destination places a visitor on accessible ground in the intended zone',()=>{
  for(const [id,zone] of Object.entries(zones)){
    assert.ok(canStand(zone.eye[0],zone.eye[2]),id);
    assert.equal(zoneAt(zone.eye[0],zone.eye[2]),id);
    assert.equal(zone.eye[1],1.65);
  }
});
test('Entrance admits a visitor, side curtains block crossing, exit remains possible',()=>{
  const entrance={x:0,z:27};move(entrance,0,-4);assert.ok(entrance.z<25);
  move(entrance,0,4);assert.ok(entrance.z>25);
  const wall={x:9,z:27};move(wall,0,-6);assert.ok(wall.z>25);
  const lateral={x:11,z:0};move(lateral,6,0);assert.ok(lateral.x<12.5);
});
test('Continuous walk reaches both chambers through their openings and returns outside',()=>{
  const person={x:1,z:29};move(person,0,-11);move(person,1,0);move(person,0,-14);
  move(person,-1.3,0);move(person,0,-15.9);move(person,-.7,0);move(person,0,-1.2);
  assert.equal(zoneAt(person.x,person.z),'santisimo');
  move(person,0,1.2);move(person,.7,0);move(person,0,15.9);move(person,1.3,0);move(person,0,14);move(person,-1,0);move(person,0,11);
  assert.equal(zoneAt(person.x,person.z),'exterior');
});
test('Large movement cannot tunnel through the altar or the west wall',()=>{
  const altar={x:0,z:20};move(altar,0,-20);assert.ok(altar.z>15.4);
  const rear={x:1.6,z:-16};move(rear,0,-10);assert.ok(rear.z>-17.3);
});
test('Catalog, tour and quiz references remain valid and complete',()=>{
  assert.equal(elements.length,18);assert.equal(new Set(elements.map(e=>e.id)).size,18);
  assert.deepEqual(sections.flatMap(s=>s.ids).sort(),elements.map(e=>e.id).sort());
  for(const id of tour)assert.ok(byId[id]);
  for(const q of questions){assert.ok(byId[q.id]);assert.ok(q.correct>=0&&q.correct<q.answers.length);}
  for(const e of elements){assert.equal(e.point.length,3);assert.equal(e.view.length,3);assert.ok(e.ref&&e.detail&&e.observe);}
});

test('Existing study links resolve to the corresponding new elements',()=>{
  const aliases={'puerta-atrio':'puerta',tienda:'cubiertas','lugar-santo':'santo',candelero:'menora',incensario:'incienso','lugar-santisimo':'santisimo',pantalla:'entrada'};
  for(const [legacy,id] of Object.entries(aliases))assert.equal(resolvePart(legacy),id);
  for(const e of elements)assert.equal(resolvePart(e.id),e.id);
  for(const invalid of [null,'','no-existe','__proto__','constructor'])assert.equal(resolvePart(invalid),null);
});
