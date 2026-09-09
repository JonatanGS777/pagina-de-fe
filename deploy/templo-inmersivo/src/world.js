import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Geometría original del primer templo; no usa los modelos del visor anterior.
export function createWorld(scene){
  const root=new T.Group();scene.add(root);
  const groups={},roofs=[],doorPivots=[],flames=[];
  const stats={candelabros:0,mesas:0,fuentes:0,bueyes:0,querubines:0};
  const mat=(color,metalness=0,roughness=.75)=>new T.MeshStandardMaterial({color,metalness,roughness});
  const stone=mat('#d8c8aa'),trim=mat('#ece0c5'),gold=mat('#c9a04e',.8,.28),darkGold=mat('#8e692f',.75,.4),bronze=mat('#94643f',.75,.37),cedar=mat('#784a32'),dark=mat('#38372d');
  const water=new T.MeshPhysicalMaterial({color:'#659da5',metalness:.35,roughness:.13,clearcoat:1});
  const make=id=>{const g=new T.Group();g.userData.id=id;groups[id]=g;root.add(g);return g;};
  function mesh(g,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;}
  const box=(g,w,h,d,x,y,z,m)=>mesh(g,new T.BoxGeometry(w,h,d),m,x,y,z);
  const cyl=(g,rt,rb,h,x,y,z,m)=>mesh(g,new T.CylinderGeometry(rt,rb,h,24),m,x,y,z);
  const ball=(g,r,x,y,z,m)=>mesh(g,new T.SphereGeometry(r,12,8),m,x,y,z);
  function rod(g,a,b,r,m){const start=new T.Vector3(...a),end=new T.Vector3(...b);const o=cyl(g,r,r,start.distanceTo(end),0,0,0,m);o.position.copy(start).add(end).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),end.sub(start).normalize());return o;}
  function ring(g,r,t,x,y,z,m,axis='y'){const o=mesh(g,new T.TorusGeometry(r,t,8,32),m,x,y,z);if(axis==='y')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.y=Math.PI/2;return o;}
  function texture(type){
    const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');
    ctx.fillStyle=type==='stone'?'#d4c6ac':'#8b5b39';ctx.fillRect(0,0,512,512);
    if(type==='stone'){
      for(let row=0;row<8;row++)for(let col=-1;col<5;col++){
        const x=col*128+(row%2)*64;const light=73+((row*7+col*3)%8);ctx.fillStyle=`hsl(39 25% ${light}%)`;ctx.fillRect(x+1,row*64+1,126,62);
        ctx.strokeStyle='#b5a489';ctx.strokeRect(x,row*64,128,64);
      }
    }else for(let x=0;x<512;x+=5){ctx.strokeStyle=x%3?'#5f3a252c':'#dcb17b26';ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+8,120,x-6,300,x,512);ctx.stroke();}
    const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;
  }
  const stoneTex=texture('stone');
  function masonry(g,w,h,d,x,y,z){const material=stone.clone();material.map=stoneTex.clone();material.map.repeat.set(Math.max(w,d)/8,h/4);return box(g,w,h,d,x,y,z,material);}
  cedar.map=texture('cedar');
  const terrain=new T.Group();scene.add(terrain);
  const ground=mesh(terrain,new T.PlaneGeometry(800,800),mat('#b5b49a'));ground.rotation.x=-Math.PI/2;ground.position.y=-.3;ground.castShadow=false;
  for(let i=0;i<26;i++){
    const a=i/26*Math.PI*2;const hill=mesh(terrain,new T.SphereGeometry(1,18,10),mat(i%2?'#a9b3a0':'#c0c3ac'),Math.sin(a)*180,-6,Math.cos(a)*190);hill.scale.set(40+i%3*12,14+i%5*4,37);hill.castShadow=false;
  }
  // Distant olive silhouettes; landscape placement is atmospheric, not a site plan.
  const leaves=mat('#66745a'),trunk=mat('#75644b');
  for(let i=0;i<30;i++){
    const a=i*2.399,dist=62+(i%7)*6,x=Math.cos(a)*dist,z=Math.sin(a)*dist;
    cyl(terrain,.18,.27,2,x,.8,z,trunk);const crown=ball(terrain,1.5,x,2.5,z,leaves);crown.scale.set(1.5,.85,1.2);
  }
  const court=make('atrio');
  masonry(court,54,.7,79,0,-.4,4.5);
  const paving=stone.clone();paving.map=stoneTex.clone();paving.map.repeat.set(9,13);
  const plane=mesh(court,new T.PlaneGeometry(52,77),paving,0,.006,4.5);plane.rotation.x=-Math.PI/2;
  for(const x of [-26,26]){masonry(court,.55,2,77,x,1,4.5);box(court,.8,.15,77,x,2,4.5,trim);box(court,.58,.16,77,x,1.6,4.5,cedar);}
  masonry(court,52,2,.55,0,1,-34);box(court,52,.15,.8,0,2,-34,trim);
  for(const x of [-15.5,15.5]){masonry(court,21,2,.55,x,1,43);box(court,21,.15,.8,x,2,43,trim);}
  for(const x of [-5.4,5.4]){masonry(court,1.2,3.2,1.2,x,1.6,43);box(court,1.5,.2,1.5,x,3.2,43,trim);}
  // Raised temple terrace and broad stairs. 1.2 m rise is interpretive.
  masonry(court,20,1.2,40,0,.6,-9);
  for(let i=0;i<8;i++)box(court,6.4,(i+1)*.15,.5,0,(i+1)*.075,14.75-i*.5,trim);

  const walls=make('muros'),windows=make('ventanas');
  for(const x of [-5.4,5.4]){
    masonry(walls,.8,9.2,30,x,5.8,-10);
    masonry(walls,.8,1.2,30,x,15.6,-10);
    for(let i=0;i<8;i++)masonry(walls,.8,4,1.8,x,12.4,-24.1+i*4);
    const inside=x>0?4.97:-4.97;box(walls,.035,8.9,29.9,inside,5.75,-10,gold);
    box(walls,.035,1.2,29.9,inside,15.6,-10,gold);
    for(let i=0;i<8;i++)box(walls,.035,4,1.79,inside,12.4,-24.1+i*4,gold);
    for(let i=0;i<7;i++){
      const z=-22+i*4;
      for(const dz of [-1.05,1.05])box(windows,1.0,2.8,.14,x,12.6,z+dz,trim);
      for(const y of [11.2,14])box(windows,1,.14,2.2,x,y,z,trim);
      for(let j=-2;j<=2;j++)rod(windows,[x,11.3,z+j*.38],[x,13.9,z+j*.38],.023,cedar);
      for(const y of [11.9,12.6,13.3])rod(windows,[x,y,z-1],[x,y,z+1],.022,cedar);
    }
    for(const y of [1.5,9.7,16.1])box(walls,1.1,.18,31,x,y,-10,trim);
  }
  masonry(walls,11.6,15,.8,0,8.7,-25.4);box(walls,10,.03,30,0,1.22,-10,gold);
  box(walls,10,9.9,.04,0,6.2,-24.97,gold);
  for(const z of [5,-15]){
    for(const x of [-3.4,3.4]){masonry(walls,3.2,10,.5,x,6.2,z);box(walls,3.15,9.8,.055,x,6.2,z-.29,gold);}
    masonry(walls,10,5,.5,0,13.7,z);
    masonry(walls,3.6,4.2,.5,0,9.1,z);
    box(walls,3.6,4.2,.03,0,9.1,z-.28,gold);
    if(z===-15){
      for(const x of [-3.4,3.4])box(walls,3.2,10,.03,x,6.2,z+.28,gold);
      box(walls,3.6,4.2,.03,0,9.1,z+.28,gold);
      box(walls,10,5,.03,0,13.7,z+.28,gold);
    }
  }
  function palm(g,x,y,z,rotation=0){
    const p=new T.Group();g.add(p);p.position.set(x,y,z);p.rotation.y=rotation;
    rod(p,[0,0,0],[0,1.8,0],.042,darkGold);
    for(let j=0;j<3;j++)for(const sign of [-1,1]){
      const curve=new T.QuadraticBezierCurve3(new T.Vector3(0,1.6-j*.17,0),new T.Vector3(sign*.55,2-j*.2,.04),new T.Vector3(sign*(.65-j*.12),1.2-j*.12,0));
      mesh(p,new T.TubeGeometry(curve,8,.031,5,false),darkGold);
    }
    ball(p,.09,0,1.6,.02,darkGold);
  }
  for(const x of [-4.94,4.94])for(let z=-23;z<=3;z+=2.4){palm(walls,x,2.4,z,x>0?-Math.PI/2:Math.PI/2);palm(walls,x,6.4,z,x>0?-Math.PI/2:Math.PI/2);}

  const chambers=make('camaras');
  for(let level=0;level<3;level++){
    const width=2.5+level*.5,y=1.2+level*2.5;
    for(const s of [-1,1]){
      const x=s*(5.8+width/2);
      masonry(chambers,width,2.4,31,x,y+1.2,-10.5);
      box(chambers,width+.15,.13,31.3,x,y+2.45,-10.5,trim);
      for(let z=-23;z<5;z+=4){box(chambers,.045,1.0,.6,s*(5.8+width+.025),y+1.4,z,dark);box(chambers,.06,.08,.78,s*(5.8+width+.06),y+1.96,z,trim);}
    }
    masonry(chambers,17.5,2.4,2.5,0,y+1.2,-26.75);
    box(chambers,17.7,.12,2.7,0,y+2.45,-26.75,trim);
  }
  const portico=make('portico');
  for(const x of [-5.4,5.4]){masonry(portico,.8,12,5,x,7.2,7.5);box(portico,1.1,.2,5.4,x,13.2,7.5,trim);}
  masonry(portico,11.6,3,1,0,11.7,10);
  for(const y of [10.25,13.1])box(portico,12,.22,1.3,0,y,10,trim);
  box(portico,10.1,.15,5,0,13.3,7.5,trim);
  // Winged floral frieze above the entrance.
  for(let x=-4.5;x<=4.5;x+=.75){const flower=ball(portico,.13,x,11.65,10.53,gold);flower.scale.set(1,1,.2);ring(portico,.22,.025,x,11.65,10.55,gold,'z');}
  function column(id,x){
    const g=make(id);g.position.set(x,1.2,9);
    cyl(g,1.05,1.1,.3,0,.15,0,bronze);cyl(g,6/(2*Math.PI),6/(2*Math.PI),9,0,4.5,0,bronze);
    for(const y of [.4,8.75,9.1])ring(g,.98,.065,0,y,0,bronze);
    const profile=[[.95,9],[1.16,9.3],[1.4,9.9],[1.3,10.4],[1.0,10.6],[1.45,11.5]].map(a=>new T.Vector2(...a));
    mesh(g,new T.LatheGeometry(profile,40),bronze);
    // Two rows of 100 pomegranates per capital, batched below for rendering.
    for(let row=0;row<2;row++)for(let i=0;i<100;i++){const a=i/100*Math.PI*2;ball(g,.045,Math.cos(a)*1.38,9.72+row*.22,Math.sin(a)*1.38,bronze);}
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2;rod(g,[Math.cos(a)*1.17,9.3,Math.sin(a)*1.17],[Math.cos(a+.5)*1.3,10.35,Math.sin(a+.5)*1.3],.021,darkGold);}
    for(let i=0;i<8;i++){
      const petal=mesh(g,new T.SphereGeometry(1,12,8),bronze,Math.cos(i*Math.PI/4)*1.1,10.95,Math.sin(i*Math.PI/4)*1.1);petal.scale.set(.18,.62,.36);petal.rotation.y=-i*Math.PI/4;
    }
  }
  column('jaquin',3.5);column('boaz',-3.5);
  const roof=make('techo');
  function roofSection(w,d,y,z){const g=new T.Group();roof.add(g);g.position.y=y;g.userData.baseY=y;box(g,w,.28,d,0,0,z,cedar);box(g,w+.25,.15,d+.25,0,.21,z,trim);for(let t=-w/2+.5;t<w/2;t+=1)box(g,.17,.35,d,t,-.3,z,cedar);roofs.push(g);}
  roofSection(11.6,30.8,16.3,-10);roofSection(10,10,11.3,-20);
  for(const x of [-7.5,7.5]){const g=new T.Group();roof.add(g);g.position.y=8.9;g.userData.baseY=8.9;box(g,3.8,.18,31.5,x,0,-10.5,cedar);roofs.push(g);}
  const doors=make('puertas');
  for(const z of [5,-15])for(const s of [-1,1]){
    const pivot=new T.Group();doors.add(pivot);pivot.position.set(s*1.8,1.2,z);pivot.userData.side=s;
    box(pivot,1.8,5.8,.16,-s*.9,2.9,0,gold);
    for(const y of [.3,2.9,5.5])box(pivot,1.7,.08,.2,-s*.9,y,0,darkGold);
    for(const y of [.9,3.5])palm(pivot,-s*.9,y,.11);
    ring(pivot,.11,.028,-s*1.5,2.8,.14,darkGold,'z');doorPivots.push(pivot);
  }
  const veil=make('velo');
  const textile=mat('#54416d');textile.side=T.DoubleSide;
  const veilGeo=new T.PlaneGeometry(3.6,6,48,1),vp=veilGeo.attributes.position;
  for(let i=0;i<vp.count;i++)vp.setZ(i,Math.cos(vp.getX(i)*22)*.045);veilGeo.computeVertexNormals();
  mesh(veil,veilGeo,textile,0,4.2,-15.4);
  for(const x of [-1.7,1.7])box(veil,.07,6,.1,x,4.2,-15.33,gold);
  for(const x of [-1.1,0,1.1])for(const y of [2.2,4,5.8]){const a=box(veil,.5,.055,.035,x,y,-15.33,gold);a.rotation.z=.45;const b=box(veil,.5,.055,.035,x+.28,y,-15.33,gold);b.rotation.z=-.45;}
  for(const [id,z,d]of[['hekal',-5,20],['debir',-20,10]]){const g=make(id);box(g,9.8,.015,d-.1,0,1.24,z,darkGold);}
  const altar=make('altar');altar.position.z=24;
  box(altar,10,5,10,0,2.5,0,bronze);
  for(const y of [.25,3.3,4.8]){for(const x of [-5.02,5.02])box(altar,.15,.18,10.3,x,y,0,bronze);for(const z of [-5.02,5.02])box(altar,10.3,.18,.15,0,y,z,bronze);}
  box(altar,9.6,.04,9.6,0,5.04,0,dark);
  for(let x=-4.5;x<5;x+=.5)rod(altar,[x,5.1,-4.7],[x,5.1,4.7],.028,bronze);
  for(const x of [-4.8,4.8])for(const z of [-4.8,4.8])mesh(altar,new T.ConeGeometry(.23,.6,10),bronze,x,5.3,z);
  function flame(g,x,y,z,scale=1){const o=ball(g,.055,x,y,z,new T.MeshBasicMaterial({color:'#ffdc86'}));o.scale.set(scale,scale*2.4,scale);o.castShadow=false;flames.push({o,y,scale});}
  // Flames are kept outside static groups so batching cannot freeze their motion.
  const glow=new T.Group();root.add(glow);
  for(let i=0;i<8;i++){const a=i*2.4;rod(altar,[Math.cos(a)*2,5.14,Math.sin(a)*2],[-Math.cos(a)*2,5.22,-Math.sin(a)*2],.15,cedar);flame(glow,Math.cos(a),5.6,24+Math.sin(a),3);}

  function bowl(g,r,y,h){const points=[[r*.25,y],[r*.45,y+h*.12],[r*.8,y+h*.55],[r,y+h],[r*.96,y+h+.04],[r*.91,y+h*.92],[r*.7,y+h*.55],[r*.3,y+.15]].map(v=>new T.Vector2(...v));mesh(g,new T.LatheGeometry(points,40),bronze);ring(g,r,.045,0,y+h,0,bronze);cyl(g,r*.85,r*.85,.025,0,y+h*.82,0,water);}
  const sea=make('mar');sea.position.set(12,0,16);bowl(sea,2.5,1.35,2.5);
  function ox(parent,x,z,a){
    const g=new T.Group();parent.add(g);g.position.set(x,0,z);g.rotation.y=a;
    const body=ball(g,.42,0,.85,0,bronze);body.scale.set(.75,1,1.75);
    for(const lx of [-.23,.23])for(const lz of [-.45,.45])cyl(g,.07,.09,.65,lx,.35,lz,bronze);
    const head=ball(g,.28,0,1.03,.7,bronze);head.scale.set(.8,1.15,1);box(g,.28,.19,.21,0,.96,.93,bronze);
    for(const s of [-1,1])rod(g,[s*.14,1.2,.71],[s*.35,1.43,.69],.035,bronze);
    rod(g,[0,.9,-.7],[0,.5,-.84],.028,bronze);stats.bueyes++;
  }
  for(let side=0;side<4;side++)for(let i=-1;i<=1;i++){
    const a=side*Math.PI/2;ox(sea,Math.sin(a)*1.4+Math.cos(a)*i*.65,Math.cos(a)*1.4-Math.sin(a)*i*.65,a);
  }
  const lavers=make('fuentes');
  for(const x of [-16,16])for(const z of [-13,-7,-1,5,11]){
    const g=new T.Group();lavers.add(g);g.position.set(x,0,z);
    box(g,2,1.15,2,0,.95,0,bronze);bowl(g,.85,1.5,.55);
    for(const sx of [-.95,.95])for(const sz of [-.7,.7]){ring(g,.38,.08,sx,.4,sz,bronze,'x');rod(g,[sx,.4,sz-.29],[sx,.4,sz+.29],.035,bronze);rod(g,[sx,.1,sz],[sx,.7,sz],.035,bronze);}
    for(const s of [-1,1]){box(g,1.6,.65,.025,0,1.0,s*1.012,darkGold);for(const xx of [-.45,0,.45])ball(g,.14,xx,1.0,s*1.04,bronze);}
    stats.fuentes++;
  }
  const lamps=make('candelabros'),tables=make('mesas');
  for(const x of [-3.5,3.5])for(let i=0;i<5;i++){
    const z=1-i*3.4,g=new T.Group();lamps.add(g);g.position.set(x,1.2,z);
    cyl(g,.13,.32,.15,0,.075,0,gold);rod(g,[0,.15,0],[0,1.9,0],.04,gold);
    for(let k=1;k<=3;k++)for(const s of [-1,1]){
      const curve=new T.CubicBezierCurve3(new T.Vector3(0,.6+k*.16,0),new T.Vector3(s*k*.23,.65,0),new T.Vector3(s*k*.23,1.6,0),new T.Vector3(s*k*.23,1.9,0));mesh(g,new T.TubeGeometry(curve,14,.025,6,false),gold);
    }
    for(let k=-3;k<=3;k++){cyl(g,.066,.033,.085,k*.23,1.94,0,gold);flame(glow,x+k*.23,3.28,z,.65);}
    stats.candelabros++;
    const t=new T.Group();tables.add(t);t.position.set(x,1.2,z-1.7);
    box(t,1.4,.09,.7,0,.98,0,gold);box(t,1.48,.04,.78,0,1.04,0,gold);
    for(const lx of [-.59,.59])for(const lz of [-.25,.25])box(t,.07,.95,.07,lx,.48,lz,gold);
    const bread=mat('#c6a06c');for(const xx of [-.3,.3])for(let k=0;k<6;k++)cyl(t,.16,.16,.037,xx,1.08+k*.037,0,bread);stats.mesas++;
  }
  for(const z of [0,-8]){const l=new T.PointLight('#ffd99c',28,15,2);l.position.set(0,5,z);scene.add(l);}
  const incense=make('incienso');incense.position.set(0,1.2,-11.5);
  box(incense,1.1,1.5,1.1,0,.75,0,gold);box(incense,1.25,.08,1.25,0,1.5,0,gold);box(incense,1.2,.14,1.2,0,.07,0,gold);cyl(incense,.3,.25,.1,0,1.6,0,bronze);
  for(let i=0;i<7;i++){const smoke=ball(glow,.09+i*.035,Math.sin(i)*.12,3+i*.22,-11.5, new T.MeshBasicMaterial({color:'#e4dccb',transparent:true,opacity:.13,depthWrite:false}));smoke.scale.y=1.6;smoke.castShadow=false;}
  const ark=make('arca');ark.position.set(0,1.2,-20);
  box(ark,1.25,.75,.75,0,.45,0,gold);box(ark,1.32,.07,.82,0,.86,0,gold);
  for(const z of [-.48,.48]){rod(ark,[-1.5,.35,z],[1.5,.35,z],.035,gold);for(const x of [-.52,.52])ring(ark,.09,.018,x,.35,z,gold,'x');}
  const cherubs=make('querubines');cherubs.position.y=1.2;
  function cherub(g,x,z,scale){
    const c=new T.Group();g.add(c);c.position.set(x,0,z);c.scale.setScalar(scale);
    const body=mesh(c,new T.ConeGeometry(.35,2.8,12),gold,0,2.1,0);body.scale.z=.6;
    const head=ball(c,.31,0,3.68,.08,gold);head.scale.y=1.12;
    for(const s of [-1,1]){rod(c,[s*.15,.8,0],[s*.21,.18,.08],.09,gold);box(c,.18,.14,.4,s*.21,.1,.15,gold);}
    for(const s of [-1,1]){
      const shape=new T.Shape();shape.moveTo(0,0);shape.bezierCurveTo(.7,.9,1.4,1.0,2,1.05);shape.lineTo(2,.78);shape.bezierCurveTo(1.3,.65,.7,.1,0,-.18);shape.closePath();
      const wing=mesh(c,new T.ExtrudeGeometry(shape,{depth:.06,bevelEnabled:false,curveSegments:12}),gold,0,2.85,0);wing.scale.x=s;
      for(let j=1;j<=8;j++)rod(c,[s*.18,2.77,.085],[s*j*.235,3.65+j*.025,.085],.017,darkGold);
    }
  }
  // 10-cubit height and span; each outer wing meets its side wall.
  for(const x of [-2.5,2.5]){cherub(cherubs,x,-20,1.25);stats.querubines++;}
  // The smaller cover figures remain visually distinct from the monumental pair.
  const cover=new T.Group();ark.add(cover);cover.position.y=.9;
  for(const x of [-.42,.42])cherub(cover,x,0,.11);

  // Merge static meshes by material to reduce draw calls while retaining picking IDs.
  root.updateMatrixWorld(true);
  for(const [id,g]of Object.entries(groups)){
    if(['puertas','velo','techo'].includes(id))continue;
    const batches=new Map(),inverse=g.matrixWorld.clone().invert();
    g.traverse(o=>{if(!o.isMesh)return;const geometry=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geometry.applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld));if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(geometry);});
    g.clear();for(const [material,geometries]of batches){const merged=mergeGeometries(geometries);if(!merged)throw Error('Cannot batch '+id);mesh(g,merged,material);geometries.forEach(geometry=>geometry.dispose());}
  }
  const pickables=[];for(const [id,g]of Object.entries(groups))g.traverse(o=>{if(o.isMesh){o.userData.id=id;pickables.push(o);}});
  let cut=false,split=false,walking=false,isolated=null;
  function setView(options={}){
    cut=options.cut??cut;split=options.split??split;walking=options.walking??walking;if('isolated'in options)isolated=options.isolated;
    for(const [id,g]of Object.entries(groups))g.visible=!isolated||isolated===id;
    if(!isolated){walls.visible=!cut;windows.visible=!cut;chambers.visible=!cut;roof.visible=!cut||split;}
    veil.visible=isolated==='velo'||(!isolated&&!walking&&(!cut||options.selected==='velo'));
    doorPivots.forEach(p=>p.rotation.y=(walking||cut)?p.userData.side*Math.PI*.48:0);
    roofs.forEach((g,i)=>g.position.y=g.userData.baseY+(split?9+i*1.5:0));
    glow.visible=!isolated;
  }
  function animate(time){for(let i=0;i<flames.length;i++){const {o,y,scale}=flames[i];o.position.y=y+Math.sin(time*4+i)*.012;o.scale.y=scale*(2.4+Math.sin(time*7+i)*.3);}}
  return {root,groups,roofs,terrain,pickables,stats,setView,animate};
}
