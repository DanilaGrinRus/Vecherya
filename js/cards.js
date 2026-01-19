// Дополнительные функции для Cardpedia

// 1. Экспорт данных
function exportToJSON() {
  const cards = window.cardpedia?.catalog?.cards || [];
  const data = {
    exportedAt: new Date().toISOString(),
    totalCards: cards.length,
    cards: cards.map(card => ({
      id: card.id,
      name: card.name,
      category: card.category,
      rarity: card.rarity,
      emoji: card.emoji,
      filename: card.filename
    }))
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cardpedia-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// 2. Поиск по подсказкам
function setupSearchSuggestions() {
  const searchInput = document.getElementById('q');
  if (!searchInput) return;
  
  const catalog = window.cardpedia?.catalog;
  if (!catalog) return;
  
  // Можно добавить datalist для автодополнения
  const datalist = document.createElement('datalist');
  datalist.id = 'card-suggestions';
  
  catalog.cards.forEach(card => {
    const option = document.createElement('option');
    option.value = card.name;
    option.textContent = card.id;
    datalist.appendChild(option);
  });
  
  document.body.appendChild(datalist);
  searchInput.setAttribute('list', 'card-suggestions');
}

// 3. Добавить кнопку экспорта в интерфейс
function addExportButton() {
  const controls = document.querySelector('.controls');
  if (!controls) return;
  
  const exportBtn = document.createElement('button');
  exportBtn.className = 'toggle';
  exportBtn.innerHTML = '📥 Экспорт JSON';
  exportBtn.title = 'Экспортировать все карты в JSON файл';
  exportBtn.style.cursor = 'pointer';
  exportBtn.onclick = exportToJSON;
  
  controls.appendChild(exportBtn);
}

// Инициализация доп. функций
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.cardpedia?.isInitialized) {
      setupSearchSuggestions();
      addExportButton();
    }
  }, 1000);
});
