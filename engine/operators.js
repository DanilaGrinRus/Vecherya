/*
  Vecherya Rule Engine v1 (data-driven)
  operators.js
  Defines canonical operator types used by rules_mapping.

  This file is intentionally small and stable. When new card behaviors appear,
  prefer extending rules_mapping.json rather than editing engine logic.
*/

(function(){
  const OP = {
    ADD_CARD: 'ADD_CARD',
    REMOVE_CARD: 'REMOVE_CARD',
    TRANSFER_CARD: 'TRANSFER_CARD',
    APPLY_STATE: 'APPLY_STATE',
    REMOVE_STATE: 'REMOVE_STATE',
    MOVE_TO_CONTAINER: 'MOVE_TO_CONTAINER',
    TAKE_FROM_CONTAINER: 'TAKE_FROM_CONTAINER',
    UPGRADE_CONTAINER: 'UPGRADE_CONTAINER',
    INSTALL_MODULE: 'INSTALL_MODULE',
    TERMINATE_STREAM: 'TERMINATE_STREAM',
    NOTE: 'NOTE'
  };

  // Export
  window.VecheryaOperators = OP;
})();
