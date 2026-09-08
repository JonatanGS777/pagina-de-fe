import * as T from 'three';

export function createWorld(scene) {
  const root = new T.Group(); scene.add(root);
  const groups = {}, shells = [], curtains = [], roofs = [], flames = [];
  const standard = (color, metalness = 0, roughness = 0.8) => new T.MeshStandardMaterial({ color, metalness, roughness });
  const gold = standard('#cba44f', 0.78, 0.29), bronze = standard('#9e6234', 0.72, 0.42);
  const silver = standard('#bcc2bf', 0.78, 0.38), wood = standard('#533826');
  const group = id => { const g = new T.Group(); g.userData.id = id; groups[id] = g; root.add(g); return g; };
  function mesh(geo, mat, parent, x = 0, y = 0, z = 0) {
    const obj = new T.Mesh(geo, mat); obj.position.set(x,y,z); obj.castShadow = true; obj.receiveShadow = true; parent.add(obj); return obj;
  }
  const box = (g, w,h,d, x,y,z, mat) => mesh(new T.BoxGeometry(w,h,d), mat, g,x,y,z);
  const cyl = (g, rt,rb,h, x,y,z,mat) => mesh(new T.CylinderGeometry(rt,rb,h,18),mat,g,x,y,z);
  const sphere = (g,r,x,y,z,mat) => mesh(new T.SphereGeometry(r,12,8),mat,g,x,y,z);
  function rod(g,a,b,r,mat) {
    const start = new T.Vector3(...a), end = new T.Vector3(...b);
    const obj = cyl(g,r,r,start.distanceTo(end),0,0,0,mat);
    obj.position.copy(start).add(end).multiplyScalar(0.5);
    obj.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), end.sub(start).normalize()); return obj;
  }
  function ring(g, x,y,z, r,mat, ry = 0) { const o=mesh(new T.TorusGeometry(r,0.018,7,18),mat,g,x,y,z); o.rotation.y=ry; return o; }
  function texture(base, decorated = false) {
    const canvas=document.createElement('canvas'); canvas.width=canvas.height=256;
    const ctx=canvas.getContext('2d'); ctx.fillStyle=base; ctx.fillRect(0,0,256,256);
    for(let y=0;y<256;y+=4) {ctx.fillStyle=y%8?'#ffffff0a':'#0000000a';ctx.fillRect(0,y,256,1);}
    for(let x=0;x<256;x+=4) {ctx.fillStyle='#00000009';ctx.fillRect(x,0,1,256);}
    if(decorated) {
      ['#233c63','#713958','#a3473f'].forEach((c,i)=>{ctx.fillStyle=c;ctx.fillRect(i*20+5,0,8,256);ctx.fillRect(250-i*20,0,4,256);});
      ctx.strokeStyle='#c2a166';ctx.lineWidth=2;
      for(let y=26;y<256;y+=68){ctx.beginPath();ctx.moveTo(128,y+25);ctx.bezierCurveTo(90,y+13,85,y,101,y+5);ctx.lineTo(128,y+13);ctx.lineTo(155,y+5);ctx.bezierCurveTo(171,y,166,y+13,128,y+25);ctx.stroke();ctx.beginPath();ctx.arc(128,y+8,4,0,Math.PI*2);ctx.stroke();}
    }
    const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;tex.wrapS=tex.wrapT=T.RepeatWrapping;return tex;
  }
  function fabric(color,decorated=false) {const mat=standard(color);mat.color.set('#ffffff');mat.map=texture(color,decorated);mat.side=T.DoubleSide;return mat;}
  const linen=fabric('#ede4cc'), embroidered=fabric('#dfd4bb',true);
  function cloth(g,w,h,x,z,mat,angle=0) {
    const geo=new T.PlaneGeometry(w,h,Math.max(12,Math.ceil(w*14)),1);
    const p=geo.attributes.position;
    for(let i=0;i<p.count;i++){const u=p.getX(i);p.setZ(i,Math.sin(u*17)*0.038);}
    geo.computeVertexNormals();const obj=mesh(geo,mat,g,x,h/2+0.04,z);obj.rotation.y=angle;return obj;
  }
  function doorway(id,w,h,z,columns,baseMat) {
    const g=group(id);
    for(let i=0;i<columns;i++) {
      const x=-w/2+i*w/(columns-1);
      cyl(g,0.08,0.09,h,x,h/2,z,id==='puerta'?wood:gold);
      cyl(g,0.17,0.19,0.15,x,0.075,z,baseMat);
      cyl(g,0.12,0.12,0.09,x,h,z,id==='puerta'?silver:gold);
    }
    const left=cloth(g,w/2,h,-w/4,z,embroidered), right=cloth(g,w/2,h,w/4,z,embroidered);
    curtains.push({left,right,w,z});return g;
  }

  // Sand with gentle procedural relief; the sanctuary itself stays level.
  const terrain=new T.Group();scene.add(terrain);
  const sandMat=standard('#c8b48e');sandMat.map=texture('#cabb9e');sandMat.map.repeat.set(80,80);
  const landGeo=new T.PlaneGeometry(800,800,90,90);landGeo.rotateX(-Math.PI/2);
  const p=landGeo.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i); const t=T.MathUtils.smoothstep(Math.max(Math.abs(x),Math.abs(z)),38,100);p.setY(i,-0.08+t*(Math.sin(x*.022+z*.014)*5+Math.sin(z*.052)*2));}
  landGeo.computeVertexNormals();mesh(landGeo,sandMat,terrain).castShadow=false;
  // Distant low ridges provide context without obscuring the sanctuary.
  for(let i=0;i<22;i++) {
    const angle=i/22*Math.PI*2;
    const hill=mesh(new T.ConeGeometry(24+(i%4)*8,14+(i%5)*5,5),standard('#b9a789'),terrain,Math.sin(angle)*210,1,Math.cos(angle)*210);
    hill.scale.set(1.6,0.55,1);hill.rotation.y=angle;hill.castShadow=false;
  }
  const court=group('atrio');
  const floor=box(court,25,0.025,50,0,-0.035,0,standard('#c4ae86'));floor.castShadow=false;
  const columns=group('columnas');
  const rope=standard('#9c8864');
  function post(x,z,ox,oz) {
    cyl(columns,0.07,0.09,2.5,x,1.25,z,wood);cyl(columns,.13,.16,.16,x,.08,z,bronze);
    cyl(columns,.11,.11,.1,x,2.5,z,silver);sphere(columns,.09,x,2.57,z,silver);
    rod(columns,[x,2.35,z],[x+ox,.06,z+oz],.013,rope);
    rod(columns,[x+ox,-.02,z+oz],[x+ox,.23,z+oz],.027,bronze);
  }
  for(let i=0;i<20;i++) {const z=-25+i*2.5;post(-12.5,z,-1.1,0);post(12.5,z,1.1,0);}
  for(let i=1;i<10;i++) post(-12.5+i*2.5,-25,0,-1.1);
  for(const x of [-12.5,-10,-7.5,7.5,10,12.5]) post(x,25,0,1.1);
  for(let i=0;i<20;i++){const z=-23.75+i*2.5;cloth(court,2.5,2.5,-12.5,z,linen,Math.PI/2);cloth(court,2.5,2.5,12.5,z,linen,Math.PI/2);}
  for(let i=0;i<10;i++)cloth(court,2.5,2.5,-11.25+i*2.5,-25,linen);
  cloth(court,7.5,2.5,-8.75,25,linen);cloth(court,7.5,2.5,8.75,25,linen);
  doorway('puerta',10,2.5,25,4,bronze);
  // A path of subtle sand patches leads toward the entrance.
  const path=mesh(new T.PlaneGeometry(7,16),standard('#d6c29d'),terrain,0,-.045,30);path.rotation.x=-Math.PI/2;path.castShadow=false;

  const boards=group('tablas'),bars=group('barras'); shells.push(boards,bars);
  function board(x,z,angle=0) {
    const g=new T.Group();boards.add(g);g.position.set(x,0,z);g.rotation.y=angle;
    box(g,.738,5,.19,0,2.5,0,gold);
    for(const sx of [-.19,.19])box(g,.28,.2,.38,sx,.1,0,silver);
    for(const sx of [-.32,.32])box(g,.012,4.7,.015,sx,2.6,.103,bronze);
  }
  for(let i=0;i<20;i++) {board(-2.5,-17.125+i*.75,Math.PI/2);board(2.5,-17.125+i*.75,Math.PI/2);}
  for(let i=0;i<6;i++)board(-1.875+i*.75,-17.5);
  board(-2.32,-17.5);board(2.32,-17.5);
  for(const x of [-2.65,2.65])for(const y of [.7,1.6,2.5,3.4,4.3]) {
    rod(bars,[x,y,-17.5],[x,y,-2.5],.046,gold);
    for(let z=-16.5;z<-2.5;z+=3)ring(bars,x,y,z,.078,gold,Math.PI/2);
  }
  for(const y of [.7,1.6,2.5,3.4,4.3])rod(bars,[-2.5,y,-17.65],[2.5,y,-17.65],.046,gold);
  const roof=group('cubiertas');
  const roofNames=['Lino bordado','Pelo de cabra','Pieles de carnero','Cubierta exterior'];
  const roofMats=[embroidered,fabric('#635749'),fabric('#974f3f'),fabric('#6a6050')];
  for(let i=0;i<4;i++) {
    const g=new T.Group();roof.add(g);g.position.y=5.06+i*.10;
    box(g,5.45+i*.06,.075,15.5+i*.09,0,0,-10,roofMats[i]);
    // Short overhanging hems make each separate textile layer legible.
    box(g,.04,.18,15.5+i*.09,-2.72-i*.03,-.08,-10,roofMats[i]);
    box(g,.04,.18,15.5+i*.09,2.72+i*.03,-.08,-10,roofMats[i]);
    g.userData.baseY=g.position.y;g.userData.name=roofNames[i];roofs.push(g);
  }
  doorway('entrada',5,5,-2.5,5,bronze);doorway('velo',5,5,-12.5,4,silver);
  for(const [id,z,depth] of [['santo',-7.5,10],['santisimo',-15,5]]) {
    const g=group(id);const mat=standard(id==='santo'?'#b6a077':'#ab946b');
    const fl=box(g,4.8,.018,depth-.05,0,.012,z,mat);fl.castShadow=false;
  }
  function horns(g,w,d,y,mat) {
    for(const x of [-w/2,w/2])for(const z of [-d/2,d/2]) {
      const points=[new T.Vector3(x,y,z),new T.Vector3(x*1.04,y+.12,z*1.04),new T.Vector3(x*1.09,y+.26,z*1.09)];
      mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),8,.07,8,false),mat,g);
    }
  }
  function carry(g,w,d,y,length,mat) {
    for(const z of [-d/2-.07,d/2+.07]) {
      rod(g,[-length/2,y,z],[length/2,y,z],.036,mat);
      for(const x of [-w/2+.12,w/2-.12])ring(g,x,y,z,.085,mat,Math.PI/2);
    }
  }
  function flame(g,x,y,z,s=1) {
    const mat=new T.MeshBasicMaterial({color:'#ffce74',transparent:true,opacity:.85,depthWrite:false});
    const o=mesh(new T.SphereGeometry(.055,8,8),mat,g,x,y,z);o.scale.set(s,s*2.6,s);o.castShadow=false;flames.push({o,y,s});
  }
  const altar=group('altar');altar.position.z=14;
  for(const x of [-1.2,1.2])box(altar,.1,1.5,2.5,x,.75,0,bronze);
  for(const z of [-1.2,1.2])box(altar,2.5,1.5,.1,0,.75,z,bronze);
  for(const y of [.15,1.45]) {for(const x of [-1.27,1.27])box(altar,.09,.09,2.65,x,y,0,bronze);for(const z of [-1.27,1.27])box(altar,2.65,.09,.09,0,y,z,bronze);}
  horns(altar,2.5,2.5,1.5,bronze);carry(altar,2.5,2.5,.7,4.6,bronze);
  for(let i=-1;i<=1;i+=.18){rod(altar,[i,1.25,-1.1],[i,1.25,1.1],.016,bronze);rod(altar,[-1.1,1.25,i],[1.1,1.25,i],.016,bronze);}
  for(let i=0;i<5;i++){const a=i*Math.PI/5;rod(altar,[-Math.cos(a)*.8,1.33,-Math.sin(a)*.8],[Math.cos(a)*.8,1.4,Math.sin(a)*.8],.09,wood);flame(altar,Math.cos(a)*.4,1.65,Math.sin(a)*.4,2);}
  const utensils=group('utensilios');utensils.position.set(3.5,0,14);
  cyl(utensils,.3,.21,.35,0,.18,0,bronze);ring(utensils,0,.47,0,.23,bronze);
  rod(utensils,[-.7,.07,-.4],[.3,.1,-.6],.027,bronze);box(utensils,.27,.035,.3,-.75,.08,-.38,bronze);
  rod(utensils,[-.6,.07,.4],[.55,.09,.2],.02,bronze);
  for(const z of [.1,.2,.3])rod(utensils,[.48,.09,z],[.72,.18,z],.016,bronze);
  cyl(utensils,.2,.14,.14,.7,.08,-.3,bronze);
  const basin=group('fuente');basin.position.z=6;
  cyl(basin,.45,.62,.18,0,.09,0,bronze);cyl(basin,.15,.27,.6,0,.43,0,bronze);
  const profile=[[.16,.5],[.33,.52],[.58,.67],[.76,.95],[.79,1.04],[.74,1.05],[.7,.95],[.5,.73],[.2,.66]].map(v=>new T.Vector2(...v));
  mesh(new T.LatheGeometry(profile,36),bronze,basin);const water=standard('#5c9b9b',.4,.15);
  cyl(basin,.67,.67,.014,0,.92,0,water);const rim=ring(basin,0,1.04,0,.77,bronze);rim.rotation.x=Math.PI/2;
  const menora=group('menora');menora.position.set(1.55,0,-7);menora.rotation.y=Math.PI/2;
  cyl(menora,.15,.32,.13,0,.065,0,gold);cyl(menora,.05,.075,1.65,0,.9,0,gold);
  for(let k=1;k<=3;k++)for(const s of [-1,1]) {
    const curve=new T.CubicBezierCurve3(new T.Vector3(0,.48+k*.13,0),new T.Vector3(s*k*.28,.5+k*.1,0),new T.Vector3(s*k*.29,1.22,0),new T.Vector3(s*k*.29,1.75,0));
    mesh(new T.TubeGeometry(curve,28,.027,8,false),gold,menora);
    for(const t of [.45,.7]){const v=curve.getPoint(t);sphere(menora,.045,v.x,v.y,v.z,gold);}
  }
  for(let i=-3;i<=3;i++){cyl(menora,.08,.035,.10,i*.29,1.79,0,gold);flame(menora,i*.29,1.91,0,.7);}
  for(const y of [.4,.75,1.15,1.55])sphere(menora,.065,0,y,0,gold);
  const lamp=new T.PointLight('#ffcf8a',8,8,2);lamp.position.set(1.55,2,-7);scene.add(lamp);
  const table=group('mesa');table.position.set(-1.5,0,-7);
  box(table,1,.08,.5,0,.71,0,gold);box(table,1.06,.04,.56,0,.77,0,gold);
  for(const x of [-.42,.42])for(const z of [-.17,.17])box(table,.055,.69,.055,x,.35,z,gold);
  carry(table,1,.5,.4,1.95,gold);
  const bread=standard('#c69249');
  for(const x of [-.23,.23])for(let i=0;i<6;i++) {const loaf=cyl(table,.145,.14,.046,x,.815+i*.046,0,bread);loaf.rotation.y=i*.22;}
  const incense=group('incienso');incense.position.z=-11;
  box(incense,.5,1,.5,0,.5,0,gold);box(incense,.58,.07,.58,0,.98,0,gold);box(incense,.58,.08,.58,0,.05,0,gold);
  horns(incense,.48,.48,1,gold);carry(incense,.5,.5,.48,1.3,gold);
  cyl(incense,.18,.13,.06,0,1.05,0,bronze);
  const smokeMat=new T.MeshBasicMaterial({color:'#ece7d8',transparent:true,opacity:.13,depthWrite:false});
  for(let i=0;i<7;i++){const o=sphere(incense,.045+i*.025,Math.sin(i)*.07,1.22+i*.15,0,smokeMat);o.scale.y=1.7;o.castShadow=false;}
  const ark=group('arca');ark.position.z=-15;
  box(ark,1.25,.75,.75,0,.425,0,gold);
  for(const y of [.1,.78]) {box(ark,1.32,.055,.81,0,y,0,gold);}
  for(const x of [-.5,.5])for(const z of [-.25,.25])box(ark,.085,.08,.085,x,.04,z,gold);
  carry(ark,1.25,.75,.27,2.6,gold);
  const mercy=group('propiciatorio');mercy.position.set(0,.82,-15);box(mercy,1.25,.05,.75,0,0,0,gold);
  function cherub(side) {
    const g=new T.Group();mercy.add(g);g.position.x=side*.45;
    const body=sphere(g,.09,0,.17,0,gold);body.scale.set(.8,1.7,.85);
    const head=sphere(g,.075,-side*.025,.37,0,gold);head.scale.set(.9,1,1);
    for(const z of [-.065,.065]){rod(g,[0,.12,z],[-side*.11,.045,z],.035,gold);}
    for(const front of [-1,1]) {
      const shape=new T.Shape();shape.moveTo(0,0);shape.bezierCurveTo(.12,.28,.3,.4,.5,.44);shape.bezierCurveTo(.42,.12,.22,-.01,0,0);
      const wing=mesh(new T.ExtrudeGeometry(shape,{depth:.018,bevelEnabled:false,curveSegments:12}),gold,g,0,.25,front*.065);
      wing.rotation.y=side===1?Math.PI:0;wing.rotation.x=front*.35;
      for(let j=1;j<6;j++)rod(g,[-side*.02,.27,front*.065],[-side*(.13+j*.055),.34+j*.053,front*(.08+j*.019)],.009,gold);
    }
  }
  cherub(-1);cherub(1);
  // Tag every mesh for picking without sharing selection materials.
  const pickables=[];
  for(const [id,g] of Object.entries(groups))g.traverse(o=>{if(o.isMesh){o.userData.id=id;pickables.push(o);}});
  let cut=false,split=false,walking=false,isolated=null;
  function setView(options={}) {
    cut=options.cut??cut;split=options.split??split;walking=options.walking??walking;
    if('isolated' in options)isolated=options.isolated;
    const pair=isolated==='arca'||isolated==='propiciatorio';
    for(const [id,g] of Object.entries(groups))g.visible=!isolated||id===isolated||(pair&&['arca','propiciatorio'].includes(id));
    if(!isolated){for(const g of shells)g.visible=!cut;roof.visible=!cut||split;}
    for(const entry of curtains) {
      const open=walking||cut;
      entry.left.scale.x=entry.right.scale.x=open?.16:1;
      entry.left.position.x=open?-entry.w*.46:-entry.w/4;entry.right.position.x=-entry.left.position.x;
    }
    roofs.forEach((g,i)=>g.position.y=g.userData.baseY+(split?i*1.55+.4:0));
  }
  function animate(time) {for(let i=0;i<flames.length;i++){const {o,y,s}=flames[i];o.scale.y=s*(2.3+Math.sin(time*7+i)*.3);o.position.y=y+Math.sin(time*5+i)*.012;}}
  return { root,groups,pickables,roofs,setView,animate,terrain };
}

