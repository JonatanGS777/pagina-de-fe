// ESPERA A QUE EL DOM CARGUE
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fuera la pantalla de carga
    document.querySelector('.loading-overlay')?.remove();
    document.body.style.overflow = 'auto';
  
    // 2. Activa sección y botón “Todos”
    document.querySelector('.nav-item[data-category="todos"]')?.classList.add('active');
    document.getElementById('todos')?.classList.add('active');
  
    // 3. Inicia funcionalidades
    initCategoryFilters();
    initSearch();
    initCardEffects();
  });
  
  /* ---------- FILTRO POR CATEGORÍAS ---------- */
  function initCategoryFilters() {
    const navHeight = document.querySelector('.nav-container').offsetHeight;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        /* botón activo */
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        item.classList.add('active');
  
        /* sección activa */
        const cat = item.dataset.category;
        document.querySelectorAll('.scroll-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(cat);
        target.classList.add('active');
  
        /* clonar tarjetas si es necesario */
        if (cat !== 'todos') {
          const grid = target.querySelector('.names-grid');
          grid.innerHTML = '';
          document.querySelectorAll(`.name-card[data-category="${cat}"]`)
                  .forEach(card => grid.appendChild(card.cloneNode(true)));
        }
  
        /* scroll suave */
        window.scrollTo({ top: target.offsetTop - navHeight - 10, behavior: 'smooth' });
      });
    });
  }
  
  /* ---------- BÚSQUEDA ---------- */
  function initSearch() {
    const btn   = document.getElementById('searchBtn');
    const input = document.getElementById('searchInput');
    btn  && btn.addEventListener('click', searchNames);
    input&& input.addEventListener('keyup', e => e.key==='Enter' && searchNames());
    input&& input.addEventListener('input', () => !input.value.trim() && resetSearch());
  }
  
  function searchNames() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (q.length < 2) return;
  
    /* cambia a “Todos” */
    document.querySelector('.nav-item[data-category="todos"]').click();
  
    /* filtra tarjetas + resaltado */
    let found = false;
    document.querySelectorAll('#todos .name-card').forEach(c=>{
      const hay = c.innerText.toLowerCase().includes(q);
      c.style.display = hay ? 'block' : 'none';
      hay && highlight(c.querySelector('.name'), q);
      found ||= hay;
    });
  
    /* mensaje sin resultados */
    const msg = document.getElementById('no-results');
    if (!found && !msg) {
      const div = document.createElement('div');
      div.id='no-results'; div.style.gridColumn='1 / -1';
      div.style.textAlign='center'; div.style.padding='2rem';
      div.innerHTML=`<p>No se encontraron resultados para "<strong>${q}</strong>"</p>`;
      document.querySelector('#todos .names-grid').append(div);
    } else if (found && msg) msg.remove();
  }
  
  function highlight(el,q){if(!el)return;const t=el.textContent;const i=t.toLowerCase().indexOf(q);
    if(i>=0)el.innerHTML=`${t.slice(0,i)}<span style="background:rgba(214,169,41,.3);font-weight:bold;">${t.substr(i,q.length)}</span>${t.slice(i+q.length)}`;}
  
  function resetSearch(){document.querySelectorAll('#todos .name-card').forEach(c=>{c.style.display='block';c.querySelectorAll('span').forEach(s=>s.replaceWith(s.textContent));});
    document.getElementById('no-results')?.remove();}
  
  /* ---------- EFECTO HOVER ---------- */
  function initCardEffects(){
    document.querySelectorAll('.name-card').forEach(card=>{
      card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-10px)';card.style.boxShadow='0 15px 30px rgba(0,0,0,.15)';});
      card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.boxShadow='';});
    });
  }