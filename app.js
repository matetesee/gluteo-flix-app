// ==========================================================================
// GLÚTEO FLIX — motor de la app (vanilla JS, sin frameworks, sin backend).
// Todo el estado (onboarding, entrenos completados, progreso) vive en el
// localStorage del propio dispositivo.
// ==========================================================================
(function(){
  "use strict";

  const $  = (sel, ctx) => (ctx||document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));
  const stage = $('#bfStage');
  const tabsEl = $('#bfTabs');

  // ---------------- ESTADO ----------------
  const STORE_KEY = 'gluteoflix_state_v1';
  const defaultState = () => ({
    onboarded:false,
    name:'',
    local:'', // 'casa' | 'gimnasio'
    freq:3,   // 2 | 3 | 5
    theme:'light',
    startDate:null, // fecha ISO, día 0
    tab:'home',
    completedDays:{},      // { "0": true, "1": true, ... } día -> completado
    completedExByDay:{},   // { "0": {"f1":true,...}, ... }
    weightLog:[],          // {d:isoDate, v:number}
    measureLog:[],         // {d:isoDate, cintura,quadril,coxa}
    moodLog:{},            // { isoDateDay: 'otima'|'bem'|'ok'|'cansada' }
    photoLog:[],           // {d:isoDate, img:dataURL}
    surpriseSeen:false,
    recipeFilter:'manha',
    streakBest:0,
  });

  let state = load();
  function load(){
    try{
      const raw = localStorage.getItem(STORE_KEY);
      if(!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    }catch(e){ return defaultState(); }
  }
  function save(){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){}
  }

  // ---------------- HELPERS ----------------
  function todayISO(){ return new Date().toISOString().slice(0,10); }
  function dayIndex(){
    if(!state.startDate) return 0;
    const start = new Date(state.startDate+'T00:00:00');
    const now = new Date(todayISO()+'T00:00:00');
    const diff = Math.floor((now-start)/86400000);
    return Math.max(0, Math.min(BF_PROGRAM_DAYS-1, diff));
  }
  function cyclePlan(){
    const cyc = BF_CYCLES[state.freq] || BF_CYCLES[3];
    const plan = [];
    for(let i=0;i<BF_PROGRAM_DAYS;i++) plan.push(cyc[i%7]);
    return plan;
  }
  function workoutKeyForDay(i){ return cyclePlan()[i]; }
  function currentStreak(){
    let streak=0;
    const di = dayIndex();
    for(let i=di;i>=0;i--){
      const key = workoutKeyForDay(i);
      if(key==='rest'){ continue; }
      if(state.completedDays[i]) streak++; else break;
    }
    return streak;
  }
  function totalCompleted(){ return Object.keys(state.completedDays).length; }
  function exById(id){
    for(const k in BF_EX){ const f = BF_EX[k].find(e=>e.id===id); if(f) return f; }
    return null;
  }
  function toast(msg){
    let t = $('#bfToast');
    if(!t){ t=document.createElement('div'); t.id='bfToast'; t.className='bf-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(()=>t.classList.add('show'));
    clearTimeout(t._h);
    t._h = setTimeout(()=>t.classList.remove('show'), 2200);
  }
  function applyTheme(){
    document.documentElement.setAttribute('data-theme', state.theme==='dark' ? 'dark':'light');
  }
  function esc(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // ---------------- RENDER: ONBOARDING ----------------
  let onbStep = 0;
  const onbAns = { name:'', local:'', freq:null };

  function renderOnboarding(){
    tabsEl.style.display='none';
    const steps = ['name','local','freq','ready'];
    const s = steps[onbStep];
    let html = `<div class="bf-onb">`;
    html += `<div class="bf-onb-logo">GLÚTEO <span>FLIX</span></div>`;
    html += `<p class="bf-onb-sub">Tu plataforma de la secuencia activadora</p>`;

    if(s==='name'){
      html += `<h2>¿Cómo te llamamos?</h2>
        <input class="bf-name-input" id="onbName" placeholder="Tu nombre" value="${esc(onbAns.name)}">
        <button class="bf-btn" id="onbNext">Continuar</button>`;
    } else if(s==='local'){
      html += `<h2>¿Dónde vas a entrenar?</h2>
        <div class="bf-opt">
          <button data-v="casa" class="${onbAns.local==='casa'?'sel':''}">En casa 🏠</button>
          <button data-v="gimnasio" class="${onbAns.local==='gimnasio'?'sel':''}">En el gimnasio 🏋️‍♀️</button>
        </div>
        <button class="bf-btn" id="onbNext" ${onbAns.local?'':'disabled'}>Continuar</button>`;
    } else if(s==='freq'){
      html += `<h2>¿Cuántas veces por semana?</h2>
        <div class="bf-opt">
          <button data-v="2" class="${onbAns.freq===2?'sel':''}">2 veces por semana</button>
          <button data-v="3" class="${onbAns.freq===3?'sel':''}">3 veces por semana</button>
          <button data-v="5" class="${onbAns.freq===5?'sel':''}">5 veces por semana</button>
        </div>
        <button class="bf-btn" id="onbNext" ${onbAns.freq?'':'disabled'}>Continuar</button>`;
    } else {
      html += `<h2>¡Todo listo, ${esc(onbAns.name||'')}!</h2>
        <div class="bf-card" style="margin-bottom:22px">
          <p style="font-size:13px;color:var(--soft);line-height:1.6">
          Tu reto de <b style="color:var(--ink)">21 días</b> empieza ahora, entrenando
          <b style="color:var(--ink)">${onbAns.local==='casa'?'en casa':'en el gimnasio'}</b>,
          <b style="color:var(--ink)">${onbAns.freq} veces por semana</b>.
          Empezá siempre por la pre-activación antes de cada entreno de glúteo.</p>
        </div>
        <button class="bf-btn" id="onbFinish">Empezar ahora 🍑</button>`;
    }
    html += `<div class="bf-step-dots">${steps.map((_,i)=>`<i class="${i===onbStep?'on':''}"></i>`).join('')}</div>`;
    html += `</div>`;
    stage.innerHTML = html;

    if(s==='name'){
      const inp = $('#onbName');
      $('#onbNext').addEventListener('click', ()=>{
        onbAns.name = inp.value.trim() || 'guerrera';
        onbStep++; renderOnboarding();
      });
      inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){ $('#onbNext').click(); } });
    } else if(s==='local' || s==='freq'){
      $$('.bf-opt button', stage).forEach(btn=>{
        btn.addEventListener('click', ()=>{
          if(s==='local') onbAns.local = btn.dataset.v;
          else onbAns.freq = parseInt(btn.dataset.v,10);
          renderOnboarding();
        });
      });
      const nxt = $('#onbNext');
      if(nxt) nxt.addEventListener('click', ()=>{ onbStep++; renderOnboarding(); });
    } else {
      $('#onbFinish').addEventListener('click', ()=>{
        state.name = onbAns.name;
        state.local = onbAns.local;
        state.freq = onbAns.freq;
        state.startDate = todayISO();
        state.onboarded = true;
        save();
        tabsEl.style.display='flex';
        setTab('home');
      });
    }
  }

  // ---------------- RENDER: INICIO ----------------
  function ringSVG(pct, color){
    const r=27, c=2*Math.PI*r;
    const off = c - (c*pct/100);
    return `<svg viewBox="0 0 64 64" width="64" height="64">
      <circle cx="32" cy="32" r="${r}" stroke="var(--card2)" stroke-width="6" fill="none"/>
      <circle cx="32" cy="32" r="${r}" stroke="${color}" stroke-width="6" fill="none"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"
        transform="rotate(-90 32 32)"/>
    </svg>`;
  }

  function renderHome(){
    const di = dayIndex();
    const week = Math.floor(di/7)+1;
    const wk = workoutKeyForDay(di);
    const streak = currentStreak();
    const pct = Math.round(((di+1)/BF_PROGRAM_DAYS)*100);

    let html = `<div class="bf-top">
      <div class="bf-logo">GLÚTEO <span>FLIX</span></div>
      <button class="bf-gear" id="btnSettings">⚙️</button>
    </div>`;

    html += `<div class="bf-daybox">
      <div class="bf-ring">${ringSVG(pct,'var(--rose)')}<b>${di+1}/${BF_PROGRAM_DAYS}</b></div>
      <div>
        <h3>Hola, ${esc(state.name)} 👋</h3>
        <p>Semana ${week} del reto de 21 días</p>
        <div class="bf-streakpill">🔥 ${streak} día${streak===1?'':'s'} seguidos</div>
      </div>
    </div>`;

    // entreno de hoy
    if(wk==='rest'){
      html += `<div class="bf-sec">Hoy</div>
      <div class="bf-empty"><b>Día de descanso 🌿</b><p>Aprovechá para estirar y recuperarte. Mañana hay más.</p></div>`;
    } else {
      const w = BF_WORKOUTS[wk];
      const done = !!state.completedDays[di];
      html += `<div class="bf-sec">Entreno de hoy</div>
      <div class="bf-banner">
        <b>${esc(w.title)}</b>
        <p>${esc(w.subtitle)} · ~${w.mins} min</p>
        <span class="btn" id="btnGoWorkout" data-key="${wk}">${done?'Ver entreno ✓':'Empezar entreno →'}</span>
      </div>`;
    }

    // regalo sorpresa (primera vez)
    if(!state.surpriseSeen){
      html += `<div class="bf-sec">🎁 Para vos</div>
      <div class="bf-card" style="border-color:var(--gold)">
        <h3 style="margin-bottom:4px">Tu regalo sorpresa llegó</h3>
        <p style="font-size:12.5px;color:var(--soft);margin-bottom:12px">Un bono exclusivo desbloqueado en tu primer ingreso.</p>
        <button class="bf-btn sm" id="btnOpenSurprise">Abrir regalo</button>
      </div>`;
    }

    // estadísticas rápidas
    html += `<div class="bf-sec">Tus números</div>
    <div class="bf-grid2">
      <div class="bf-tile"><div class="ic2">🔥</div><div class="lab">Racha actual</div><div class="val">${streak} días</div></div>
      <div class="bf-tile"><div class="ic2">✅</div><div class="lab">Entrenos completados</div><div class="val">${totalCompleted()}</div></div>
    </div>`;

    // testimonios
    html += `<div class="bf-sec">Quién ya está en el reto</div>
    <div class="bf-hscroll">${BF_TESTIMONIALS.map(t=>`
      <div class="bf-testi">
        <div class="bf-testi-head">
          <div class="bf-testi-av">${esc(t.name[0])}</div>
          <div><b>${esc(t.name)}</b><div class="bf-testi-stars">★★★★★</div></div>
        </div>
        <p>"${esc(t.text)}"</p>
        <span class="bf-testi-result">${esc(t.tag)}</span>
      </div>`).join('')}</div>`;

    // FAQ
    html += `<div class="bf-sec">Preguntas frecuentes</div>
    <div class="bf-card">${BF_FAQ.map((f,i)=>`
      <div class="bf-faq-item" data-i="${i}">
        <button class="bf-faq-q">${esc(f.q)}<span class="bf-faq-arrow">⌄</span></button>
        <div class="bf-faq-a">${esc(f.a)}</div>
      </div>`).join('')}</div>`;

    html += `<div class="bf-guarantee">💬 <span><b>¿Tenés dudas?</b> Mirá la Guía de Ejercicios en la pestaña Entrenos o escribinos a soporte — estamos para ayudarte a llegar al resultado.</span></div>`;

    stage.innerHTML = html;

    $('#btnSettings').addEventListener('click', openSettings);
    const goW = $('#btnGoWorkout');
    if(goW) goW.addEventListener('click', ()=>{ setTab('workouts'); openWorkout(goW.dataset.key); });
    const surp = $('#btnOpenSurprise');
    if(surp) surp.addEventListener('click', openSurpriseModal);
    $$('.bf-faq-q', stage).forEach(btn=>{
      btn.addEventListener('click', ()=> btn.parentElement.classList.toggle('open'));
    });
  }

  // ---------------- RENDER: ENTRENOS ----------------
  function renderWorkouts(){
    const di = dayIndex();
    const plan = cyclePlan();

    let html = `<div class="bf-top"><div class="bf-logo">Entrenos</div><button class="bf-gear" id="btnSettings">⚙️</button></div>`;

    html += `<div class="bf-sec">Calendario — 21 días</div>
    <div class="bf-card"><div class="bf-cal">${plan.map((k,i)=>{
      let cls='bf-calday';
      if(k==='rest') cls+=' rest';
      if(state.completedDays[i]) cls+=' done';
      if(i===di) cls+=' today';
      return `<div class="${cls}" title="Día ${i+1}">${i+1}</div>`;
    }).join('')}</div></div>`;

    html += `<div class="bf-sec">¿Tenés dudas?</div>
    <div class="bf-bonuscard" id="btnOpenGuide" style="cursor:pointer">
      <div class="bf-bonuscard-top">
        <div class="emoji">📖</div>
        <div style="flex:1">
          <h3>Guía de todos los ejercicios</h3>
          <p>Técnica explicada paso a paso + tutorial en video de cada movimiento.</p>
        </div>
      </div>
    </div>`;

    html += `<div class="bf-sec">Pre-activación (siempre antes del entreno)</div>`;
    html += renderWorkoutCard({title:'Secuencia de Pre-Activación', subtitle:'Activa la conexión cerebro-glúteo antes de entrenar', exercises:BF_PREATIVACAO.map(e=>e.id)}, 'pre', -1, true);

    html += `<div class="bf-sec">Tus entrenos</div>`;
    const keys = Object.keys(BF_WORKOUTS).filter(k=>plan.includes(k));
    keys.forEach(k=>{
      html += renderWorkoutCard(BF_WORKOUTS[k], k, di);
    });

    stage.innerHTML = html;
    $('#btnSettings').addEventListener('click', openSettings);
    $('#btnOpenGuide').addEventListener('click', openExerciseGuide);
    attachWorkoutCardEvents();
  }

  // ---------------- GUÍA DE EJERCICIOS ----------------
  let guideCat = 'all';

  function openExerciseGuide(){
    guideCat = 'all';
    renderExerciseGuide();
  }
  function closeExerciseGuide(){
    renderWorkouts();
  }
  function allGuideItems(){
    const items = [];
    BF_EXERCISE_GROUPS.forEach(g=>{
      g.list.forEach(ex=> items.push(Object.assign({groupId:g.id, groupLabel:g.label}, ex)));
    });
    return items;
  }
  function renderExerciseGuide(){
    const items = allGuideItems().filter(it=> guideCat==='all' || it.groupId===guideCat);
    let html = `<div class="bf-pagebar">
      <button class="bf-back" id="btnGuideBack">←</button>
      <h1>Guía de Ejercicios</h1>
    </div>`;
    html += `<input type="text" class="bf-searchbox" id="inpGuideSearch" placeholder="Buscar un ejercicio...">`;
    html += `<div class="bf-tagrow">
      <button class="bf-tag ${guideCat==='all'?'sel':''}" data-c="all">Todos</button>
      ${BF_EXERCISE_GROUPS.map(g=>`<button class="bf-tag ${guideCat===g.id?'sel':''}" data-c="${g.id}">${esc(g.label)}</button>`).join('')}
    </div>`;
    html += `<div id="guideList">${renderGuideList(items)}</div>`;
    stage.innerHTML = html;
    attachGuideEvents();
  }

  function renderGuideList(items){
    if(!items.length) return `<div class="bf-empty"><b>No encontramos ese ejercicio</b><p>Probá con otra palabra o elegí una categoría.</p></div>`;
    return items.map((ex,i)=>`
      <div class="bf-recipe bf-guideitem" data-i="${i}" data-name="${esc(ex.name.toLowerCase())}">
        <span class="eyebrow">${esc(ex.groupLabel)}</span>
        <div class="bf-recipe-top">
          <h3>${esc(ex.name)}</h3>
          <span class="macro">${esc(ex.sets)}</span>
        </div>
        <span class="arrow" style="float:right;margin-top:-18px">⌄</span>
        <div class="body">
          <p>${esc(ex.dica)}</p>
          <a class="bf-ytlink" href="${bfYoutubeUrl(ex)}" target="_blank" rel="noopener">🎥 Ver tutorial en YouTube →</a>
        </div>
      </div>`).join('');
  }

  function attachGuideEvents(){
    $('#btnGuideBack').addEventListener('click', closeExerciseGuide);
    $$('.bf-tag', stage).forEach(t=>t.addEventListener('click', ()=>{ guideCat=t.dataset.c; renderExerciseGuide(); }));
    $$('.bf-guideitem', stage).forEach(r=>r.addEventListener('click', (e)=>{
      if(e.target.tagName==='A') return; // dejá que el link de YouTube funcione normal
      r.classList.toggle('open');
    }));
    const search = $('#inpGuideSearch', stage);
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      $$('.bf-guideitem', stage).forEach(card=>{
        card.hidden = q && !card.dataset.name.includes(q);
      });
    });
  }

  function renderWorkoutCard(w, key, di, isPre){
    const exIds = w.exercises;
    const total = exIds.length;
    const checkedMap = (di>=0 && state.completedExByDay[di]) ? state.completedExByDay[di] : {};
    const doneCount = isPre ? 0 : exIds.filter(id=>checkedMap[id]).length;
    const dayDone = di>=0 && !!state.completedDays[di];
    return `<div class="bf-wcard" data-key="${key}" data-collapsed="1">
      <div class="bf-wcard-top">
        <div>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.subtitle||'')} ${w.mins?`· ~${w.mins} min`:''}</p>
        </div>
        <span class="badge ${dayDone?'done':''}">${isPre? total+' ejerc.' : (dayDone?'Completado':doneCount+'/'+total)}</span>
      </div>
      ${!isPre?`<div class="bf-progbar"><i style="width:${Math.round(doneCount/total*100)}%"></i></div>`:''}
      <button class="bf-btn ghost sm bf-wtoggle" style="margin-top:12px">Ver ejercicios</button>
      <div class="bf-exlist" hidden>
        ${exIds.map(id=>{
          const ex = exById(id) || BF_PREATIVACAO.find(p=>p.id===id);
          const on = !isPre && checkedMap[id];
          return `<div class="bf-exitem ${on?'checked':''}" data-id="${id}">
            <div class="bf-exitem-top">
              ${isPre?'':`<div class="bf-chk ${on?'on':''}">${on?'✓':''}</div>`}
              <div style="flex:1">
                <b>${esc(ex.name)}</b><span class="sets">${esc(ex.sets)}</span>
                <p>${esc(ex.dica)}</p>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
      ${!isPre?`<button class="bf-btn bf-wfinish" style="margin-top:14px" ${dayDone?'disabled':''}>${dayDone?'Entreno completado ✓':'Completar entreno de hoy'}</button>`:''}
    </div>`;
  }

  function attachWorkoutCardEvents(){
    $$('.bf-wtoggle', stage).forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const card = btn.closest('.bf-wcard');
        const list = $('.bf-exlist', card);
        const hidden = list.hasAttribute('hidden');
        if(hidden){ list.removeAttribute('hidden'); btn.textContent='Ocultar ejercicios'; }
        else { list.setAttribute('hidden',''); btn.textContent='Ver ejercicios'; }
      });
    });
    $$('.bf-exitem', stage).forEach(item=>{
      item.addEventListener('click', ()=>{
        const card = item.closest('.bf-wcard');
        const key = card.dataset.key;
        if(!BF_WORKOUTS[key]) return; // la pre-activación no se trackea
        const di = dayIndex();
        const id = item.dataset.id;
        state.completedExByDay[di] = state.completedExByDay[di] || {};
        state.completedExByDay[di][id] = !state.completedExByDay[di][id];
        save();
        renderWorkouts();
      });
    });
    $$('.bf-wfinish', stage).forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const card = btn.closest('.bf-wcard');
        const key = card.dataset.key;
        const di = dayIndex();
        if(state.completedDays[di]) return;
        state.completedDays[di] = true;
        const s = currentStreak();
        if(s>state.streakBest) state.streakBest = s;
        save();
        toast('¡Entreno completado! 🔥 ' + s + ' día(s) seguidos');
        renderWorkouts();
      });
    });
  }

  function openWorkout(key){
    // scrollea y expande la tarjeta correspondiente después del render
    setTimeout(()=>{
      const card = $(`.bf-wcard[data-key="${key}"]`, stage);
      if(card){
        card.scrollIntoView({behavior:'smooth', block:'start'});
        const btn = $('.bf-wtoggle', card);
        if(btn && $('.bf-exlist',card).hasAttribute('hidden')) btn.click();
      }
    }, 60);
  }

  // ---------------- RENDER: BONOS ----------------
  function renderBonus(){
    let html = `<div class="bf-top"><div class="bf-logo">Bonos</div><button class="bf-gear" id="btnSettings">⚙️</button></div>`;
    html += `<div class="bf-sec">Aceleradores de resultado</div>`;
    BF_BONUSES.forEach(b=>{
      html += `<div class="bf-bonuscard" data-id="${b.id}">
        <div class="bf-bonuscard-top">
          <div class="emoji">${b.emoji}</div>
          <div style="flex:1">
            <h3>${esc(b.title)}</h3>
            <p>${esc(b.desc)}</p>
          </div>
        </div>
        <button class="bf-btn ghost sm bf-bonustoggle" style="margin-top:12px">${b.link==='recipes'?'Ver recetas →':'Ver contenido'}</button>
        <div class="bf-exlist" hidden></div>
      </div>`;
    });

    html += `<div class="bf-sec">🎁 Regalo sorpresa</div>
    <div class="bf-card">
      <p style="font-size:12.5px;color:var(--soft);margin-bottom:10px">${state.surpriseSeen? 'Ya desbloqueaste este regalo.' : 'Todavía no abierto — andá a la pestaña Inicio para revelarlo.'}</p>
      <button class="bf-btn ghost sm" id="btnSurpriseAgain">${state.surpriseSeen?'Ver de nuevo':'¿Cómo abrir?'}</button>
    </div>`;

    stage.innerHTML = html;
    $('#btnSettings').addEventListener('click', openSettings);
    $('#btnSurpriseAgain').addEventListener('click', ()=>{
      if(state.surpriseSeen) openSurpriseModal(); else { setTab('home'); }
    });

    $$('.bf-bonustoggle', stage).forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const card = btn.closest('.bf-bonuscard');
        const id = card.dataset.id;
        const b = BF_BONUSES.find(x=>x.id===id);
        if(b.link==='recipes'){ setTab('recipes'); return; }
        const list = $('.bf-exlist', card);
        const hidden = list.hasAttribute('hidden');
        if(hidden){
          let exIds = b.exercises || (b.workoutKey ? BF_WORKOUTS[b.workoutKey].exercises : []);
          let extra = '';
          if(b.double){
            extra = renderBonusExGroup('Entreno 1 · Espalda & Hombro', BF_EX.superiores1) + renderBonusExGroup('Entreno 2 · Brazos & Core', BF_EX.superiores2);
          } else {
            extra = renderBonusExGroup(null, exIds.map(exById));
          }
          list.innerHTML = extra;
          list.removeAttribute('hidden');
          btn.textContent='Ocultar contenido';
        } else { list.setAttribute('hidden',''); btn.textContent = 'Ver contenido'; }
      });
    });
  }

  function renderBonusExGroup(title, exList){
    let html = title? `<div style="font-weight:800;font-size:12.5px;color:var(--rose);margin:8px 0 4px">${esc(title)}</div>`:'';
    html += exList.map(ex=>`<div class="bf-exitem"><div class="bf-exitem-top"><div style="flex:1"><b>${esc(ex.name)}</b><span class="sets">${esc(ex.sets)}</span><p>${esc(ex.dica)}</p></div></div></div>`).join('');
    return html;
  }

  function openSurpriseModal(){
    state.surpriseSeen = true; save();
    openModal(`
      <h2>🎁 ${esc(BF_SURPRISE.title)}</h2>
      <p style="font-size:12.5px;color:var(--soft);margin-bottom:14px;line-height:1.55">${esc(BF_SURPRISE.desc)}</p>
      ${BF_SURPRISE.items.map(it=>`<div class="bf-modal-row" style="display:block"><p style="font-size:12.5px;line-height:1.55">${esc(it)}</p></div>`).join('')}
      <button class="bf-btn" id="modalClose2" style="margin-top:16px">¡Entendido! ✨</button>
    `);
    $('#modalClose2').addEventListener('click', closeModal);
    if(state.tab==='home') renderHome();
  }

  // ---------------- RENDER: RECETAS ----------------
  const RECIPE_CATS = [
    {id:'manha', label:'Desayuno'},
    {id:'pre', label:'Pre-entreno'},
    {id:'pos', label:'Post-entreno'},
    {id:'principal', label:'Almuerzo & Cena'},
    {id:'doce', label:'Snacks & Postres'},
  ];

  function renderRecipes(){
    let html = `<div class="bf-top"><div class="bf-logo">51 Recetas Proteicas</div><button class="bf-gear" id="btnSettings">⚙️</button></div>`;
    html += `<div class="bf-tagrow">${RECIPE_CATS.map(c=>`<button class="bf-tag ${state.recipeFilter===c.id?'sel':''}" data-c="${c.id}">${esc(c.label)}</button>`).join('')}</div>`;
    const list = BF_RECIPES.filter(r=>r.cat===state.recipeFilter);
    html += list.map((r,i)=>`
      <div class="bf-recipe" data-i="${i}">
        <div class="bf-recipe-top">
          <h3>${esc(r.name)}</h3>
          <span class="macro">${r.kcal}kcal · ${r.prot}g P</span>
        </div>
        <span class="arrow" style="float:right;margin-top:-18px">⌄</span>
        <div class="body">${esc(r.prep)}</div>
      </div>`).join('');

    stage.innerHTML = html;
    $('#btnSettings').addEventListener('click', openSettings);
    $$('.bf-tag', stage).forEach(t=>t.addEventListener('click', ()=>{ state.recipeFilter=t.dataset.c; save(); renderRecipes(); }));
    $$('.bf-recipe', stage).forEach(r=>r.addEventListener('click', ()=> r.classList.toggle('open')));
  }

  // ---------------- RENDER: PROGRESO ----------------
  function renderProgress(){
    let html = `<div class="bf-top"><div class="bf-logo">Progreso</div><button class="bf-gear" id="btnSettings">⚙️</button></div>`;

    // check-in de ánimo
    const dKey = todayISO();
    const moods = [ {k:'otima', e:'😄', l:'Genial'}, {k:'bem', e:'🙂', l:'Bien'}, {k:'ok', e:'😐', l:'OK'}, {k:'cansada', e:'😮‍💨', l:'Cansada'} ];
    html += `<div class="bf-sec">¿Cómo estás hoy?</div>
    <div class="bf-card"><div class="bf-moodrow">${moods.map(m=>`
      <div class="bf-mood ${state.moodLog[dKey]===m.k?'sel':''}" data-k="${m.k}">${m.e}<span>${m.l}</span></div>`).join('')}</div></div>`;

    // registro de peso
    const wlog = state.weightLog.slice(-7);
    const maxW = Math.max(1, ...wlog.map(w=>w.v));
    html += `<div class="bf-sec">Peso (kg)</div>
    <div class="bf-card">
      <div class="bf-formrow"><input type="number" step="0.1" id="inpWeight" placeholder="Ej: 62.5"><button class="bf-btn sm" id="btnAddWeight">Guardar</button></div>
      ${wlog.length? `<div class="bf-bars">${wlog.map(w=>`<div class="col"><i style="height:${Math.max(8,Math.round(w.v/maxW*80))}px"></i><small>${w.d.slice(5)}</small></div>`).join('')}</div>` : `<p style="font-size:12px;color:var(--soft)">Registrá tu peso semanalmente para seguir tu evolución.</p>`}
    </div>`;

    // medidas
    html += `<div class="bf-sec">Medidas (cm)</div>
    <div class="bf-card">
      <div class="bf-formrow">
        <input type="number" step="0.5" id="inpCintura" placeholder="Cintura">
        <input type="number" step="0.5" id="inpQuadril" placeholder="Cadera">
        <input type="number" step="0.5" id="inpCoxa" placeholder="Pierna">
      </div>
      <button class="bf-btn ghost sm" id="btnAddMeasure">Guardar medidas</button>
      ${state.measureLog.length? renderMeasureTable() : ''}
    </div>`;

    // diario de fotos
    html += `<div class="bf-sec">Diario de fotos</div>
    <div class="bf-card">
      <p style="font-size:12px;color:var(--soft);margin-bottom:4px">Sacate una foto cada 15 días, siempre en la misma posición. Queda guardada solo en este dispositivo.</p>
      <input type="file" accept="image/*" id="inpPhoto" style="display:none">
      <button class="bf-btn ghost sm" id="btnAddPhoto" style="margin-top:10px">+ Agregar foto</button>
      <div class="bf-photogrid">${state.photoLog.slice(-6).reverse().map(p=>`<div class="ph"><img src="${p.img}"><span class="dt">${p.d.slice(5)}</span></div>`).join('') || ''}</div>
    </div>`;

    // calendario de constancia
    const plan = cyclePlan(); const di = dayIndex();
    html += `<div class="bf-sec">Tu constancia</div>
    <div class="bf-card"><div class="bf-cal">${plan.map((k,i)=>{
      let cls='bf-calday';
      if(k==='rest') cls+=' rest';
      if(state.completedDays[i]) cls+=' done';
      if(i===di) cls+=' today';
      return `<div class="${cls}">${i+1}</div>`;
    }).join('')}</div>
    <p style="font-size:11.5px;color:var(--soft);margin-top:10px">Mejor racha: <b style="color:var(--ink)">${state.streakBest}</b> días seguidos.</p>
    </div>`;

    stage.innerHTML = html;
    $('#btnSettings').addEventListener('click', openSettings);

    $$('.bf-mood', stage).forEach(m=>m.addEventListener('click', ()=>{ state.moodLog[dKey]=m.dataset.k; save(); renderProgress(); }));
    $('#btnAddWeight').addEventListener('click', ()=>{
      const v = parseFloat($('#inpWeight').value);
      if(!v) return;
      state.weightLog.push({d:todayISO(), v}); save(); toast('Peso registrado'); renderProgress();
    });
    $('#btnAddMeasure').addEventListener('click', ()=>{
      const cintura=parseFloat($('#inpCintura').value)||null, quadril=parseFloat($('#inpQuadril').value)||null, coxa=parseFloat($('#inpCoxa').value)||null;
      if(!cintura && !quadril && !coxa) return;
      state.measureLog.push({d:todayISO(), cintura, quadril, coxa}); save(); toast('Medidas registradas'); renderProgress();
    });
    const photoInp = $('#inpPhoto');
    $('#btnAddPhoto').addEventListener('click', ()=> photoInp.click());
    photoInp.addEventListener('change', ()=>{
      const file = photoInp.files[0]; if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        state.photoLog.push({d:todayISO(), img:reader.result});
        save(); toast('Foto guardada en este dispositivo'); renderProgress();
      };
      reader.readAsDataURL(file);
    });
  }

  function renderMeasureTable(){
    const rows = state.measureLog.slice(-5).reverse();
    return `<div style="margin-top:12px">${rows.map(r=>`
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--soft);padding:6px 0;border-top:1px solid var(--line)">
        <span>${r.d.slice(5)}</span><span>C ${r.cintura??'-'} · Ca ${r.quadril??'-'} · P ${r.coxa??'-'}</span>
      </div>`).join('')}</div>`;
  }

  // ---------------- MODAL DE AJUSTES ----------------
  function openSettings(){
    openModal(`
      <div style="display:flex;align-items:center;margin-bottom:6px"><h2 style="margin-bottom:0">Ajustes</h2><button class="bf-close" id="modalClose">✕</button></div>
      <div class="bf-modal-row"><span class="lab">Nombre</span><span>${esc(state.name)}</span></div>
      <div class="bf-modal-row"><span class="lab">Lugar de entreno</span><span>${state.local==='casa'?'En casa':'En el gimnasio'}</span></div>
      <div class="bf-modal-row"><span class="lab">Frecuencia</span><span>${state.freq} veces por semana</span></div>
      <div class="bf-modal-row"><span class="lab">Tema oscuro</span><div class="bf-toggle ${state.theme==='dark'?'on':''}" id="toggleTheme"><i></i></div></div>
      <button class="bf-btn ghost sm" id="btnEditPlan" style="margin-top:14px;width:100%">Cambiar lugar / frecuencia</button>
      <button class="bf-btn ghost sm" id="btnReset" style="margin-top:10px;width:100%;color:#c0392b;border-color:#c0392b">Reiniciar progreso</button>
      <p style="font-size:11px;color:var(--soft);margin-top:16px;text-align:center">Glúteo Flix · dudas: hablá con soporte por el canal donde compraste.</p>
    `);
    $('#modalClose').addEventListener('click', closeModal);
    $('#toggleTheme').addEventListener('click', (e)=>{
      state.theme = state.theme==='dark' ? 'light':'dark'; save(); applyTheme();
      e.currentTarget.classList.toggle('on');
    });
    $('#btnEditPlan').addEventListener('click', ()=>{
      closeModal();
      // variables temporales: no tocan el estado real hasta que se toque "Guardar"
      let tmpLocal = state.local, tmpFreq = state.freq;
      openModal(`
        <div style="display:flex;align-items:center;margin-bottom:12px"><h2 style="margin-bottom:0">Lugar & frecuencia</h2><button class="bf-close" id="modalClose">✕</button></div>
        <p style="font-size:11.5px;color:var(--soft);margin-bottom:10px">Lugar</p>
        <div class="bf-opt">
          <button data-l="casa" class="${tmpLocal==='casa'?'sel':''}">En casa 🏠</button>
          <button data-l="gimnasio" class="${tmpLocal==='gimnasio'?'sel':''}">En el gimnasio 🏋️‍♀️</button>
        </div>
        <p style="font-size:11.5px;color:var(--soft);margin-bottom:10px">Frecuencia</p>
        <div class="bf-opt">
          <button data-f="2" class="${tmpFreq===2?'sel':''}">2 veces por semana</button>
          <button data-f="3" class="${tmpFreq===3?'sel':''}">3 veces por semana</button>
          <button data-f="5" class="${tmpFreq===5?'sel':''}">5 veces por semana</button>
        </div>
        <button class="bf-btn" id="btnSavePlan" style="margin-top:6px">Guardar</button>
      `);
      $('#modalClose').addEventListener('click', closeModal);
      $$('[data-l]').forEach(b=>b.addEventListener('click', ()=>{ tmpLocal=b.dataset.l; $$('[data-l]').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); }));
      $$('[data-f]').forEach(b=>b.addEventListener('click', ()=>{ tmpFreq=parseInt(b.dataset.f,10); $$('[data-f]').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); }));
      $('#btnSavePlan').addEventListener('click', ()=>{
        state.local = tmpLocal; state.freq = tmpFreq;
        save(); closeModal(); toast('Plan actualizado'); render();
      });
    });
    $('#btnReset').addEventListener('click', ()=>{
      closeModal();
      openModal(`
        <h2>¿Reiniciar tu progreso?</h2>
        <p style="font-size:12.5px;color:var(--soft);margin-bottom:18px;line-height:1.55">Esto va a borrar todo lo que registraste en este dispositivo: días completados, peso, medidas y fotos. No se puede deshacer.</p>
        <div style="display:flex;gap:10px">
          <button class="bf-btn ghost sm" id="btnCancelReset" style="flex:1">Cancelar</button>
          <button class="bf-btn sm" id="btnConfirmReset" style="flex:1;background:#c0392b">Sí, reiniciar</button>
        </div>
      `);
      $('#btnCancelReset').addEventListener('click', closeModal);
      $('#btnConfirmReset').addEventListener('click', ()=>{
        localStorage.removeItem(STORE_KEY);
        state = defaultState();
        closeModal();
        onbStep = 0; onbAns.name=''; onbAns.local=''; onbAns.freq=null;
        applyTheme();
        renderOnboarding();
      });
    });
  }

  // ---------------- MODAL ----------------
  function openModal(innerHTML){
    closeModal();
    const bg = document.createElement('div');
    bg.className = 'bf-modal-bg';
    bg.id = 'bfModalBg';
    bg.innerHTML = `<div class="bf-modal">${innerHTML}</div>`;
    bg.addEventListener('click', (e)=>{ if(e.target===bg) closeModal(); });
    document.body.appendChild(bg);
  }
  function closeModal(){ const bg = $('#bfModalBg'); if(bg) bg.remove(); }

  // ---------------- ROUTER ----------------
  const ROUTES = { home:renderHome, workouts:renderWorkouts, bonus:renderBonus, recipes:renderRecipes, progress:renderProgress };
  function setTab(tab){
    state.tab = tab; save();
    $$('#bfTabs button').forEach(b=>b.classList.toggle('active', b.dataset.r===tab));
    render();
    stage.scrollTo?.(0,0);
    window.scrollTo(0,0);
  }
  function render(){
    (ROUTES[state.tab] || renderHome)();
  }

  // ---------------- INIT ----------------
  applyTheme();
  if(!state.onboarded){
    renderOnboarding();
  } else {
    render();
  }
  $$('#bfTabs button').forEach(b=>{
    b.classList.toggle('active', b.dataset.r===state.tab);
    b.onclick = ()=> setTab(b.dataset.r);
  });

})();
