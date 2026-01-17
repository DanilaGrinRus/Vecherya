// Эмодзи для карт (полный список из правил)
    const cardEmojis = {
        // Обычные карты
        'Комиссия': '🔘',
        'Серая': '☑️',
        'Синяя': '🟦',
        'Зелёная': '🟩',
        'Белая': '⬜️',
        'Золотая': '🟧',
        'Изумрудная': '💎',
        'Рубиновая': '🚨',
        
        // Карты активаций
        'Магнит': 'Ⓜ️',
        'Бита': '🅱️',
        'Страшный Суд': '♎️',
        'Конвертер': '♻️🎴',
        'Джокер': '🃏',
        'Пацифик': '☮️',
        'Пергамент': '📜',
        'Антиэкран': '🚾',
        'Чёрно-Белая': '🔲',
        'Радужная': '🏳️‍🌈',
        'Карта Контента': '🎦',
        'Музыкальная карта': '🎹',
        'Кость': '🎲🎴',
        'Рубиновая Кость': '♦️🎴',
        
        // Карты нарушений
        'Розовая': '🟪',
        'Красная': '🟥',
        'Жёлтая': '🟨',
        'Чёрная': '⬛️',
        'Коричневая': '🟫',
        'Обнуление': '🅾️',
        'Заморозка': '💠🧧',
        
        // Опасные карты
        'Банкрот': '⚫️📱',
        'Экстерминатус': '💣📱',
        'Грабители': '🥷📱',
        
        // Супер карты
        'Джекпот': '🎰🪟',
        'Сладкий подарок': '🍫',
        'Супер подарок': '🎁',
        'Хамелеон': '🦎',
        'Храм': '🛐',
        'Банк': '🏧',
        'Ведро Егора': '🪣🪟',
        'Преисподняя': '🌋📱'
    };
    
    // Типы карт
    const cardTypes = {
        'Комиссия': 'normal',
        'Серая': 'normal',
        'Синяя': 'normal',
        'Зелёная': 'normal',
        'Белая': 'normal',
        'Золотая': 'normal',
        'Изумрудная': 'normal',
        'Рубиновая': 'activation',
        
        'Магнит': 'activation',
        'Бита': 'activation',
        'Страшный Суд': 'activation',
        'Конвертер': 'activation',
        'Джокер': 'activation',
        'Пацифик': 'activation',
        'Пергамент': 'activation',
        'Антиэкран': 'activation',
        'Чёрно-Белая': 'activation',
        'Радужная': 'activation',
        'Карта Контента': 'activation',
        'Музыкальная карта': 'activation',
        'Кость': 'activation',
        'Рубиновая Кость': 'activation',
        
        'Розовая': 'violation',
        'Красная': 'violation',
        'Жёлтая': 'violation',
        'Чёрная': 'violation',
        'Коричневая': 'violation',
        'Обнуление': 'violation',
        'Заморозка': 'violation',
        
        'Банкрот': 'danger',
        'Экстерминатус': 'danger',
        'Грабители': 'danger',
        
        'Джекпот': 'super',
        'Сладкий подарок': 'super',
        'Супер подарок': 'super',
        'Хамелеон': 'super',
        'Храм': 'super',
        'Банк': 'super',
        'Ведро Егора': 'super',
        'Преисподняя': 'super'
    };
    
    // Тип забирания карты
    
    // База знаний о картах (из предоставленных правил)
    const cardDatabase = {
        'Джекпот': {
            effects: 'Вам выпадает 12 карт: 🔲🅱️🌈💎🟧⬜️🎦🎹Ⓜ️♎️♻️🚨, плюс 30 🧿 ТВ колёс и 🎲♦️.',
            application: 'После распаковки. 🎲♦️ кости играют сразу до распаковки (2️⃣ кубика с коэффициентом 1–(+1)).',
            obtain: '🧿 ТВ колесо. Покупка.',
            features: 'Требует распаковки. Стоимость распаковки: 1 🚨.',
            removes: 'Нет',
            takenBy: 'super',
            sale: 'Да (3 🚨, продаётся запакованный)',
            transfer: 'Нет',
            conversion: 'Да (🎰↩️🀄️🎴🧿)',
            protection: 'Да',
            cannotUse: 'Без распаковки',
            formula: 'Нет',
            description: 'Запакованный супер-приз: выдаёт большой набор карт и 🧿, требует распаковки за 🚨.'
        },
        'Рубиновая Кость': {
            effects: 'Умножает вашу одну 🚨 Рубиновую карту из инвентаря при броске 🎲 кубика.',
            application: '1 раз во время вращения 🧿 ТВ колеса.',
            obtain: '🧿 ТВ колесо.',
            features: 'Даёт дополнительную игру. Значения: 1→1 карта, 2→2, 3→3, 4→4, 5→5, 6→6. Коэффициент: 1–(+1 🚨). В 🎰 Джекпоте играет 2️⃣ кубика с коэффициентом 1–(+1).',
            removes: 'Нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Да (♦️↩️🚨)',
            protection: 'Да',
            cannotUse: '🪟🀄️🧿',
            formula: 'Нет',
            description: 'Игровая 🎴-карта: умножает 🚨 по броску кубика.'
        },
        'Кость': {
            effects: 'Умножает вашу одну обычную 🀄️ карту или 🧿 ТВ колесо из инвентаря при броске 🎲 кубика.',
            application: '1 раз во время вращения 🧿 ТВ колеса.',
            obtain: '🧿 ТВ колесо.',
            features: 'Даёт дополнительную игру. Значения: 1→0 карт, 2→1, 3→2, 4→3, 5→4, 6→5. Коэффициент: 1–x1 🀄️/🧿. В 🎰 Джекпоте играет 2️⃣ кубика с коэффициентом 1–(+1).',
            removes: 'Нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Да (🎲↩️🀄️🧿)',
            protection: 'Да',
            cannotUse: '🎴🪟',
            formula: 'Нет',
            description: 'Игровая 🎴-карта: умножает одну выбранную 🀄️ или 🧿 по броску кубика.'
        },
        'Грабители': {
            effects: 'Грабит 🏧 Банк, в котором больше всего 🀄️🎴 карт. Крадёт половину или больше половины карт; украденные карты исчезают. Ограбленный получает 5 🧿 ТВ колёс.',
            application: '1 раз. Активируется с 🧿 ТВ колеса.',
            obtain: '🧿 ТВ колесо. Сборка. Получение.',
            features: 'Можно снять залогом: 3 🚨 от одного спикера после вращения колеса. Выбивает из инвентаря при наличии у спикера или ведущего. Залог исчезает после активации. Может использовать ведущий.',
            removes: 'Нет',
            takenBy: 'danger',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'Да',
            cannotUse: '🛐🪣🌋',
            formula: '⚫️↩️🎴 + 💣↩️🎴 = 🥷',
            description: 'Опасная карта: ограбление банка с уничтожением части карт и компенсацией 🧿 ограбленному.'
        },
        'Преисподняя': {
            effects: 'Уничтожает или переносит в 🪣 ведро 🀄️🎴 карты всех спикеров. Генерирует карты 🧧📱.',
            application: 'Ведущим при выпадении с 🧿 ТВ колеса или строительстве. Спикерами при строительстве, покупке, получении.',
            obtain: '🧿 ТВ колесо. Постройка. Покупка. Получение.',
            features: 'Работает по принципу 🏧 Банка и 🛐 Храма. Может использовать ведущий и спикеры. Можно построить за 6 🚨 (1 раз).',
            removes: 'Нет',
            takenBy: 'super',
            sale: 'Да (раз в 2 месяца)',
            transfer: 'Да (раз в 2 месяца)',
            conversion: 'Нет',
            protection: 'Да',
            cannotUse: '🛐🏧',
            formula: '6 🚨',
            description: 'Супер-объект: влияет на карты всех спикеров и генерирует 🧧📱 по правилам.'
        },
        'Ведро Егора': {
            effects: 'Ведущий забирает 1 обычную 🀄️ карту у любого спикера и кладёт себе в 🪣 ведро.',
            application: 'Сразу же при выпадении.',
            obtain: '🧿 ТВ колесо. 🌋 Преисподняя.',
            features: 'Безлимитное накопление и хранение 🎴🀄️ карт: активация, складывание, передача, разделение, накладывание на спикеров.',
            removes: 'Нет',
            takenBy: 'super',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'Да',
            cannotUse: '🎴🪟',
            formula: 'Нет',
            description: 'Супер-карта хранилища ведущего: изымает у спикера 1 🀄️ и сохраняет в ведре.'
        },
        'Комиссия': {
            effects: 'Оплата передачи карт между спикерами',
            application: 'Для передачи карт между спикерами',
            obtain: 'Разделение 1 ☑️. Получить. Собрать.',
            features: 'Нельзя передать',
            removes: 'нет',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'нет',
            formula: '1 ☑️ = 2 🔘',
            description: 'Базовая карта для проведения операций между спикерами'
        },
        'Серая': {
            effects: 'Съём спикера или всех на 12 минут, либо монолог 12 минут',
            application: '1 раз за эфир от каждого. Действует на всех кроме 🏳️‍🌈',
            obtain: '1 час продления. 🧿ТВ колесо. Первый на эфире. Получить. Собрать.',
            features: 'Базовая карта. Передаётся с остатком времени',
            removes: '🟪',
            takenBy: 'normal',
            sale: 'Да',
            transfer: 'Да',
            conversion: 'Да',
            protection: '🏧🛐',
            cannotUse: 'в зависимости от правил эфира',
            formula: '2 🔘 = 1 ☑️',
            description: 'Основная карта для воздействия на других спикеров'
        },
        'Синяя': {
            effects: 'Снимает жёлтую карту (🟨)',
            application: 'На жёлтую карту',
            obtain: 'Топ месяца. Топ зритель. Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Передаётся с остатком времени',
            removes: '🟨',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'на карты выше по иерархии',
            formula: '3 ☑️ = 1 🟦',
            description: 'Карта для снятия жёлтых карт нарушений'
        },
        'Зелёная': {
            effects: 'Снимает красную карту (🟥)',
            application: 'На красную карту',
            obtain: 'Топ месяца. Топ зритель. Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Передаётся с остатком времени',
            removes: '🟥',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'на карты выше по иерархии',
            formula: '2 🟦 = 1 🟩',
            description: 'Карта для снятия красных карт нарушений'
        },
        'Белая': {
            effects: 'Снимает ⬛️. Либо продлевает эфир на 30 минут',
            application: 'Каждый день. Продление 1 раз за эфир',
            obtain: 'Топ зрители. Топ Батлы. Топ Лиги. Получить. Собрать. 🧿ТВ колесо. 🛐🏧',
            features: 'Конвертация. Превращается в 🟪🟥🟨🟫⬛️☮️',
            removes: '⬛️🟫',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Да (⬜️➕🔘🟰🧿)',
            protection: '🏧🛐',
            cannotUse: 'в зависимости от превращения 🃏☮️🔲🌈🚨💎🟧',
            formula: '2 🟩 = 1 ⬜️',
            description: 'Многофункциональная карта для снятия серьёзных нарушений'
        },
        'Золотая': {
            effects: 'Модерка на сутки или продление эфира',
            application: 'Активация каждый день. Безлимитное количество 🟪🟥🟨🟫',
            obtain: 'Топ спонсоры. Топ зрители. Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Работает с 🚨💎☮️🃏🔲 и 🏳️‍🌈',
            removes: 'нет',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Да',
            protection: '🟧☮️🃏🏳️‍🌈🏧🛐',
            cannotUse: 'в зависимости от правил эфира',
            formula: '2 ⬜️ = 1 🟧',
            description: 'Мощная карта для модерации и продления эфира'
        },
        'Изумрудная': {
            effects: 'Модерка + продление эфира на 3 часа',
            application: 'Активация раз в 2 дня. Безлимитное количество 🟪🚾🟥🟨🟫',
            obtain: 'Топ спонсоры. Топ зрители. Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Работает с 🚨🟧☮️🃏 и 🏳️‍🌈',
            removes: '🔲',
            takenBy: 'normal',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Да',
            protection: '🟧☮️🃏🏳️‍🌈🏧🛐',
            cannotUse: 'в зависимости от правил эфира',
            formula: '2 🟧 = 1 💎',
            description: 'Элитная карта для расширенных возможностей модерации'
        },
        'Рубиновая': {
            effects: 'Соведущий на 3 дня. Продление на 10 часов',
            application: 'Активация 1 раз в 5 дней',
            obtain: 'Топ спонсор. Топ Лиги. Топ зритель. Топ Батлы. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Работает с 🟧💎',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'в зависимости от правил эфира',
            formula: '3 💎 = 1 🚨',
            description: 'Высшая карта для статуса соведущего'
        },
        'Магнит': {
            effects: 'Крадёт карты у других спикеров',
            application: 'Доступно 3 кражи у разных спикеров',
            obtain: 'Только в 🧿ТВ колесе. Получить.',
            features: 'Забирает карту, может переносить активацию на себя или другого',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'на карты 🎰🍫🎁🦎⚫️💣♎️🏧🛐',
            formula: 'Только в 🧿ТВ колесе',
            description: 'Карта для кражи карт у других участников'
        },
        'Бита': {
            effects: 'Разбивает, снимает, деактивирует почти все карты: 🧿🔘☑️🟦🟩⬜️🟧💎🚨Ⓜ️♻️🃏☮️📜🚾🔲🎦🎹🟪🟥🟨⬛️🟫🅾️💠',
            application: 'Разрешено 4 удара Битой по карте. Передаётся с остатком ударов. После удара часы с карты сгорают. Нельзя разбивать карту которую выдали сами',
            obtain: '🧿ТВ колесо. Собрать. Получить. 🛐',
            features: '1 Удар - 9 часов. 2 Удар - 7 часов. 3 Удар - 5 часов. 4 Удар - 3 часа в запас',
            removes: '⚫️💣',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: '🌈🎰🍫🎁🦎⚫️💣♎️🏧🛐',
            formula: '🔲➕🏳️‍🌈➕🚨➕💎➕🟧➕⬜️➕🎦➕🎹➕🃏➕🚾➕📜➕☮️➕🟩➕🟦➕☑️🟰 🅱️',
            description: 'Мощнейшая карта для разрушения других карт'
        },
        'Страшный Суд': {
            effects: 'Крадёт все карты и колёса у одного спикера',
            application: 'На одного спикера',
            obtain: 'Только в 🧿ТВ колесе. Получить.',
            features: 'Забирает даже активные карты',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: 'Только в 🧿ТВ колесе',
            description: 'Полное ограбление одного спикера'
        },
        'Конвертер': {
            effects: 'Конвертирует 10 ☑️ карт в 10 🧿 ТВ колёс в собственном инвентаре. Можно дробить.',
            application: 'По желанию.',
            obtain: '🧿 ТВ колесо. 🛐. Покупка.',
            features: 'Нельзя передавать карту.',
            removes: '🅱️⚫️🌋',
            takenBy: 'activation',
            sale: 'Да (5 ⬜️ карт)',
            transfer: 'Нет',
            conversion: 'Да (♻️↩️🧿)',
            protection: 'Нет',
            cannotUse: 'На чужом инвентаре',
            formula: 'Нет',
            description: 'Карта активации для обмена ☑️ на 🧿 по фиксированному курсу.'
        },
        'Джокер': {
            effects: 'Позволяет нарушать правила против оппонента',
            application: 'Действует 20 минут батла и 12 часов обход правил',
            obtain: 'Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Нельзя снять. Нельзя выключать микрофон',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'в зависимости от правил батла',
            formula: '🟩➕☑️🟰🃏',
            description: 'Карта для батлов, позволяющая нарушать правила'
        },
        'Пацифик': {
            effects: 'Возвращает доступ к чату, иммунитет к некоторым картам',
            application: 'На 12 часов',
            obtain: 'Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Включает чат при активной 🅾️',
            removes: '🟫🅾️',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'нет',
            formula: '🟩➕🟦🟰☮️',
            description: 'Карта защиты от нарушений'
        },
        'Пергамент': {
            effects: 'Возвращает доступ к чату',
            application: '1 раз',
            obtain: 'Топ зрители. 🧿ТВ колесо. Получить. Собрать.',
            features: 'нет',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '🟦➕☑️🟰📜',
            description: 'Карта для возврата доступа к чату'
        },
        'Антиэкран': {
            effects: 'Запрещает проситься на экран',
            application: '1 раз',
            obtain: 'Топ зрители. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Снимается 🃏',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '☑️➕☑️🟰🚾',
            description: 'Карта для запрета просьбы на экран'
        },
        'Чёрно-Белая': {
            effects: 'Соведущий на 1 неделю. Продление на 3 ч. 7 дней подряд.',
            application: 'Активация 1 раз в 10 дней',
            obtain: 'Только спонсоры топ 10 за 3 месяца. 🧿ТВ колесо. Получить. Собрать. 🛐',
            features: 'Работает с 🌈🟧🃏☮️🎦🎹. (Безлимитное количество🟪🚾🟥🟨🟫⬛️🅾️💠)',
            removes: '🅱️⚫️💣',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐🪣',
            cannotUse: '🌈',
            formula: '🚨➕💎➕💎➕💎➕🟧➕⬜️➕🃏➕🟩➕🟦➕🚾➕☑️🟰🔲',
            description: 'Элитная карта для топ-спонсоров'
        },
        'Радужная': {
            effects: 'Иммунитет к картам нарушений',
            application: 'Активация каждый день',
            obtain: 'Топ Батлы. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Может быть активна у нескольких спикеров одновременно',
            removes: '🅾️',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: '🏧🛐',
            cannotUse: 'нет',
            formula: '💎➕🟧➕🟧➕🟧➕⬜️➕☮️➕🟩➕🟦➕📜➕☑️🟰🏳️‍🌈',
            description: 'Карта иммунитета к нарушениям'
        },
        'Карта Контента': {
            effects: 'Просмотр видеоматериала',
            application: '1 раз за эфир',
            obtain: 'Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Нельзя снять',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '🟧➕⬜️➕☑️🟰🎦',
            description: 'Карта для просмотра контента'
        },
        'Музыкальная карта': {
            effects: 'Прослушивание музыки',
            application: '1 раз за эфир',
            obtain: 'Топ Батлы. Топ Лиги. 🧿ТВ колесо. Получить. Собрать.',
            features: 'Нельзя снять',
            removes: 'нет',
            takenBy: 'activation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '⬜️➕☑️🟰🎹',
            description: 'Карта для прослушивания музыки'
        },
        'Розовая': {
            effects: 'Предупреждение, спуск вниз',
            application: 'Первое нарушение',
            obtain: 'Нарушение правил. Получить.',
            features: 'нет',
            removes: 'нет',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '☑️➕☑️🟰🟪',
            description: 'Первое предупреждение за нарушение'
        },
        'Красная': {
            effects: 'Снятие спикера с эфира до конца эфира',
            application: 'Третье нарушение',
            obtain: 'Нарушение правил. Получить.',
            features: 'нет',
            removes: '🟩',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: 'Собирается ⬜️',
            description: 'Серьёзное нарушение - снятие с эфира'
        },
        'Жёлтая': {
            effects: 'Спуск вниз на 30 минут',
            application: 'Второе нарушение',
            obtain: 'Нарушение правил. Получить.',
            features: 'нет',
            removes: 'нет',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: 'Собирается ⬜️',
            description: 'Второе предупреждение за нарушение'
        },
        'Чёрная': {
            effects: 'Блокировка на 1 неделю',
            application: 'За серьёзные нарушения',
            obtain: 'Нарушение правил. Получить.',
            features: 'нет',
            removes: 'нет',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: 'нет',
            description: 'Серьёзное нарушение - блокировка на неделю'
        },
        'Коричневая': {
            effects: 'Отключение комментариев',
            application: 'Действует 1 эфир на 1 аккаунт',
            obtain: 'Нарушение правил. Получить.',
            features: 'нет',
            removes: 'нет',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: 'нет',
            description: 'Нарушение - отключение комментариев'
        },
        'Обнуление': {
            effects: 'Запрет в гостевой и чате на 4 недели',
            application: 'За серьёзные нарушения',
            obtain: 'Нарушение правил эфира. Получить.',
            features: 'Можно вернуть доступ к чату активацией ☮️',
            removes: 'нет',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Нет',
            protection: 'нет',
            cannotUse: 'нет',
            formula: '🟧➕⬜️➕☮️➕🟩➕🟦➕☑️🟰🅾️',
            description: 'Серьёзное нарушение - обнуление прав'
        },
        'Заморозка': {
            effects: 'Ваша активная карта деактивируется. Спикеру запрещено использовать, активировать и передавать 🀄️🎴 карты и 🧿 ТВ колёса 4 недели.',
            application: '1 раз.',
            obtain: 'От 🔲. Нарушение правил. 🧿 ТВ колесо. Из 🪣/🌋.',
            features: 'Собирается за 🚨. При выпадении с 🧿 ТВ колеса действует на всех, и вам выдаётся 1 🧿 ТВ колесо: можно крутить сразу или через 4 недели. При снятии эффекта колесо сгорает.',
            removes: '🅱️🛐🌈',
            takenBy: 'violation',
            sale: 'Нет',
            transfer: 'Нет',
            conversion: 'Нет',
            protection: 'Да',
            cannotUse: '🌈🃏☮️🔲🌈🚨💎🟧⬜️🎦🎹Ⓜ️♎️♻️',
            formula: '1 🚨',
            description: 'Карта нарушения: блокирует карты и 🧿 на 4 недели и снимает активную карту.'
        },
        'Банкрот': {
            effects: 'Забирает все ваши карты, кроме 🧿, при выпадении с 🧿 ТВ колеса.',
            application: '1 раз.',
            obtain: '🧿 ТВ колесо. 🌋 (⚫️↩️🎴).',
            features: 'Если при выпадении с 🧿 ТВ колеса ваш инвентарь 🎴🀄️ пуст, превращается в карту активации ⚫️↩️🎴 и падает в инвентарь: можно уничтожить все карты и 🧿 у одного спикера.',
            removes: 'Нет',
            takenBy: 'danger',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Да (⚫️↩️🎴)',
            protection: 'Да',
            cannotUse: '🏧🛐🌋🪣',
            formula: 'Нет',
            description: 'Опасная карта: обнуляет ваши карты при выпадении или становится активацией для тотального уничтожения у одного спикера.'
        },
        'Экстерминатус': {
            effects: 'Эфир завершается. Запасное время исчезает. Вы получаете 🅾️ и 10 🧿 ТВ колёс. Прошлый донатер получает 5 🧿 ТВ колес.',
            application: '1 раз. Как карту 💣↩️🎴 активации при наличии запасного времени больше 3 часов.',
            obtain: '🧿 ТВ колесо. 🌋 Преисподняя. 💣↩️🎴.',
            features: 'Нельзя снять. Во время вращения 🧿 ТВ колеса при отсутствии запасного времени превращается в 🎴 активацию без 🅾️. Ведущий может держать карту до активации.',
            removes: 'Ведущим',
            takenBy: 'danger',
            sale: 'Нет',
            transfer: 'Да',
            conversion: 'Да (💣↩️🎴🧿)',
            protection: 'Да',
            cannotUse: 'Донатерам, не входящим в топ 10 спонсоров',
            formula: 'Нет',
            description: 'Опасная карта завершения эфира: обнуляет запасное время и выдаёт 🅾️ и 🧿.'
        }};

    // ============== ИНВЕНТАРЬ: СПРАВОЧНИК КАРТ (СГРУППИРОВАННЫЙ) ==============
    function getCardGroupTitle(type) {
        if (type === 'normal') return '🀄️ Обычные';
        if (type === 'activation') return '🎴 Активации';
        if (type === 'violation') return '🚨 Нарушения';
        return 'Супер Карты';
    }

    function normalizeSearch(s) {
        return (s || '').toString().trim().toLowerCase();
    }

    function renderInventoryReferenceGrouped() {
        const groupsContainer = document.getElementById('inventoryReferenceGroups');
        if (!groupsContainer) return;

        const searchInput = document.getElementById('inventorySearch');
        const query = normalizeSearch(searchInput ? searchInput.value : '');

        // Собираем карточки, фильтруем по запросу
        const entries = Object.entries(cardDatabase)
            .map(([name, data]) => {
                const emoji = cardEmojis[name] || '🃏';
                const type = cardTypes[name] || 'normal';
                return { name, data, emoji, type };
            })
            .filter(({ name, emoji }) => {
                if (!query) return true;
                return normalizeSearch(name).includes(query) || normalizeSearch(emoji).includes(query);
            })
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

        // Группируем: обычные / активации / нарушения (+ другое, если есть)
        const allowed = ['normal', 'activation', 'violation'];
        const buckets = { normal: [], activation: [], violation: [], other: [] };

        for (const item of entries) {
            if (allowed.includes(item.type)) buckets[item.type].push(item);
            else buckets.other.push(item);
        }

        groupsContainer.innerHTML = '';

        const orderedGroups = ['normal', 'activation', 'violation', 'other'];
        for (const g of orderedGroups) {
            const items = buckets[g];
            if (!items.length) continue;

            const group = document.createElement('div');
            // Свернуто по умолчанию. При поиске раскрываем группы автоматически.
            group.className = query ? 'inventory-reference-group open' : 'inventory-reference-group';

            const title = document.createElement('div');
            title.className = 'inventory-reference-group-title';
            if (g === 'other') {
                title.innerHTML = `<span class="group-emoji" aria-hidden="true">🎲</span> ${getCardGroupTitle(g)} (${items.length})`;
            } else {
                title.textContent = `${getCardGroupTitle(g)} (${items.length})`;
            }
            group.appendChild(title);

            // Разворачиваем/сворачиваем по клику на заголовок группы
            title.addEventListener('click', () => {
                group.classList.toggle('open');
            });

            const grid = document.createElement('div');
            grid.className = 'inventory-reference-grid';

            for (const { name, data, emoji } of items) {
                const card = document.createElement('div');
                card.className = 'inventory-reference-card';
                card.tabIndex = 0;

                card.innerHTML = `
                    <div class="inventory-reference-card-title">
                        <span class="emoji" aria-hidden="true">${emoji}</span>
                        <span>${name}</span>
                    </div>
                    <div class="inventory-reference-card-desc">${data.description || 'Описание отсутствует'}</div>
                `;

                // Клик по карте: добавить 1 шт. в инвентарь
                const applyToInventory = () => {
                    addToInventory(name, 1);
                    const sel = document.getElementById('inventoryCardSelect');
                    if (sel) sel.value = name;
                };

                card.addEventListener('click', applyToInventory);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        applyToInventory();
                    }
                });

                grid.appendChild(card);
            }

            group.appendChild(grid);
            groupsContainer.appendChild(group);
        }

        // Если после фильтра ничего не найдено
        if (!groupsContainer.children.length) {
            groupsContainer.innerHTML = `<div style="color: var(--text-secondary); padding: 10px 2px;">Ничего не найдено по запросу: <b>${query}</b></div>`;
        }
    }

    // Хранилище инвентаря
    let inventory = {};
    
    // ============== ФУНКЦИИ ОБЩИЕ ==============
    
    // Функция для показа уведомлений
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Функция для расчета стоимости карты
    function calculateCardCost(cardName) {
        const hierarchy = {
            'Комиссия': 1,
            'Серая': 2,
            'Синяя': 6,
            'Зелёная': 12,
            'Белая': 24,
            'Золотая': 48,
            'Изумрудная': 96,
            'Рубиновая': 288
        };
        
        return hierarchy[cardName] || 0;
    }
    
    // ============== ФУНКЦИИ ИНВЕНТАРЯ ==============
    
    // Функция для обновления инвентаря в интерфейсе
    function updateInventoryDisplay() {
        const inventoryList = document.getElementById('inventoryList');
        const inventorySummary = document.getElementById('inventorySummary');
        const inventoryTotalCount = document.getElementById('inventoryTotalCount');
        
        // Очищаем список
        inventoryList.innerHTML = '';
        
        // Подсчитываем общее количество карт
        let totalCards = 0;
        let hasCards = false;
        
        // Добавляем карты в список
        for (const [cardName, count] of Object.entries(inventory)) {
            if (count > 0) {
                hasCards = true;
                totalCards += count;
                
                const emoji = cardEmojis[cardName] || '🃏';
                
                const item = document.createElement('div');
                item.className = 'inventory-item';
                item.innerHTML = `
                    <div class="inventory-item-info">
                        <span class="inventory-item-emoji">${emoji}</span>
                        <span class="inventory-item-name">${cardName}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span class="inventory-item-count">${count}</span>
                        <button class="inventory-item-remove" data-card="${cardName}">✕</button>
                    </div>
                `;
                
                inventoryList.appendChild(item);
            }
        }
        
        // Если нет карт, показываем сообщение
        if (!hasCards) {
            inventoryList.innerHTML = `
                <div class="empty-inventory">
                    <div class="empty-inventory-emoji">📭</div>
                    <p>Инвентарь пуст</p>
                    <p style="font-size: 0.9rem; margin-top: 8px;">Добавьте карты с помощью формы выше</p>
                </div>
            `;
            inventorySummary.style.display = 'none';
        } else {
            inventorySummary.style.display = 'flex';
            inventoryTotalCount.textContent = totalCards;
            
            // Обновляем результаты
            updateResultsFromInventory();
        }
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.inventory-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const cardName = this.getAttribute('data-card');
                removeFromInventory(cardName);
            });
        });
    }
    
    // Функция для добавления карты в инвентарь
    function addToInventory(cardName, count) {
        if (!cardName || count < 1) {
            showNotification('Выберите карту и укажите количество', 'warning');
            return;
        }
        
        if (!inventory[cardName]) {
            inventory[cardName] = 0;
        }
        
        inventory[cardName] += count;
        updateInventoryDisplay();
        
        const emoji = cardEmojis[cardName] || '🃏';
        showNotification(`Добавлено: ${emoji} ${cardName} × ${count}`, 'success');
    }
    
    // Функция для удаления карты из инвентаря
    function removeFromInventory(cardName) {
        if (inventory[cardName]) {
            const count = inventory[cardName];
            delete inventory[cardName];
            updateInventoryDisplay();
            
            const emoji = cardEmojis[cardName] || '🃏';
            showNotification(`Удалено: ${emoji} ${cardName} × ${count}`, 'info');
        }
    }
    
    // Функция для очистки всего инвентаря
    function clearInventory() {
        if (Object.keys(inventory).length === 0) {
            showNotification('Инвентарь уже пуст', 'warning');
            return;
        }
        
        const cardCount = Object.values(inventory).reduce((a, b) => a + b, 0);
        inventory = {};
        updateInventoryDisplay();
        
        showNotification(`Инвентарь очищен (удалено ${cardCount} карт)`, 'info');
    }
    
    // Функция для обновления результатов на основе инвентаря
    function updateResultsFromInventory() {
        const resultsContainer = document.getElementById('results');
        
        if (Object.keys(inventory).length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align:center;padding:30px;color:var(--text-secondary)">
                    <div style="font-size:3rem;margin-bottom:16px;opacity:0.5"><span aria-hidden="true">📊</span></div>
                    <p style="font-size:1rem;margin-bottom:8px">Инвентарь пуст</p>
                    <p style="font-size:0.85rem;opacity:0.7">Добавьте карты в инвентарь</p>
                </div>
            `;
            return;
        }
        
        let totalValue = 0;
        let totalCards = 0;
        let totalTypes = Object.keys(inventory).length;
        
        let html = '<div style="padding: 10px;">';
        html += '<h4 style="background: linear-gradient(90deg, var(--brand-dark) 0%, var(--brand) 45%, var(--brand-light) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 15px;">📦 Ваш инвентарь</h4>';
        
        // Сортируем карты по стоимости (от дорогих к дешевым)
        const sortedCards = Object.keys(inventory).sort((a, b) => {
            return calculateCardCost(b) - calculateCardCost(a);
        });
        
        sortedCards.forEach(cardName => {
            const count = inventory[cardName];
            const cardValue = calculateCardCost(cardName) * count;
            totalValue += cardValue;
            totalCards += count;
            const emoji = cardEmojis[cardName] || '🃏';
            
            html += `
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="emoji" aria-hidden="true">${emoji}</span>
                        <span style="color: var(--text);">${cardName}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="font-weight: 700; color: var(--brand);">${count} шт.</span>
                        <span style="font-size: 0.85rem; color: var(--text-secondary);">(${cardValue} 🔘)</span>
                    </div>
                </div>
            `;
        });
        
        // Добавим итоговую стоимость и варианты сборки
        html += `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid var(--brand);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: var(--text);">Всего карт:</span>
                    <span style="font-weight: 700; color: var(--brand);">${totalCards} шт.</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: var(--text);">Общая стоимость:</span>
                    <span style="font-weight: 700; color: var(--brand);">${totalValue} 🔘</span>
                </div>
        `;
        
        // Покажем, что можно собрать из этого
        if (totalValue > 0) {
            const valuableCards = [
                { name: 'Рубиновая', emoji: '🚨', value: 288 },
                { name: 'Изумрудная', emoji: '💎', value: 96 },
                { name: 'Золотая', emoji: '🟧', value: 48 },
                { name: 'Белая', emoji: '⬜️', value: 24 },
                { name: 'Зелёная', emoji: '🟩', value: 12 },
                { name: 'Синяя', emoji: '🟦', value: 6 },
                { name: 'Серая', emoji: '☑️', value: 2 }
            ];
            
            let hasValuableCards = false;
            
            valuableCards.forEach(card => {
                const amount = Math.floor(totalValue / card.value);
                
                if (amount > 0) {
                    if (!hasValuableCards) {
                        html += `<div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">Можно собрать:</div>`;
                        hasValuableCards = true;
                    }
                    
                    html += `
                        <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(73, 185, 255, 0.1); border-radius: 6px; margin-bottom: 5px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span>${card.emoji}</span>
                                <span style="color: var(--text);">${card.name}</span>
                            </div>
                            <span style="font-weight: 600; color: var(--brand);">${amount} шт.</span>
                        </div>
                    `;
                }
            });
        }
        
        html += `
            </div>
        `;
        
        html += '</div>';
        resultsContainer.innerHTML = html;
    }
    
    // ============== ФУНКЦИИ ИНФОРМАЦИИ О КАРТЕ ==============

    // --- Helpers: корректная обработка эмодзи и текстовых полей ---
    // Важно: split('') ломает суррогатные пары и ZWJ-секвенции (например 🏳️‍🌈),
    // поэтому используем Unicode property escapes.
    const EMOJI_RE = /\p{Extended_Pictographic}(?:\uFE0F|\uFE0E|\u200D\p{Extended_Pictographic})*/gu;

    function extractEmojis(text) {
        if (!text) return [];
        const m = String(text).match(EMOJI_RE);
        return m ? m : [];
    }

    function stripEmojis(text) {
        if (!text) return '';
        return String(text)
            .replace(EMOJI_RE, '')
            .replace(/[\s,.;:+×\-–—()\[\]{}]/g, '')
            .trim();
    }

    function emojiToCardName(emoji) {
        // Ищем по точному совпадению эмодзи-секвенции
        const hit = Object.entries(cardEmojis).find(([, e]) => e === emoji);
        return hit ? hit[0] : '';
    }

    function renderEmojiTagList(titleIcon, titleText, rawValue, wrapperClass) {
        const emojis = extractEmojis(rawValue);
        if (!emojis.length) return '';

        let html = `
            <div class="${wrapperClass}">
                <div class="card-info-title">${titleIcon} ${titleText}</div>
                <div class="card-tags">
        `;

        for (const em of emojis) {
            const name = emojiToCardName(em);
            if (name) {
                html += `<span class="card-tag"><span class="emoji" aria-hidden="true">${em}</span> ${name}</span>`;
            } else {
                html += `<span class="card-tag"><span class="emoji" aria-hidden="true">${em}</span></span>`;
            }
        }

        html += `
                </div>
            </div>
        `;
        return html;
    }
    
    // Показать информацию о карте
    function showCardInfo(cardName) {
        const resultsContainer = document.getElementById('results');
        const cardInfoContainer = document.getElementById('cardInfoContainer');
        
        if (!cardDatabase[cardName]) {
            showNotification('Информация об этой карте пока недоступна', 'warning');
            return;
        }
        
        const cardData = cardDatabase[cardName];
        const emoji = cardEmojis[cardName] || '🃏';
        const cardType = cardTypes[cardName] || 'normal';
        const takingType = cardTypes[cardName] || 'normal';
        
        // Определяем название типа
        let typeName = 'Обычная';
        let typeClass = 'type-normal';
        
        switch(cardType) {
            case 'activation':
                typeName = 'Активация';
                typeClass = 'type-activation';
                break;
            case 'violation':
                typeName = 'Нарушение';
                typeClass = 'type-violation';
                break;
            case 'danger':
                typeName = 'Опасная';
                typeClass = 'type-danger';
                break;
            case 'super':
                typeName = 'Супер';
                typeClass = 'type-super';
                break;
        }
        
        // Определяем тип забирания
        let takingName = 'Обычный';
        switch(takingType) {
            case 'activation':
                takingName = 'Активация';
                break;
            case 'violation':
                takingName = 'Нарушение';
                break;
            case 'danger':
                takingName = 'Опасный';
                break;
            case 'super':
                takingName = 'Супер';
                break;
        }
        
        // Создаем HTML для информации о карте
        let html = `
            <div class="card-info-header">
                <div class="card-info-emoji">${emoji}</div>
                <div>
                    <div class="card-info-name">${cardName}</div>
                    <span class="card-info-type ${typeClass}">${typeName} карта</span>
                </div>
            </div>
            
            <div class="card-info-grid">
                <div class="card-info-box">
                    <div class="card-info-title">🎯 Эффекты</div>
                    <div class="card-info-content">${cardData.effects}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">⚡️ Применение</div>
                    <div class="card-info-content">${cardData.application}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">📥 Получение</div>
                    <div class="card-info-content">${cardData.obtain}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">🔧 Особенности</div>
                    <div class="card-info-content">${cardData.features}</div>
                </div>
            </div>
            
            <div class="card-formula-box">
                <div class="card-formula-title">🧮 Формула сборки</div>
                <div class="card-formula">${cardData.formula}</div>
                <div class="card-info-content">${cardData.description}</div>
            </div>
            
            <div class="card-info-grid">
                <div class="card-info-box">
                    <div class="card-info-title">🛡️ Защита карты</div>
                    <div class="card-info-content">${cardData.protection}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">📊 Тип забирания</div>
                    <div class="card-info-content">${takingName} (${takingType})</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">💰 Продажа</div>
                    <div class="card-info-content">${cardData.sale}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">🔄 Передача</div>
                    <div class="card-info-content">${cardData.transfer}</div>
                </div>
                
                <div class="card-info-box">
                    <div class="card-info-title">🔄 Конвертация</div>
                    <div class="card-info-content">${cardData.conversion}</div>
                </div>
            </div>
        `;
        
        // Добавляем информацию о снимаемых картах, если есть
        if (cardData.removes && cardData.removes !== 'нет' && cardData.removes !== 'Ведущим') {
            html += renderEmojiTagList('✅', 'Снимает карты', cardData.removes, 'card-removes-box');
        }
        
        // Добавляем информацию о защите, если есть
        if (cardData.protection && cardData.protection !== 'нет' && cardData.protection !== 'Да') {
            html += renderEmojiTagList('🛡️', 'Защищено от', cardData.protection, 'card-protected-box');
        }
        
        // Добавляем информацию о том, на что нельзя использовать, если есть
        if (cardData.cannotUse && cardData.cannotUse !== 'нет') {
            const raw = String(cardData.cannotUse).trim();
            const emojis = extractEmojis(raw);
            const hasText = stripEmojis(raw).length > 0;

            // Если это текстовое ограничение (например "Донатерам..."), показываем нормальным текстом,
            // а не "пузырьками" по символам.
            if (!emojis.length || hasText) {
                html += `
                    <div class="card-cannot-box">
                        <div class="card-info-title">🚫 Нельзя использовать на</div>
                        <div class="card-info-content">${raw}</div>
                    </div>
                `;
            } else {
                html += renderEmojiTagList('🚫', 'Нельзя использовать на', raw, 'card-cannot-box');
            }
        }
        
        // Обновляем контейнер
        cardInfoContainer.innerHTML = html;
        cardInfoContainer.style.display = 'block';
        
        // Также обновляем основной контейнер результатов
        resultsContainer.innerHTML = `
            <div style="padding: 20px;">
                <h4 style="background: linear-gradient(90deg, var(--brand-dark) 0%, var(--brand) 45%, var(--brand-light) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    ${emoji} Информация о карте: ${cardName}
                </h4>
                <div style="background: rgba(73, 185, 255, 0.15); border-radius: 10px; padding: 15px; margin-bottom: 20px; border-left: 4px solid var(--brand);">
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 5px;">
                        Тип карты:
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 1.2rem; font-weight: 800; color: var(--brand);">
                            ${typeName}
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-left: auto;">
                            Забирается: ${takingName}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        <strong>📝 Описание:</strong> ${cardData.description}
                    </div>
                </div>
                <div style="margin-top: 15px; font-size: 0.85rem; color: var(--text-secondary); text-align: center;">
                    Полная информация о карте отображается выше в разделе "База знаний"
                </div>
            </div>
        `;
        
        showNotification(`Загружена информация о карте: ${emoji} ${cardName}`, 'success');
    }
    
    // ============== ФУНКЦИИ ПАРСЕРА ==============
    
    // Результаты парсинга
    let autolentResults = {
        users: {},
        cards: {},
        totalUsers: 0,
        totalCards: 0
    };
    
    // Парсинг текста
    function parseAutolentText(text) {
        // Нормализация имени пользователя:
        // - склеивает варианты вида "🇩🇪Балтик", "Балтик🇩🇪", "Балтик 🇩🇪" в "Балтик"
        // - схлопывает лишние пробелы
        // - убирает повторяющиеся подряд слова ("Протвень Протвень" -> "Протвень")
        // Примечание: логика карт/парсинга не меняется, нормализуется только ключ пользователя.
        function normalizeUsername(raw) {
  let s = String(raw || '').trim();

  const flagRe = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/g;
  const flags = s.match(flagRe) || [];
  const flagPrefix = flags.length ? (flags[0] + ' ') : '';

  s = s.replace(flagRe, ' ');
  s = s.replace(/\.+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();

  s = s.replace(/([A-Za-zА-Яа-яЁё]+)(RU|UA|KZ|BY|RB|RF|EU|US)\b/g, '$1 $2');
  s = s.replace(/([A-Za-zА-Яа-яЁё]+)(РБ|РФ)\b/gu, '$1 $2');

  s = s.replace(/\s+/g, ' ').trim();
  s = s.replace(/\b([A-Za-zА-Яа-яЁё0-9_]+)(?:\s+\1\b)+/gu, '$1');

  return (flagPrefix + s).trim();
}

        // Убираем дублирование текста (иногда пост приходит дважды подряд)
        function dedupeTelegramPost(rawText) {
            const t = String(rawText || "").trim();
            const anchor = '🎲Игра "Капитализм и Коммунизм".';
            const first = t.indexOf(anchor);
            if (first === -1) return t;

            const second = t.indexOf(anchor, first + anchor.length);
            if (second === -1) return t;

            const a = t.slice(0, second).trim();
            const b = t.slice(second).trim();

            // Если вторая часть идентична первой (или почти идентична) — берём первую
            if (b === a) return a;

            // Частый случай: текст = A + "\n\n" + A
            // Сравнение по "половине" с допуском пробелов/переносов
            const norm = (x) => x.replace(/\s+/g, " ").trim();
            if (norm(a) === norm(b)) return a;

            return t;
        }
        // Сброс результатов
        autolentResults = {
            users: {},
            cards: {},
            totalUsers: 0,
            totalCards: 0
        };
        
        if (!text.trim()) {
            showNotification('Введите текст для анализа', 'warning');
            return false;
        }
        
        text = dedupeTelegramPost(text);
        const lines = text.split('\n');
        let currentCard = null;
        let currentCardName = '';
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            // Заголовки разделов/категорий (не карты) — сбрасываем текущую карту
            // ВАЖНО: без этого строки после "🎹 Музыкальная карта" ошибочно продолжают накапливаться как музыкальные
            if (/^⚡️?\s*🧿/u.test(trimmedLine) && /ТВ\s*колесо/u.test(trimmedLine)) {
                // Это отдельный тип в парсинге
                currentCard = 'ТВ колесо';
                currentCardName = 'ТВ колесо';
                if (!autolentResults.cards['ТВ колесо']) {
                    autolentResults.cards['ТВ колесо'] = { total: 0, users: {} };
                }
                continue;
            }

            // Разделители верхнего уровня (категории), не должны "держать" текущую карту
            if (/^⚡️/u.test(trimmedLine) && (/(Карты\s*Активац|Обычные)/iu.test(trimmedLine) || /🎴|🀄️/u.test(trimmedLine))) {
                currentCard = null;
                currentCardName = '';
                continue;
            }

            // Декоративные заголовки/повтор названия игры — сброс
            if (/^🎲Игра\s*["""]?Капитализм\s*и\s*Коммунизм/iu.test(trimmedLine)) {
                currentCard = null;
                currentCardName = '';
                continue;
            }
            
            // Проверяем, является ли строка картой (содержит эмодзи или название карты)
            let isCardLine = false;
            let cardName = '';
            
            // Ищем по эмодзи
            for (const [name, emoji] of Object.entries(cardEmojis)) {
                if (trimmedLine.includes(emoji)) {
                    isCardLine = true;
                    cardName = name;
                    break;
                }
            }
            
            // Ищем по названию
            if (!isCardLine) {
                for (const name of Object.keys(cardEmojis)) {
                    if (trimmedLine.toLowerCase().includes(name.toLowerCase())) {
                        isCardLine = true;
                        cardName = name;
                        break;
                    }
                }
            }
            
            if (isCardLine) {
                currentCard = cardName;
                currentCardName = cardName;
                
                // Инициализируем карту если её нет
                if (!autolentResults.cards[cardName]) {
                    autolentResults.cards[cardName] = {
                        total: 0,
                        users: {}
                    };
                }
            } else if (currentCard) {
                // Это строка с пользователем и количеством
                const userMatch = trimmedLine.match(/(.+?)\s*[-‐‑‒–—―−﹣－]\s*(\d+)/);
                if (userMatch) {
                    const username = normalizeUsername(userMatch[1]);
                    const count = parseInt(userMatch[2]);
                    
                    if (!isNaN(count) && count > 0) {
                        // Добавляем пользователя
                        if (!autolentResults.users[username]) {
                            autolentResults.users[username] = {
                                cards: {},
                                total: 0
                            };
                        }
                        
                        // Добавляем карту пользователю
                        if (!autolentResults.users[username].cards[currentCard]) {
                            autolentResults.users[username].cards[currentCard] = 0;
                        }
                        
                        autolentResults.users[username].cards[currentCard] += count;
                        autolentResults.users[username].total += count;
                        
                        // Обновляем общую статистику по карте
                        autolentResults.cards[currentCard].total += count;
                        autolentResults.cards[currentCard].users[username] = 
                            (autolentResults.cards[currentCard].users[username] || 0) + count;
                        
                        autolentResults.totalCards += count;
                    }
                }
            }
        }
        
        // Подсчитываем уникальных пользователей
        autolentResults.totalUsers = Object.keys(autolentResults.users).length;
        
        return autolentResults.totalCards > 0;
    }
    
    // Показать результаты парсинга
    function showAutolentResults() {
        const resultsContainer = document.getElementById('autolentResults');
        const quickDownload = document.getElementById('autolentQuickDownload');
        const userSelector = document.getElementById('autolentUserSelector');
        const userSelect = document.getElementById('autolentUserSelect');
        
        // Показываем контейнеры
        resultsContainer.classList.add('visible');
        quickDownload.classList.add('visible');
        userSelector.classList.add('visible');
        
        // Обновляем селектор пользователей
        userSelect.innerHTML = '<option value="">-- Все пользователи --</option>';
        const sortedUsers = Object.keys(autolentResults.users)
            .sort((a, b) => autolentResults.users[b].total - autolentResults.users[a].total);
        
        sortedUsers.forEach(username => {
            const option = document.createElement('option');
            option.value = username;
            option.textContent = `${username} (${autolentResults.users[username].total} карт)`;
            userSelect.appendChild(option);
        });
        
        // Показываем всех пользователей
        showSelectedUser('');
        
        showNotification(`Проанализировано: ${autolentResults.totalCards} карт от ${autolentResults.totalUsers} пользователей`, 'success');
    }
    
    // Показать карты выбранного пользователя
    function showSelectedUser(username) {
        const userResults = document.getElementById('autolentUserResults');
        const resultsTitle = document.getElementById('autolentResultsTitle');
        
        userResults.innerHTML = '';
        
        if (username) {
            // Показать одного пользователя
            resultsTitle.textContent = `👤 Карты пользователя: ${username}`;
            const userData = autolentResults.users[username];
            
            if (userData) {
                const userCard = document.createElement('div');
                userCard.className = 'autolent-user-card';
                
                let cardsHTML = '';
                const sortedCards = Object.entries(userData.cards)
                    .sort((a, b) => b[1] - a[1]);
                
                sortedCards.forEach(([cardName, count]) => {
                    const emoji = cardEmojis[cardName] || '🃏';
                    cardsHTML += `
                        <div class="autolent-user-card-item">
                            <div class="autolent-user-card-name">
                                <span class="emoji" aria-hidden="true">${emoji}</span>
                                <span>${cardName}</span>
                            </div>
                            <span class="autolent-user-card-count">${count}</span>
                        </div>
                    `;
                });
                
                userCard.innerHTML = `
                    <div class="autolent-user-name">
                        👤 ${username}
                        <span style="font-size: 0.9rem; color: var(--brand); background: rgba(73, 185, 255, 0.2); padding: 4px 12px; border-radius: 20px;">
                            Всего карт: ${userData.total}
                        </span>
                    </div>
                    ${cardsHTML}
                `;
                
                userCard.style.cursor = 'pointer';
                userCard.addEventListener('click', () => applyUserToInventory(username));

                userResults.appendChild(userCard);
            }
        } else {
            // Показать всех пользователей
            resultsTitle.textContent = `👤 Карты по пользователям (${autolentResults.totalUsers})`;
            
            const sortedUsers = Object.entries(autolentResults.users)
                .sort((a, b) => b[1].total - a[1].total);
            
            sortedUsers.forEach(([username, userData]) => {
                const userCard = document.createElement('div');
                userCard.className = 'autolent-user-card';
                
                // Создаем список топ-3 карт
                const topCards = Object.entries(userData.cards)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3);
                
                let cardsHTML = '';
                topCards.forEach(([cardName, count]) => {
                    const emoji = cardEmojis[cardName] || '🃏';
                    cardsHTML += `
                        <div class="autolent-user-card-item">
                            <div class="autolent-user-card-name">
                                <span class="emoji" aria-hidden="true">${emoji}</span>
                                <span>${cardName}</span>
                            </div>
                            <span class="autolent-user-card-count">${count}</span>
                        </div>
                    `;
                });
                
                // Если карт больше 3, показываем количество остальных
                const otherCardsCount = Object.keys(userData.cards).length - 3;
                if (otherCardsCount > 0) {
                    cardsHTML += `
                        <div class="autolent-user-card-item">
                            <div class="autolent-user-card-name">
                                <span>📊</span>
                                <span>Другие карты</span>
                            </div>
                            <span class="autolent-user-card-count">+${otherCardsCount} типов</span>
                        </div>
                    `;
                }
                
                userCard.innerHTML = `
                    <div class="autolent-user-name">
                        👤 ${username}
                        <span style="font-size: 0.9rem; color: var(--brand); background: rgba(73, 185, 255, 0.2); padding: 4px 12px; border-radius: 20px;">
                            ${userData.total} карт
                        </span>
                    </div>
                    ${cardsHTML}
                `;
                
                userCard.style.cursor = 'pointer';
                userCard.addEventListener('click', () => applyUserToInventory(username));

                userResults.appendChild(userCard);
            });
        }
    }
    
    // Применить карты пользователя в Инвентарь (по клику на пользователя)
    function applyUserToInventory(username) {
        const userData = autolentResults.users[username];
        if (!userData) return;

        // Очищаем инвентарь и заполняем из парсинга
        clearInventory();
        const entries = Object.entries(userData.cards).sort((a,b)=>b[1]-a[1]);
        entries.forEach(([cardName, count]) => {
            addToInventory(cardName, count);
        });
        updateResultsFromInventory();

        // Переключаемся на Инвентарь для наглядности
        try {
            const modeInventoryBtn = document.getElementById('modeInventoryBtn');
            if (modeInventoryBtn) modeInventoryBtn.click();
        } catch(e) {}

        showNotification(`Инвентарь заполнен по пользователю: ${username}`, 'success');
    }

    // Скачать результаты в TXT
    function downloadAutolentResults(selectedUser = '') {
        if (!autolentResults || autolentResults.totalCards === 0) {
            showNotification('Нет данных для скачивания', 'warning');
            return;
        }
        
        let content = '=== РЕЗУЛЬТАТЫ ПАРСИНГА КАРТ ===\n';
        content += `Сгенерировано: ${new Date().toLocaleString('ru-RU')}\n`;
        content += '=================================\n\n';
        
        if (selectedUser) {
            // Скачать только выбранного пользователя
            const userData = autolentResults.users[selectedUser];
            if (!userData) return;
            
            content += `ПОЛЬЗОВАТЕЛЬ: ${selectedUser}\n`;
            content += `Всего карт: ${userData.total}\n\n`;
            content += 'СПИСОК КАРТ:\n';
            
            const sortedCards = Object.entries(userData.cards)
                .sort((a, b) => b[1] - a[1]);
            
            sortedCards.forEach(([cardName, count]) => {
                const emoji = cardEmojis[cardName] || '🃏';
                content += `${emoji} ${cardName} - ${count}\n`;
            });
        } else {
            // Скачать всех пользователей
            content += `ОБЩАЯ СТАТИСТИКА:\n`;
            content += `• Уникальных пользователей: ${autolentResults.totalUsers}\n`;
            content += `• Всего карт: ${autolentResults.totalCards}\n`;
            content += `• Типов карт: ${Object.keys(autolentResults.cards).length}\n\n`;
            
            content += 'КАРТЫ ПО ТИПАМ:\n';
            const sortedCards = Object.entries(autolentResults.cards)
                .sort((a, b) => b[1].total - a[1].total);
            
            sortedCards.forEach(([cardName, cardData]) => {
                const emoji = cardEmojis[cardName] || '🃏';
                content += `${emoji} ${cardName}: ${cardData.total} карт\n`;
            });
            
            content += '\n\nКАРТЫ ПО ПОЛЬЗОВАТЕЛЯМ:\n';
            const sortedUsers = Object.entries(autolentResults.users)
                .sort((a, b) => b[1].total - a[1].total);
            
            sortedUsers.forEach(([username, userData]) => {
                content += `\n--- ${username} (${userData.total} карт) ---\n`;
                
                const sortedUserCards = Object.entries(userData.cards)
                    .sort((a, b) => b[1] - a[1]);
                
                sortedUserCards.forEach(([cardName, count]) => {
                    const emoji = cardEmojis[cardName] || '🃏';
                    content += `  ${emoji} ${cardName}: ${count}\n`;
                });
            });
        }
        
        // Создаем blob и ссылку для скачивания
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedUser ? `карты_${selectedUser}.txt` : 'все_карты.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Файл скачан', 'success');
    }
    
    // Загрузить файл
    function handleFileUpload(file) {
        if (!file || !file.name.endsWith('.txt')) {
            showNotification('Выберите TXT файл', 'warning');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            document.getElementById('autolentText').value = text;
            
            // Показываем информацию о загруженном файле
            const uploadInfo = document.getElementById('autolentUploadInfo');
            const uploadInfoText = document.getElementById('autolentUploadInfoText');
            uploadInfoText.textContent = `Загружен файл: ${file.name} (${Math.round(file.size / 1024)} KB)`;
            uploadInfo.classList.add('visible');
            
            showNotification(`Файл "${file.name}" загружен`, 'success');
        };
        reader.readAsText(file);
    }
    
    // ============== ИНИЦИАЛИЗАЦИЯ ==============
    
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализация переключения режимов
        const modeInventoryBtn = document.getElementById('modeInventoryBtn');
        const modeParserBtn = document.getElementById('modeParserBtn');
        const modeCardInfoBtn = document.getElementById('modeCardInfoBtn');
        const contentInventory = document.getElementById('contentInventory');
        const contentParser = document.getElementById('contentParser');
        const contentCardInfo = document.getElementById('contentCardInfo');
        
        function switchMode(mode) {
            // Сбрасываем активные классы
            modeInventoryBtn.classList.remove('active');
            modeParserBtn.classList.remove('active');
            modeCardInfoBtn.classList.remove('active');
            contentInventory.classList.remove('active');
            contentParser.classList.remove('active');
            contentCardInfo.classList.remove('active');
            
            // Устанавливаем активный режим
            if (mode === 'inventory') {
                modeInventoryBtn.classList.add('active');
                contentInventory.classList.add('active');
            } else if (mode === 'parser') {
                modeParserBtn.classList.add('active');
                contentParser.classList.add('active');
            } else if (mode === 'cardinfo') {
                modeCardInfoBtn.classList.add('active');
                contentCardInfo.classList.add('active');
            }
            
            // Обновляем результаты в зависимости от режима
            if (mode === 'inventory') {
                updateResultsFromInventory();
                renderInventoryReferenceGrouped();
            }
        }
        
        modeInventoryBtn.addEventListener('click', () => switchMode('inventory'));
        modeParserBtn.addEventListener('click', () => switchMode('parser'));
        modeCardInfoBtn.addEventListener('click', () => switchMode('cardinfo'));

        // Инвентарь: быстрый поиск по справочнику (обычные / активации / нарушения)
        const inventorySearch = document.getElementById('inventorySearch');
        if (inventorySearch) {
            // Debounce для поиска (мобильные устройства)
            let __invSearchTimer = null;
            inventorySearch.addEventListener('input', () => {
                if (__invSearchTimer) clearTimeout(__invSearchTimer);
                __invSearchTimer = setTimeout(() => {
                    renderInventoryReferenceGrouped();
                }, 250);
            });
        }
        // Рендер справочника при загрузке страницы
        renderInventoryReferenceGrouped();

        
        // Инициализация времени
        function updateMoscowTime() {
            const now = new Date();
            const moscowTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
            
            const hours = moscowTime.getHours().toString().padStart(2, '0');
            const minutes = moscowTime.getMinutes().toString().padStart(2, '0');
            const seconds = moscowTime.getSeconds().toString().padStart(2, '0');
            
            document.getElementById('timeDisplay').textContent = `${hours}:${minutes}:${seconds}`;
            
            // Проверка на ночное время
            const nightWarning = document.getElementById('nightWarning');
            if (moscowTime.getHours() >= 23 || moscowTime.getHours() < 6) {
                nightWarning.classList.add('visible');
            } else {
                nightWarning.classList.remove('visible');
            }
        }
        
        updateMoscowTime();
        setInterval(updateMoscowTime, 1000);
        
        // Инициализация инвентаря
        const inventoryCardSelect = document.getElementById('inventoryCardSelect');
        const inventoryCardCount = document.getElementById('inventoryCardCount');
        const inventoryAddBtn = document.getElementById('inventoryAddBtn');
        const inventoryClearBtn = document.getElementById('inventoryClearBtn');
        
        inventoryAddBtn.addEventListener('click', function() {
            const cardName = inventoryCardSelect.value;
            const count = parseInt(inventoryCardCount.value) || 1;
            
            addToInventory(cardName, count);
            
            // Сбрасываем форму
            inventoryCardSelect.value = '';
            inventoryCardCount.value = '1';
        });
        
        inventoryClearBtn.addEventListener('click', clearInventory);
        
        // Обработчик для Enter в поле количества
        inventoryCardCount.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                inventoryAddBtn.click();
            }
        });
        
        // Инициализация Базы знаний
        const cardInfoSelect = document.getElementById('cardInfoSelect');

        // Автопоказ информации при выборе карты
        cardInfoSelect.addEventListener('change', function() {
            const cardName = this.value;
            if (cardName) showCardInfo(cardName);
        });

        // Инициализация АвтоЛень
        const autolentText = document.getElementById('autolentText');
        const autolentParseBtn = document.getElementById('autolentParseBtn');
        const autolentClearBtn = document.getElementById('autolentClearBtn');
        const autolentDownloadAllBtn = document.getElementById('autolentDownloadAllBtn');
        const autolentUserSelect = document.getElementById('autolentUserSelect');
        const autolentFileInput = document.getElementById('autolentFileInput');
        const autolentClearUploadInfo = document.getElementById('autolentClearUploadInfo');
        const autolentUploadInfo = document.getElementById('autolentUploadInfo');
        
        // Обработчик парсинга
        autolentParseBtn.addEventListener('click', function() {
            const text = autolentText.value.trim();
            if (!text) {
                showNotification('Введите текст для анализа', 'warning');
                return;
            }
            
            const success = parseAutolentText(text);
            if (success) {
                showAutolentResults();
            } else {
                showNotification('Не удалось распознать карты в тексте', 'error');
            }
        });
        
        // Очистить поле
        autolentClearBtn.addEventListener('click', function() {
            autolentText.value = '';
            document.getElementById('autolentResults').classList.remove('visible');
            document.getElementById('autolentQuickDownload').classList.remove('visible');
            document.getElementById('autolentUserSelector').classList.remove('visible');
            autolentUploadInfo.classList.remove('visible');
            showNotification('Поле очищено', 'info');
        });
        
        // Скачать всех
        autolentDownloadAllBtn.addEventListener('click', function() {
            downloadAutolentResults('');
        });
        
        // Обработчик выбора пользователя
        autolentUserSelect.addEventListener('change', function() {
            showSelectedUser(this.value);
        });
        
        // Обработчик загрузки файла
        autolentFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
        
        // Очистить информацию о загрузке
        autolentClearUploadInfo.addEventListener('click', function() {
            autolentUploadInfo.classList.remove('visible');
        });
        
        // Просто показываем пустой placeholder
        setTimeout(() => {
            if (!autolentText.value.trim()) {
                autolentText.placeholder = "Вставьте сюда текст с постами, содержащими списки карточек...\n\nПример:\n🎴Карты Активаций\n🚨Рубиновая\n🇩🇪Балтик - 1\n\n🀄️Обычные\n☑️Серая\nОксана - 1\nОксана🇷🇺 - 2\nОксана🇰🇿 - 1\n🟦Синяя\nОксана - 1";
            }
        }, 500);
    });
  
    // === Telegram Worker Auto-Load (Vecherya) ===
    const TG_WORKER_URL = "https://noisy-grass-2be4.nurlinec.workers.dev/api/inventory";

    function normalizeTelegramText(raw) {
      return String(raw || "")
        .replace(/[–—]/g, "-")
        .replace(/\r\n?/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    function getAutoLentTextarea() {
      return (
        document.querySelector('#autolentText') ||
        document.querySelector('#autoLentText') ||
        document.querySelector('#inventoryInput') ||
        document.querySelector('#inputText') ||
        document.querySelector('textarea')
      );
    }

    function clickAnalyzeButton() {
      const btn =
        document.querySelector('#autolentParseBtn') ||
        document.querySelector('#magicBtn') ||
        document.querySelector("button[data-action='analyze']") ||
        Array.from(document.querySelectorAll('button')).find(b => {
          const t = (b.textContent || '').trim();
          return t === '🪄 Сотворить чудо' || t === '✨ Магия' || t === '🔍 Проанализировать текст';
        });
      if (btn) btn.click();
    }

    async function loadTelegramIntoAutoLent() {
      const statusEl = document.getElementById('tgLoadStatus');
      const btn = document.getElementById('loadFromTelegramBtn');

      const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };

      try {
        if (btn) btn.disabled = true;
        setStatus('Творится магия v2...');

        const r = await fetch(TG_WORKER_URL, {
          cache: 'no-store',
          headers: { 'Accept': 'text/plain' }
        });

        if (!r.ok) {
          const t = await r.text().catch(() => '');
          throw new Error((t && t.trim()) ? t.trim() : `HTTP ${r.status}`);
        }

        const text = normalizeTelegramText(await r.text());
        if (!text) throw new Error('Пустота... магия не сработала');

        const ta = getAutoLentTextarea();
        if (!ta) throw new Error('Не найдено поле магического ввода (textarea)');

        ta.value = text;
        ta.dispatchEvent(new Event('input', { bubbles: true }));

        setStatus('Магия сработала! Сотворяю чудо...');
        clickAnalyzeButton();
        setStatus('Магия завершена успешно.');
      } catch (e) {
        const raw = (e && typeof e === 'object')
          ? (e.message || JSON.stringify(e))
          : String(e);
        setStatus('Магия провалилась: ' + raw);
      } finally {
        if (btn) btn.disabled = false;
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('loadFromTelegramBtn');
      if (btn) btn.addEventListener('click', loadTelegramIntoAutoLent);
    });
