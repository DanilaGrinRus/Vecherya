const VIEWS = ['cards','calc','rules'];
let state = { view:'cards', q:'', cat:'Все', selectedKey: null };

const $ = (id) => document.getElementById(id);

function isDesktop(){
  return window.matchMedia && window.matchMedia('(min-width: 980px)').matches;
}

function setView(v){
  state.view = v;
  $('viewCards').style.display = (v==='cards') ? '' : 'none';
  $('viewCalc').style.display  = (v==='calc')  ? '' : 'none';
  $('viewRules').style.display = (v==='rules') ? '' : 'none';

  // search & pills visible only on cards
  $('searchRow').style.display = (v==='cards') ? '' : 'none';
  $('catPills').style.display  = (v==='cards') ? '' : 'none';

  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.view===v));
  document.querySelectorAll('.navBtn').forEach(t=>t.classList.toggle('active', t.dataset.view===v));

  if(v==='cards') {
    renderCards();
    renderDetailsDesktop();
  }
}

// --- Categories
const categories = ['Все', ...Array.from(new Set(CARDS.map(c=>c.category))).sort()];
function renderPills(){
  const host = $('catPills');
  host.innerHTML = '';
  categories.forEach(cat=>{
    const el = document.createElement('div');
    el.className = 'pill' + (state.cat===cat ? ' active' : '');
    el.textContent = cat;
    el.onclick = () => {
      state.cat = cat;
      renderPills();
      // reset selection when category changes (avoids confusion)
      state.selectedKey = null;
      renderCards();
      renderDetailsDesktop(true);
    };
    host.appendChild(el);
  });
}

// --- Helpers
function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function cardKey(c){
  // stable-enough key without changing data.js
  return `${c.category||''}::${c.name||''}`;
}

function matches(c,q){
  if(!q) return true;
  const hay = [
    c.name, c.effects, c.application, c.obtain, c.features,
    c.removes, c.sale, c.transfer, c.conversion, c.protection,
    c.cannotUse, c.craftText
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return hay.includes(q);
}

function sectionHTML(title, text){
  if(!text) return '';
  return `
    <div class="section">
      <h4>${escapeHtml(title)}</h4>
      <div class="text">${escapeHtml(text)}</div>
    </div>
  `;
}

// --- Cards list + selection
function getFilteredCards(){
  const q = (state.q||'').trim().toLowerCase();
  return CARDS
    .filter(c => (state.cat==='Все' ? true : c.category===state.cat))
    .filter(c => matches(c,q))
    .sort((a,b)=> (a.category===b.category ? a.name.localeCompare(b.name,'ru') : a.category.localeCompare(b.category,'ru')));
}

function selectCard(c){
  state.selectedKey = cardKey(c);

  // Re-render list to highlight selection
  renderCards();

  // Desktop: render details on the right panel
  if(isDesktop()){
    renderDetailsDesktop();
    return;
  }

  // Mobile: open bottom sheet
  openSheet(c);
}

function renderCards(){
  const grid = $('cardsGrid');
  grid.innerHTML = '';

  const filtered = getFilteredCards();
  $('empty').style.display = filtered.length ? 'none' : '';

  for(const c of filtered){
    const key = cardKey(c);
    const el = document.createElement('div');
    el.className = 'card' + (state.selectedKey === key ? ' selected' : '');
    el.innerHTML = `
      <div class="top">
        <div>
          <div class="emoji">${c.emoji||'🀄️'}</div>
        </div>
        <div class="catTag">${escapeHtml(c.category || '')}</div>
      </div>
      <div class="cname">${escapeHtml(c.name||'Без названия')}</div>
      <div class="snippet">${escapeHtml((c.effects||c.application||c.features||'').replace(/^Эффекты:\s*/i,''))}</div>
    `;
    el.onclick = () => selectCard(c);
    grid.appendChild(el);
  }
}

// --- Desktop details panel
function renderDetailsDesktop(forceEmpty = false){
  const col = $('detailsCol');
  const panel = $('detailsPanel');

  // show panel only on desktop
  if(!isDesktop()){
    col.style.display = 'none';
    return;
  }
  col.style.display = 'block';

  const filtered = getFilteredCards();

  if(forceEmpty || !state.selectedKey){
    panel.innerHTML = `
      <div class="detailsEmpty">
        <div class="detailsIcon">🀄️</div>
        <h2>Выбери карту</h2>
        <div class="muted">Кликни по карте слева — детали появятся здесь. На телефоне — откроются снизу.</div>
      </div>
    `;
    return;
  }

  const c = filtered.find(x => cardKey(x) === state.selectedKey) || CARDS.find(x => cardKey(x) === state.selectedKey);
  if(!c){
    panel.innerHTML = `
      <div class="detailsEmpty">
        <div class="detailsIcon">🀄️</div>
        <h2>Карта не найдена</h2>
        <div class="muted">Попробуй выбрать карту заново.</div>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <div class="dHead">
      <div class="dTitle">
        <div class="emoji">${escapeHtml(c.emoji || '🀄️')}</div>
        <div>
          <h3>${escapeHtml(c.name || 'Карта')}</h3>
          <div class="dMeta">${escapeHtml(c.category || '')}</div>
        </div>
      </div>
    </div>

    ${sectionHTML('Эффекты', c.effects)}
    ${sectionHTML('Применение', c.application)}
    ${sectionHTML('Получение', c.obtain)}
    ${sectionHTML('Особенности', c.features)}
    ${sectionHTML('Снимается / забирается', c.removes)}
    ${sectionHTML('Продажа', c.sale)}
    ${sectionHTML('Передача', c.transfer)}
    ${sectionHTML('Конвертация', c.conversion)}
    ${sectionHTML('Защита', c.protection)}
    ${sectionHTML('Нельзя использовать', c.cannotUse)}
    ${sectionHTML('Сборка', c.craftText)}

    <div class="dHint">Подсказка: на мобильном детали открываются снизу (sheet).</div>
  `;
}

// --- Mobile sheet (reuse existing overlay)
function openSheet(c){
  $('mEmoji').textContent = c.emoji || '🀄️';
  $('mName').textContent = c.name || 'Карта';
  $('mMeta').textContent = c.category || '';

  const body = $('mBody');
  body.innerHTML = '';
  body.innerHTML += sectionHTML('Эффекты', c.effects);
  body.innerHTML += sectionHTML('Применение', c.application);
  body.innerHTML += sectionHTML('Получение', c.obtain);
  body.innerHTML += sectionHTML('Особенности', c.features);
  body.innerHTML += sectionHTML('Снимается / забирается', c.removes);
  body.innerHTML += sectionHTML('Продажа', c.sale);
  body.innerHTML += sectionHTML('Передача', c.transfer);
  body.innerHTML += sectionHTML('Конвертация', c.conversion);
  body.innerHTML += sectionHTML('Защита', c.protection);
  body.innerHTML += sectionHTML('Нельзя использовать', c.cannotUse);
  body.innerHTML += sectionHTML('Сборка', c.craftText);

  $('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSheet(){
  $('overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// --- Calculator (без изменений по логике)
const ladder = [
  {from:'🔘', to:'☑️', rate:2},
  {from:'☑️', to:'🟦', rate:3},
  {from:'🟦', to:'🟩', rate:2},
  {from:'🟩', to:'⬜️', rate:2},
  {from:'⬜️', to:'🟧', rate:2},
  {from:'🟧', to:'💎', rate:2},
  {from:'💎', to:'🚨', rate:3},
];

const ladderNames = {
  '🔘':'Комиссия',
  '☑️':'Серая',
  '🟦':'Синяя',
  '🟩':'Зелёная',
  '⬜️':'Белая',
  '🟧':'Золотая',
  '💎':'Изумрудная',
  '🚨':'Рубиновая',
};

const ladderOrder = ['🔘','☑️','🟦','🟩','⬜️','🟧','💎','🚨'];

function renderInvInputs(){
  const host = $('invInputs');
  host.innerHTML = '';
  ladderOrder.forEach(sym=>{
    const wrap = document.createElement('div');
    wrap.className = 'field';
    wrap.innerHTML = `
      <label><b>${sym} ${escapeHtml(ladderNames[sym])}</b><span>шт.</span></label>
      <input type="number" min="0" step="1" inputmode="numeric" pattern="[0-9]*" id="inv_${sym}" placeholder="0" />
    `;
    host.appendChild(wrap);
  });
}

function getInv(){
  const inv = {};
  ladderOrder.forEach(sym=>{
    const v = parseInt(($('inv_'+sym).value||'0'),10);
    inv[sym] = Number.isFinite(v) && v>0 ? v : 0;
  });
  return inv;
}

function setInv(inv){
  ladderOrder.forEach(sym=>{
    $('inv_'+sym).value = inv[sym] || 0;
  });
}

function invToText(inv){
  return ladderOrder
    .filter(sym=> (inv[sym]||0)>0)
    .map(sym=> `${sym} x${inv[sym]}`)
    .join('\n') || '—';
}

function optimizeUp(inv){
  const steps = [];
  const out = Object.assign({}, inv);
  for(const r of ladder){
    const can = Math.floor((out[r.from]||0) / r.rate);
    if(can>0){
      out[r.from] -= can*r.rate;
      out[r.to] = (out[r.to]||0) + can;
      steps.push(`${r.from} x${can*r.rate} → ${r.to} x${can}`);
    }
  }
  return {out, steps};
}

function parseRecipe(text){
  if(!text) return null;
  const m = text.match(/\(([^\)]*?)\)/);
  if(!m) return null;
  const inside = m[1];
  const eq = inside.split('🟰');
  if(eq.length<2) return null;
  const left = eq[0];
  const right = eq[1];

  const outEmoji = (right.match(/([☀-➿🀀-🫿]+)/u) || [])[1];
  if(!outEmoji) return null;

  const parts = left.split('➕').map(s=>s.trim()).filter(Boolean);
  const req = {};
  for(const p of parts){
    const emo = (p.match(/([☀-➿🀀-🫿]+)/u) || [])[1];
    if(!emo) continue;
    req[emo] = (req[emo]||0) + 1;
  }
  if(Object.keys(req).length===0) return null;
  return {out:outEmoji, req};
}

function getCraftable(rec, inv){
  let k = Infinity;
  for(const [emo,n] of Object.entries(rec.req)){
    k = Math.min(k, Math.floor((inv[emo]||0) / n));
  }
  return Number.isFinite(k) ? k : 0;
}

function getAllRecipes(){
  const seen = new Set();
  const recs = [];
  for(const c of CARDS){
    const r = parseRecipe(c.craftText||'');
    if(!r) continue;
    const key = JSON.stringify(r);
    if(seen.has(key)) continue;
    seen.add(key);
    recs.push(r);
  }
  return recs;
}

const allRecipes = getAllRecipes();

const weight = {
  '🪽':100,'🔲':95,'🌈':90,'🚨':80,'💎':70,'🟧':60,
  '⬜️':50,'🃏':45,'☮️':40,'🎦':35,'🎹':30,'🅱️':25,
  '🧿':20,'🟩':10,'🟦':8,'☑️':6,'🔘':1
};

function showRecipes(){
  const inv = getInv();
  const out = [];
  for(const r of allRecipes){
    const can = getCraftable(r, inv);
    if(can<=0) continue;
    const reqTxt = Object.entries(r.req).map(([emo,n])=> `${emo}x${n}`).join(' + ');
    out.push({w: weight[r.out]||0, line:`${reqTxt} → ${r.out} x${can}`});
  }
  out.sort((a,b)=> b.w-a.w || a.line.localeCompare(b.line,'ru'));
  $('recipesOut').textContent = out.length ? out.map(o=>o.line).join('\n') : '—';
}

function disassembleOne(sym){
  const rev = [
    {from:'🚨', to:'💎', rate:3},
    {from:'💎', to:'🟧', rate:2},
    {from:'🟧', to:'⬜️', rate:2},
    {from:'⬜️', to:'🟩', rate:2},
    {from:'🟩', to:'🟦', rate:2},
    {from:'🟦', to:'☑️', rate:3},
    {from:'☑️', to:'🔘', rate:2},
  ];
  const r = rev.find(x=>x.from===sym);
  if(!r) return null;
  return {from:sym, to:r.to, qty:r.rate};
}

function renderDisSel(){
  const sel = $('disSel');
  sel.innerHTML = '';
  ladderOrder.slice().reverse().forEach(sym=>{
    if(sym==='🔘') return;
    const opt = document.createElement('option');
    opt.value = sym;
    opt.textContent = `${sym} ${ladderNames[sym]}`;
    sel.appendChild(opt);
  });
}

// --- Rules
function renderRules(){
  const host = $('rulesList');
  host.innerHTML='';
  (RULES||[]).forEach((t,idx)=>{
    const box = document.createElement('div');
    box.className='box';
    box.innerHTML = `<h3>Блок ${idx+1}</h3><div class="mono">${escapeHtml(t)}</div>`;
    host.appendChild(box);
  });
  if((RULES||[]).length===0){
    const box = document.createElement('div');
    box.className='box';
    box.innerHTML = `<h3>—</h3><div class="muted">Правила не найдены в исходном тексте.</div>`;
    host.appendChild(box);
  }
}

// --- Event Listeners
function initEventListeners(){
  // sheet close
  $('mClose').onclick = closeSheet;
  $('overlay').onclick = (e) => { if(e.target === $('overlay')) closeSheet(); };

  // tabs/nav
  document.querySelectorAll('.tab').forEach(t=>t.onclick = () => setView(t.dataset.view));
  document.querySelectorAll('.navBtn').forEach(t=>t.onclick = () => setView(t.dataset.view));

  // search
  $('q').addEventListener('input', (e)=>{
    state.q = e.target.value;
    state.selectedKey = null;
    renderCards();
    renderDetailsDesktop(true);
  });

  // calc buttons
  $('btnOptimize').onclick = () => {
    const inv = getInv();
    const {out, steps} = optimizeUp(inv);
    $('planOut').textContent = steps.length ? steps.join('\n') : '—';
    $('invOut').textContent = invToText(out);
    setInv(out);
  };

  $('btnReset').onclick = () => {
    setInv(Object.fromEntries(ladderOrder.map(s=>[s,0])));
    $('planOut').textContent = '—';
    $('invOut').textContent = '—';
    $('recipesOut').textContent = '—';
    $('disOut').textContent = '—';
  };

  $('btnRecipes').onclick = showRecipes;

  $('btnDisassemble').onclick = () => {
    const sym = $('disSel').value;
    const r = disassembleOne(sym);
    if(!r){
      $('disOut').textContent = 'Для этой карты разборка не описана в базовой лестнице.';
      return;
    }
    $('disOut').textContent = `${r.from} x1 → ${r.to} x${r.qty}\n(Это обратная операция к сборке: ${r.to} x${r.qty} → ${r.from} x1)`;
  };

  // respond to viewport changes: keep UI consistent
  window.addEventListener('resize', () => {
    if(state.view !== 'cards') return;

    // If moved to desktop, close sheet and render details panel
    if(isDesktop()){
      closeSheet();
      renderDetailsDesktop();
    } else {
      // If moved to mobile, hide desktop panel
      renderDetailsDesktop();
    }
  });
}

// --- Initialization
function init(){
  renderPills();
  renderCards();
  renderDetailsDesktop(true);

  renderInvInputs();
  renderDisSel();
  renderRules();
  initEventListeners();

  setInv(Object.fromEntries(ladderOrder.map(s=>[s,0])));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
