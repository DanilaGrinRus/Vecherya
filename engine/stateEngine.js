/*
  stateEngine.js
  Minimal state tracker with durations.
  In v1: durations do not hard-block actions; they produce warnings.
*/

(function(){
  function nowMs(){ return Date.now(); }

  function addState(player, stateId, opts={}){
    player.states = player.states || {};
    const prev = player.states[stateId];
    const startedAt = opts.startedAt ?? nowMs();
    const durationMs = opts.durationMs ?? null;
    const endsAt = durationMs ? startedAt + durationMs : null;
    player.states[stateId] = { stateId, startedAt, durationMs, endsAt, meta: opts.meta || {} };
    return {prev, next: player.states[stateId]};
  }

  function removeState(player, stateId){
    player.states = player.states || {};
    const prev = player.states[stateId] || null;
    delete player.states[stateId];
    return {prev, removed: true};
  }

  function listActiveStates(player){
    player.states = player.states || {};
    return Object.values(player.states);
  }

  window.VecheryaStateEngine = { addState, removeState, listActiveStates };
})();
