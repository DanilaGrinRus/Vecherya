use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

use k2_core::{analyze_inventory, CardsDb, InventoryInput};

static CARDS_DB: OnceCell<CardsDb> = OnceCell::new();

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

/// Provide cards definition JSON (array of CardDefinition).
/// This should be called once during app startup.
#[wasm_bindgen]
pub fn set_cards_json(cards_json: &str) -> Result<(), JsValue> {
    let db = CardsDb::from_json_str(cards_json)
        .map_err(|e| JsValue::from_str(&format!("cards.json parse error: {e}")))?;

    CARDS_DB
        .set(db)
        .map_err(|_| JsValue::from_str("cards DB already initialized"))?;

    Ok(())
}

#[wasm_bindgen]
pub fn analyze_inventory_json(inventory_json: &str) -> Result<String, JsValue> {
    let db = CARDS_DB
        .get()
        .ok_or_else(|| JsValue::from_str("cards DB not initialized; call set_cards_json()"))?;

    let input: InventoryInput = serde_json::from_str(inventory_json)
        .map_err(|e| JsValue::from_str(&format!("inventory parse error: {e}")))?;

    let report = analyze_inventory(&input, db);
    serde_json::to_string_pretty(&report)
        .map_err(|e| JsValue::from_str(&format!("report serialization error: {e}")))
}

#[wasm_bindgen]
pub fn search_cards_json(query: &str, limit: usize) -> Result<String, JsValue> {
    let db = CARDS_DB
        .get()
        .ok_or_else(|| JsValue::from_str("cards DB not initialized; call set_cards_json()"))?;

    let hits = db.search(query, limit);
    serde_json::to_string_pretty(&hits)
        .map_err(|e| JsValue::from_str(&format!("serialization error: {e}")))
}

#[wasm_bindgen]
pub fn get_card_by_id_json(id: &str) -> Result<String, JsValue> {
    let db = CARDS_DB
        .get()
        .ok_or_else(|| JsValue::from_str("cards DB not initialized; call set_cards_json()"))?;

    let card = db
        .get_by_id(id)
        .ok_or_else(|| JsValue::from_str("card not found"))?;

    serde_json::to_string_pretty(card)
        .map_err(|e| JsValue::from_str(&format!("serialization error: {e}")))
}
