use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CardDefinition {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub emoji: String,
    #[serde(default)]
    pub category: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub rules: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CardsDb {
    pub cards: Vec<CardDefinition>,
}

impl CardsDb {
    pub fn from_json_str(json: &str) -> Result<Self, serde_json::Error> {
        let cards: Vec<CardDefinition> = serde_json::from_str(json)?;
        Ok(Self { cards })
    }

    pub fn get_by_id(&self, id: &str) -> Option<&CardDefinition> {
        self.cards.iter().find(|c| c.id == id)
    }

    pub fn search(&self, query: &str, limit: usize) -> Vec<&CardDefinition> {
        let q = query.trim().to_lowercase();
        if q.is_empty() {
            return vec![];
        }
        let mut out: Vec<&CardDefinition> = self
            .cards
            .iter()
            .filter(|c| {
                c.name.to_lowercase().contains(&q)
                    || c.id.to_lowercase().contains(&q)
                    || (!c.emoji.is_empty() && c.emoji.contains(query))
            })
            .collect();
        out.truncate(limit);
        out
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInventoryInput {
    pub user: String,
    #[serde(default)]
    pub cards: HashMap<String, u32>,
    #[serde(default)]
    pub active_notes: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InventoryInput {
    pub users: Vec<UserInventoryInput>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInventoryReport {
    pub user: String,
    pub total_cards: u32,
    pub by_category: HashMap<String, u32>,
    pub active_notes: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InventoryReport {
    pub users_count: usize,
    pub total_cards: u32,
    pub users: Vec<UserInventoryReport>,
}

pub fn analyze_inventory(input: &InventoryInput, cards_db: &CardsDb) -> InventoryReport {
    let mut total_cards_all: u32 = 0;
    let mut users_out: Vec<UserInventoryReport> = Vec::with_capacity(input.users.len());

    for u in &input.users {
        let mut total_cards_user: u32 = 0;
        let mut by_category: HashMap<String, u32> = HashMap::new();

        for (card_id, qty) in &u.cards {
            total_cards_user = total_cards_user.saturating_add(*qty);

            let category = cards_db
                .get_by_id(card_id)
                .map(|c| c.category.clone())
                .unwrap_or_else(|| "unknown".to_string());

            *by_category.entry(category).or_insert(0) = by_category
                .get(&category)
                .copied()
                .unwrap_or(0)
                .saturating_add(*qty);
        }

        total_cards_all = total_cards_all.saturating_add(total_cards_user);

        users_out.push(UserInventoryReport {
            user: u.user.clone(),
            total_cards: total_cards_user,
            by_category,
            active_notes: u.active_notes.clone(),
        });
    }

    InventoryReport {
        users_count: input.users.len(),
        total_cards: total_cards_all,
        users: users_out,
    }
}
