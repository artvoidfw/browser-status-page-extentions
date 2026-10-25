(function () {
  'use strict';

  const Storage = {
    async get(key, defaultValue) {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError || result[key] === undefined) {
              resolve(defaultValue);
            } else {
              resolve(result[key]);
            }
          });
        });
      }
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },

    async set(key, value) {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [key]: value }, resolve);
        });
      }
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('Storage set failed', e);
      }
    }
  };

  const COUNTRIES = {
    az: {
      code: 'az',
      name: 'Azərbaycan',
      flag: '🇦🇿',
      locale: 'az-AZ',
      timezone: 'Asia/Baku',
      utcOffset: 'UTC+4',
      defaultCity: 'Bakı',
      lat: 40.4093,
      lon: 49.8671,
      lang: 'az'
    },
    tr: {
      code: 'tr',
      name: 'Türkiye',
      flag: '🇹🇷',
      locale: 'tr-TR',
      timezone: 'Europe/Istanbul',
      utcOffset: 'UTC+3',
      defaultCity: 'İstanbul',
      lat: 41.0082,
      lon: 28.9784,
      lang: 'tr'
    },
    us: {
      code: 'us',
      name: 'Amerika (United States)',
      flag: '🇺🇸',
      locale: 'en-US',
      timezone: 'America/New_York',
      utcOffset: 'UTC-5',
      defaultCity: 'New York',
      lat: 40.7128,
      lon: -74.0060,
      lang: 'en'
    },
    ru: {
      code: 'ru',
      name: 'Россия (Russia)',
      flag: '🇷🇺',
      locale: 'ru-RU',
      timezone: 'Europe/Moscow',
      utcOffset: 'UTC+3',
      defaultCity: 'Москва',
      lat: 55.7558,
      lon: 37.6173,
      lang: 'ru'
    },
    it: {
      code: 'it',
      name: 'Italia (Italy)',
      flag: '🇮🇹',
      locale: 'it-IT',
      timezone: 'Europe/Rome',
      utcOffset: 'UTC+1',
      defaultCity: 'Roma',
      lat: 41.9028,
      lon: 12.4964,
      lang: 'it'
    },
    es: {
      code: 'es',
      name: 'España (Spain)',
      flag: '🇪🇸',
      locale: 'es-ES',
      timezone: 'Europe/Madrid',
      utcOffset: 'UTC+1',
      defaultCity: 'Madrid',
      lat: 40.4168,
      lon: -3.7038,
      lang: 'es'
    },
    de: {
      code: 'de',
      name: 'Deutschland (Germany)',
      flag: '🇩🇪',
      locale: 'de-DE',
      timezone: 'Europe/Berlin',
      utcOffset: 'UTC+1',
      defaultCity: 'Berlin',
      lat: 52.5200,
      lon: 13.4050,
      lang: 'de'
    },
    fr: {
      code: 'fr',
      name: 'France (France)',
      flag: '🇫🇷',
      locale: 'fr-FR',
      timezone: 'Europe/Paris',
      utcOffset: 'UTC+1',
      defaultCity: 'Paris',
      lat: 48.8566,
      lon: 2.3522,
      lang: 'fr'
    },
    gb: {
      code: 'gb',
      name: 'United Kingdom',
      flag: '🇬🇧',
      locale: 'en-GB',
      timezone: 'Europe/London',
      utcOffset: 'UTC+0',
      defaultCity: 'London',
      lat: 51.5074,
      lon: -0.1278,
      lang: 'en'
    },
    cn: {
      code: 'cn',
      name: '中国 (China)',
      flag: '🇨🇳',
      locale: 'zh-CN',
      timezone: 'Asia/Shanghai',
      utcOffset: 'UTC+8',
      defaultCity: '北京',
      lat: 39.9042,
      lon: 116.4074,
      lang: 'zh'
    },
    in: {
      code: 'in',
      name: 'भारत (India)',
      flag: '🇮🇳',
      locale: 'en-IN',
      timezone: 'Asia/Kolkata',
      utcOffset: 'UTC+5:30',
      defaultCity: 'New Delhi',
      lat: 28.6139,
      lon: 77.2090,
      lang: 'en'
    },
    jp: {
      code: 'jp',
      name: '日本 (Japan)',
      flag: '🇯🇵',
      locale: 'ja-JP',
      timezone: 'Asia/Tokyo',
      utcOffset: 'UTC+9',
      defaultCity: '東京',
      lat: 35.6762,
      lon: 139.6503,
      lang: 'ja'
    },
    kr: {
      code: 'kr',
      name: '대한민국 (South Korea)',
      flag: '🇰🇷',
      locale: 'ko-KR',
      timezone: 'Asia/Seoul',
      utcOffset: 'UTC+9',
      defaultCity: '서울',
      lat: 37.5665,
      lon: 126.9780,
      lang: 'ko'
    },
    br: {
      code: 'br',
      name: 'Brasil (Brazil)',
      flag: '🇧🇷',
      locale: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      utcOffset: 'UTC-3',
      defaultCity: 'São Paulo',
      lat: -23.5505,
      lon: -46.6333,
      lang: 'pt'
    },
    ca: {
      code: 'ca',
      name: 'Canada',
      flag: '🇨🇦',
      locale: 'en-CA',
      timezone: 'America/Toronto',
      utcOffset: 'UTC-5',
      defaultCity: 'Toronto',
      lat: 43.6532,
      lon: -79.3832,
      lang: 'en'
    },
    au: {
      code: 'au',
      name: 'Australia',
      flag: '🇦🇺',
      locale: 'en-AU',
      timezone: 'Australia/Sydney',
      utcOffset: 'UTC+10',
      defaultCity: 'Sydney',
      lat: -33.8688,
      lon: 151.2093,
      lang: 'en'
    }
  };

  const TRANSLATIONS = {
    az: {
      searchPlaceholder: 'Axtar və ya URL daxil et... (/)',
      zenMode: 'Fokus Rejimi (Zen)',
      zenExit: 'Fokus Rejimindən Çıx (və ya \'Esc\')',
      todoDrawerTitle: 'Günün Hədəfləri & Qeydlər',
      newTodoPlaceholder: 'Yeni hədəf yazın...',
      emptyTodos: 'Heç bir hədəf yoxdur. Yeni hədəf əlavə edin!',
      notesTitle: '📝 Tez Qeydlər',
      notesPlaceholder: 'Günün ideyaları, linklər və ya qeydlər...',
      notesSaved: 'Yadda saxlanıldı ✓',
      notesSaving: 'Saxlanılır...',
      settingsHeading: 'Tənzimləmələr',
      lblCountryLang: '🌍 Ölkə, Dil və Saat Qurşağı',
      lblTheme: 'Görünüş Mövzusu',
      lblCity: 'Hava Şəhəri',
      lbl24Hour: '24 Saat Formatı',
      lblSeconds: 'Saniyələri Göstər',
      lblWeather: 'Hava Vidcetini Göstər',
      lblShortcuts: 'Qısayolları Göstər',
      lblQuotes: 'Motivasiya Fikirlərini Göstər',
      saveBtn: 'Yadda Saxla və Bağla',
      randomQuoteBtn: 'Yeni fikir',
      addShortcut: 'Əlavə et',
      quotes: [
        "Hər böyük nailiyyət bir addımla başlayır.",
        "Bilik gücdür, amma tətbiq olunan bilik möcüzələr yaradır.",
        "Vaxt ən dəyərli sərmayədir, onu diqqətlə xərcləyin.",
        "Çətinliklər qarşısında təslim olmayanlar uğur qazanır.",
        "Davamlı inkişaf möhtəşəm nəticələrin açarıdır."
      ]
    },
    tr: {
      searchPlaceholder: 'Ara veya URL girin... (/)',
      zenMode: 'Odak Modu (Zen)',
      zenExit: 'Odak Modundan Çık (veya \'Esc\')',
      todoDrawerTitle: 'Günün Hedefleri ve Notlar',
      newTodoPlaceholder: 'Yeni bir hedef yazın...',
      emptyTodos: 'Henüz bir hedef yok. Yeni bir hedef ekleyin!',
      notesTitle: '📝 Hızlı Notlar',
      notesPlaceholder: 'Günün fikirleri, bağlantılar veya notlar...',
      notesSaved: 'Kaydedildi ✓',
      notesSaving: 'Kaydediliyor...',
      settingsHeading: 'Ayarlar',
      lblCountryLang: '🌍 Ülke, Dil ve Saat Dilimi',
      lblTheme: 'Görünüm Teması',
      lblCity: 'Hava Durumu Şehri',
      lbl24Hour: '24 Saat Formatı',
      lblSeconds: 'Saniyeyi Göster',
      lblWeather: 'Hava Durumunu Göster',
      lblShortcuts: 'Kısayolları Göster',
      lblQuotes: 'Motivasyon Sözlerini Göster',
      saveBtn: 'Kaydet ve Kapat',
      randomQuoteBtn: 'Yeni söz',
      addShortcut: 'Ekle',
      quotes: [
        "Her büyük başarı tek bir adımla başlar.",
        "Zaman en değerli hazinedir, akıllıca değerlendirin.",
        "Zorluklar başarıya giden merdivenlerin basamaklarıdır.",
        "Sürekli gelişim olağanüstü sonuçların anahtarıdır."
      ]
    },
    en: {
      searchPlaceholder: 'Search or type a URL... (/)',
      zenMode: 'Zen Focus Mode',
      zenExit: 'Exit Zen Mode (or \'Esc\')',
      todoDrawerTitle: 'Daily Goals & Notes',
      newTodoPlaceholder: 'Write a new goal...',
      emptyTodos: 'No goals yet. Add a new goal to get started!',
      notesTitle: '📝 Quick Notes',
      notesPlaceholder: 'Ideas, links, or thoughts for today...',
      notesSaved: 'Saved ✓',
      notesSaving: 'Saving...',
      settingsHeading: 'Settings',
      lblCountryLang: '🌍 Country, Language & Timezone',
      lblTheme: 'Theme Style',
      lblCity: 'Weather City',
      lbl24Hour: '24-Hour Format',
      lblSeconds: 'Show Seconds',
      lblWeather: 'Show Weather Widget',
      lblShortcuts: 'Show Shortcuts',
      lblQuotes: 'Show Motivation Quotes',
      saveBtn: 'Save & Close',
      randomQuoteBtn: 'New Quote',
      addShortcut: 'Add',
      quotes: [
        "Every great accomplishment starts with a single step.",
        "Time is the most valuable asset you own, spend it wisely.",
        "Simplicity is the soul of efficiency.",
        "Continuous progress is the secret to extraordinary results."
      ]
    },
    ru: {
      searchPlaceholder: 'Поиск или введите URL... (/)',
      zenMode: 'Режим фокуса (Zen)',
      zenExit: 'Выйти из режима фокуса (или \'Esc\')',
      todoDrawerTitle: 'Цели дня и заметки',
      newTodoPlaceholder: 'Добавить новую цель...',
      emptyTodos: 'Целей пока нет. Добавьте новую цель!',
      notesTitle: '📝 Быстрые заметки',
      notesPlaceholder: 'Идеи, ссылки или мысли на сегодня...',
      notesSaved: 'Сохранено ✓',
      notesSaving: 'Сохранение...',
      settingsHeading: 'Настройки',
      lblCountryLang: '🌍 Страна, язык и часовой пояс',
      lblTheme: 'Тема оформления',
      lblCity: 'Город погоды',
      lbl24Hour: '24-часовой формат',
      lblSeconds: 'Показывать секунды',
      lblWeather: 'Показывать погоду',
      lblShortcuts: 'Показывать ярлыки',
      lblQuotes: 'Показывать цитаты',
      saveBtn: 'Сохранить и закрыть',
      randomQuoteBtn: 'Новая цитата',
      addShortcut: 'Добавить',
      quotes: [
        "Каждое великое достижение начинается с первого шага.",
        "Время — самый ценный ресурс, используйте его с умом.",
        "Постоянное развитие — ключ к великим результатам."
      ]
    },
    it: {
      searchPlaceholder: 'Cerca o inserisci URL... (/)',
      zenMode: 'Modalità Zen',
      zenExit: 'Esci dalla modalità Zen (o \'Esc\')',
      todoDrawerTitle: 'Obiettivi e Note',
      newTodoPlaceholder: 'Scrivi un nuovo obiettivo...',
      emptyTodos: 'Nessun obiettivo. Aggiungi il primo!',
      notesTitle: '📝 Note Rapide',
      notesPlaceholder: 'Idee, link o note per oggi...',
      notesSaved: 'Salvato ✓',
      notesSaving: 'Salvataggio...',
      settingsHeading: 'Impostazioni',
      lblCountryLang: '🌍 Paese, Lingua e Fuso Orario',
      lblTheme: 'Tema Visivo',
      lblCity: 'Città Meteo',
      lbl24Hour: 'Formato 24 Ore',
      lblSeconds: 'Mostra Secondi',
      lblWeather: 'Mostra Meteo',
      lblShortcuts: 'Mostra Scorciatoie',
      lblQuotes: 'Mostra Frasi Motivazionali',
      saveBtn: 'Salva e Chiudi',
      randomQuoteBtn: 'Nuova frase',
      addShortcut: 'Aggiungi',
      quotes: [
        "Ogni grande successo inizia con un piccolo passo.",
        "Il tempo è la risorsa più preziosa.",
        "La semplicità è la massima sofisticazione."
      ]
    },
    es: {
      searchPlaceholder: 'Buscar o escribir URL... (/)',
      zenMode: 'Modo Zen',
      zenExit: 'Salir del modo Zen (o \'Esc\')',
      todoDrawerTitle: 'Metas y Notas del Día',
      newTodoPlaceholder: 'Escribe una nueva meta...',
      emptyTodos: 'No hay metas aún. ¡Agrega una nueva!',
      notesTitle: '📝 Notas Rápidas',
      notesPlaceholder: 'Ideas, enlaces o notas para hoy...',
      notesSaved: 'Guardado ✓',
      notesSaving: 'Guardando...',
      settingsHeading: 'Configuración',
      lblCountryLang: '🌍 País, Idioma y Zona Horaria',
      lblTheme: 'Tema Visual',
      lblCity: 'Ciudad del Clima',
      lbl24Hour: 'Formato 24 Horas',
      lblSeconds: 'Mostrar Segundos',
      lblWeather: 'Mostrar Clima',
      lblShortcuts: 'Mostrar Accesos Directos',
      lblQuotes: 'Mostrar Frases',
      saveBtn: 'Guardar y Cerrar',
      randomQuoteBtn: 'Nueva frase',
      addShortcut: 'Añadir',
      quotes: [
        "Cada gran logro comienza con un solo paso.",
        "El tiempo es el recurso más valioso, aprovéchalo bien.",
        "El progreso constante es la clave del éxito."
      ]
    },
    de: {
      searchPlaceholder: 'Suchen oder URL eingeben... (/)',
      zenMode: 'Fokusmodus (Zen)',
      zenExit: 'Fokusmodus verlassen (oder \'Esc\')',
      todoDrawerTitle: 'Tagesziele & Notizen',
      newTodoPlaceholder: 'Neues Ziel schreiben...',
      emptyTodos: 'Noch keine Ziele. Fügen Sie eins hinzu!',
      notesTitle: '📝 Schnelle Notizen',
      notesPlaceholder: 'Ideen, Links oder Notizen für heute...',
      notesSaved: 'Gespeichert ✓',
      notesSaving: 'Wird gespeichert...',
      settingsHeading: 'Einstellungen',
      lblCountryLang: '🌍 Land, Sprache & Zeitzone',
      lblTheme: 'Design Thema',
      lblCity: 'Wetterstadt',
      lbl24Hour: '24-Stunden-Format',
      lblSeconds: 'Sekunden anzeigen',
      lblWeather: 'Wetter anzeigen',
      lblShortcuts: 'Verknüpfungen anzeigen',
      lblQuotes: 'Zitate anzeigen',
      saveBtn: 'Speichern & Schließen',
      randomQuoteBtn: 'Neues Zitat',
      addShortcut: 'Hinzufügen',
      quotes: [
        "Jeder große Erfolg beginnt mit einem einzigen Schritt.",
        "Zeit ist das wertvollste Gut, nutze sie weise."
      ]
    },
    fr: {
      searchPlaceholder: 'Rechercher ou entrer une URL... (/)',
      zenMode: 'Mode Zen',
      zenExit: 'Quitter le mode Zen (ou \'Esc\')',
      todoDrawerTitle: 'Objectifs & Notes',
      newTodoPlaceholder: 'Nouvel objectif...',
      emptyTodos: 'Aucun objectif pour l\'instant.',
      notesTitle: '📝 Notes Rapides',
      notesPlaceholder: 'Idées, liens ou réflexions...',
      notesSaved: 'Enregistré ✓',
      notesSaving: 'Enregistrement...',
      settingsHeading: 'Paramètres',
      lblCountryLang: '🌍 Pays, Langue & Fuseau Horaire',
      lblTheme: 'Thème Visuel',
      lblCity: 'Ville Météo',
      lbl24Hour: 'Format 24 Heures',
      lblSeconds: 'Afficher les secondes',
      lblWeather: 'Afficher la météo',
      lblShortcuts: 'Afficher les raccourcis',
      lblQuotes: 'Afficher les citations',
      saveBtn: 'Enregistrer & Fermer',
      randomQuoteBtn: 'Nouvelle citation',
      addShortcut: 'Ajouter',
      quotes: [
        "Chaque grand accomplissement commence par un premier pas.",
        "Le temps est votre ressource la plus précieuse."
      ]
    },
    zh: {
      searchPlaceholder: '搜索或输入网址... (/)',
      zenMode: '专注模式 (Zen)',
      zenExit: '退出专注模式 (或按 \'Esc\')',
      todoDrawerTitle: '今日目标与笔记',
      newTodoPlaceholder: '添加新目标...',
      emptyTodos: '暂无目标，添加一个吧！',
      notesTitle: '📝 便捷笔记',
      notesPlaceholder: '灵感、链接或今日随笔...',
      notesSaved: '已保存 ✓',
      notesSaving: '保存中...',
      settingsHeading: '设置',
      lblCountryLang: '🌍 国家、语言与时区',
      lblTheme: '外观主题',
      lblCity: '天气城市',
      lbl24Hour: '24小时制',
      lblSeconds: '显示秒数',
      lblWeather: '显示天气小组件',
      lblShortcuts: '显示快捷方式',
      lblQuotes: '显示励志语录',
      saveBtn: '保存并关闭',
      randomQuoteBtn: '换一句',
      addShortcut: '添加',
      quotes: [
        "千里之行，始于足下。",
        "时间是最宝贵的财富，珍惜每一刻。"
      ]
    },
    ja: {
      searchPlaceholder: '検索またはURLを入力... (/)',
      zenMode: '集中モード (Zen)',
      zenExit: '集中モードを終了 (または \'Esc\')',
      todoDrawerTitle: '今日の目標とメモ',
      newTodoPlaceholder: '新しい目標を入力...',
      emptyTodos: '目標はまだありません。',
      notesTitle: '📝 クイックメモ',
      notesPlaceholder: 'アイデアやリンク、メモ...',
      notesSaved: '保存完了 ✓',
      notesSaving: '保存中...',
      settingsHeading: '設定',
      lblCountryLang: '🌍 国・言語・タイムゾーン',
      lblTheme: '外観テーマ',
      lblCity: '天気の都市',
      lbl24Hour: '24時間表示',
      lblSeconds: '秒を表示',
      lblWeather: '天気を表示',
      lblShortcuts: 'ショートカットを表示',
      lblQuotes: '名言を表示',
      saveBtn: '保存して閉じる',
      randomQuoteBtn: '新しい名言',
      addShortcut: '追加',
      quotes: [
        "千里の道も一歩から。",
        "時は金なり。今この瞬間を大切に。"
      ]
    },
    ko: {
      searchPlaceholder: '검색 또는 URL 입력... (/)',
      zenMode: '집중 모드 (Zen)',
      zenExit: '집중 모드 종료 (또는 \'Esc\')',
      todoDrawerTitle: '오늘의 목표 및 메모',
      newTodoPlaceholder: '새로운 목표 입력...',
      emptyTodos: '아직 등록된 목표가 없습니다.',
      notesTitle: '📝 빠른 메모',
      notesPlaceholder: '아이디어, 링크, 생각...',
      notesSaved: '저장됨 ✓',
      notesSaving: '저장 중...',
      settingsHeading: '설정',
      lblCountryLang: '🌍 국가, 언어 및 표준시',
      lblTheme: '테마 스타일',
      lblCity: '날씨 도시',
      lbl24Hour: '24시간 형식',
      lblSeconds: '초 표시',
      lblWeather: '날씨 위젯 표시',
      lblShortcuts: '바로가기 표시',
      lblQuotes: '명언 표시',
      saveBtn: '저장 및 닫기',
      randomQuoteBtn: '새 명언',
      addShortcut: '추가',
      quotes: [
        "모든 위대한 성취는 하나의 작은 시작에서 출발합니다.",
        "시간은 가장 소중한 자산입니다."
      ]
    },
    pt: {
      searchPlaceholder: 'Pesquisar ou digitar URL... (/)',
      zenMode: 'Modo Foco (Zen)',
      zenExit: 'Sair do Modo Foco (ou \'Esc\')',
      todoDrawerTitle: 'Metas e Notas do Dia',
      newTodoPlaceholder: 'Nova meta...',
      emptyTodos: 'Nenhuma meta adicionada ainda.',
      notesTitle: '📝 Notas Rápidas',
      notesPlaceholder: 'Ideias, links ou notas para hoje...',
      notesSaved: 'Salvo ✓',
      notesSaving: 'Salvando...',
      settingsHeading: 'Configurações',
      lblCountryLang: '🌍 País, Idioma e Fuso Horário',
      lblTheme: 'Tema Visual',
      lblCity: 'Cidade do Tempo',
      lbl24Hour: 'Formato 24 Horas',
      lblSeconds: 'Exibir Segundos',
      lblWeather: 'Exibir Clima',
      lblShortcuts: 'Exibir Atalhos',
      lblQuotes: 'Exibir Citações',
      saveBtn: 'Salvar e Fechar',
      randomQuoteBtn: 'Nova citação',
      addShortcut: 'Adicionar',
      quotes: [
        "Toda grande conquista começa com um único passo.",
        "O tempo é o seu recurso mais valioso."
      ]
    }
  };

  const DEFAULT_SETTINGS = {
    country: 'az',
    theme: 'cosmic',
    is24Hour: true,
    showSeconds: true,
    showWeather: true,
    showShortcuts: true,
    showQuotes: true,
    searchEngine: 'google',
    cityName: 'Bakı'
  };

  const DEFAULT_SHORTCUTS = [
    { id: '1', title: 'YouTube', url: 'https://youtube.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'ChatGPT', url: 'https://chatgpt.com' },
    { id: '4', title: 'X (Twitter)', url: 'https://x.com' },
    { id: '5', title: 'Reddit', url: 'https://reddit.com' },
    { id: '6', title: 'Gmail', url: 'https://mail.google.com' },
    { id: '7', title: 'Spotify', url: 'https://open.spotify.com' }
  ];

  const SEARCH_ENGINES = {
    google: { name: 'Google', icon: '🌐', queryUrl: 'https://www.google.com/search?q=' },
    brave: { name: 'Brave', icon: '🦁', queryUrl: 'https://search.brave.com/search?q=' },
    duckduckgo: { name: 'DuckDuckGo', icon: '🦆', queryUrl: 'https://duckduckgo.com/?q=' },
    youtube: { name: 'YouTube', icon: '📺', queryUrl: 'https://www.youtube.com/results?search_query=' },
    github: { name: 'GitHub', icon: '🐙', queryUrl: 'https://github.com/search?q=' },
    chatgpt: { name: 'ChatGPT', icon: '🤖', queryUrl: 'https://chatgpt.com/?q=' }
  };

  let appState = {
    settings: { ...DEFAULT_SETTINGS },
    shortcuts: [...DEFAULT_SHORTCUTS],
    todos: [],
    scratchpad: '',
    isZenMode: false
  };

  let networkTimeOffset = 0;

  const els = {
    appBody: document.getElementById('appBody'),
    topBar: document.getElementById('topBar'),
    bottomBar: document.getElementById('bottomBar'),
    shortcutsContainer: document.getElementById('shortcutsContainer'),
    shortcutsGrid: document.getElementById('shortcutsGrid'),
    clockHoursMinutes: document.getElementById('clockHoursMinutes'),
    clockSeconds: document.getElementById('clockSeconds'),
    clockAmPm: document.getElementById('clockAmPm'),
    clockTrigger: document.getElementById('clockTrigger'),
    dateLine: document.getElementById('dateLine'),
    quoteContainer: document.getElementById('quoteContainer'),
    quoteText: document.getElementById('quoteText'),
    quoteAuthor: document.getElementById('quoteAuthor'),
    randomQuoteBtn: document.getElementById('randomQuoteBtn'),
    randomQuoteBtnLabel: document.getElementById('randomQuoteBtnLabel'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    searchEngineBtn: document.getElementById('searchEngineBtn'),
    currentEngineIcon: document.getElementById('currentEngineIcon'),
    currentEngineName: document.getElementById('currentEngineName'),
    engineDropdown: document.getElementById('engineDropdown'),
    countryPill: document.getElementById('countryPill'),
    countryFlagIcon: document.getElementById('countryFlagIcon'),
    countryNameText: document.getElementById('countryNameText'),
    weatherPill: document.getElementById('weatherPill'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherTemp: document.getElementById('weatherTemp'),
    weatherCity: document.getElementById('weatherCity'),
    timeZoneInfo: document.getElementById('timeZoneInfo'),
    userGithubLink: document.getElementById('userGithubLink'),
    zenBtn: document.getElementById('zenBtn'),
    zenExitBar: document.getElementById('zenExitBar'),
    zenExitBtn: document.getElementById('zenExitBtn'),
    zenExitText: document.getElementById('zenExitText'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    todoToggleBtn: document.getElementById('todoToggleBtn'),
    todoBadge: document.getElementById('todoBadge'),
    todoDrawer: document.getElementById('todoDrawer'),
    todoDrawerTitle: document.getElementById('todoDrawerTitle'),
    closeTodoDrawer: document.getElementById('closeTodoDrawer'),
    newTodoInput: document.getElementById('newTodoInput'),
    addTodoBtn: document.getElementById('addTodoBtn'),
    todoList: document.getElementById('todoList'),
    scratchpadTitle: document.getElementById('scratchpadTitle'),
    scratchpadArea: document.getElementById('scratchpadArea'),
    noteSavedStatus: document.getElementById('noteSavedStatus'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    settingsHeading: document.getElementById('settingsHeading'),
    closeSettingsModal: document.getElementById('closeSettingsModal'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    countryDropdownBtn: document.getElementById('countryDropdownBtn'),
    countryDropdownMenu: document.getElementById('countryDropdownMenu'),
    countryCurrentFlag: document.getElementById('countryCurrentFlag'),
    countryCurrentName: document.getElementById('countryCurrentName'),
    countryCurrentUtc: document.getElementById('countryCurrentUtc'),
    countryChevron: document.getElementById('countryChevron'),
    countryTimezoneHint: document.getElementById('countryTimezoneHint'),
    settingCityName: document.getElementById('settingCityName'),
    lblCountryLang: document.getElementById('lblCountryLang'),
    lblTheme: document.getElementById('lblTheme'),
    lblCity: document.getElementById('lblCity'),
    lbl24Hour: document.getElementById('lbl24Hour'),
    lblSeconds: document.getElementById('lblSeconds'),
    lblWeather: document.getElementById('lblWeather'),
    lblShortcuts: document.getElementById('lblShortcuts'),
    lblQuotes: document.getElementById('lblQuotes'),
    toggle24Hour: document.getElementById('toggle24Hour'),
    toggleSeconds: document.getElementById('toggleSeconds'),
    toggleWeather: document.getElementById('toggleWeather'),
    toggleShortcuts: document.getElementById('toggleShortcuts'),
    toggleQuotes: document.getElementById('toggleQuotes'),
    themeSelector: document.getElementById('themeSelector'),
    solarRingContainer: document.getElementById('solarRingContainer'),
    solarRays: document.getElementById('solarRays'),
    solarCore: document.getElementById('solarCore'),
    addShortcutHeaderBtn: document.getElementById('addShortcutHeaderBtn'),
    shortcutModal: document.getElementById('shortcutModal'),
    shortcutModalTitle: document.getElementById('shortcutModalTitle'),
    closeShortcutModal: document.getElementById('closeShortcutModal'),
    cancelShortcutModal: document.getElementById('cancelShortcutModal'),
    saveShortcutModal: document.getElementById('saveShortcutModal'),
    modalShortcutTitle: document.getElementById('modalShortcutTitle'),
    modalShortcutUrl: document.getElementById('modalShortcutUrl'),
    modalShortcutIcon: document.getElementById('modalShortcutIcon')
  };

  async function syncNetworkTime() {
    try {
      const startTime = Date.now();
      
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.4093&longitude=49.8671&current_weather=true', { cache: 'no-store' });
      const serverDateHeader = response.headers.get('date');
      if (serverDateHeader) {
        const serverTime = new Date(serverDateHeader).getTime();
        const roundTripLatency = (Date.now() - startTime) / 2;
        networkTimeOffset = (serverTime + roundTripLatency) - Date.now();
      }
    } catch (e) {
      
      try {
        const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', { cache: 'no-store' });
        const data = await res.json();
        if (data && data.utc_datetime) {
          networkTimeOffset = new Date(data.utc_datetime).getTime() - Date.now();
        }
      } catch (err) {
        console.warn('Network time sync unavailable, using local clock', err);
      }
    }
  }

  function getActiveCountry() {
    return COUNTRIES[appState.settings.country] || COUNTRIES.az;
  }

  function getI18n() {
    const country = getActiveCountry();
    return TRANSLATIONS[country.lang] || TRANSLATIONS.en || TRANSLATIONS.az;
  }

  function updateClock() {
    const country = getActiveCountry();
    const now = new Date(Date.now() + networkTimeOffset);

    try {
      const timeParts = new Intl.DateTimeFormat('en-US', {
        timeZone: country.timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: !appState.settings.is24Hour
      }).formatToParts(now);

      let hour = '00';
      let minute = '00';
      let second = '00';
      let dayPeriod = '';

      timeParts.forEach(part => {
        if (part.type === 'hour') hour = part.value.padStart(2, '0');
        if (part.type === 'minute') minute = part.value.padStart(2, '0');
        if (part.type === 'second') second = part.value.padStart(2, '0');
        if (part.type === 'dayPeriod') dayPeriod = part.value.toUpperCase();
      });

      els.clockHoursMinutes.textContent = `${hour}:${minute}`;

      if (!appState.settings.is24Hour && dayPeriod) {
        els.clockAmPm.textContent = dayPeriod;
        els.clockAmPm.style.display = 'inline';
      } else {
        els.clockAmPm.style.display = 'none';
      }

      if (appState.settings.showSeconds) {
        els.clockSeconds.textContent = second;
        els.clockSeconds.style.display = 'inline';
      } else {
        els.clockSeconds.style.display = 'none';
      }

      let formattedDate = '';
      if (country.code === 'az') {
        const days = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
        const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
        const dObj = new Date(now.toLocaleString('en-US', { timeZone: country.timezone }));
        formattedDate = `${days[dObj.getDay()]}, ${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
      } else {
        formattedDate = new Intl.DateTimeFormat(country.locale, {
          timeZone: country.timezone,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(now);
      }

      els.dateLine.textContent = formattedDate;
    } catch (err) {
      console.warn('Clock format error', err);
    }
  }

  let selectedCountryTemp = 'az';

  function renderCountryDropdown() {
    if (!els.countryDropdownMenu) return;
    els.countryDropdownMenu.innerHTML = '';
    const active = COUNTRIES[selectedCountryTemp] || COUNTRIES.az;
    els.countryCurrentFlag.textContent = active.flag;
    els.countryCurrentName.textContent = active.name;
    els.countryCurrentUtc.textContent = active.utcOffset;
    els.countryTimezoneHint.textContent = `Saat qurşağı: ${active.timezone} (${active.utcOffset})`;

    Object.values(COUNTRIES).forEach(c => {
      const isSelected = c.code === selectedCountryTemp;
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className = `w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
        isSelected
          ? 'bg-amber-500/25 text-amber-200 border-amber-400/50 shadow-md'
          : 'bg-slate-800/90 hover:bg-slate-700 text-slate-100 hover:text-white border-white/5 hover:border-white/20'
      }`;

      itemBtn.innerHTML = `
        <div class="flex items-center gap-2.5">
          <span class="text-base">${c.flag}</span>
          <span class="font-bold tracking-wide">${c.name}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
            isSelected ? 'bg-amber-400/30 text-amber-100 border border-amber-400/40' : 'bg-white/10 text-slate-300'
          }">${c.utcOffset}</span>
          ${isSelected ? '<span class="text-amber-300 font-bold text-sm">✓</span>' : ''}
        </div>
      `;

      itemBtn.onclick = (e) => {
        e.stopPropagation();
        selectedCountryTemp = c.code;
        renderCountryDropdown();
        els.countryDropdownMenu.classList.add('hidden');
        if (els.countryChevron) els.countryChevron.classList.remove('rotate-180');
        els.settingCityName.value = c.defaultCity;
        const tzLabel = formatTimezoneLabel(c, c.defaultCity);
        els.countryTimezoneHint.textContent = `Saat qurşağı: ${tzLabel}`;
      };

      els.countryDropdownMenu.appendChild(itemBtn);
    });
  }

  function formatTimezoneLabel(country, city) {
    const userCity = (city || '').trim();
    if (!userCity) {
      return `${country.timezone} (${country.utcOffset})`;
    }
    if (userCity.includes('/')) {
      return `${userCity} (${country.utcOffset})`;
    }
    const continent = (country.timezone && country.timezone.includes('/'))
      ? country.timezone.split('/')[0]
      : 'Asia';
    const formattedCity = userCity.charAt(0).toUpperCase() + userCity.slice(1);
    return `${continent}/${formattedCity} (${country.utcOffset})`;
  }

  function applyLanguage() {
    const country = getActiveCountry();
    const t = getI18n();

    if (els.countryFlagIcon) els.countryFlagIcon.textContent = country.flag;
    if (els.countryNameText) els.countryNameText.textContent = country.name.split(' ')[0];
    const tzLabel = formatTimezoneLabel(country, appState.settings.cityName);
    els.timeZoneInfo.textContent = tzLabel;
    els.countryTimezoneHint.textContent = `Saat qurşağı: ${tzLabel}`;

    const eng = SEARCH_ENGINES[appState.settings.searchEngine] || SEARCH_ENGINES.google;
    els.searchInput.placeholder = `${eng.name} — ${t.searchPlaceholder}`;

    els.randomQuoteBtnLabel.textContent = t.randomQuoteBtn;

    els.zenExitText.textContent = t.zenExit;

    els.todoDrawerTitle.textContent = t.todoDrawerTitle;
    els.newTodoInput.placeholder = t.newTodoPlaceholder;
    els.scratchpadTitle.textContent = t.notesTitle;
    els.scratchpadArea.placeholder = t.notesPlaceholder;

    els.settingsHeading.textContent = t.settingsHeading;
    els.lblCountryLang.querySelector('span:first-child').textContent = t.lblCountryLang;
    els.lblTheme.textContent = t.lblTheme;
    els.lblCity.textContent = t.lblCity;
    els.lbl24Hour.textContent = t.lbl24Hour;
    els.lblSeconds.textContent = t.lblSeconds;
    els.lblWeather.textContent = t.lblWeather;
    els.lblShortcuts.textContent = t.lblShortcuts;
    els.lblQuotes.textContent = t.lblQuotes;
    els.saveSettingsBtn.textContent = t.saveBtn;

    cycleQuote();
  }

  async function fetchWeather() {
    if (!appState.settings.showWeather) {
      els.weatherPill.style.display = 'none';
      return;
    }
    els.weatherPill.style.display = 'flex';

    const country = getActiveCountry();
    const city = appState.settings.cityName || country.defaultCity;
    const lat = country.lat || 40.4093;
    const lon = country.lon || 49.8671;

    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();
      const current = data.current_weather;
      if (current) {
        const temp = Math.round(current.temperature);
        els.weatherTemp.textContent = `${temp > 0 ? '+' : ''}${temp}°C`;
        els.weatherIcon.textContent = getWeatherIcon(current.weathercode, current.is_day);
        els.weatherCity.textContent = city;
      }
    } catch (e) {
      els.weatherTemp.textContent = '19°C';
      els.weatherIcon.textContent = '⛅';
      els.weatherCity.textContent = city;
    }
  }

  function getWeatherIcon(code, isDay = 1) {
    if (code === 0) return isDay ? '☀️' : '🌙';
    if ([1, 2].includes(code)) return isDay ? '🌤️' : '☁️';
    if ([3, 45, 48].includes(code)) return '☁️';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⚡';
    return '⛅';
  }

  function applyTheme(themeName) {
    els.appBody.classList.remove('theme-cosmic', 'theme-aurora', 'theme-cyber', 'theme-sunset', 'theme-minimal');
    els.appBody.classList.add(`theme-${themeName}`);

    if (themeName === 'aurora') {
      els.solarCore.className = 'relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-emerald-500/30 via-teal-600/20 to-cyan-600/30 backdrop-blur-xl border border-emerald-400/40 shadow-[0_0_80px_rgba(16,185,129,0.35)] flex items-center justify-center animate-pulse-slow';
      els.solarRays.className = 'absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-emerald-400/20 animate-spin-slow pointer-events-none flex items-center justify-center';
    } else if (themeName === 'cyber') {
      els.solarCore.className = 'relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-purple-600/20 to-cyan-600/30 backdrop-blur-xl border border-fuchsia-400/40 shadow-[0_0_80px_rgba(217,70,239,0.35)] flex items-center justify-center animate-pulse-slow';
      els.solarRays.className = 'absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-fuchsia-400/20 animate-spin-slow pointer-events-none flex items-center justify-center';
    } else if (themeName === 'sunset') {
      els.solarCore.className = 'relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-rose-500/35 via-orange-600/20 to-amber-600/30 backdrop-blur-xl border border-rose-400/40 shadow-[0_0_80px_rgba(244,63,94,0.35)] flex items-center justify-center animate-pulse-slow';
      els.solarRays.className = 'absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-orange-400/20 animate-spin-slow pointer-events-none flex items-center justify-center';
    } else if (themeName === 'minimal') {
      els.solarCore.className = 'relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] flex items-center justify-center';
      els.solarRays.className = 'absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-white/10 animate-spin-slow pointer-events-none flex items-center justify-center';
    } else {
      
      els.solarCore.className = 'relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-amber-400/35 via-amber-600/20 to-orange-600/30 backdrop-blur-xl border border-amber-400/40 shadow-[0_0_80px_rgba(245,158,11,0.35)] flex items-center justify-center animate-pulse-slow';
      els.solarRays.className = 'absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-amber-400/20 animate-spin-slow pointer-events-none flex items-center justify-center';
    }

    document.querySelectorAll('.theme-btn').forEach(btn => {
      if (btn.dataset.theme === themeName) {
        btn.classList.add('border-amber-400', 'bg-amber-500/10');
        btn.classList.remove('border-white/10', 'bg-white/5');
      } else {
        btn.classList.remove('border-amber-400', 'bg-amber-500/10');
        btn.classList.add('border-white/10', 'bg-white/5');
      }
    });
  }

  function renderShortcuts() {
    if (!appState.settings.showShortcuts) {
      els.shortcutsContainer.style.display = 'none';
      return;
    }
    els.shortcutsContainer.style.display = 'block';
    els.shortcutsGrid.innerHTML = '';

    appState.shortcuts.forEach((sc, idx) => {
      const card = document.createElement('div');
      card.className = 'group relative flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] transition-all duration-200 cursor-pointer w-20 md:w-24 text-center border-0 hover:-translate-y-1';

      const delBtn = document.createElement('button');
      delBtn.className = 'hidden group-hover:flex absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] items-center justify-center shadow-lg hover:scale-110 transition-transform';
      delBtn.innerHTML = '✕';
      delBtn.title = 'Sil';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteShortcut(idx);
      };

      const iconBox = document.createElement('div');
      iconBox.className = 'w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden border-0 transition-transform group-hover:scale-110';

      let domain = '';
      try {
        const fullUrl = (sc.url.startsWith('http://') || sc.url.startsWith('https://')) ? sc.url : 'https://' + sc.url;
        domain = new URL(fullUrl).hostname;
      } catch (e) {
        domain = sc.url.replace(/^https?:\/\//, '').split('/')[0];
      }

      const img = document.createElement('img');
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      img.alt = sc.title || domain;
      img.className = 'w-7 h-7 object-contain drop-shadow-md border-0';
      img.onerror = () => {
        img.onerror = () => {
          iconBox.innerHTML = '';
          const fallback = document.createElement('span');
          fallback.className = 'text-xs font-bold text-amber-300';
          fallback.textContent = (sc.title || domain || '🔗').charAt(0).toUpperCase();
          iconBox.appendChild(fallback);
        };
        img.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
      };
      iconBox.appendChild(img);

      const label = document.createElement('span');
      label.className = 'text-[11px] font-medium text-slate-300 truncate w-full group-hover:text-white transition-colors';
      label.textContent = sc.title;

      card.appendChild(delBtn);
      card.appendChild(iconBox);
      card.appendChild(label);

      card.onclick = () => {
        window.location.href = sc.url;
      };

      els.shortcutsGrid.appendChild(card);
    });

    const addCard = document.createElement('div');
    addCard.className = 'group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer w-20 md:w-24 text-center border-0 hover:-translate-y-1 text-slate-400 hover:text-amber-300';
    addCard.innerHTML = `
      <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-xl border-0 transition-transform group-hover:scale-110">+</div>
      <span class="text-[11px] font-medium">${getI18n().addShortcut || 'Əlavə et'}</span>
    `;
    addCard.onclick = () => openShortcutModal();
    els.shortcutsGrid.appendChild(addCard);
  }

  function deleteShortcut(idx) {
    appState.shortcuts.splice(idx, 1);
    Storage.set('nova_shortcuts', appState.shortcuts);
    renderShortcuts();
  }

  function openShortcutModal() {
    els.modalShortcutTitle.value = '';
    els.modalShortcutUrl.value = '';
    if (els.modalShortcutIcon) els.modalShortcutIcon.value = '';
    els.shortcutModal.classList.remove('hidden');
    els.modalShortcutTitle.focus();
  }

  function closeShortcutModal() {
    els.shortcutModal.classList.add('hidden');
  }

  function saveShortcut() {
    let title = els.modalShortcutTitle.value.trim();
    let url = els.modalShortcutUrl.value.trim();

    if (!url) {
      alert('Zəhmət olmasa link daxil edin');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!title) {
      try {
        const host = new URL(url).hostname.replace('www.', '');
        title = host.split('.')[0];
        title = title.charAt(0).toUpperCase() + title.slice(1);
      } catch (e) {
        title = url;
      }
    }

    appState.shortcuts.push({
      id: Date.now().toString(),
      title,
      url
    });

    Storage.set('nova_shortcuts', appState.shortcuts);
    renderShortcuts();
    closeShortcutModal();
  }

  function updateSearchEngineUI(engineKey) {
    const engine = SEARCH_ENGINES[engineKey] || SEARCH_ENGINES.google;
    els.currentEngineIcon.textContent = engine.icon;
    els.currentEngineName.textContent = engine.name;
    const t = getI18n();
    els.searchInput.placeholder = `${engine.name} — ${t.searchPlaceholder}`;
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const query = els.searchInput.value.trim();
    const isUrl = query.startsWith('http://') || query.startsWith('https://') || (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(query) && !query.includes(' '));
    if (isUrl) {
      window.location.href = query.startsWith('http') ? query : `https://${query}`;
      return;
    }

    const engine = SEARCH_ENGINES[appState.settings.searchEngine] || SEARCH_ENGINES.google;
    window.location.href = `${engine.queryUrl}${encodeURIComponent(query)}`;
  }

  function toggleZenMode(forceState) {
    appState.isZenMode = forceState !== undefined ? forceState : !appState.isZenMode;
    if (appState.isZenMode) {
      els.topBar.style.opacity = '0';
      els.topBar.style.pointerEvents = 'none';
      els.bottomBar.style.opacity = '0';
      els.bottomBar.style.pointerEvents = 'none';
      els.shortcutsContainer.style.opacity = '0';
      els.shortcutsContainer.style.pointerEvents = 'none';
      els.quoteContainer.style.opacity = '0';
      els.zenExitBar.classList.remove('hidden');
    } else {
      els.topBar.style.opacity = '1';
      els.topBar.style.pointerEvents = 'auto';
      els.bottomBar.style.opacity = '1';
      els.bottomBar.style.pointerEvents = 'auto';
      els.shortcutsContainer.style.opacity = '1';
      els.shortcutsContainer.style.pointerEvents = 'auto';
      els.quoteContainer.style.opacity = '1';
      els.zenExitBar.classList.add('hidden');
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.warn(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function renderTodos() {
    els.todoList.innerHTML = '';
    const pendingCount = appState.todos.filter(t => !t.completed).length;

    if (pendingCount > 0) {
      els.todoBadge.textContent = pendingCount;
      els.todoBadge.classList.remove('hidden');
    } else {
      els.todoBadge.classList.add('hidden');
    }

    const t = getI18n();
    if (appState.todos.length === 0) {
      els.todoList.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">${t.emptyTodos || 'Heç bir hədəf yoxdur.'}</p>`;
      return;
    }

    appState.todos.forEach((todo, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between p-2.5 rounded-xl glass-pill gap-2';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-2.5 flex-1 min-w-0';

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = todo.completed;
      check.className = 'w-4 h-4 accent-amber-500 rounded cursor-pointer';
      check.onchange = () => {
        todo.completed = check.checked;
        Storage.set('nova_todos', appState.todos);
        renderTodos();
      };

      const text = document.createElement('span');
      text.className = `text-xs text-slate-200 truncate ${todo.completed ? 'line-through opacity-50' : ''}`;
      text.textContent = todo.text;

      left.appendChild(check);
      left.appendChild(text);

      const del = document.createElement('button');
      del.className = 'text-slate-400 hover:text-rose-400 text-xs px-1.5 py-0.5 rounded';
      del.textContent = '✕';
      del.title = 'Sil';
      del.onclick = () => {
        appState.todos.splice(idx, 1);
        Storage.set('nova_todos', appState.todos);
        renderTodos();
      };

      item.appendChild(left);
      item.appendChild(del);
      els.todoList.appendChild(item);
    });
  }

  function addTodo() {
    const text = els.newTodoInput.value.trim();
    if (!text) return;
    appState.todos.unshift({ id: Date.now().toString(), text, completed: false });
    Storage.set('nova_todos', appState.todos);
    els.newTodoInput.value = '';
    renderTodos();
  }

  const STOIC_QUOTES_AZ = [
    { text: "Xarici hadisələrə deyil, yalnız öz fikirlərinə hökm edə bilərsən. Bunu anlasan, sarsılmaz güc tapacaqsan.", author: "Markus Avreli" },
    { text: "Həqiqətdə əziyyət çəkdiyimizdən daha çox, təxəyyülümüzdə əziyyət çəkirik.", author: "Seneka" },
    { text: "İnsanları narahat edən hadisələrin özü deyil, həmin hadisələrə verdikləri mənalardır.", author: "Epiktet" },
    { text: "Təbiətlə harmoniyada yaşamaq ən böyük müdriklikdir.", author: "Kitiyalı Zenon" },
    { text: "Səhər yuxudan oyananda düşün: nəfəs almaq, düşünmək, sevmək və yaşamaq necə böyük bir imtiyazdır.", author: "Markus Avreli" },
    { text: "Vaxtımız az deyil, sadəcə onun çox hissəsini boş yerə xərcləyirik.", author: "Seneka" },
    { text: "Nəzarət edə bilmədiyin şeylər üçün narahat olmağı dayandır. Əsl azadlıq budur.", author: "Epiktet" },
    { text: "Ən yaxşı intiqam — sənə pislik edən insana bənzəməməkdir.", author: "Markus Avreli" },
    { text: "Küləyin istiqamətini bilməyən gəmiyə heç bir külək kömək edə bilməz.", author: "Seneka" },
    { text: "İki qulağımız və bir dilimiz var ki, danışdığımızdan iki dəfə çox dinləyək.", author: "Kitiyalı Zenon" },
    { text: "Önündəki maneə sənin yoluna çevrilir. Maneənin özü hərəkəti irəli aparır.", author: "Markus Avreli" },
    { text: "Çətinliklər ağıllı insanları gücləndirir, eynilə zəhmətin bədəni möhkəmləndirdiyi kimi.", author: "Seneka" },
    { text: "Əgər inkişaf etmək istəyirsənsə, bəzi şeylərdə məlumatsız görünməkdən çəkinmə.", author: "Epiktet" },
    { text: "Yaxşı bir insan olmağın necəliyi haqqında mübahisə etməyi burax; sadəcə yaxşı insan ol.", author: "Markus Avreli" },
    { text: "Ən böyük səltənət — öz nəfsinə və duyğularına hakim olmaqdır.", author: "Seneka" },
    { text: "Sənin azadlığın başqasının əlində deyil, yalnız öz seçimlərindədir.", author: "Epiktet" },
    { text: "Xoşbəxtlik həyatın maneəsiz və sakit axışıdır.", author: "Kitiyalı Zenon" },
    { text: "Həyatımız düşüncələrimizin rənginə boyanır.", author: "Markus Avreli" },
    { text: "Heç bir fırtına ilə qarşılaşmamış dənizçi təcrübəli sayıla bilməz.", author: "Seneka" },
    { text: "Səni incidən insan deyil, sənin o hadisəyə inciklik kimi baxmağındır.", author: "Epiktet" },
    { text: "Çətinliklə qazanılan fəzilət həmişə qalır, amma asan həzz dərhal yox olur.", author: "Musoni Ruf" },
    { text: "İtki bir dəyişiklikdən başqa bir şey deyil, dəyişiklik isə təbiətin ən böyük qanunudur.", author: "Markus Avreli" },
    { text: "Gələcəkdən qorxan insan, indiki anın gözəlliyini yaşaya bilməz.", author: "Seneka" },
    { text: "Mən yalnız deməyə dəyər bir sözüm olanda danışmağa başlayıram.", author: "Katon" },
    { text: "Ağrıdan qorxmaq, ağrının özündən daha çox əzab verir.", author: "Musoni Ruf" }
  ];

  let lastStoicQuoteIdx = -1;

  function cycleQuote() {
    const t = getI18n();
    const list = (t.stoicQuotes && t.stoicQuotes.length) ? t.stoicQuotes : STOIC_QUOTES_AZ;

    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * list.length);
    } while (list.length > 1 && nextIdx === lastStoicQuoteIdx);
    lastStoicQuoteIdx = nextIdx;

    const q = list[nextIdx] || list[0];
    if (typeof q === 'object' && q.text) {
      els.quoteText.textContent = `"${q.text}"`;
      if (els.quoteAuthor) {
        els.quoteAuthor.textContent = `— ${q.author || 'Stoisizm'}`;
      }
    } else {
      els.quoteText.textContent = `"${q}"`;
      if (els.quoteAuthor) els.quoteAuthor.textContent = '';
    }

    if (getActiveCountry().lang === 'en') {
      fetchOnlineStoicQuote();
    }
  }

  async function fetchOnlineStoicQuote() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://stoic-quotes.com/api/quote', { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && data.text && data.author && getActiveCountry().lang === 'en') {
          els.quoteText.textContent = `"${data.text}"`;
          if (els.quoteAuthor) els.quoteAuthor.textContent = `— ${data.author}`;
        }
      }
    } catch (e) {
      
    }
  }

  function openSettings() {
    selectedCountryTemp = appState.settings.country;
    renderCountryDropdown();
    if (els.countryDropdownMenu) els.countryDropdownMenu.classList.add('hidden');
    if (els.countryChevron) els.countryChevron.classList.remove('rotate-180');
    els.settingCityName.value = appState.settings.cityName;
    const country = getActiveCountry();
    const tzLabel = formatTimezoneLabel(country, appState.settings.cityName);
    els.countryTimezoneHint.textContent = `Saat qurşağı: ${tzLabel}`;
    els.toggle24Hour.checked = appState.settings.is24Hour;
    els.toggleSeconds.checked = appState.settings.showSeconds;
    els.toggleWeather.checked = appState.settings.showWeather;
    els.toggleShortcuts.checked = appState.settings.showShortcuts;
    els.toggleQuotes.checked = appState.settings.showQuotes;
    els.settingsModal.classList.remove('hidden');
  }

  function closeSettings() {
    if (els.countryDropdownMenu) els.countryDropdownMenu.classList.add('hidden');
    if (els.countryChevron) els.countryChevron.classList.remove('rotate-180');
    els.settingsModal.classList.add('hidden');
  }

  function saveSettings() {
    const selectedCountry = selectedCountryTemp;
    const countryChanged = selectedCountry !== appState.settings.country;

    appState.settings.country = selectedCountry;
    
    if (countryChanged && (!els.settingCityName.value.trim() || els.settingCityName.value === COUNTRIES[appState.settings.country]?.defaultCity)) {
      appState.settings.cityName = COUNTRIES[selectedCountry]?.defaultCity || '';
    } else {
      appState.settings.cityName = els.settingCityName.value.trim() || COUNTRIES[selectedCountry]?.defaultCity || 'Bakı';
    }

    appState.settings.is24Hour = els.toggle24Hour.checked;
    appState.settings.showSeconds = els.toggleSeconds.checked;
    appState.settings.showWeather = els.toggleWeather.checked;
    appState.settings.showShortcuts = els.toggleShortcuts.checked;
    appState.settings.showQuotes = els.toggleQuotes.checked;

    els.quoteContainer.style.display = appState.settings.showQuotes ? 'block' : 'none';

    Storage.set('nova_settings', appState.settings);
    applyLanguage();
    updateClock();
    fetchWeather();
    renderShortcuts();
    closeSettings();
  }

  function initEvents() {
    
    els.clockTrigger.addEventListener('click', () => {
      appState.settings.is24Hour = !appState.settings.is24Hour;
      Storage.set('nova_settings', appState.settings);
      updateClock();
    });

    if (els.countryPill) {
      els.countryPill.addEventListener('click', openSettings);
    }

    els.searchEngineBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      els.engineDropdown.classList.toggle('hidden');
    });

    document.querySelectorAll('.engine-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = btn.dataset.engine;
        appState.settings.searchEngine = eng;
        Storage.set('nova_settings', appState.settings);
        updateSearchEngineUI(eng);
        els.engineDropdown.classList.add('hidden');
        els.searchInput.focus();
      });
    });

    els.searchForm.addEventListener('submit', handleSearchSubmit);

    els.weatherPill.addEventListener('click', () => {
      fetchWeather();
    });

    els.settingCityName.addEventListener('input', () => {
      const customCity = els.settingCityName.value.trim();
      const country = COUNTRIES[selectedCountryTemp] || getActiveCountry();
      const tzLabel = formatTimezoneLabel(country, customCity);
      els.countryTimezoneHint.textContent = `Saat qurşağı: ${tzLabel}`;
    });

    els.zenBtn.addEventListener('click', () => toggleZenMode());
    els.zenExitBtn.addEventListener('click', () => toggleZenMode(false));

    els.fullscreenBtn.addEventListener('click', toggleFullscreen);

    els.randomQuoteBtn.addEventListener('click', () => {
      els.quoteContainer.style.opacity = '0';
      setTimeout(() => {
        cycleQuote();
        els.quoteContainer.style.opacity = '1';
      }, 150);
    });

    els.todoToggleBtn.addEventListener('click', () => {
      els.todoDrawer.classList.toggle('translate-x-full');
    });
    els.closeTodoDrawer.addEventListener('click', () => {
      els.todoDrawer.classList.add('translate-x-full');
    });
    els.addTodoBtn.addEventListener('click', addTodo);
    els.newTodoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addTodo();
    });

    let scratchDebounce;
    els.scratchpadArea.addEventListener('input', () => {
      const t = getI18n();
      els.noteSavedStatus.textContent = t.notesSaving || 'Saxlanılır...';
      clearTimeout(scratchDebounce);
      scratchDebounce = setTimeout(() => {
        appState.scratchpad = els.scratchpadArea.value;
        Storage.set('nova_scratchpad', appState.scratchpad);
        els.noteSavedStatus.textContent = t.notesSaved || 'Yadda saxlanıldı ✓';
      }, 500);
    });

    els.settingsBtn.addEventListener('click', openSettings);
    els.closeSettingsModal.addEventListener('click', closeSettings);
    els.saveSettingsBtn.addEventListener('click', saveSettings);

    if (els.countryDropdownBtn) {
      els.countryDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        els.countryDropdownMenu.classList.toggle('hidden');
        if (els.countryChevron) els.countryChevron.classList.toggle('rotate-180');
      });
    }

    els.themeSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-btn');
      if (btn && btn.dataset.theme) {
        appState.settings.theme = btn.dataset.theme;
        Storage.set('nova_settings', appState.settings);
        applyTheme(btn.dataset.theme);
      }
    });

    els.addShortcutHeaderBtn.addEventListener('click', openShortcutModal);
    els.closeShortcutModal.addEventListener('click', closeShortcutModal);
    els.cancelShortcutModal.addEventListener('click', closeShortcutModal);
    els.saveShortcutModal.addEventListener('click', saveShortcut);

    window.addEventListener('keydown', (e) => {
      const isTyping = document.activeElement && (
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA' || 
        document.activeElement.isContentEditable
      );

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        els.searchInput.focus();
        els.searchInput.select();
      }
      if (e.key === 'Escape') {
        els.engineDropdown.classList.add('hidden');
        els.shortcutModal.classList.add('hidden');
        els.settingsModal.classList.add('hidden');
        if (els.countryDropdownMenu) els.countryDropdownMenu.classList.add('hidden');
        if (els.countryChevron) els.countryChevron.classList.remove('rotate-180');
        els.todoDrawer.classList.add('translate-x-full');
        if (appState.isZenMode) toggleZenMode(false);
      }
      if ((e.key === 'f' || e.key === 'F') && !isTyping) {
        toggleZenMode();
      }
    });

    window.addEventListener('click', (e) => {
      if (!els.searchEngineBtn.contains(e.target) && !els.engineDropdown.contains(e.target)) {
        els.engineDropdown.classList.add('hidden');
      }
      if (els.countryDropdownBtn && !els.countryDropdownBtn.contains(e.target) && !els.countryDropdownMenu.contains(e.target)) {
        els.countryDropdownMenu.classList.add('hidden');
        if (els.countryChevron) els.countryChevron.classList.remove('rotate-180');
      }
    });
  }

  async function init() {
    
    await syncNetworkTime();

    const savedSettings = await Storage.get('nova_settings', DEFAULT_SETTINGS);
    const savedShortcuts = await Storage.get('nova_shortcuts', DEFAULT_SHORTCUTS);
    const savedTodos = await Storage.get('nova_todos', []);
    const savedScratch = await Storage.get('nova_scratchpad', '');

    appState.settings = { ...DEFAULT_SETTINGS, ...savedSettings };
    appState.shortcuts = Array.isArray(savedShortcuts) ? savedShortcuts : DEFAULT_SHORTCUTS;
    appState.todos = Array.isArray(savedTodos) ? savedTodos : [];
    appState.scratchpad = savedScratch || '';

    selectedCountryTemp = appState.settings.country;
    renderCountryDropdown();
    applyTheme(appState.settings.theme);
    applyLanguage();
    updateSearchEngineUI(appState.settings.searchEngine);
    els.scratchpadArea.value = appState.scratchpad;
    els.quoteContainer.style.display = appState.settings.showQuotes ? 'block' : 'none';

    updateClock();
    setInterval(updateClock, 500);

    setInterval(syncNetworkTime, 600000);

    fetchWeather();

    renderShortcuts();
    renderTodos();
    cleanExternalAttributions();
    try {
      const observer = new MutationObserver(cleanExternalAttributions);
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}

    initEvents();
  }

  function cleanExternalAttributions() {
    try {
      document.querySelectorAll('a, div, footer, span, iframe').forEach(el => {
        if (!el || el === document.body || el === document.documentElement) return;
        if (els.topBar?.contains(el) || els.bottomBar?.contains(el) || els.solarRingContainer?.contains(el)) return;
        if (els.settingsModal?.contains(el) || els.shortcutModal?.contains(el) || els.todoDrawer?.contains(el)) return;
        
        const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
        const href = (el.getAttribute && el.getAttribute('href')) || '';
        if (txt.includes('voidtab') || txt.includes('novatab') || txt.includes('customize brave') || href.includes('chrome://extensions') || href.includes('brave://extensions')) {
          el.remove();
        }
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
