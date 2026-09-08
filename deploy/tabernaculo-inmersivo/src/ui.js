import { elements, byId, sections, questions, scriptureUrl } from './content.js';

export function createUI(api) {
  const $=id=>document.getElementById(id);
  let selected=null, speaking=false;
  const visited=new Set();
  try {const saved=JSON.parse(localStorage.getItem('tabernaculo-nuevo-progreso')||'[]');if(Array.isArray(saved))saved.filter(id=>byId[id]).forEach(id=>visited.add(id));}catch{/* Storage can be unavailable in private browsing. */}
  const buttons=new Map();
  sections.forEach((section,index)=>{
    const group=document.createElement('section');group.className='catalog-group';group.dataset.section=section.id;
    const heading=document.createElement('h2');heading.className='group-heading';heading.innerHTML=`<span>0${index+1}</span>${section.title}<span>${section.ids.length}</span>`;group.append(heading);
    section.ids.forEach((id,index)=>{
      const item=byId[id],button=document.createElement('button');button.className='element-button';button.dataset.id=id;
      button.innerHTML=`<span class="number">${String(index+1).padStart(2,'0')}</span><span>${item.name}</span><span class="check"></span>`;
      button.addEventListener('click',()=>{api.select(id);if(innerWidth<=760)$('sidebar').classList.remove('open');syncPanel();});
      buttons.set(id,button);group.append(button);
    });$('element-list').append(group);
  });
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  $('search').addEventListener('input',()=>{
    const query=normalize($('search').value);let count=0;
    buttons.forEach((b,id)=>{b.hidden=!normalize(byId[id].name+' '+byId[id].zone).includes(query);if(!b.hidden)count++;});
    document.querySelectorAll('.catalog-group').forEach(g=>g.hidden=![...g.querySelectorAll('.element-button')].some(b=>!b.hidden));$('empty').hidden=count>0;
  });
  function syncPanel(){$('mobile-panel').setAttribute('aria-expanded',String($('sidebar').classList.contains('open')));}
  function tab(which) {
    $('catalog').hidden=which!=='elements';$('lesson').hidden=which!=='learn';
    $('tab-elements').setAttribute('aria-selected',String(which==='elements'));$('tab-learn').setAttribute('aria-selected',String(which==='learn'));
  }
  $('tab-elements').onclick=()=>tab('elements');$('tab-learn').onclick=()=>{tab('learn');renderLesson();};
  $('mobile-panel').onclick=()=>{$('sidebar').classList.toggle('open');syncPanel();};
  $('read-more').onclick=()=>{tab('learn');$('sidebar').classList.add('open');syncPanel();renderLesson();};
  function progress() {
    $('visited-count').textContent=`${visited.size}/${elements.length}`;
    buttons.forEach((b,id)=>b.querySelector('.check').textContent=visited.has(id)?'✓':'');
  }
  function stopVoice(){if('speechSynthesis'in window)window.speechSynthesis.cancel();speaking=false;const b=$('narrate');if(b)b.textContent='▷ Escuchar ficha';}
  function renderLesson() {
    const host=$('lesson-body');
    if(!selected) {
      host.innerHTML=`<div class="lesson-content"><p class="eyebrow">APRENDE EXPLORANDO</p><h2>De la entrada<br>al encuentro.</h2><p class="lead">Cada objeto cuenta una parte de la historia.</p><p>Selecciona un elemento para conocer su función, sus materiales y su referencia bíblica. O deja que el recorrido te lleve de la mano.</p><div class="progress-track"><span style="width:${visited.size/elements.length*100}%"></span></div><p>${visited.size} de ${elements.length} elementos descubiertos en este navegador.</p><div class="lesson-actions"><button class="small-button primary" id="lesson-guide">Iniciar recorrido →</button><button class="small-button" id="lesson-quiz">Preguntas de repaso</button></div></div>`;
      $('lesson-guide').onclick=api.startTour;$('lesson-quiz').onclick=openQuiz;return;
    }
    const e=byId[selected],section=sections.find(s=>s.ids.includes(e.id));
    host.innerHTML=`<article class="lesson-content"><p class="eyebrow">${section.title}</p><h2>${e.name}</h2><p class="lead">${e.summary}</p><p>${e.detail}</p><dl><div><dt>Materiales</dt><dd>${e.material}</dd></div><div><dt>Medidas y datos</dt><dd>${e.size}</dd></div></dl><div class="observe"><strong>Detente y observa</strong><p>${e.observe}</p></div><a class="source-link" href="${scriptureUrl(e.ref)}" target="_blank" rel="noopener noreferrer">${e.ref} ↗</a><div class="lesson-actions"><button class="small-button primary" id="lesson-focus">Ver en 3D ↗</button><button class="small-button" id="narrate">▷ Escuchar ficha</button><button class="small-button" id="lesson-quiz">Repasar</button></div></article>`;
    $('lesson-focus').onclick=()=>{api.select(e.id);$('sidebar').classList.remove('open');syncPanel();};
    $('lesson-quiz').onclick=openQuiz;
    $('narrate').onclick=()=>{
      if(!('speechSynthesis'in window)){toast('Este navegador no dispone de lectura en voz alta.');return;}
      if(speaking){stopVoice();return;}
      stopVoice();const text=new SpeechSynthesisUtterance(`${e.name}. ${e.summary} ${e.detail} Detente y observa: ${e.observe}`);
      text.lang='es-ES';text.rate=.93;const voice=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('es'));if(voice)text.voice=voice;
      text.onend=stopVoice;text.onerror=()=>{stopVoice();toast('No se pudo reproducir la voz. Puedes leer la ficha.');};
      speaking=true;$('narrate').textContent='◼ Detener lectura';window.speechSynthesis.speak(text);
    };
  }
  function select(id,learn=false) {
    stopVoice();selected=id;
    buttons.forEach((b,k)=>{b.classList.toggle('active',k===id);b.setAttribute('aria-pressed',String(k===id));});
    if(!id){$('selection').hidden=true;renderLesson();return;}
    visited.add(id);try{localStorage.setItem('tabernaculo-nuevo-progreso',JSON.stringify([...visited]));}catch{}
    progress();const e=byId[id];$('selection').hidden=false;$('selection-zone').textContent=sections.find(s=>s.ids.includes(id)).title;
    $('selection-title').textContent=e.name;$('selection-summary').textContent=e.summary;
    $('scene-heading').textContent=e.name;$('scene-description').textContent=e.summary;
    renderLesson();if(learn)tab('learn');
  }
  let toastTimer;
  function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,4300);}
  function help(){stopVoice();api.pause();$('help-dialog').showModal();}
  $('help').onclick=help;$('sources').onclick=help;
  document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
  let questionIndex=0,score=0,answered=false;
  function openQuiz(){stopVoice();api.pause();questionIndex=0;score=0;$('quiz-dialog').showModal();renderQuiz();}
  function renderQuiz(){
    const q=questions[questionIndex];answered=false;
    $('quiz-body').innerHTML=`<p class="quiz-progress">PREGUNTA ${questionIndex+1} DE ${questions.length}</p><h2>${q.q}</h2><div class="quiz-answers">${q.answers.map((a,i)=>`<button data-answer="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('')}</div><div class="quiz-feedback" role="status" hidden></div><button class="quiz-next" hidden>${questionIndex===questions.length-1?'Ver resultado':'Siguiente pregunta →'}</button>`;
    const host=$('quiz-body');host.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
      if(answered)return;answered=true;const answer=Number(b.dataset.answer);const ok=answer===q.correct;if(ok)score++;
      host.querySelectorAll('[data-answer]').forEach(x=>{x.disabled=true;if(Number(x.dataset.answer)===q.correct)x.classList.add('correct');});if(!ok)b.classList.add('wrong');
      const feedback=host.querySelector('.quiz-feedback');feedback.hidden=false;feedback.textContent=`${ok?'¡Correcto!':'La respuesta correcta está marcada en verde.'} ${q.why}`;
      const next=host.querySelector('.quiz-next');next.hidden=false;next.onclick=()=>{questionIndex++;if(questionIndex<questions.length)renderQuiz();else renderResult();};
    });
  }
  function renderResult(){
    $('quiz-body').innerHTML=`<div class="result-score">${score}<span style="font-size:30px"> / ${questions.length}</span></div><h2>${score===questions.length?'¡Un recorrido bien aprendido!':'Cada visita descubre algo nuevo.'}</h2><p>Vuelve a las fichas, observa los objetos y repasa a tu ritmo.</p><button class="quiz-next" id="quiz-retry">Intentar de nuevo</button><button class="small-button" id="quiz-explore">Volver al modelo</button>`;
    $('quiz-retry').onclick=()=>{questionIndex=0;score=0;renderQuiz();};$('quiz-explore').onclick=()=>$('quiz-dialog').close();
  }
  $('quiz-open').onclick=openQuiz;
  progress();renderLesson();
  return {select,tab,toast,stopVoice,visited};
}

