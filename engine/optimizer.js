/*
  optimizer.js
  Computes "maximize expensive crafts" given recipes.
  In v1: uses greedy approach by default; deterministic.
*/

(function(){
  function computeCraftPlan(inventoryCounts, recipes, registry){
    // inventoryCounts: {cardId: number}
    const plan=[];
    // naive: iterate recipes sorted by output value (tier)
    const outputs = recipes
      .map(r=>({r, outId: r.output}))
      .sort((a,b)=>{
        const ta = registry.byId[a.outId]?.type ?? 'normal';
        const tb = registry.byId[b.outId]?.type ?? 'normal';
        const order = {super:0,danger:1,activation:2,violation:3,normal:4};
        return (order[ta]??99)-(order[tb]??99);
      });

    let changed=true;
    while(changed){
      changed=false;
      for(const {r} of outputs){
        const maxTimes = r.inputs.reduce((m,inp)=>{
          const have = inventoryCounts[inp]||0;
          return Math.min(m, Math.floor(have/1));
        }, Infinity);
        if (maxTimes>0 && maxTimes!==Infinity){
          // apply once per pass for determinism
          for(const inp of r.inputs){ inventoryCounts[inp]=(inventoryCounts[inp]||0)-1; }
          inventoryCounts[r.output]=(inventoryCounts[r.output]||0)+1;
          plan.push({recipe:r, times:1});
          changed=true;
        }
      }
    }
    return {plan, finalInventory: inventoryCounts};
  }

  window.VecheryaOptimizer = { computeCraftPlan };
})();
