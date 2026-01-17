/*
  engine.js
  Public facade for the in-browser Rule Engine.

  Design goals:
   - Data-driven: cards + recipes loaded from /data
   - Stable API for UI integration
   - Warnings-only for limits/stream activity/freeze
*/

(function(){
  async function loadJSON(url){
    const r = await fetch(url, { cache: 'no-store' });
    if(!r.ok) throw new Error(`Failed to load ${url}: HTTP ${r.status}`);
    return await r.json();
  }

  function buildRegistry(cards){
    const byId={};
    const byEmoji={};
    const byName={};
    for(const c of cards){
      byId[c.id]=c;
      if (c.emoji) byEmoji[c.emoji]=c.id;
      byName[c.name]=c.id;
    }
    return {byId, byEmoji, byName};
  }

  function emptyState(){
    return { players: {}, meta: {}, warnings: [] };
  }

  function ensurePlayer(state, playerId){
    state.players[playerId] = state.players[playerId] || { id: playerId, inventory: {}, states: {}, containers: {} };
    return state.players[playerId];
  }

  function applyInventorySnapshot(state, snapshot, registry){
    // snapshot expected: {players:[{id,name,cards:[{name/emoji/id,count}]}]} OR similar.
    // This function is intentionally defensive; UI can pre-normalize.
    const players = snapshot.players || snapshot.users || [];
    for(const p of players){
      const pid = p.id || p.name || p.user || 'unknown';
      const pl = ensurePlayer(state, pid);
      pl.displayName = p.name || p.user || pid;
      const cards = p.cards || p.inventory || p.items || [];
      for(const it of cards){
        const count = Number(it.count ?? it.qty ?? 0) || 0;
        let cardId = it.id;
        if(!cardId && it.emoji) cardId = registry.byEmoji[it.emoji];
        if(!cardId && it.name) cardId = registry.byName[it.name];
        if(!cardId) continue;
        pl.inventory[cardId] = (pl.inventory[cardId] || 0) + count;
      }
    }
    return state;
  }

  function summarizePlayer(state, playerId, registry){
    const p = state.players[playerId];
    if(!p) return {ok:false, error:'PLAYER_NOT_FOUND'};
    const cards = Object.entries(p.inventory)
      .filter(([,n])=>n>0)
      .map(([id,n])=>({id, name: registry.byId[id]?.name || id, emoji: registry.byId[id]?.emoji || '', count:n, type: registry.byId[id]?.type || ''}))
      .sort((a,b)=>a.name.localeCompare(b.name,'ru'));
    return {ok:true, playerId, displayName: p.displayName || playerId, cards, states: (window.VecheryaStateEngine?.listActiveStates(p) || [])};
  }

  function optimizeCraft(state, playerId, rules){
    const p = state.players[playerId];
    if(!p) return {ok:false, error:'PLAYER_NOT_FOUND'};
    const inv = JSON.parse(JSON.stringify(p.inventory||{}));
    const out = window.VecheryaOptimizer.computeCraftPlan(inv, rules.recipes||[], rules.registry);
    return {ok:true, playerId, plan: out.plan, finalInventory: out.finalInventory};
  }

  async function init(opts={}){
    const cardsUrl = opts.cardsUrl || './data/cards_registry.json';
    const rulesUrl = opts.rulesUrl || './data/rules_mapping.json';
    const cardsDoc = await loadJSON(cardsUrl);
    const rulesDoc = await loadJSON(rulesUrl);
    const registry = buildRegistry(cardsDoc.cards||[]);
    const rules = { ...rulesDoc, registry };
    const state = emptyState();
    return { state, registry, rules, cardsDoc, rulesDoc };
  }

  window.VecheryaRuleEngine = {
    init,
    applyInventorySnapshot,
    summarizePlayer,
    optimizeCraft
  };
})();
