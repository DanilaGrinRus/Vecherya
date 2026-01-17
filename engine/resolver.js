/*
  resolver.js
  Implements deterministic selection policies.
  Policies fixed by project decisions:
   - P1: ceil(n/2)
   - P2: steal/remove most valuable first
   - P3: safe_storage is fully protected from "Грабители"
*/

(function(){
  function ceilHalf(n){ return Math.ceil(n/2); }

  // "Value" ordering is data-driven. In v1 we use a default tier ordering.
  const DEFAULT_TIER_ORDER = ['super','danger','violation','activation','normal'];

  function sortCardsByValue(cardIds, registry){
    const order = new Map(DEFAULT_TIER_ORDER.map((t,i)=>[t,i]));
    return [...cardIds].sort((a,b)=>{
      const ca = registry.byId[a];
      const cb = registry.byId[b];
      const ta = ca?.type ?? 'normal';
      const tb = cb?.type ?? 'normal';
      const oa = order.has(ta)?order.get(ta):999;
      const ob = order.has(tb)?order.get(tb):999;
      if (oa !== ob) return oa - ob;
      // stable by name/id
      return String(a).localeCompare(String(b), 'ru');
    });
  }

  window.VecheryaResolver = { ceilHalf, sortCardsByValue };
})();
