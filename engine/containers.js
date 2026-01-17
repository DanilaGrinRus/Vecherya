/*
  containers.js
  Defines container behaviors: bank (with safe), hell (multi), bucket.
  This module only manages data shapes; rule effects decide when to move cards.
*/

(function(){
  function ensurePlayerContainers(player){
    player.containers = player.containers || {};
    return player.containers;
  }

  function ensureBank(player, opts={}){
    const c = ensurePlayerContainers(player);
    if (!c.bank) {
      c.bank = {
        type: 'bank',
        capacity: opts.capacity ?? 12,
        bank_storage: {},
        safe_storage: {},
        modules: { safe: false },
        tier: opts.tier ?? 'bank'
      };
    }
    return c.bank;
  }

  function installSafe(bank){
    bank.modules = bank.modules || {};
    bank.modules.safe = true;
  }

  function ensureHell(player){
    const c = ensurePlayerContainers(player);
    c.hells = c.hells || [];
    return c.hells;
  }

  function createHell(player){
    const hells = ensureHell(player);
    const hell = { type:'hell', id: 'hell_' + (hells.length+1), storage: {} };
    hells.push(hell);
    return hell;
  }

  function ensureBucket(host){
    const c = ensurePlayerContainers(host);
    if (!c.bucket) c.bucket = { type:'bucket', storage: {} };
    return c.bucket;
  }

  window.VecheryaContainers = { ensureBank, installSafe, createHell, ensureBucket };
})();
