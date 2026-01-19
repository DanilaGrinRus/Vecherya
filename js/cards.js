/**
 * Cardpedia renderer (Карты only).
 *
 * Data sources:
 *  1) dataset/v1.json (preferred)
 *  2) assets/cards/mapping.json (fallback)
 *
 * Goals:
 *  - Normalize dataset structures robustly (engine-like shapes).
 *  - Sort by engine-like category + rarity order (not alphabetically).
 */

const $ = (id) => document.getElementById(id);

async function safeFetchJson(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.json();
}

function asString(v) {
  return (v === null || v === undefined) ? "" : String(v);
}

function pickFirst(obj, keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
}

function normalizeOneCard(c, extra = {}) {
  const id = asString(pickFirst(c, ["id", "slug", "key", "code", "uid"])).trim();
  if (!id) return null;

  const name = asString(pickFirst(c, ["name", "title", "displayName", "label", "ru", "ruName"])).trim();
  const category = asString(pickFirst(c, ["category", "type", "group", "section"])).trim() || asString(extra.category).trim();
  const rarity = asString(pickFirst(c, ["rarity", "tier", "rank"])).trim() || asString(extra.rarity).trim();
  const emoji = asString(pickFirst(c, ["emoji", "icon", "emote"])).trim() || asString(extra.emoji).trim();

  // Optional numeric order hints (engine may provide)
  const order = Number.isFinite(Number(c?.order)) ? Number(c.order) : (Number.isFinite(Number(extra.order)) ? Number(extra.order) : null);
  const categoryOrder = Number.isFinite(Number(c?.categoryOrder)) ? Number(c.categoryOrder) : (Number.isFinite(Number(extra.categoryOrder)) ? Number(extra.categoryOrder) : null);
  const rarityOrder = Number.isFinite(Number(c?.rarityOrder)) ? Number(c.rarityOrder) : (Number.isFinite(Number(extra.rarityOrder)) ? Number(extra.rarityOrder) : null);

  return { id, name, category, rarity, emoji, order, categoryOrder, rarityOrder };
}

/**
 * Extract cards from many plausible dataset shapes:
 * - { cards: [...] }
 * - { data: { cards: [...] } }
 * - [ ... ]
 * - { cardsByCategory: { "<cat>": [...] } }
 * - { categories: [ { id, name, order, cards:[...] } ] }
 * - { cards: { "<id>": {...} } }  // map/dict
 */
function normalizeDataset(raw) {
  const out = [];
  const push = (card, extra) => {
    const n = normalizeOneCard(card, extra);
    if (n) out.push(n);
  };

  const walkCardsArray = (arr, extra) => {
    if (!Array.isArray(arr)) return;
    for (const c of arr) if (c) push(c, extra);
  };

  // 1) array at root
  if (Array.isArray(raw)) {
    walkCardsArray(raw, {});
    return dedupe(out);
  }

  // 2) direct cards array
  if (Array.isArray(raw?.cards)) {
    walkCardsArray(raw.cards, {});
  }

  // 3) nested data.cards
  if (Array.isArray(raw?.data?.cards)) {
    walkCardsArray(raw.data.cards, {});
  }

  // 4) cards dict/map
  if (raw?.cards && !Array.isArray(raw.cards) && typeof raw.cards === "object") {
    for (const [id, c] of Object.entries(raw.cards)) {
      if (c && typeof c === "object") push({ id, ...c }, {});
    }
  }

  // 5) cardsByCategory
  if (raw?.cardsByCategory && typeof raw.cardsByCategory === "object") {
    for (const [cat, arr] of Object.entries(raw.cardsByCategory)) {
      walkCardsArray(arr, { category: cat });
    }
  }

  // 6) categories list with nested cards
  if (Array.isArray(raw?.categories)) {
    for (const catObj of raw.categories) {
      const catId = asString(pickFirst(catObj, ["id", "key", "slug", "name", "title"])).trim();
      const catName = asString(pickFirst(catObj, ["name", "title", "label"])).trim() || catId;
      const catOrder = Number.isFinite(Number(catObj?.order)) ? Number(catObj.order) : null;

      // category cards can be in catObj.cards OR catObj.items OR catObj.list
      const cardsArr = catObj?.cards ?? catObj?.items ?? catObj?.list;
      walkCardsArray(cardsArr, { category: catName, categoryOrder: catOrder });
    }
  }

  // 7) data.categories
  if (Array.isArray(raw?.data?.categories)) {
    for (const catObj of raw.data.categories) {
      const catId = asString(pickFirst(catObj, ["id", "key", "slug", "name", "title"])).trim();
      const catName = asString(pickFirst(catObj, ["name", "title", "label"])).trim() || catId;
      const catOrder = Number.isFinite(Number(catObj?.order)) ? Number(catObj.order) : null;
      const cardsArr = catObj?.cards ?? catObj?.items ?? catObj?.list;
      walkCardsArray(cardsArr, { category: catName, categoryOrder: catOrder });
    }
  }

  return dedupe(out);
}

function dedupe(cards) {
  // keep the richest entry per id
  const m = new Map();
  for (const c of cards) {
    const prev = m.get(c.id);
    if (!prev) { m.set(c.id, c); continue; }

    const score = (x) => {
      let s = 0;
      if (x.name) s += 5;
      if (x.category) s += 3;
      if (x.rarity) s += 3;
      if (x.emoji) s += 1;
      if (x.categoryOrder !== null) s += 1;
      if (x.rarityOrder !== null) s += 1;
      if (x.order !== null) s += 1;
      return s;
    };

    if (score(c) > score(prev)) m.set(c.id, c);
  }
  return Array.from(m.values());
}

function titleCaseRu(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Engine-like ordering (fallback if dataset doesn't provide explicit order fields) */
const CATEGORY_ORDER = [
  "Обычные карты",
  "Карты активаций",
  "Карты нарушений",
  "Опасные карты",
  "Супер карты",
  "ТВ колесо",
  "Объекты",
  "Прочее",
];

// Many projects encode categories in short ids; map common ones to display category
const CATEGORY_ALIASES = {
  base: "Обычные карты",
  normal: "Обычные карты",
  activation: "Карты активаций",
  activations: "Карты активаций",
  violations: "Карты нарушений",
  dangerous: "Опасные карты",
  super: "Супер карты",
  tv: "ТВ колесо",
  objects: "Объекты",
};

const RARITY_ORDER = [
  "Комиссия",
  "Серая",
  "Синяя",
  "Зелёная",
  "Белая",
  "Золотая",
  "Изумрудная",
  "Рубиновая",
];

const RARITY_ALIASES = {
  commission: "Комиссия",
  gray: "Серая",
  grey: "Серая",
  blue: "Синяя",
  green: "Зелёная",
  white: "Белая",
  gold: "Золотая",
  emerald: "Изумрудная",
  ruby: "Рубиновая",
};

function normalizeCategoryLabel(label) {
  const s = (label || "").trim();
  if (!s) return "";
  const key = s.toLowerCase();
  return CATEGORY_ALIASES[key] || s;
}

function normalizeRarityLabel(label) {
  const s = (label || "").trim();
  if (!s) return "";
  const key = s.toLowerCase();
  return RARITY_ALIASES[key] || s;
}

function getCategoryIndex(c) {
  if (c.categoryOrder !== null) return c.categoryOrder;
  const label = normalizeCategoryLabel(c.category);
  const idx = CATEGORY_ORDER.indexOf(label);
  return idx === -1 ? 999 : idx;
}

function getRarityIndex(c) {
  if (c.rarityOrder !== null) return c.rarityOrder;
  const label = normalizeRarityLabel(c.rarity);
  const idx = RARITY_ORDER.indexOf(label);
  return idx === -1 ? 999 : idx;
}

function buildCategories(cards) {
  const set = new Map(); // label -> index
  for (const c of cards) {
    const label = normalizeCategoryLabel(c.category);
    if (!label) continue;
    const idx = getCategoryIndex({ ...c, category: label });
    if (!set.has(label) || idx < set.get(label)) set.set(label, idx);
  }
  return Array.from(set.entries())
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0], "ru"))
    .map(([label]) => label);
}

function sortCards(cards) {
  return [...cards].sort((a, b) => {
    const ca = getCategoryIndex(a) - getCategoryIndex(b);
    if (ca) return ca;

    // explicit per-card order (if engine provides)
    const oa = (a.order !== null ? a.order : 1e9);
    const ob = (b.order !== null ? b.order : 1e9);
    if (oa !== ob) return oa - ob;

    const ra = getRarityIndex(a) - getRarityIndex(b);
    if (ra) return ra;

    const an = (a.name || "").toLowerCase();
    const bn = (b.name || "").toLowerCase();
    if (an && bn && an !== bn) return an.localeCompare(bn, "ru");

    return a.id.localeCompare(b.id, "ru");
  });
}

function render(cardsRaw, mapping) {
  const cards = sortCards(cardsRaw);

  const q = ($("q")?.value || "").trim().toLowerCase();
  const cat = ($("cat")?.value || "").trim();
  const onlyWithImages = $("onlyWithImages")?.checked ?? true;

  const filtered = cards.filter((c) => {
    const name = (c.name || "").toLowerCase();
    const id = (c.id || "").toLowerCase();
    const okQuery = !q || name.includes(q) || id.includes(q);
    const okCat = !cat || normalizeCategoryLabel(c.category) === cat;
    const img = mapping[c.id];
    const okImg = !onlyWithImages || !!img;
    return okQuery && okCat && okImg;
  });

  const container = $("cards");
  container.innerHTML = "";

  for (let i = 0; i < filtered.length; i++) {
    const c = filtered[i];
    const file = mapping[c.id];
    const displayName = c.name ? c.name : titleCaseRu(c.id.replace(/[_-]+/g, " "));
    const catLabel = normalizeCategoryLabel(c.category);
    const rarLabel = normalizeRarityLabel(c.rarity);

    const metaBits = [];
    if (catLabel) metaBits.push(catLabel);
    if (rarLabel) metaBits.push(rarLabel);
    metaBits.push(c.id);

    const el = document.createElement("article");
    el.className = "card-item";

    const fileObj = mapping[c.id];
    const srcSmall = fileObj;

    const loading = (typeof i === "number" && i < 12) ? "eager" : "lazy";
    const fetchpriority = (typeof i === "number" && i < 4) ? "high" : "auto";

    const imgHtml = srcSmall
      ? `<img class="card-item__img"
              src="assets/cards/${srcSmall}"
                            loading="${loading}"
              decoding="async"
              fetchpriority="${fetchpriority}"
              alt="${displayName}">`
      : `<div class="card-item__img" aria-label="Нет изображения"></div>`;


    const imgHtml = file
      ? `<img class="card-item__img" src="assets/cards/${file}" alt="${displayName}">`
      : `<div class="card-item__img" aria-label="Нет изображения"></div>`;

    const emoji = c.emoji ? `<span class="badge" title="Эмодзи карты">${c.emoji}</span>` : "";

    el.innerHTML = `
      ${imgHtml}
      <div class="card-item__body">
        <div class="card-title">${emoji}<span>${displayName}</span></div>
        <div class="card-sub">${metaBits.join(" • ")}</div>
      </div>
    `;
    container.appendChild(el);
  }

  $("meta").textContent = `Показано: ${filtered.length} / ${cards.length}`;
}

async function init() {
  let cards = [];
  let datasetMode = false;

  const mapping = await safeFetchJson("assets/cards/mapping.json");

  try {
    const ds = await safeFetchJson("dataset/v1.json");
    cards = normalizeDataset(ds);

    // Append any image ids missing from dataset as placeholders
    const existing = new Set(cards.map((c) => c.id));
    for (const id of Object.keys(mapping)) {
      if (!existing.has(id)) cards.push({ id, name: "", category: "", rarity: "", emoji: "", order: null, categoryOrder: null, rarityOrder: null });
    }

    datasetMode = cards.length > 0;
  } catch (e) {
    cards = Object.keys(mapping).map((id) => ({ id, name: "", category: "", rarity: "", emoji: "", order: null, categoryOrder: null, rarityOrder: null }));
  }

  // Categories dropdown (engine-like order)
  const categories = buildCategories(cards);
  const catSel = $("cat");
  catSel.innerHTML = `<option value="">Все категории</option>`;
  for (const c of categories) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSel.appendChild(opt);
  }

  $("q").addEventListener("input", () => render(cards, mapping));
  $("cat").addEventListener("change", () => render(cards, mapping));
  $("onlyWithImages").addEventListener("change", () => render(cards, mapping));

  render(cards, mapping);

  if (datasetMode) $("meta").textContent = $("meta").textContent + " • сортировка: движок";
  else $("meta").textContent = $("meta").textContent + " • сортировка: mapping";
}

init().catch((e) => {
  console.error(e);
  const meta = $("meta");
  if (meta) meta.textContent = "Ошибка загрузки данных";
});
