/**
 * Cardpedia renderer (Карты only).
 *
 * Data sources:
 *  1) dataset/v1.json (preferred)
 *  2) Автоматически определяемые изображения из assets/cards/
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

  // Извлекаем имя изображения если есть в данных
  const image = asString(pickFirst(c, ["image", "img", "picture", "icon", "asset"])).trim();

  return { id, name, category, rarity, emoji, image, order, categoryOrder, rarityOrder };
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
      if (x.image) s += 2; // Добавляем баллы за наличие изображения
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

// Функция для извлечения ID из имени файла
function extractIdFromFilename(filename) {
  // Удаляем расширения и суффиксы
  let id = filename
    .replace(/_600\.webp$/, '')
    .replace(/_600\.png$/, '')
    .replace(/_600\.jpg$/, '')
    .replace(/\.webp$/, '')
    .replace(/\.png$/, '')
    .replace(/\.jpg$/, '')
    .replace(/\.jpeg$/, '');
  
  return id;
}

// Функция для создания автоматического mapping из списка файлов
function createAutoMapping(imageFiles) {
  const mapping = {};
  
  for (const filename of imageFiles) {
    const id = extractIdFromFilename(filename);
    if (id) {
      mapping[id] = filename;
      
      // Также добавляем варианты без числовых суффиксов
      const idWithoutNumbers = id.replace(/\d+$/, '');
      if (idWithoutNumbers !== id && !mapping[idWithoutNumbers]) {
        mapping[idWithoutNumbers] = filename;
      }
    }
  }
  
  return mapping;
}

// Функция для получения пути к изображению
function getImageForCard(cardId, mapping) {
  // Пробуем несколько вариантов
  const variants = [
    cardId,
    cardId.toLowerCase(),
    cardId.replace(/[^a-z0-9]/gi, '_'),
    cardId.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
    // Удаляем числовые суффиксы
    cardId.replace(/\d+$/, ''),
    cardId.replace(/\d+$/, '').toLowerCase(),
  ];
  
  for (const variant of variants) {
    if (mapping[variant]) {
      return mapping[variant];
    }
  }
  
  return null;
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
    
    // Проверяем наличие изображения
    const hasImage = !!getImageForCard(c.id, mapping);
    const okImg = !onlyWithImages || hasImage;
    
    return okQuery && okCat && okImg;
  });

  const container = $("cards");
  container.innerHTML = "";

  for (let i = 0; i < filtered.length; i++) {
    const c = filtered[i];
    const imageFile = getImageForCard(c.id, mapping);
    const displayName = c.name ? c.name : titleCaseRu(c.id.replace(/[_-]+/g, " "));
    const catLabel = normalizeCategoryLabel(c.category);
    const rarLabel = normalizeRarityLabel(c.rarity);

    const metaBits = [];
    if (catLabel) metaBits.push(catLabel);
    if (rarLabel) metaBits.push(rarLabel);
    metaBits.push(c.id);

    const el = document.createElement("article");
    el.className = "card-item";

    const loading = (typeof i === "number" && i < 12) ? "eager" : "lazy";
    const fetchpriority = (typeof i === "number" && i < 4) ? "high" : "auto";

    const imgHtml = imageFile
      ? `<img class="card-item__img"
              src="assets/cards/${imageFile}"
              loading="${loading}"
              decoding="async"
              fetchpriority="${fetchpriority}"
              alt="${displayName}">`
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

  // Список всех файлов изображений (можно обновить по необходимости)
  const IMAGE_FILES = [
    "angel_600.webp", "antikiran_600.webp", "bank_600.webp",
    "bank_sivyi_mentin_600.webp", "bankrot_600.webp", "bita_600.webp",
    "black_600.webp", "blue_600.webp", "capitalism_communism_600.webp",
    "chameleon_600.webp", "chib_600.webp", "commission_600.webp",
    "content_card_600.webp", "converter_600.webp", "emerald_600.webp",
    "extrematus_600.webp", "gift_12min_600.webp", "gold_600.webp",
    "golden_skates_600.webp", "graffiti_600.webp", "gray_600.webp",
    "green_600.webp", "jackpot_cards_600.webp", "joker_600.webp",
    "kost_1_600.webp", "kost_2_600.webp", "last_judgement_1_600.webp",
    "last_judgement_2_600.webp", "littador_600.webp", "magnet_600.webp",
    "matreshid_600.webp", "mayak_besthodnosti_600.webp", "minus_th_600.webp",
    "minus_3th_600.webp", "musical_600.webp", "obnukenie_600.webp",
    "obosran_600.webp", "pacific_600.webp", "pergamet_blue_600.webp",
    "pergamet_gold_600.webp", "pink_600.webp", "preispodnya_600.webp",
    "rainbow_600.webp", "red_600.webp", "ruby_park_600.webp",
    "ruby_kost_1_600.webp", "ruby_kost_2_600.webp", "ruby_plus3_600.webp",
    "safe_600.webp", "sweets_600.webp", "template_600.webp",
    "topor_600.webp", "tv_wheel_3_600.webp", "tv_wheel_5_600.webp",
    "tv_wheel_600.webp", "wedro_egora_600.webp", "wheel_eater_1_600.webp",
    "wheel_eater_2_600.webp", "wheel_eater_round_600.webp", "white_600.webp",
    "yellow_600.webp", "zabanen_600.webp", "zamorotka_600.webp"
  ];

  // Создаем автоматический mapping
  const mapping = createAutoMapping(IMAGE_FILES);
  console.log('Автоматически созданный mapping:', mapping);

  // If opened via file://, fetch() to local files is blocked by browsers.
  const isFile = window.location.protocol === "file:";

  const candidates = [
    "dataset/v1.json",
    "./dataset/v1.json",
    // GitHub Pages edge-case: some users accidentally host from a subfolder. Try relative to current URL.
    new URL("dataset/v1.json", window.location.href).toString(),
  ];

  if (!isFile) {
    for (const url of candidates) {
      try {
        const ds = await safeFetchJson(url);
        cards = normalizeDataset(ds);
        if (cards.length) { datasetMode = true; break; }
      } catch (_) {}
    }
  }

  if (!datasetMode) {
    // Fallback: создаем карты из имен файлов изображений
    console.log('Создаем карты из имен файлов изображений');
    cards = Object.keys(mapping).map((id) => ({ 
      id, 
      name: titleCaseRu(id.replace(/[_-]+/g, " ")), 
      category: "", 
      rarity: "", 
      emoji: "", 
      image: mapping[id],
      order: null, 
      categoryOrder: null, 
      rarityOrder: null 
    }));
  } else {
    // Добавляем изображения к картам из dataset
    console.log('Добавляем изображения к картам из dataset');
    cards = cards.map(card => ({
      ...card,
      image: card.image || getImageForCard(card.id, mapping)
    }));
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

  // Обновляем информацию в topbar
  const imageCount = Object.keys(mapping).length;
  const cardCount = cards.length;
  
  if (isFile) {
    $("meta").textContent = `Карт: ${cardCount} • Изображений: ${imageCount} • Локально (file://)`;
  } else if (datasetMode) {
    $("meta").textContent = `Карт: ${cardCount} • Изображений: ${imageCount} • Источник: dataset/v1.json`;
  } else {
    $("meta").textContent = `Карт: ${cardCount} • Изображений: ${imageCount} • Источник: имена файлов`;
  }
}

init().catch((e) => {
  console.error(e);
  const meta = $("meta");
  if (meta) meta.textContent = "Ошибка загрузки данных";
  
  // Показываем базовый контент даже при ошибке
  const container = $("cards");
  if (container) {
    container.innerHTML = `
      <div class="hint" style="grid-column: 1 / -1;">
        <div class="hint__title">Ошибка загрузки</div>
        <div class="hint__text">
          Не удалось загрузить данные. Проверьте консоль браузера (F12) для подробностей.<br>
          Ошибка: ${e.message}
        </div>
      </div>
    `;
  }
});
