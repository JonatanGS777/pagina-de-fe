import './style.css';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createWorld } from './world.js';
import { elements, byId, tour, resolvePart } from './content.js';
import { zones, zoneAt, move, canStand, floorHeight } from './navigation.js';
import { createUI } from './ui.js';

const $=id=>document.getElementById(id);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let renderer;
try {renderer=new T.WebGLRenderer({antialias:true,alpha:false});}
catch {
  $('loading').innerHTML='<div class="webgl-error"><h2>Tu navegador necesita WebGL 2.</h2><p>Activa la aceleración gráfica o abre esta experiencia en un navegador compatible. Las fichas didácticas siguen disponibles en el catálogo.</p></div>';
  const fallback=createUI({select:id=>fallback.select(id,true),startTour:()=>fallback.select(tour[0],true),pause:()=>{}});
  const requested=resolvePart(new URLSearchParams(location.search).get('part'));if(requested)fallback.select(requested,true);
  document.querySelectorAll('.mode-nav button,.scene-options button,.bottom-bar [data-zone]').forEach(b=>b.disabled=true);
}
if(renderer)start();

function start() {
  const stage=$('stage');const scene=new T.Scene();scene.background=new T.Color('#d9e0df');scene.fog=new T.Fog('#d9e0df',110,330);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.outputColorSpace=T.SRGBColorSpace;
  $('scene').append(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Vista 3D. Arrastra para mirar; en modo caminar usa W A S D.');
  const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.03);scene.environment=environment.texture;scene.environmentIntensity=.65;room.dispose();pmrem.dispose();
  scene.add(new T.HemisphereLight('#edf3ff','#a48c69',1.65));
  const sun=new T.DirectionalLight('#fff0d4',3.2);sun.position.set(-40,65,40);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
  Object.assign(sun.shadow.camera,{left:-54,right:54,top:60,bottom:-60,near:1,far:170});sun.shadow.normalBias=.035;sun.shadow.bias=-.0002;scene.add(sun);
  const fill=new T.DirectionalLight('#e6edff',.7);fill.position.set(20,18,-20);scene.add(fill);
  // Fill lights represent adapted vision when studying the dark inner chambers.
  const inner=new T.PointLight('#ffe5ab',42,24,2);inner.position.set(0,7,-20);scene.add(inner);
  const world=createWorld(scene);
  const camera=new T.PerspectiveCamera(48,1,.06,700);camera.position.fromArray(zones.exterior.view);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.fromArray(zones.exterior.target);controls.enableDamping=true;controls.dampingFactor=.07;controls.minDistance=.7;controls.maxDistance=170;controls.maxPolarAngle=Math.PI*.48;controls.update();
  let selected=null,walking=false,cut=false,split=false,isolated=false,labelsOn=true,tourIndex=-1,flight=null,yaw=0,pitch=0;
  const keys={},ray=new T.Raycaster(),pointer=new T.Vector2(),clock=new T.Clock();
  let nearest=null,lastTime=0,lastZone='exterior';
  const ui=createUI({select:id=>select(id),startTour,pause});
  const labels=new Map();elements.forEach(e=>{
    const b=document.createElement('button');b.className='world-label';b.textContent=e.name;b.dataset.element=e.id;b.addEventListener('click',()=>select(e.id));$('labels').append(b);labels.set(e.id,b);
  });
  const overviewLabels=new Set(['portico','altar','mar','hekal','debir','camaras']);
  function updateWorld(){world.setView({cut,split,walking,selected,isolated:isolated?selected:null});$('cutaway').classList.toggle('active',cut);$('cutaway').setAttribute('aria-pressed',String(cut));$('layers').classList.toggle('active',split);$('layers').setAttribute('aria-pressed',String(split));$('isolate').textContent=isolated?'Ver conjunto':'Aislar 3D';$('isolate').setAttribute('aria-pressed',String(isolated));}
  function clearKeys(){Object.keys(keys).forEach(k=>delete keys[k]);}
  function pause(){clearKeys();if(document.pointerLockElement)document.exitPointerLock();}
  function focus(pos,target,duration=1.3){flight={from:camera.position.clone(),to:new T.Vector3(...pos),target0:controls.target.clone(),target1:new T.Vector3(...target),time:0,duration:reduced?0:duration};}
  function setHeading(){if(!selected){$('scene-heading').textContent='Una casa para su nombre';$('scene-description').textContent='Una historia que puedes recorrer.';}}
  function select(id,learn=false) {
    if(!byId[id])return;isolated=false;selected=id;const e=byId[id];
    if(!walking) {
      cut=['hekal','debir'].includes(e.zone);split=id==='techo';
      focus(e.view,e.point);
    }
    ui.select(id,learn);labels.forEach((b,k)=>b.classList.toggle('active',k===id));updateWorld();
    $('selection').hidden=false;
  }
  function deselect(){selected=null;isolated=false;ui.select(null);labels.forEach(b=>b.classList.remove('active'));updateWorld();setHeading();}
  function stopTour(){tourIndex=-1;$('tour-bar').hidden=true;stage.classList.remove('touring');$('guide').classList.remove('active');$('canvas-hint').hidden=false;if(!walking){$('overview').classList.add('active');$('mode-caption').textContent='Vista general';}}
  function exitWalk(){walking=false;pause();controls.enabled=true;camera.rotation.order='XYZ';stage.classList.remove('walking');$('walk-ui').hidden=true;$('walk').classList.remove('active');$('overview').classList.add('active');$('mode-caption').textContent='Vista general';$('isolate').disabled=false;updateWorld();}
  function overview(){stopTour();exitWalk();deselect();cut=false;split=false;updateWorld();focus(zones.exterior.view,zones.exterior.target);setZone('exterior');$('canvas-hint').innerHTML='<span>↔ Arrastra para girar</span><span>⊕ Acerca con la rueda</span><span>◎ Selecciona un elemento</span>';}
  function walkTo(zone) {
    const entry=zones[zone];camera.position.fromArray(entry.eye);const dir=new T.Vector3(...entry.look).sub(camera.position).normalize();yaw=Math.atan2(-dir.x,-dir.z);pitch=Math.asin(dir.y);camera.rotation.set(pitch,yaw,0,'YXZ');flight=null;setZone(zone);
  }
  function enterWalk(){
    stopTour();ui.stopVoice();flight=null;walking=true;isolated=false;cut=false;split=false;controls.enabled=false;controls.autoRotate=false;
    stage.classList.add('walking');$('walk-ui').hidden=false;$('walk').classList.add('active');$('overview').classList.remove('active');$('isolate').disabled=true;$('mode-caption').textContent='A pie · 1,65 m';
    deselect();walkTo('exterior');updateWorld();$('canvas-hint').innerHTML='<span>WASD / flechas · Mover</span><span>Arrastra · Mirar</span><span>E · Examinar · Esc · Salir</span>';
    ui.toast('Sube por la escalinata. Las puertas se abren para esta visita didáctica.');renderer.domElement.focus({preventScroll:true});
  }
  function setZone(id){lastZone=id;$('location').textContent=id==='exterior'?'JERUSALÉN · MONTE MORIA':zones[id].name.toUpperCase();document.querySelectorAll('[data-zone]').forEach(b=>b.classList.toggle('active',b.dataset.zone===id));}
  function travel(zone){
    stopTour();isolated=false;deselect();
    if(walking){walkTo(zone);clearKeys();updateWorld();return;}
    cut=zone==='hekal'||zone==='debir';split=false;updateWorld();focus(zones[zone].view,zones[zone].target);setZone(zone);
    if(zone==='hekal'||zone==='debir'){selected=zone;ui.select(zone);}
  }
  function tourStep(){const id=tour[tourIndex];select(id,true);$('tour-count').textContent=`PARADA ${String(tourIndex+1).padStart(2,'0')} / ${tour.length}`;$('tour-title').textContent=byId[id].name;$('tour-prev').disabled=tourIndex===0;$('tour-next').textContent=tourIndex===tour.length-1?'✓':'→';$('tour-next').setAttribute('aria-label',tourIndex===tour.length-1?'Completar recorrido':'Parada siguiente');}
  function startTour(){exitWalk();tourIndex=0;$('tour-bar').hidden=false;stage.classList.add('touring');$('guide').classList.add('active');$('overview').classList.remove('active');$('canvas-hint').hidden=true;$('mode-caption').textContent='Recorrido guiado';tourStep();}
  $('overview').onclick=overview;$('walk').onclick=()=>walking?overview():enterWalk();$('guide').onclick=startTour;
  $('tour-prev').onclick=()=>{if(tourIndex>0){tourIndex--;tourStep();}};
  $('tour-next').onclick=()=>{if(tourIndex<tour.length-1){tourIndex++;tourStep();}else{stopTour();$('overview').classList.add('active');$('mode-caption').textContent='Vista general';ui.toast('Recorrido completado. Puedes explorar más elementos o repasar lo aprendido.');}};
  $('tour-close').onclick=()=>{stopTour();ui.stopVoice();$('overview').classList.add('active');$('mode-caption').textContent='Vista general';};
  document.querySelectorAll('[data-zone]').forEach(b=>b.onclick=()=>travel(b.dataset.zone));
  $('cutaway').onclick=()=>{cut=!cut;isolated=false;updateWorld();};$('layers').onclick=()=>{split=!split;isolated=false;updateWorld();if(split)focus([35,32,32],[0,9,-8]);};
  $('labels-toggle').onclick=()=>{labelsOn=!labelsOn;$('labels-toggle').classList.toggle('active',labelsOn);$('labels-toggle').setAttribute('aria-pressed',String(labelsOn));$('labels').hidden=!labelsOn;};
  $('clear-selection').onclick=deselect;
  $('isolate').onclick=()=>{
    if(!selected||walking)return;isolated=!isolated;updateWorld();
    if(isolated){const box=new T.Box3().setFromObject(world.groups[selected]),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());const d=Math.max(size.x,size.y,size.z)*1.65;focus(center.clone().add(new T.Vector3(d*.7,d*.45,d)).toArray(),center.toArray());}
    else focus(byId[selected].view,byId[selected].point);
  };
  $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('app').requestFullscreen();}catch{ui.toast('La pantalla completa no está disponible en este navegador.');}};
  const visible=o=>{while(o){if(!o.visible)return false;o=o.parent;}return true;};
  function pick(clientX,clientY){const rect=renderer.domElement.getBoundingClientRect();pointer.set((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(world.pickables,false).find(h=>visible(h.object));}
  let drag=null;
  renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0)return;flight=null;drag={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false,pointerId:e.pointerId};if(walking)renderer.domElement.setPointerCapture(e.pointerId);});
  renderer.domElement.addEventListener('pointermove',e=>{
    if(drag){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)drag.moved=true;if(walking&&!document.pointerLockElement){yaw-=(e.clientX-drag.lastX)*.004;pitch=T.MathUtils.clamp(pitch-(e.clientY-drag.lastY)*.004,-1.3,1.3);}drag.lastX=e.clientX;drag.lastY=e.clientY;}
  });
  renderer.domElement.addEventListener('pointerup',e=>{if(drag&&!drag.moved){const hit=pick(e.clientX,e.clientY);if(hit)select(hit.object.userData.id);}drag=null;});
  renderer.domElement.addEventListener('pointercancel',()=>drag=null);
  renderer.domElement.addEventListener('dblclick',async()=>{if(walking&&renderer.domElement.requestPointerLock){try{await renderer.domElement.requestPointerLock();}catch{ui.toast('Arrastra la vista para mirar.');}}});
  document.addEventListener('mousemove',e=>{if(walking&&document.pointerLockElement===renderer.domElement){yaw-=e.movementX*.002;pitch=T.MathUtils.clamp(pitch-e.movementY*.002,-1.3,1.3);}});
  const typing=()=>['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  const modal=()=>!!document.querySelector('dialog[open]');
  document.addEventListener('keydown',e=>{
    if(typing()||modal())return;
    if(e.code==='Escape'){if(walking)overview();else if(tourIndex>=0)stopTour();return;}
    if(walking&&['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyE','ShiftLeft'].includes(e.code)){e.preventDefault();keys[e.code]=true;if(e.code==='KeyE'&&!e.repeat&&nearest)select(nearest,true);}
  });
  document.addEventListener('keyup',e=>delete keys[e.code]);addEventListener('blur',()=>{clearKeys();drag=null;});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  document.querySelectorAll('[data-key]').forEach(b=>{
    b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys[b.dataset.key]=true;});
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>b.addEventListener(type,()=>delete keys[b.dataset.key]));
  });
  $('interact').onclick=()=>{if(nearest)select(nearest,true);};
  function tickWalk(dt){
    if(!walking||modal())return;
    yaw+=(Number(!!keys.LookLeft)-Number(!!keys.LookRight))*dt*1.5;
    const forward=Number(!!(keys.KeyW||keys.ArrowUp))-Number(!!(keys.KeyS||keys.ArrowDown));
    const right=Number(!!(keys.KeyD||keys.ArrowRight))-Number(!!(keys.KeyA||keys.ArrowLeft));
    const length=Math.hypot(forward,right)||1;const speed=(keys.ShiftLeft?4.8:2.8)*dt;
    move(camera.position,(-Math.sin(yaw)*forward+Math.cos(yaw)*right)/length*speed,(-Math.cos(yaw)*forward-Math.sin(yaw)*right)/length*speed);
    camera.position.y=floorHeight(camera.position.x,camera.position.z)+1.65;camera.rotation.set(pitch,yaw,0,'YXZ');
    const zone=zoneAt(camera.position.x,camera.position.z);if(zone!==lastZone)setZone(zone);
    ray.setFromCamera(new T.Vector2(0,0),camera);const hit=ray.intersectObjects(world.pickables,false).find(h=>h.distance<6&&visible(h.object));
    nearest=hit?.object.userData.id??null;$('interact').hidden=!nearest;if(nearest)$('interact').textContent=`E · ${byId[nearest].name}`;
  }
  function updateLabels(){
    if(!labelsOn)return;const w=stage.clientWidth,h=stage.clientHeight;const placed=[];
    const ordered=[...elements].sort((a,b)=>Number(b.id===selected)-Number(a.id===selected));
    for(const e of ordered){
      const label=labels.get(e.id);let show=visible(world.groups[e.id]);
      if(isolated)show=show&&e.id===selected;
      else if(!walking&&camera.position.y>22)show=show&&(overviewLabels.has(e.id)||e.id===selected);
      const point=new T.Vector3(...e.point);point.y+=e.id==='techo'?(split?10:1):.8;
      const distance=camera.position.distanceTo(point);if(walking&&distance>13)show=false;
      const ndc=point.clone().project(camera);const x=(ndc.x*.5+.5)*w,y=(-ndc.y*.5+.5)*h;
      show=show&&ndc.z>-1&&ndc.z<1&&x>55&&x<w-55&&y>180&&y<h-50;
      // Label occlusion matters most from inside: do not name objects through walls.
      if(show&&walking){ray.set(camera.position,point.clone().sub(camera.position).normalize());const obstruction=ray.intersectObjects(world.pickables,false).find(hit=>visible(hit.object)&&hit.distance<distance-.5&&hit.object.userData.id!==e.id);if(obstruction)show=false;}
      if(show&&placed.some(p=>Math.abs(p.x-x)<125&&Math.abs(p.y-y)<28))show=false;
      label.hidden=!show;if(show){placed.push({x,y});label.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px)`;}
    }
  }
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
  new ResizeObserver(resize).observe(stage);resize();
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('loading').hidden=false;$('loading').textContent='Se pausó la vista 3D. Recarga la página para recuperar el contexto gráfico.';});
  function animate(){
    requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);lastTime+=dt;
    if(document.hidden)return;
    if(!walking){if(flight){flight.time+=dt;const t=flight.duration===0?1:Math.min(1,flight.time/flight.duration);const eased=t*t*(3-2*t);camera.position.lerpVectors(flight.from,flight.to,eased);controls.target.lerpVectors(flight.target0,flight.target1,eased);if(t===1)flight=null;}controls.update();}
    tickWalk(dt);if(!reduced)world.animate(lastTime);
    const x=50+camera.position.x*1.25,z=72+camera.position.z*1.55;$('map-view').setAttribute('transform',`translate(${T.MathUtils.clamp(x,3,97)} ${T.MathUtils.clamp(z,3,155)}) rotate(${walking?-yaw*180/Math.PI:0})`);
    renderer.render(scene,camera);updateLabels();
  }
  updateWorld();animate();$('loading').hidden=true;
  const requested=resolvePart(new URLSearchParams(location.search).get('part'));if(requested)select(requested,true);
  // Read-only diagnostics available when explicitly requested for local verification.
  if(new URLSearchParams(location.search).has('debug'))window.solomon={getState:()=>({walking,selected,cut,split,isolated,tourIndex,position:camera.position.toArray(),zone:lastZone,canStand:canStand(camera.position.x,camera.position.z),meshes:world.pickables.length,parts:Object.keys(world.groups),counts:{...world.stats},drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles}),getBounds:id=>new T.Box3().setFromObject(world.groups[id]).getSize(new T.Vector3()).toArray()};
}
