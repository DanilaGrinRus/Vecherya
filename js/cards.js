async function init() {
  console.log('🚀 Инициализация Cardpedia...');
  
  let cards = [];

  // Список всех файлов изображений
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

  console.log('📁 Всего файлов изображений:', IMAGE_FILES.length);
  
  // Создаем автоматический mapping
  const mapping = createAutoMapping(IMAGE_FILES);
  const imageCount = Object.keys(mapping).length;
  
  console.log('✅ Создан mapping с', imageCount, 'уникальными ID');
  
  // Создаем карты из имен файлов изображений (ИГНОРИРУЕМ dataset)
  console.log('🔄 Создаем карты из имен файлов изображений');
  cards = Object.keys(mapping).map((id) => ({ 
    id, 
    name: titleCaseRu(id.replace(/[_-]+/g, " ")), 
    category: getCategoryFromId(id), // Автоматически определяем категорию
    rarity: getRarityFromId(id),     // Автоматически определяем редкость
    emoji: getEmojiFromId(id),       // Автоматически определяем эмодзи
    image: mapping[id],
    order: null, 
    categoryOrder: null, 
    rarityOrder: null 
  }));
  
  console.log('✅ Создано карт:', cards.length);
  
  // Обновляем счетчик в подсказке
  const imageCountEl = document.getElementById('image-count');
  if (imageCountEl) {
    imageCountEl.textContent = imageCount;
    console.log('🔢 Счетчик изображений обновлен:', imageCount);
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
  const cardCount = cards.length;
  const cardsWithImages = cards.filter(c => getImageForCard(c.id, mapping)).length;
  
  $("meta").textContent = `Карт: ${cardCount} • С изображениями: ${cardsWithImages} • Источник: файлы изображений`;
  
  console.log('🎉 Инициализация завершена!');
}

// Функции для автоматического определения свойств по ID
function getCategoryFromId(id) {
  const idLower = id.toLowerCase();
  
  if (idLower.includes('tv') || idLower.includes('wheel')) return "ТВ колесо";
  if (idLower.includes('ruby')) return "Рубиновые карты";
  if (idLower.includes('gold') || idLower.includes('emerald')) return "Драгоценные карты";
  if (idLower.includes('commission')) return "Комиссия";
  if (idLower.includes('violation') || idLower.includes('danger')) return "Опасные карты";
  if (idLower.includes('activation') || idLower.includes('active')) return "Карты активаций";
  
  // По умолчанию
  return "Обычные карты";
}

function getRarityFromId(id) {
  const idLower = id.toLowerCase();
  
  if (idLower.includes('ruby')) return "Рубиновая";
  if (idLower.includes('emerald')) return "Изумрудная";
  if (idLower.includes('gold')) return "Золотая";
  if (idLower.includes('white')) return "Белая";
  if (idLower.includes('green')) return "Зелёная";
  if (idLower.includes('blue')) return "Синяя";
  if (idLower.includes('gray') || idLower.includes('grey')) return "Серая";
  if (idLower.includes('commission')) return "Комиссия";
  
  // По умолчанию
  return "Синяя";
}

function getEmojiFromId(id) {
  const idLower = id.toLowerCase();
  
  if (idLower.includes('angel')) return "👼";
  if (idLower.includes('bank')) return "🏦";
  if (idLower.includes('gold')) return "💰";
  if (idLower.includes('tv') || idLower.includes('wheel')) return "📺";
  if (idLower.includes('joker')) return "🃏";
  if (idLower.includes('music')) return "🎵";
  if (idLower.includes('sweet')) return "🍬";
  if (idLower.includes('rainbow')) return "🌈";
  
  return ""; // Без эмодзи по умолчанию
}
