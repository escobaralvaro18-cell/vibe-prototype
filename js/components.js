// ============================================================================
// Alpine.data() — componentes reutilizables en varias páginas.
// Cada componente es pequeño y auto-contenido. Se registran en alpine:init.
//
// Uso: <div x-data="header"></div>
// ============================================================================

document.addEventListener('alpine:init', () => {

  // -------- HEADER --------------------------------------------------------
  // Header unificado: logo + nav + acciones + country picker.
  // Se incluye en TODAS las páginas (copia manual del partial).
  Alpine.data('header', () => ({
    scrolled: false,

    init() {
      // Header se condensa al hacer scroll (solo en home, según CSS).
      const onScroll = () => {
        this.scrolled = window.scrollY > 8;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    // Abre el overlay de búsqueda global.
    openSearch() {
      this.$store.ui.searchOverlayOpen = true;
    },

    // Toggle del menú móvil.
    toggleMenu() {
      this.$store.ui.toggleMenu();
    },

    // Cambia país activo (afecta filtro del home grid).
    pickCountry(code) {
      this.$store.ui.setCountry(code);
    },
  }));

  // -------- COUNTRY PICKER ------------------------------------------------
  // Popover anclado al trigger "Explorando eventos en <País> ▾" del home.
  // Maneja open/close, click-outside, Escape, y delega a `$store.ui.setCountry`.
  //
  // Uso:
  //   <span class="event-country-anchor" x-data="countryPicker">
  //     <button @click="toggle()" :class="{ 'is-open': open, 'has-country': selected }">...</button>
  //     <div class="country-picker-popover" :class="{ 'is-open': open }">
  //       <button @click="pick('ALL')" :class="{ 'is-active': !selected }">...</button>
  //       <button @click="pick('CR')"  :class="{ 'is-active': selected === 'CR' }">...</button>
  //       ...
  //     </div>
  //   </span>
  //
  // Getters: selected (código actual o null), label (nombre a mostrar).
  Alpine.data('countryPicker', () => ({
    open: false,

    init() {
      // Cierra al hacer click fuera del ancla (no del botón ni del popover).
      this._docListener = (e) => {
        if (!this.open) return;
        if (this.$el && !this.$el.contains(e.target)) this.open = false;
      };
      document.addEventListener('click', this._docListener);
      // Cierra con Escape.
      this._keyListener = (e) => {
        if (e.key === 'Escape' && this.open) this.open = false;
      };
      document.addEventListener('keydown', this._keyListener);
    },
    destroy() {
      if (this._docListener) document.removeEventListener('click', this._docListener);
      if (this._keyListener) document.removeEventListener('keydown', this._keyListener);
    },

    get selected() { return this.$store.ui?.country || null; },
    get label() {
      const c = this.selected;
      if (!c) return 'Centroamérica';
      return (window.COUNTRY_DATA && window.COUNTRY_DATA[c]?.name) || c;
    },

    toggle() { this.open = !this.open; },
    close()  { this.open = false; },

    // Selecciona un país y cierra. 'ALL' → sin filtro.
    pick(code) {
      this.$store.ui.setCountry(code);
      this.open = false;
    },
  }));

  // -------- SEARCH OVERLAY ------------------------------------------------
  // Overlay global de búsqueda. Se monta en index.html y event.html (mismo
  // markup). Se abre/cierra vía $store.ui.searchOverlayOpen.
  //
  // Features:
  //   • Index construido dinámicamente desde EVENT_DATA (fuente única).
  //   • Reactivo: el input actualiza `query`, `results` recomputa.
  //   • Sugerencias (géneros/ciudades/artistas) como pills cuando query vacío.
  //   • Búsquedas recientes persistidas en localStorage (top 5).
  //   • Highlight del match en título/venue.
  //   • Navegación con flechas ↑↓ + Enter.
  //   • Botón X dentro del input para limpiar sin cerrar overlay.
  //   • Empty state amigable con sugerencias.
  //
  // Uso:
  //   <div x-data="searchOverlay"
  //        :class="{ 'is-open': $store.ui?.searchOverlayOpen }"
  //        x-effect="if ($store.ui?.searchOverlayOpen) onOpen()">
  //     <input x-model="query" @keydown.arrow-down.prevent="cursor++" ...>
  //     <template x-for="(r, i) in results">...</template>
  //   </div>
  Alpine.data('searchOverlay', () => ({
    query: '',
    cursor: -1,                // índice del resultado resaltado con flechas
    recent: [],                // últimas búsquedas (máx 5)
    _docListener: null,

    // Sugerencias curadas — pills arriba del grid cuando query vacío.
    // Al click, llenan el input y ejecutan la búsqueda.
    suggestions: [
      'Yatra', 'Bad Bunny', 'Karol G', 'Arcángel', 'Morat',
      'Reggaetón', 'Pop Latino', 'San José', 'Estadio Nacional', 'Costa Rica',
    ],

    init() {
      // Carga búsquedas recientes de localStorage.
      try {
        const raw = localStorage.getItem('vibe_search_recent');
        if (raw) this.recent = JSON.parse(raw).slice(0, 5);
      } catch { this.recent = []; }

      // Cierra con Escape (handler global porque el overlay es hijo del body
      // y Alpine `@keydown.escape.window` ya existe en el markup para cerrar).
    },

    // Se llama desde x-effect al abrir: limpia query, foco al input.
    onOpen() {
      this.query = '';
      this.cursor = -1;
      this.$nextTick(() => {
        if (this.$refs.input) this.$refs.input.focus();
      });
    },

    close() {
      if (this.$store.ui) this.$store.ui.searchOverlayOpen = false;
    },

    // Construye el index de búsqueda lazily, desde EVENT_DATA.
    // Memoizado en _indexCache (declarado abajo): si EVENT_DATA no cambia,
    // no lo reconstruye en cada access.
    get index() {
      if (this._indexCache) return this._indexCache;
      const data = window.EVENT_DATA || {};
      // HTML → texto plano (el title viene con <br>/<em>).
      const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      // Normaliza acentos (ñ/á/é/í/ó/ú) para que "san jose" matchee "San José".
      const norm = (s) => String(s || '').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const rows = [];
      for (const id in data) {
        const ev = data[id];
        if (!ev) continue;
        const title = strip(ev.title);
        const kicker = strip(ev.kicker || '');
        const venue = strip(ev.venue || '');
        const city = strip(ev.city || '');
        const date = strip(ev.date || '');
        const price = strip(ev.price || '');
        const bg = ev.bg || '';
        rows.push({
          id, title, kicker, venue, city, date, price, bg,
          // haystack sin acentos para filtrar rápido + accent-insensitive
          _hay: norm([title, kicker, venue, city].join(' ')),
        });
      }
      this._indexCache = rows;
      return rows;
    },
    _indexCache: null,

    // Resultados filtrados. Si query vacío → primeros 8 eventos como "destacados".
    get results() {
      const raw = (this.query || '').trim().toLowerCase();
      if (!raw) return this.index.slice(0, 8);
      // Normaliza el query: "San José" y "san jose" deben matchear lo mismo.
      const q = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      // Split por palabras: todas deben matchear (AND).
      const parts = q.split(/\s+/).filter(Boolean);
      return this.index.filter(r => parts.every(p => r._hay.includes(p)));
    },

    get isEmpty() {
      return !!(this.query || '').trim() && this.results.length === 0;
    },

    // Resalta el match en un texto dado. Devuelve HTML con <mark>.
    // Safe: escapa HTML primero, luego aplica highlights.
    // Accent-insensitive: la query "yatra" matchea "Yátra" si lo hubiera.
    highlight(text) {
      const raw = String(text || '');
      const q = (this.query || '').trim();
      const esc = (s) => s.replace(/[&<>"']/g, c => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
      }[c]));
      if (!q) return esc(raw);
      // Normaliza ambos lados para encontrar los rangos, pero marca sobre
      // el texto original (con acentos) para no romper "Sebastián" → "Sebastian".
      const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const parts = q.split(/\s+/).filter(Boolean)
        .map(p => norm(p).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      if (!parts.length) return esc(raw);
      const normText = norm(raw);
      const re = new RegExp('(' + parts.join('|') + ')', 'gi');
      // Encuentra rangos en normText (mismos offsets que raw al ser NFD + combining removal
      // preserva índices uno-a-uno cuando los caracteres base son ASCII; para acentos
      // se preservan también porque NFD descompone y combining se remueve sin alterar base).
      const ranges = [];
      let m;
      while ((m = re.exec(normText)) !== null) {
        ranges.push([m.index, m.index + m[0].length]);
        if (m[0].length === 0) re.lastIndex++;
      }
      if (!ranges.length) return esc(raw);
      // Construye el HTML intercalando <mark>
      let out = '';
      let last = 0;
      for (const [s, e] of ranges) {
        out += esc(raw.slice(last, s));
        out += '<mark>' + esc(raw.slice(s, e)) + '</mark>';
        last = e;
      }
      out += esc(raw.slice(last));
      return out;
    },

    // Dispara sugerencia como si el user hubiera tecleado.
    useSuggestion(text) {
      this.query = text;
      this.cursor = -1;
      this.$nextTick(() => {
        if (this.$refs.input) this.$refs.input.focus();
      });
    },

    clearQuery() {
      this.query = '';
      this.cursor = -1;
      if (this.$refs.input) this.$refs.input.focus();
    },

    // Navega a un resultado: persiste recent + cierra overlay + navigate.
    go(result) {
      if (!result || !result.id) return;
      // Persiste query en recentes (solo si hay query real).
      const q = (this.query || '').trim();
      if (q) {
        const next = [q, ...this.recent.filter(r => r.toLowerCase() !== q.toLowerCase())].slice(0, 5);
        this.recent = next;
        try { localStorage.setItem('vibe_search_recent', JSON.stringify(next)); } catch {}
      }
      this.close();
      // navigate: event.html?id=<slug>
      location.href = 'event.html?id=' + encodeURIComponent(result.id);
    },

    clearRecent() {
      this.recent = [];
      try { localStorage.removeItem('vibe_search_recent'); } catch {}
    },

    // Navegación con teclado. Lllamado desde @keydown.arrow-down / arrow-up / enter.
    moveCursor(delta) {
      const total = this.results.length;
      if (!total) return;
      this.cursor = (this.cursor + delta + total) % total;
      // Scroll el item focuseado a la vista.
      this.$nextTick(() => {
        const el = this.$root.querySelector('.search-result-card[data-idx="' + this.cursor + '"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    },
    submitCursor() {
      const r = this.results[this.cursor] || this.results[0];
      if (r) this.go(r);
    },
  }));

  // -------- SESSION MENU --------------------------------------------------
  // Avatar + dropdown para mostrar en el header cuando hay sesión activa.
  // Drop-in reutilizable en index.html, event.html, checkout.html, auth.html.
  //
  // Uso:
  //   <div x-data="sessionMenu" x-show="$store.session.isAuthed" x-ref="...">
  //     <button @click="toggle()"><span x-text="initials.charAt(0)"></span></button>
  //     <div :class="{ active: open }">...</div>
  //   </div>
  //
  // Expone: open (bool), toggle(), close(), logout(), initials, fullName, email.
  Alpine.data('sessionMenu', () => ({
    open: false,

    init() {
      // Cierra el dropdown cuando se hace click fuera del wrap.
      // Usamos `this.$el` como ancla del componente (container raíz).
      this._docListener = (e) => {
        if (!this.open) return;
        if (this.$el && !this.$el.contains(e.target)) this.open = false;
      };
      document.addEventListener('click', this._docListener);
    },
    destroy() {
      if (this._docListener) document.removeEventListener('click', this._docListener);
    },

    toggle() { this.open = !this.open; },
    close()  { this.open = false; },

    logout() {
      this.$store.session.logout();
      if (this.$store.cart && typeof this.$store.cart.clear === 'function') {
        this.$store.cart.clear();
      }
      location.href = 'index.html';
    },

    // Getters del usuario (mismos que accountPage).
    get email() { return this.$store.session.email || ''; },
    get profile() { return this.$store.profiles.get(this.email) || {}; },
    get firstName() { return this.profile.firstName || 'Amigo'; },
    get lastName()  { return this.profile.lastName  || ''; },
    get fullName() {
      const ln = this.lastName ? (' ' + this.lastName) : '';
      return this.firstName + ln;
    },
    get initials() {
      const f = (this.firstName || 'U').charAt(0).toUpperCase();
      const l = (this.lastName  || '').charAt(0).toUpperCase();
      return (f + l) || 'U';
    },
  }));

  // -------- EVENT CARD ---------------------------------------------------
  // Card de evento en el grid del home. Stub — se refina en paso 2.
  Alpine.data('eventCard', (eventId) => ({
    eventId,
    get event() { return (window.EVENT_DATA || {})[this.eventId] || null; },
  }));

  // -------- EVENT PAGE ---------------------------------------------------
  // Página de detalle de evento. Lee ?id= de la URL y hidrata desde EVENT_DATA.
  // Maneja también el estado de preventa (countdown + código de acceso).
  // La selección de tiers vive ahora en checkout.html?step=cart (no en modal).
  Alpine.data('eventPage', () => ({
    eventId: null,
    event: null,

    // Preventa: estado de la disclosure de código + resultado de validación.
    presaleCodeOpen: false,
    presaleCode: '',
    presaleFeedback: '',      // texto mostrado al usuario
    presaleState: 'idle',     // 'idle' | 'error' | 'success'
    presaleShake: false,      // trigger de animación de error

    // Recurring (clases semanales): selección de mes/día/clase dentro del
    // calendario mensual. `calMonthKey` se inicializa al primer mes disponible.
    // `selectedDay` es el número de día (string, para matchear el schedule).
    // `selectedClassIdx` es el índice (number) del slot dentro del día seleccionado.
    // Se resetea al cambiar de mes/día, así que no necesita ser global.
    calMonthKey: null,
    selectedDay: null,
    selectedClassIdx: null,

    // Multi-date: id de la función seleccionada en el datepicker. Local al
    // componente (la selección final se persiste en $store.cart.selectedDateId
    // al hacer "Continuar con esta fecha").
    selectedDateId: null,

    // Tick reactivo (ms) para recalcular el countdown de preventa.
    _now: Date.now(),
    _tick: null,

    load() {
      const params = new URLSearchParams(location.search);
      this.eventId = params.get('id') || '';
      const data = (window.EVENT_DATA || {})[this.eventId] || null;
      this.event = data;

      // Reset de selección al cargar: el flujo confirmScheduleSelection() va
      // directo al checkout, entonces el estado "Reservado para X · Cambiar"
      // del widget nunca debería mostrarse en navegación normal. Si el user
      // vuelve (click "Volver al evento" o browser back), queremos widget
      // limpio — no en estado previo. También registra pageshow para
      // cubrir bfcache (Chrome/Safari preservan in-memory JS state al back).
      this.selectedDay = null;
      this.selectedClassIdx = null;
      window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
          this.selectedDay = null;
          this.selectedClassIdx = null;
          this.scheduleModalOpen = false;
        }
      });
      if (data) {
        const plain = String(data.title || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        document.title = 'Vibes — ' + plain;
      } else {
        document.title = 'Vibes — Evento no encontrado';
      }
      // Countdown de preventa: tick cada segundo (mientras haya evento).
      if (data) {
        this._tick = setInterval(() => { this._now = Date.now(); }, 1000);
      }
      // Recurring: arrancá en el primer mes con clases disponibles (fallback
      // a calMinMonth si no hay nada en scheduleByMonth).
      if (data && data.eventType === 'recurring') {
        const months = Object.keys(data.scheduleByMonth || {})
          .sort(this._compareMonthKeys);
        this.calMonthKey = months[0] || data.calMinMonth || null;
      }
      // Multi-date: si el usuario volvió al evento después de haber elegido
      // una fecha (ej. ya está en checkout y retrocede), pre-seleccioná la
      // misma fecha para no perder contexto. Si la fecha ya no existe en el
      // dataset actual, descartá.
      if (data && data.eventType === 'multi-date') {
        const cart = this.$store && this.$store.cart;
        if (cart && cart.eventId === this.eventId && cart.selectedDateId) {
          const exists = (data.dates || []).some(d => d.id === cart.selectedDateId);
          if (exists) this.selectedDateId = cart.selectedDateId;
        }
      }
    },
    destroy() { if (this._tick) clearInterval(this._tick); },

    // ---- preventa ---------------------------------------------------------
    get isPresale() {
      if (!this.event || !this.event.salesStart) return false;
      return new Date(this.event.salesStart).getTime() > this._now;
    },
    get presaleRemaining() {
      if (!this.isPresale) return 0;
      return new Date(this.event.salesStart).getTime() - this._now;
    },
    _pad(n) { return String(Math.max(0, Math.floor(n))).padStart(2, '0'); },
    get presaleDD() { return this._pad(this.presaleRemaining / 86400000); },
    get presaleHH() { return this._pad((this.presaleRemaining / 3600000) % 24); },
    get presaleMM() { return this._pad((this.presaleRemaining / 60000) % 60); },
    get presaleSS() { return this._pad((this.presaleRemaining / 1000) % 60); },

    // ---- hero badges ------------------------------------------------------
    // Lista de badges a mostrar junto al kicker: +18, PREVENTA PRONTO, SEMANAL.
    get heroBadges() {
      if (!this.event) return [];
      const out = [];
      if (this.event.ageRestricted) {
        out.push({ label: '+' + this.event.ageRestricted, kind: 'age' });
      }
      if (this.isPresale) {
        out.push({ label: 'PREVENTA PRONTO', kind: 'presale' });
      }
      if (this.event.eventType === 'recurring') {
        out.push({ label: 'SEMANAL', kind: 'recurring' });
      }
      return out;
    },

    // ---- código de preventa ----------------------------------------------
    togglePresaleCode() {
      this.presaleCodeOpen = !this.presaleCodeOpen;
      // Reset al abrir/cerrar
      this.presaleCode = '';
      this.presaleFeedback = '';
      this.presaleState = 'idle';
    },
    closePresaleCode() {
      this.presaleCodeOpen = false;
      this.presaleCode = '';
      this.presaleFeedback = '';
      this.presaleState = 'idle';
    },
    submitPresaleCode() {
      const code = (this.presaleCode || '').trim();
      const re = window.VALID_PRESALE_CODE_RE || /^[A-Za-z0-9]{4,}$/;
      if (code.length === 0) {
        this.presaleState = 'error';
        this.presaleFeedback = 'Ingresá tu código de acceso.';
        this._triggerShake();
        return;
      }
      if (!re.test(code)) {
        this.presaleState = 'error';
        this.presaleFeedback = 'Código no válido. Verificá con quien te lo compartió.';
        this._triggerShake();
        return;
      }
      // Válido → marcá acceso para este evento (en memoria) y navegá al cart.
      window.__presaleUnlock = window.__presaleUnlock || {};
      window.__presaleUnlock[this.eventId] = true;
      this.presaleState = 'success';
      this.presaleFeedback = 'Código válido, desbloqueando tu acceso…';
      setTimeout(() => this.goCheckout(), 900);
    },
    _triggerShake() {
      this.presaleShake = true;
      setTimeout(() => { this.presaleShake = false; }, 400);
    },

    // Navegación al checkout (step=cart con evento seteado via URL).
    goCheckout() {
      location.href = 'checkout.html?step=cart&event=' + encodeURIComponent(this.eventId);
    },

    // ---- RECURRING (calendario de clases) --------------------------------
    // Portado 1:1 del prototipo (líneas 12685-12885 del MVP_Phoenix_Project).
    // El calendario se muestra solo si eventType === 'recurring'. El usuario
    // navega meses, tapea un día con dot verde, elige una clase del slot list
    // y al confirmar se empuja al checkout como un único ticket (qty=1).
    get isRecurring() {
      return this.event && this.event.eventType === 'recurring';
    },

    // ---- Experience mode -----------------------------------------------
    // `kind === 'experience'` activa el layout ad-hoc del detail page:
    // gallery carousel en vez de poster, quick facts strip, includes/bring,
    // itinerary timeline, host card, política de cancelación prominente.
    // El schedule picker (calendar) se mantiene porque los tours + clases
    // comparten el modelo recurrente. Ver yoga→comasagua reemplazo.
    get isExperience() {
      return this.event && this.event.kind === 'experience';
    },
    // Gallery index (slide actual del carousel del hero). Solo aplica en
    // experiences — en performance events el hero es un poster estático.
    galleryIndex: 0,
    galleryNext() {
      if (!this.event || !this.event.gallery) return;
      const n = this.event.gallery.length;
      this.galleryIndex = (this.galleryIndex + 1) % n;
    },
    galleryPrev() {
      if (!this.event || !this.event.gallery) return;
      const n = this.event.gallery.length;
      this.galleryIndex = (this.galleryIndex - 1 + n) % n;
    },
    galleryGoTo(idx) {
      if (!this.event || !this.event.gallery) return;
      this.galleryIndex = Math.max(0, Math.min(idx, this.event.gallery.length - 1));
    },
    // Lightbox (modal fullscreen). Cuando está open bloqueamos scroll del body
    // y escuchamos keyboard (ESC para cerrar, ←→ para navegar — ese listener
    // está en el template del lightbox).
    lightboxOpen: false,
    openLightbox() {
      if (!this.event || !(this.event.gallery || []).length) return;
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = '';
    },

    // Schedule modal — para experiences, el calendario + slot picker viven
    // en un modal overlay (patrón Airbnb Experiences). El booking widget
    // sticky muestra un botón "Elegí tu fecha" que abre este modal.
    scheduleModalOpen: false,
    openScheduleModal() {
      this.scheduleModalOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeScheduleModal() {
      this.scheduleModalOpen = false;
      document.body.style.overflow = '';
    },
    // Confirmar selección del modal — "Confirmar selección" ahora es el CTA
    // final del picker y va directo al checkout (identity o details). Evita
    // el paso redundante de cerrar modal → clickear "Reservar mi lugar" en
    // el widget. UX: una sola acción termina el picker y abre el flow.
    confirmScheduleSelection() {
      if (!this.hasSelectedClass) return;
      this.closeScheduleModal();
      this.continueToClass();
    },

    // Helpers de parseo/comparación de "YYYY-M" (month 0..11). Prefijados con
    // _ porque son internos al componente — no se usan desde el template.
    _parseMonthKey(k) {
      const [y, m] = String(k || '').split('-').map(Number);
      return { year: y, month: m };
    },
    _makeMonthKey(year, month) { return year + '-' + month; },
    _compareMonthKeys(a, b) {
      const pa = String(a || '').split('-').map(Number);
      const pb = String(b || '').split('-').map(Number);
      return (pa[0] - pb[0]) * 12 + (pa[1] - pb[1]);
    },

    get _monthNames() {
      return ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
              'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    },
    get _dowNames() { return ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']; },

    // Schedule del mes activo. Map de día (string) → array de clases.
    get monthSchedule() {
      if (!this.isRecurring || !this.calMonthKey) return {};
      return (this.event.scheduleByMonth || {})[this.calMonthKey] || {};
    },
    // Label visible "Abril 2026"
    get monthLabel() {
      if (!this.calMonthKey) return '';
      const { year, month } = this._parseMonthKey(this.calMonthKey);
      return this._monthNames[month] + ' ' + year;
    },
    // Habilitado/deshabilitado del prev/next según min/max del evento.
    get canGoPrev() {
      if (!this.calMonthKey || !this.event) return false;
      const min = this.event.calMinMonth || this.calMonthKey;
      return this._compareMonthKeys(this.calMonthKey, min) > 0;
    },
    get canGoNext() {
      if (!this.calMonthKey || !this.event) return false;
      const max = this.event.calMaxMonth || this.calMonthKey;
      return this._compareMonthKeys(this.calMonthKey, max) < 0;
    },

    // Celdas del grid del calendario. Cada cell es:
    //   { type: 'empty' } (padding inicial antes del día 1)
    //   { type: 'day', day: '12', hasClasses: true|false, selected: bool }
    // Arrancamos con offset lun-dom (mondayStart en el proto).
    get gridCells() {
      if (!this.calMonthKey) return [];
      const { year, month } = this._parseMonthKey(this.calMonthKey);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDow = new Date(year, month, 1).getDay();    // 0=Dom..6=Sáb
      const mondayStart = (firstDow + 6) % 7;                // lunes primero
      const cells = [];
      for (let i = 0; i < mondayStart; i++) cells.push({ type: 'empty' });
      const sched = this.monthSchedule;
      for (let d = 1; d <= daysInMonth; d++) {
        const key = String(d);
        const slots = sched[key] || [];
        cells.push({
          type: 'day',
          day: key,
          hasClasses: slots.length > 0,
          selected: this.selectedDay === key,
        });
      }
      return cells;
    },

    // Clases del día actualmente seleccionado (array vacío si no hay día).
    get selectedDayClasses() {
      if (!this.selectedDay) return [];
      return this.monthSchedule[this.selectedDay] || [];
    },
    // Header "Jue 20 de Abril" del panel de clases del día.
    get selectedDayLabel() {
      if (!this.selectedDay || !this.calMonthKey) return '';
      const { year, month } = this._parseMonthKey(this.calMonthKey);
      const date = new Date(year, month, parseInt(this.selectedDay, 10));
      return this._dowNames[date.getDay()] + ' ' + this.selectedDay +
             ' de ' + this._monthNames[month];
    },
    // La clase actualmente seleccionada (para el CTA price label). Derivada
    // de selectedDay + selectedClassIdx. Null si no hay selección completa.
    get selectedClass() {
      if (this.selectedClassIdx === null || !this.selectedDay) return null;
      const slots = this.monthSchedule[this.selectedDay] || [];
      return slots[this.selectedClassIdx] || null;
    },
    // Flag corto para templates: hay una clase elegida.
    get hasSelectedClass() {
      return this.selectedClassIdx !== null && this.selectedDay !== null;
    },
    // Indica si el mes activo no tiene ninguna clase programada (empty state).
    get monthIsEmpty() {
      if (!this.isRecurring || !this.calMonthKey) return false;
      const sched = this.monthSchedule;
      if (!sched) return true;
      // Buscá al menos un día con slots.
      for (const k in sched) {
        if (Array.isArray(sched[k]) && sched[k].length > 0) return false;
      }
      return true;
    },

    // ---- interacciones del calendario -------------------------------------
    changeMonth(delta) {
      if (!this.calMonthKey || !this.event) return;
      const { year, month } = this._parseMonthKey(this.calMonthKey);
      let nm = month + delta, ny = year;
      if (nm < 0) { nm = 11; ny--; }
      if (nm > 11) { nm = 0; ny++; }
      const newKey = this._makeMonthKey(ny, nm);
      const min = this.event.calMinMonth;
      const max = this.event.calMaxMonth;
      if (min && this._compareMonthKeys(newKey, min) < 0) return;
      if (max && this._compareMonthKeys(newKey, max) > 0) return;
      this.calMonthKey = newKey;
      // Reset de selección al cambiar de mes
      this.selectedDay = null;
      this.selectedClassIdx = null;
    },

    selectDay(day) {
      const slots = this.monthSchedule[day] || [];
      if (slots.length === 0) return;
      this.selectedDay = day;
      this.selectedClassIdx = null;
    },

    selectClass(day, idx) {
      const slots = this.monthSchedule[day] || [];
      const cls = slots[idx];
      if (!cls || cls.status === 'soldout') return;
      // Sólo permitimos elegir una clase del día actualmente seleccionado.
      if (day !== this.selectedDay) this.selectedDay = day;
      this.selectedClassIdx = idx;
      // Auto-scroll al CTA "Continuar" para que el usuario vea el próximo paso
      // sin tener que buscarlo (matchea prototipo MVP_Phoenix líneas 12875-12877).
      this.$nextTick(() => {
        const cta = this.$refs && this.$refs.continueCta;
        if (cta && typeof cta.scrollIntoView === 'function') {
          cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },

    // "Continuar con esta clase" → empuja al $store.cart 1 ticket con los
    // datos de la clase y navega a checkout. Usamos `tierId = cls-<key>` para
    // que sea único y estable, y el nombre combina "ClassName · Teacher".
    continueToClass() {
      const cls = this.selectedClass;
      if (!cls) return;
      const priceNum = Number(String(cls.price).replace(/[^0-9.]/g, '')) || 0;
      const cart = this.$store.cart;
      cart.setEvent(this.eventId);
      // Reemplazá el carrito con la clase elegida (qty=1). Si el usuario
      // vuelve atrás y cambia de clase, no queremos acumular.
      const tierKey = 'cls-' + this.calMonthKey + '-' + this.selectedDay + '-' + this.selectedClassIdx;
      cart.tickets = [{
        tierId: tierKey,
        name: cls.name + ' · ' + cls.teacher + ' · ' + cls.time,
        price: priceNum,
        qty: 1,
      }];
      // Arranca el countdown igual que el flujo normal (toDetails() lo hace
      // en eventos single/GA). Sin esto, el usuario entra a checkout sin el
      // reloj de 10 min que lockea la reserva.
      cart.countdownEndsAt = Date.now() + 10 * 60 * 1000;
      // Saltá directo al step de details — en recurring la selección de
      // "cuántas entradas" no tiene sentido, ya elegiste la clase.
      location.href = 'checkout.html?step=details&event=' + encodeURIComponent(this.eventId);
    },

    // ---- MULTI-DATE (datepicker de funciones) ----------------------------
    // Portado del prototipo (líneas 12603-12684). El datepicker se muestra
    // cuando eventType === 'multi-date'. El usuario tapea una fecha del
    // scroll horizontal y se habilita la CTA "Continuar con esta fecha",
    // que guarda `selectedDateId` en $store.cart y navega a checkout?step=cart.
    get isMultiDate() {
      return this.event && this.event.eventType === 'multi-date';
    },
    get eventDates() {
      return (this.event && Array.isArray(this.event.dates)) ? this.event.dates : [];
    },
    get datesCount() { return this.eventDates.length; },
    get datesOpenCount() {
      return this.eventDates.filter(d => d.status !== 'soldout').length;
    },
    // La fecha seleccionada (objeto completo) o null.
    get selectedDate() {
      if (!this.selectedDateId) return null;
      return this.eventDates.find(d => d.id === this.selectedDateId) || null;
    },

    selectDate(dateId) {
      const date = this.eventDates.find(d => d.id === dateId);
      if (!date || date.status === 'soldout') return;
      this.selectedDateId = dateId;
      // Auto-scroll al panel de detalle + CTA (matchea prototipo línea 12676-12679).
      this.$nextTick(() => {
        const detail = this.$refs && this.$refs.selectedDateDetail;
        if (detail && typeof detail.scrollIntoView === 'function') {
          detail.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },

    // "Continuar con esta fecha" → persiste la fecha en el cart y navega al
    // paso de selección de entradas (step=cart). A diferencia de recurring
    // (donde 1 clase = 1 ticket), acá el usuario todavía tiene que elegir
    // cuántas entradas quiere de la función elegida.
    continueToDate() {
      const date = this.selectedDate;
      if (!date) return;
      const cart = this.$store.cart;
      cart.setEvent(this.eventId);
      cart.selectedDateId = this.selectedDateId;
      // Arranca el countdown: el usuario ya "commitió" una fecha.
      if (!cart.countdownEndsAt || cart.countdownEndsAt < Date.now()) {
        cart.countdownEndsAt = Date.now() + 10 * 60 * 1000;
      }
      location.href = 'checkout.html?step=cart&event=' + encodeURIComponent(this.eventId);
    },

    // ---- EVENTOS SIMILARES -----------------------------------------------
    // Carrusel al final del detalle (portado del prototipo línea 8645).
    // En el prototipo era una lista estática. Acá iteramos EVENT_DATA y
    // devolvemos hasta 6 eventos (excluyendo el actual). Devolvemos el
    // objeto completo del evento extendido con `id` para facilitar el render.
    // Sin ordenamiento sofisticado todavía — iteración en orden del catálogo.
    get similarEvents() {
      const all = window.EVENT_DATA || {};
      const out = [];
      for (const id of Object.keys(all)) {
        if (id === this.eventId) continue;
        const ev = all[id];
        if (!ev) continue;
        out.push({ id, ...ev });
        if (out.length >= 6) break;
      }
      return out;
    },

    // Fecha "corta" estilo card (ej. "VIE 7 NOV"). El detalle del evento usa
    // `event.date` ("Vie 7 Nov") pero las cards van en MAYÚSCULAS. Reformateamos
    // tomando el string tal cual y aplicando toUpperCase — si querés más
    // control (ej. abreviar "Noviembre" → "NOV") podés parsearlo después.
    formatCardDate(ev) {
      if (!ev) return '';
      const d = ev.date || '';
      const t = ev.time || '';
      return (d + (t ? ' · ' + t : '')).toUpperCase();
    },

    // Título plano para cards: EVENT_DATA.title puede traer <br>/<em> (pensado
    // para el hero del detalle). En cards lo queremos en una línea sin markup.
    // Colapsamos <br> a espacio y sacamos el resto de tags.
    cardTitle(ev) {
      if (!ev || !ev.title) return '';
      return String(ev.title)
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/?[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    },

    // Scroll horizontal del carrusel de similares. Usa x-ref="similarCarousel"
    // (en event.html) y desplaza por el ancho visible ×0.9 para que quede algo
    // de overlap visual (matchea el comportamiento de scrollCarousel del
    // prototipo, línea 54-60 de index.html).
    scrollSimilar(dir) {
      const el = this.$refs && this.$refs.similarCarousel;
      if (!el) return;
      const card = el.querySelector('.event-card');
      const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.9;
      el.scrollBy({ left: step * dir, behavior: 'smooth' });
    },
  }));

  // (ticketModal obsoleto eliminado — la selección de tiers vive en checkout.html?step=cart)

  // -------- CHECKOUT PAGE ------------------------------------------------
  // Página consolidada de checkout. Controla los 4 "steps" via ?step=:
  //   cart → details → payment → success
  // Lee/muta el store `cart` para tickets y totales; persiste el perfil
  // del comprador en `profiles` al avanzar a pago; guarda una entrada en
  // `profiles[email].tickets` al completar el pago (mock).
  // Countdown: usa cart.countdownEndsAt (seteado al salir del event modal).
  Alpine.data('checkoutPage', () => ({
    // ---- estado local ----
    step: 'cart',
    paying: false,
    orderRef: null,
    // Countdown reactivo. Se actualiza con setInterval.
    _now: Date.now(),
    _tick: null,

    // Formularios (pre-rellenados desde el perfil si existe).
    buyer: { email: '', firstName: '', lastName: '', phonePrefix: 'CR +506', phone: '', idDoc: '' },
    pay:   { cardNumber: '', exp: '', cvv: '', holder: '', termsAccepted: false, saveCard: false },

    // ---- Saved cards (solo logged-in) ------------------------------------
    // Modo de pago:
    //   'saved' → usar una tarjeta guardada (cvv inline, sin form completo)
    //   'new'   → ingresar tarjeta nueva con el form completo
    // Para guests arrancamos en 'new'. Para logged-in con saved cards,
    // arrancamos en 'saved' con la default seleccionada.
    cardMode: 'new',
    selectedCardId: null,
    savedCvv: '',

    // Identity mode: si el user está autenticado, arrancamos mostrando la card
    // compacta (avatar + nombre + email + "Cambiar"). Al tocar "Cambiar" pasa
    // a editForm=true y se muestra el form completo. Guests: siempre form.
    editBuyer: false,

    // Seat picker (sólo para eventos con ticketMode=seated y seatedConfig).
    // Portado del prototipo L14886+. El tooltip se abre al clickear un dot:
    // tooltipSeat guarda la butaca activa; tooltipX/Y su posición viewport.
    // _venueCache memoiza la generación de butacas por eventId.
    tooltipSeat: null,
    tooltipX: 0,
    tooltipY: 0,
    _venueCache: null,

    // ---- OTP flow (identity step) ----------------------------------------
    // Estado global en checkoutPage para que el stepper + back link puedan
    // reaccionar (ocultarse cuando otpSent=true — pantalla auth standalone).
    authEmail: '',
    otpSent: false,
    otpDigits: ['', '', '', '', '', ''],
    otpError: '',
    get otpCode() { return this.otpDigits.join(''); },

    // ---- Reservation card (timer + tickets) -------------------------------
    // UX move: la primera vez que el user ve la card (step 'identity'), se
    // muestra expandida con el detalle completo. Cuando avanza a details o
    // payment, colapsa automáticamente a una pill de una línea. El user
    // puede re-expandirla con click si necesita revisar. Esto reduce la
    // densidad del checkout sin perder el reassurance del reloj reservando.
    reservationExpanded: true,
    toggleReservation() { this.reservationExpanded = !this.reservationExpanded; },

    // Titulares de entradas: 1 por ticket. Prototipo: líneas 9101-9117 +
    // renderAttendees() en 13845.
    // Estructura por titular:
    //   { mode: 'me'|'other', ticketType, firstName, lastName, email, idDoc }
    // - mode='me': el titular es el comprador → usamos buyer.* (no campos extra).
    // - mode='other': es para otra persona → pedimos Nombre, Apellido, Email
    //   (+ DNI si el evento es +18).
    attendees: [],

    // ---- lifecycle --------------------------------------------------------
    load() {
      // Lee ?step= y ?event= de la URL.
      const params = new URLSearchParams(location.search);
      const s = params.get('step') || 'cart';
      this.step = ['cart', 'identity', 'details', 'payment', 'success'].includes(s) ? s : 'cart';

      // Hidratá el cart al evento de la URL si hace falta. Si el user viene
      // desde event.html con ?event=<id>, arranca con cart vacío para ese evento.
      // Si reabre checkout en success, preservá cart tal cual.
      const urlEvent = params.get('event');
      const cart = this.$store.cart;
      if (urlEvent && this.step !== 'success' && cart.eventId !== urlEvent) {
        cart.setEvent(urlEvent);
      }

      // Limpia countdown vencido entre sesiones (P0-5). Si el usuario vuelve
      // al cart días después, `countdownEndsAt` podría estar en el pasado.
      if (cart.countdownEndsAt && cart.countdownEndsAt < Date.now()) {
        cart.countdownEndsAt = null;
      }

      // Pre-rellena el buyer form desde session + profile.
      const session = this.$store.session;
      if (session && session.email) {
        this.buyer.email = session.email;
        const profile = this.$store.profiles.get(session.email);
        if (profile) {
          this.buyer.firstName = profile.firstName || '';
          this.buyer.lastName  = profile.lastName  || '';
          this.buyer.phone     = profile.phone     || '';
          this.buyer.idDoc     = profile.idDoc     || '';
          if (profile.phonePrefix) this.buyer.phonePrefix = profile.phonePrefix;
        }
      }

      // Identity card mode: si el user está autenticado y ya tenemos nombre,
      // arrancamos con la card compacta (editBuyer=false). Si falta algún
      // dato base (nombre/apellido), abrimos el form para completarlo.
      if (session && session.isAuthed
          && String(this.buyer.firstName || '').trim().length >= 2
          && String(this.buyer.lastName  || '').trim().length >= 2) {
        this.editBuyer = false;
      } else {
        this.editBuyer = true;
      }

      // Sincroniza attendees al qty actual. El primer titular por defecto usa
      // los datos del comprador (patrón del prototipo: "el comprador es el 1er
      // titular salvo que lo cambien").
      this._syncAttendees();

      // Recupera orderRef si ya hay uno (usuario recargó en /success).
      if (this.step === 'success' && this.$store.cart.orderRef) {
        this.orderRef = this.$store.cart.orderRef;
      }

      // Si el step inicial es payment (reload directo), inicializar modo
      // según saved cards del perfil.
      if (this.step === 'payment') this.initPaymentMode();

      // Arranca el tick del countdown.
      this._tick = setInterval(() => { this._now = Date.now(); }, 1000);
    },

    // Reajusta `attendees` a la cantidad total de tickets. Agrega filas
    // vacías si faltan; trunca si sobran. Preserva datos ya cargados.
    // Mapea $store.cart.tickets → 1 attendee por unidad con su ticketType.
    // Matchea el patrón del prototipo: buildAttendeesFromCart() (línea 13726).
    _syncAttendees() {
      const tickets = this.$store.cart.tickets || [];

      // Expandí por qty: [{ ticketType }] por cada unidad.
      const expanded = [];
      tickets.forEach(t => {
        const qty = Number(t.qty) || 0;
        for (let i = 0; i < qty; i++) {
          expanded.push({ ticketType: t.name || 'Entrada' });
        }
      });

      // Fallback: si no hay tickets pero estamos en details/payment, muestro al
      // menos un placeholder para que la página no quede vacía.
      if (expanded.length === 0) {
        this.attendees = [];
        return;
      }

      // Preservá datos previos cuando el qty coincide.
      const prev = this.attendees || [];
      this.attendees = expanded.map((it, i) => {
        const existing = prev[i];
        return {
          ticketType: it.ticketType,
          mode:       existing ? existing.mode : (i === 0 ? 'me' : 'other'),
          firstName:  existing ? existing.firstName : '',
          lastName:   existing ? existing.lastName  : '',
          email:      existing ? existing.email     : '',
          idDoc:      existing ? existing.idDoc     : '',
        };
      });
    },

    // Cambia el modo de un titular (me ↔ other). Limpia campos si pasa a 'me'
    // para que no queden datos viejos "ocultos" validando de más.
    setAttendeeMode(idx, mode) {
      if (!this.attendees[idx]) return;
      if (mode !== 'me' && mode !== 'other') return;
      this.attendees[idx].mode = mode;
    },

    // Helper: ¿el evento actual tiene restricción de edad? (+18)
    get isAttendeeAgeRestricted() {
      const ev = this.activeEvent;
      return !!(ev && ev.ageRestricted);
    },

    destroy() { if (this._tick) clearInterval(this._tick); },

    // ---- computed ---------------------------------------------------------
    get cartEmpty() {
      const tickets = this.$store.cart.tickets || [];
      return tickets.length === 0;
    },
    get stepNumber() {
      // identity y details cuentan ambos como "paso 2 · Tus datos" en el
      // progress bar (matchea prototipo: la pantalla de elegir guest/login
      // sigue siendo "Paso 2 de 3").
      return this.step === 'cart' ? 1
           : this.step === 'identity' ? 2
           : this.step === 'details' ? 2
           : this.step === 'payment' ? 3
           : 3;
    },
    get stepLabel() {
      return this.step === 'cart' ? 'Revisá'
           : this.step === 'identity' ? 'Tus datos'
           : this.step === 'details' ? 'Tus datos'
           : 'Pago';
    },
    get eventTitle() {
      const id = this.$store.cart.eventId;
      const ev = id ? (window.EVENT_DATA || {})[id] : null;
      return ev ? ev.title : '';
    },
    // Versión compacta del título para la barra de contexto: reemplaza <br>
    // por un espacio para que el nombre del artista quede en una sola línea
    // (en mobile quedaba partido en dos, se veía innecesariamente alto).
    get contextTitle() {
      const t = this.eventTitle || '';
      return t.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
    },
    get eventMeta() {
      const id = this.$store.cart.eventId;
      const ev = id ? (window.EVENT_DATA || {})[id] : null;
      if (!ev) return '';
      // Multi-date: mostrá los datos de la función elegida (dayName+day+month
      // + venue + time), no del evento genérico — que no tiene fecha fija.
      if (ev.eventType === 'multi-date') {
        const sel = this.selectedCartDate;
        if (sel) {
          const dateLabel = [sel.dayName, sel.day, sel.month].filter(Boolean).join(' ');
          return [dateLabel, sel.time, sel.venue].filter(Boolean).join(' · ');
        }
      }
      return [ev.date, ev.time, ev.venue].filter(Boolean).join(' · ');
    },
    // Helper: la fecha multi-date que vive en el cart ($store.cart.selectedDateId)
    // resuelta al objeto completo. Null si el evento no es multi-date o no hay
    // selección guardada.
    get selectedCartDate() {
      const cart = this.$store.cart;
      const ev = this.activeEvent;
      if (!ev || ev.eventType !== 'multi-date' || !cart.selectedDateId) return null;
      return (ev.dates || []).find(d => d.id === cart.selectedDateId) || null;
    },
    get countdownRemaining() {
      const end = this.$store.cart.countdownEndsAt;
      if (!end) return 0;
      return Math.max(0, end - this._now);
    },
    get countdownMMSS() {
      const ms = this.countdownRemaining;
      const mm = String(Math.floor(ms / 60000)).padStart(2, '0');
      const ss = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
      return mm + ':' + ss;
    },

    // ---- evento + tiers (Paso 1 · Entradas) ------------------------------
    // La página /?step=cart muestra la lista de tiers del evento (no el cart
    // plano). Iterá sobre seatedConfig.sections y, si el evento no trae tiers
    // propios, caé a DEFAULT_SEATED_TIERS (constante en events.js).
    // NOTA: se llama `activeEvent` (no `event`) porque `event` está reservado
    // en el scope de Alpine para los event handlers del DOM, y si lo usamos
    // como nombre de getter queda shadowed por `undefined` en `x-show` etc.
    get activeEvent() {
      const id = this.$store.cart.eventId;
      return id ? ((window.EVENT_DATA || {})[id] || null) : null;
    },
    get tiers() {
      const ev = this.activeEvent;

      // Multi-date: sintetiza un tier con el precio de la función elegida
      // (`selectedCartDate.price`). Tiene prioridad sobre seatedConfig porque
      // para multi-date el precio varía por función, no por zona. El id del
      // tier incluye el dateId para que el cart no mezcle entradas de dos
      // funciones distintas.
      if (ev && ev.eventType === 'multi-date') {
        const sel = this.selectedCartDate;
        const priceStr = sel ? sel.price : (ev.price || '0');
        const num = Number(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
        const dateId = (sel && sel.id) || 'unknown';
        const dateLabel = sel
          ? [sel.dayName, sel.day, sel.month].filter(Boolean).join(' ')
          : '';
        const venueLabel = sel ? sel.venue : '';
        const description = [dateLabel, venueLabel].filter(Boolean).join(' · ')
          || 'Acceso general a la función';
        return [{
          id: 'general-' + dateId,
          name: 'Entrada general',
          price: num,
          color: '#2d9cdb',
          status: (sel && sel.status === 'soldout') ? 'soldout' : 'available',
          description,
        }];
      }

      const fromEvent = ev && ev.seatedConfig && Array.isArray(ev.seatedConfig.sections)
        ? ev.seatedConfig.sections
        : null;
      if (fromEvent && fromEvent.length > 0) return fromEvent;

      // GA: sintetiza "Entrada general" desde event.price. Si no hay price
      // definido, devolvemos un tier $0 (mejor que caer a DEFAULT_SEATED_TIERS
      // que traería platea/pullman — rompe la UX de acceso general).
      if (ev && this.mode === 'ga') {
        const num = Number(String(ev.price || '0').replace(/[^0-9.]/g, '')) || 0;
        return [{
          id: 'general',
          name: 'Entrada general',
          price: num,
          color: '#2d9cdb',
          status: 'available',
          description: 'Acceso general al evento · sin asiento asignado',
        }];
      }
      // Seated sin seatedConfig propio: caemos a los tiers por defecto.
      return (window.DEFAULT_SEATED_TIERS || []);
    },
    // Modo de venta del evento activo. 'ga' = acceso general (sin asiento
    // asignado), 'seated' = con tiers/zonas numeradas. Default = 'seated'
    // para mantener compatibilidad con eventos sin ticketMode explícito.
    // Multi-date cuenta como GA: no hay asientos, el "tier" es la función.
    get mode() {
      const ev = this.activeEvent;
      if (ev && ev.eventType === 'multi-date') return 'ga';
      return (ev && ev.ticketMode === 'ga') ? 'ga' : 'seated';
    },
    // ¿El evento usa plano de asientos interactivo? Requiere modo seated y
    // que el evento tenga `seatedConfig.sections`. Matchea prototipo
    // L14955-14975: sólo renderizamos el picker cuando hay config real.
    get isSeated() {
      const ev = this.activeEvent;
      return this.mode === 'seated'
        && !!(ev && ev.seatedConfig && Array.isArray(ev.seatedConfig.sections));
    },
    // Genera (una vez, memoizado por eventId) las butacas del venue. Usa el
    // helper `window.buildVenueSeats` que es determinístico por eventId.
    get venueSeats() {
      const ev = this.activeEvent;
      if (!ev || !this.isSeated) return [];
      const id = this.$store.cart.eventId || 'default';
      if (this._venueCache && this._venueCache.id === id) {
        return this._venueCache.seats;
      }
      const seats = (typeof window.buildVenueSeats === 'function')
        ? window.buildVenueSeats(id, ev.seatedConfig.sections)
        : [];
      this._venueCache = { id, seats };
      return seats;
    },
    // Leyenda del venue: mismo shape que `seatedConfig.sections` pero
    // filtrada a las que efectivamente aparecen en el mapa (no vamos a
    // mostrar "Palco Premium" si no hay butacas de palco en el SVG).
    get venueLegend() {
      const ev = this.activeEvent;
      if (!ev || !this.isSeated) return [];
      const present = new Set(this.venueSeats.map(s => s.section));
      return (ev.seatedConfig.sections || []).filter(sec => {
        // `accessible` en venueSeats se mantiene como 'accessible', `general`
        // puede venir de general/general-1/general-2 — matcheamos flexible.
        if (sec.id === 'platinum') return present.has('platinum');
        if (sec.id === 'vip')      return present.has('vip');
        if (sec.id === 'accessible') return present.has('accessible');
        if (sec.id === 'general' || sec.id === 'general-1' || sec.id === 'general-2') {
          return present.has('general');
        }
        return false;
      });
    },
    // Config del SVG del venue (viewBox + labels). Se lee desde
    // window.VENUE_CONFIG para no hardcodearlo en el template.
    get venueConfig() {
      return window.VENUE_CONFIG || { viewBox: '0 0 600 310', labels: [] };
    },
    // HTML del SVG completo del venue — lo inyectamos con x-html en lugar
    // de usar <template x-for> dentro del <svg>, porque Alpine crea los
    // elementos via document.createElement (namespace HTML) y el browser
    // no los dibuja como SVG. Con x-html el parser los interpreta como SVG.
    // El click se maneja vía event delegation en el contenedor.
    get venueSvgHtml() {
      if (!this.isSeated) return '';
      const cfg = this.venueConfig;
      const seats = this.venueSeats;
      // Labels de zona (VIP / PLATINUM / GENERAL)
      const labelsSvg = (cfg.labels || []).map(l =>
        `<text x="${l.x}" y="${l.y}" class="seated-section-label">${l.text}</text>`
      ).join('');
      // Dots de butacas — cada uno con data-seat-id para identificarlo al click.
      const seatsSvg = seats.map(s => {
        const cls = ['seat-dot'];
        if (s.sold) cls.push('sold');
        if (this.isSeatSelected(s.id)) cls.push('selected');
        return `<circle class="${cls.join(' ')}" data-section="${s.section}" data-seat-id="${s.id}" cx="${s.cx}" cy="${s.cy}" r="7"></circle>`;
      }).join('');
      return `<svg viewBox="${cfg.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-label="Plano del venue — tocá un asiento para seleccionarlo">${labelsSvg}${seatsSvg}</svg>`;
    },
    // Mapa seatId → seat object (memoizado). Usado por el click handler
    // delegado para resolver la butaca a partir del data-seat-id del dot.
    _seatIndex: null,
    _seatIndexEventId: null,
    _getSeatById(seatId) {
      const currentId = this.$store.cart.eventId || 'default';
      if (!this._seatIndex || this._seatIndexEventId !== currentId) {
        this._seatIndex = new Map();
        this._seatIndexEventId = currentId;
        this.venueSeats.forEach(s => this._seatIndex.set(s.id, s));
      }
      return this._seatIndex.get(seatId);
    },
    // Click delegado sobre el contenedor del SVG. Si el target es un
    // .seat-dot no-sold, abrimos el tooltip para esa butaca.
    onSeatClick($event) {
      const dot = $event.target && $event.target.closest
        ? $event.target.closest('.seat-dot')
        : null;
      if (!dot || dot.classList.contains('sold')) return;
      const seatId = dot.getAttribute('data-seat-id');
      const seat = this._getSeatById(seatId);
      if (!seat) return;
      // Pasamos el dot como currentTarget para el cálculo de posición.
      this.openSeatTooltip(seat, { currentTarget: dot });
    },
    // Color CSS por sección (usado en legend + dots vía data-section).
    seatColorFor(sectionId) {
      const map = {
        platinum: '#c6f800',
        vip: '#00aa5c',
        general: '#2d9cdb',
        accessible: '#f59e0b',
      };
      return map[sectionId] || '#888';
    },
    // ¿La butaca está seleccionada en el cart? (se guarda como ticket
    // con tierId = seat.id y qty = 1).
    isSeatSelected(seatId) {
      return (this.$store.cart.tickets || []).some(t => t.tierId === seatId);
    },
    // Toggle de butaca: si está libre la agrega al cart (max 8), si ya
    // está seleccionada la saca. Matchea prototipo confirmSeat + refreshCart
    // (L14930-14943). Arranca el countdown al agregar la primera.
    toggleSeat(seat) {
      if (!seat || seat.sold) return;
      const cart = this.$store.cart;
      const idx = cart.tickets.findIndex(t => t.tierId === seat.id);
      if (idx >= 0) {
        cart.tickets.splice(idx, 1);
      } else {
        if (cart.qtyTotal >= 8) {
          alert('Máximo 8 asientos por compra');
          return;
        }
        cart.tickets.push({
          tierId: seat.id,
          name: seat.sectionName + ' · Fila ' + seat.row + ' · As. ' + seat.seat,
          price: Number(seat.price) || 0,
          qty: 1,
          isSeat: true,
          section: seat.section,
          row: seat.row,
          seat: seat.seat,
        });
        if (!cart.countdownEndsAt) {
          cart.countdownEndsAt = Date.now() + 10 * 60 * 1000;
        }
      }
      if (cart.tickets.length === 0) {
        cart.couponCode = null;
        cart.couponDiscount = 0;
        cart.countdownEndsAt = null;
      } else {
        this._recomputeCouponIfAny();
      }
    },
    // Abre el tooltip de detalle de una butaca. Guarda referencia + pos.
    openSeatTooltip(seat, event) {
      if (!seat || seat.sold) return;
      this.tooltipSeat = seat;
      // Posicionamos relativo al dot clickeado. Si no hay event (teclado),
      // centramos en el viewport.
      const rect = event && event.currentTarget
        ? event.currentTarget.getBoundingClientRect()
        : null;
      const ttW = 240, ttH = 170;
      const vw = window.innerWidth;
      let x, y;
      if (rect) {
        x = rect.left + rect.width / 2 - ttW / 2;
        y = rect.top - ttH - 14;
        if (y < 60) y = rect.bottom + 14;
        if (x < 10) x = 10;
        if (x + ttW > vw - 10) x = vw - ttW - 10;
      } else {
        x = (vw - ttW) / 2;
        y = 120;
      }
      this.tooltipX = x;
      this.tooltipY = y;
    },
    closeSeatTooltip() {
      this.tooltipSeat = null;
    },
    confirmSeatFromTooltip() {
      if (this.tooltipSeat) {
        this.toggleSeat(this.tooltipSeat);
      }
      this.closeSeatTooltip();
    },
    // Cantidad actual en el carrito para un tier dado.
    qtyForTier(tierId) {
      const t = (this.$store.cart.tickets || []).find(x => x.tierId === tierId);
      return t ? (Number(t.qty) || 0) : 0;
    },
    // ++ sobre un tier: si ya existe la línea la incrementa, si no la crea.
    incrementTier(tier) {
      if (!tier || tier.status === 'soldout') return;
      const cart = this.$store.cart;
      const i = cart.tickets.findIndex(x => x.tierId === tier.id);
      if (i >= 0) {
        cart.tickets[i].qty = (Number(cart.tickets[i].qty) || 0) + 1;
      } else {
        cart.tickets.push({
          tierId: tier.id,
          name:   tier.name,
          price:  tier.price,
          qty:    1,
        });
      }
      // Arranca el countdown al agregar la primera entrada.
      if (cart.qtyTotal > 0 && !cart.countdownEndsAt) {
        cart.countdownEndsAt = Date.now() + 10 * 60 * 1000;
      }
      this._recomputeCouponIfAny();
    },
    // -- sobre un tier: decrementa; si llega a 0, elimina la línea.
    decrementTier(tierId) {
      const cart = this.$store.cart;
      const i = cart.tickets.findIndex(x => x.tierId === tierId);
      if (i < 0) return;
      const cur = Number(cart.tickets[i].qty) || 0;
      if (cur <= 1) {
        cart.tickets.splice(i, 1);
      } else {
        cart.tickets[i].qty = cur - 1;
      }
      // Si quedó vacío, limpiá countdown y cupón.
      if (cart.tickets.length === 0) {
        cart.couponCode = null;
        cart.couponDiscount = 0;
        cart.countdownEndsAt = null;
      } else {
        this._recomputeCouponIfAny();
      }
    },

    // ---- navegación entre steps ------------------------------------------
    gotoStep(s) {
      if (!['cart', 'identity', 'details', 'payment', 'success'].includes(s)) return;
      this.step = s;
      // Actualiza URL sin recargar.
      const url = new URL(location.href);
      url.searchParams.set('step', s);
      history.pushState({}, '', url.toString());
      // Al entrar a payment: inicializar modo según saved cards.
      if (s === 'payment') this.initPaymentMode();
      // Reservation card: expanded en identity (primera impression), collapsed
      // en details/payment (ya lo vio, no necesita la densidad de nuevo).
      this.reservationExpanded = (s === 'identity' || s === 'cart');
      // Scroll al tope al cambiar de step. Crítico para `success`: el user
      // venía scrolleando el form de payment y si no reseteamos el scroll,
      // aterriza en el success con el hero fuera de viewport (pierde el
      // check animado). `instant` (no smooth) porque la animación del check
      // arranca en 0.1s — queremos que el user esté ya arriba cuando pegue.
      try {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
    },

    // Avanza del cart: si el user está logueado, salta directo a details;
    // si no, mostramos la pantalla de identity (guest vs login/signup).
    toDetails() {
      if (this.$store.cart.qtyTotal === 0) return;
      // Lockea el countdown al avanzar del cart (patrón prototipo: el reloj
      // arranca cuando el usuario "compromete" su selección, no antes).
      const cart = this.$store.cart;
      if (!cart.countdownEndsAt || cart.countdownEndsAt < Date.now()) {
        cart.countdownEndsAt = Date.now() + 10 * 60 * 1000; // 10 min
      }
      // Resincroniza titulares al qty actual antes de mostrar el form.
      this._syncAttendees();
      const authed = !!(this.$store.session && this.$store.session.isAuthed);
      this.gotoStep(authed ? 'details' : 'identity');
    },

    // Elegido "Continuar como invitado" en la pantalla identity. Avanza a
    // details en modo guest (no hay sesión, el form pide todos los datos).
    continueAsGuest() {
      this._syncAttendees();
      this.gotoStep('details');
    },

    // Elegido login con email en la pantalla identity. Guardamos el email
    // tipeado en buyer.email para que auth.html lo recupere vía querystring,
    // y mandamos a auth con redirect de vuelta al checkout details.
    continueWithEmailLogin(email) {
      const e = String(email || '').trim().toLowerCase();
      if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return;
      this.buyer.email = e;
      const params = new URLSearchParams();
      params.set('mode', 'login');
      params.set('email', e);
      params.set('redirect', 'checkout.html?step=details'
        + (this.$store.cart.eventId ? '&event=' + encodeURIComponent(this.$store.cart.eventId) : ''));
      location.href = 'auth.html?' + params.toString();
    },

    // ---- OTP flow methods -------------------------------------------------
    // Mock de passwordless: el user mete email → mandamos a vista OTP (misma
    // página, se oculta el stepper para que sea pantalla auth standalone).
    // Al completar los 6 dígitos auto-verifica y avanza a details.
    sendOtp() {
      const e = String(this.authEmail || '').trim().toLowerCase();
      if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return;
      this.authEmail = e;
      this.otpSent = true;
      this.otpDigits = ['', '', '', '', '', ''];
      this.otpError = '';
      this.$nextTick(() => this.focusOtp(0));
    },
    backToEmail() {
      this.otpSent = false;
      this.otpDigits = ['', '', '', '', '', ''];
      this.otpError = '';
    },
    focusOtp(idx) {
      const el = document.getElementById('identity-otp-' + idx);
      if (el) { el.focus(); if (typeof el.select === 'function') el.select(); }
    },
    handleOtpInput(ev, idx) {
      const raw = String(ev.target.value || '');
      const digit = (raw.match(/\d/) || [''])[0];
      this.otpDigits[idx] = digit;
      ev.target.value = digit;
      this.otpError = '';
      if (digit && idx < 5) this.focusOtp(idx + 1);
      // Auto-submit cuando los 6 boxes tienen dígito
      if (this.otpDigits.every(d => d !== '')) {
        this.$nextTick(() => this.verifyOtp());
      }
    },
    handleOtpKeydown(ev, idx) {
      if (ev.key === 'Backspace' && !this.otpDigits[idx] && idx > 0) {
        ev.preventDefault();
        this.otpDigits[idx - 1] = '';
        this.focusOtp(idx - 1);
      } else if (ev.key === 'ArrowLeft' && idx > 0) {
        ev.preventDefault();
        this.focusOtp(idx - 1);
      } else if (ev.key === 'ArrowRight' && idx < 5) {
        ev.preventDefault();
        this.focusOtp(idx + 1);
      } else if (ev.key === 'Enter') {
        ev.preventDefault();
        this.verifyOtp();
      }
    },
    handleOtpPaste(ev) {
      const cd = ev.clipboardData || window.clipboardData;
      const text = cd ? cd.getData('text') : '';
      const digits = String(text || '').replace(/\D/g, '').slice(0, 6);
      if (!digits) return;
      ev.preventDefault();
      for (let i = 0; i < 6; i++) this.otpDigits[i] = digits[i] || '';
      this.otpError = '';
      const lastIdx = Math.min(digits.length, 6) - 1;
      this.focusOtp(lastIdx);
      if (digits.length === 6) {
        this.$nextTick(() => this.verifyOtp());
      }
    },
    verifyOtp() {
      const code = this.otpCode;
      if (!/^\d{6}$/.test(code)) {
        this.otpError = 'Ingresá los 6 dígitos.';
        return;
      }
      // Mock: cualquier código de 6 dígitos es válido.
      this.buyer.email = this.authEmail;
      this.$store.session.login(this.authEmail);
      this.otpSent = false;
      this.gotoStep('details');
    },

    // ---- mutaciones sobre $store.cart.tickets -----------------------------
    incrementTicket(idx) {
      const tickets = this.$store.cart.tickets;
      if (!tickets[idx]) return;
      tickets[idx].qty = (Number(tickets[idx].qty) || 0) + 1;
      this._recomputeCouponIfAny();
    },
    decrementTicket(idx) {
      const tickets = this.$store.cart.tickets;
      if (!tickets[idx]) return;
      const cur = Number(tickets[idx].qty) || 0;
      tickets[idx].qty = Math.max(1, cur - 1);
      this._recomputeCouponIfAny();
    },
    removeTicket(idx) {
      this.$store.cart.tickets.splice(idx, 1);
      // Si quedó vacío, limpiá cupón y countdown.
      if (this.$store.cart.tickets.length === 0) {
        this.$store.cart.couponCode = null;
        this.$store.cart.couponDiscount = 0;
        this.$store.cart.countdownEndsAt = null;
      } else {
        this._recomputeCouponIfAny();
      }
    },

    // ---- cupones ----------------------------------------------------------
    // Cupones válidos (mock). key → porcentaje off sobre subtotal.
    _coupons: { VIBES10: 0.10, VIBES20: 0.20, BRAT: 0.15 },

    applyCoupon(code) {
      const k = String(code || '').trim().toUpperCase();
      if (!k) return 'Ingresá un código.';
      const pct = this._coupons[k];
      if (!pct) {
        this.$store.cart.couponCode = null;
        this.$store.cart.couponDiscount = 0;
        return 'Cupón inválido.';
      }
      const discount = this.$store.cart.subtotal * pct;
      this.$store.cart.couponCode = k;
      this.$store.cart.couponDiscount = Math.round(discount * 100) / 100;
      return '¡Listo! ' + Math.round(pct * 100) + '% de descuento aplicado.';
    },
    removeCoupon() {
      this.$store.cart.couponCode = null;
      this.$store.cart.couponDiscount = 0;
    },
    // Si cambia la cantidad, re-calcula el descuento manteniendo el %.
    _recomputeCouponIfAny() {
      const code = this.$store.cart.couponCode;
      if (!code) return;
      const pct = this._coupons[code];
      if (!pct) return;
      this.$store.cart.couponDiscount = Math.round(this.$store.cart.subtotal * pct * 100) / 100;
    },

    // ---- validación (P0-3) -----------------------------------------------
    // Gates para habilitar los CTAs de cada step. Centralizado acá para que
    // el HTML solo lea getters (no duplica lógica en x-show/:disabled).
    get buyerValid() {
      const b = this.buyer;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email || '').trim());
      const baseOk  = emailOk
        && String(b.firstName || '').trim().length >= 2
        && String(b.lastName  || '').trim().length >= 2
        && String(b.phone     || '').replace(/\D/g, '').length >= 7;
      // DNI: solo se exige si el evento tiene restricción de edad (+18).
      if (!this.isAttendeeAgeRestricted) return baseOk;
      return baseOk && String(b.idDoc || '').trim().length >= 5;
    },
    get attendeesValid() {
      if (!this.attendees || !this.attendees.length) return false;
      const ageGate = this.isAttendeeAgeRestricted;
      return this.attendees.every(a => {
        // mode='me': usa los datos del comprador (ya validados en buyerValid).
        // Solo pedimos DNI extra si el evento es +18 y buyer.idDoc no alcanza
        // — eso lo cubre buyerValid (idDoc ≥ 5), así que acá 'me' siempre pasa.
        if (a.mode === 'me') return true;
        // mode='other': Nombre, Apellido y Email siempre; DNI solo si +18.
        const okName  = String(a.firstName || '').trim().length >= 2;
        const okLast  = String(a.lastName  || '').trim().length >= 2;
        const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(a.email || '').trim());
        const okId    = !ageGate || String(a.idDoc || '').trim().length >= 5;
        return okName && okLast && okEmail && okId;
      });
    },
    get detailsValid() { return this.buyerValid && this.attendeesValid; },

    // ---- Saved cards helpers --------------------------------------------
    // Lista de tarjetas guardadas del user actual (si logged-in).
    get savedCards() {
      const email = (this.$store.session && this.$store.session.email) || '';
      if (!email) return [];
      return this.$store.profiles.getCards(email);
    },
    get hasSavedCards() { return this.savedCards.length > 0; },
    get selectedCard() {
      return this.savedCards.find(c => c.id === this.selectedCardId) || null;
    },

    // Inicializa el modo al entrar al payment step. Logged-in con tarjetas
    // → arranca en 'saved' + default seleccionada. Sino → 'new' (form).
    //
    // Seed mock cards: aunque lo hacemos en `session.login()`, llamamos
    // acá también para cubrir sesiones que ya existían ANTES de que se
    // agregara la feature (persisted de otro día). `seedMockCards` es
    // idempotente — si ya hay tarjetas guardadas, no hace nada.
    initPaymentMode() {
      const session = this.$store.session;
      if (session && session.isAuthed && session.email) {
        try { this.$store.profiles.seedMockCards(session.email); } catch {}
      }
      if (this.hasSavedCards) {
        this.cardMode = 'saved';
        const def = this.savedCards.find(c => c.isDefault) || this.savedCards[0];
        this.selectedCardId = def ? def.id : null;
        this.savedCvv = '';
      } else {
        this.cardMode = 'new';
        this.selectedCardId = null;
      }
    },
    // Cambia manualmente a "agregar nueva" desde la lista de saved.
    switchToNewCard() {
      this.cardMode = 'new';
      this.selectedCardId = null;
    },
    // Vuelve a usar una tarjeta guardada (desde el form nuevo).
    switchToSavedCards() {
      if (!this.hasSavedCards) return;
      this.initPaymentMode();
    },
    // Eliminar una tarjeta guardada (con confirm nativo para MVP).
    removeSavedCard(cardId) {
      if (!cardId) return;
      const card = this.savedCards.find(c => c.id === cardId);
      if (!card) return;
      const ok = confirm(`¿Eliminar la tarjeta •••• ${card.last4}? Esta acción no se puede deshacer.`);
      if (!ok) return;
      const email = (this.$store.session && this.$store.session.email) || '';
      this.$store.profiles.removeCard(email, cardId);
      // Si quedó vacío, cambiar a modo 'new'. Si quedan tarjetas, reselect.
      if (!this.hasSavedCards) { this.switchToNewCard(); }
      else { this.initPaymentMode(); }
    },

    get payValid() {
      // Modo 'saved': solo necesitamos un cvv válido (3-4 dígitos) + términos.
      if (this.cardMode === 'saved') {
        const cvv = String(this.savedCvv || '').trim();
        if (!/^\d{3,4}$/.test(cvv)) return false;
        if (!this.selectedCardId) return false;
        return !!this.pay.termsAccepted;
      }
      // Modo 'new': form completo, 16 dígitos (sin espacios), MM/AA válido,
      // CVV 3-4 dígitos, holder ≥3 chars, términos aceptados.
      const num   = String(this.pay.cardNumber || '').replace(/\s/g, '');
      const exp   = String(this.pay.exp || '').trim();
      const cvv   = String(this.pay.cvv || '').trim();
      const holder= String(this.pay.holder || '').trim();
      if (!/^\d{15,16}$/.test(num)) return false;
      const m = exp.match(/^(\d{2})\/(\d{2})$/);
      if (!m) return false;
      const mm = Number(m[1]), yy = Number(m[2]);
      if (mm < 1 || mm > 12) return false;
      // No aceptamos tarjetas vencidas (año actual en 2 dígitos).
      const now = new Date();
      const curYY = now.getFullYear() % 100;
      const curMM = now.getMonth() + 1;
      if (yy < curYY || (yy === curYY && mm < curMM)) return false;
      if (!/^\d{3,4}$/.test(cvv)) return false;
      if (holder.length < 3) return false;
      return !!this.pay.termsAccepted;
    },

    // ---- helpers de tarjeta (P0-4) ---------------------------------------
    // Auto-formato de número de tarjeta: agrupa en bloques de 4 (Amex 4-6-5).
    // Se llama desde @input y preserva la posición del cursor aproximadamente.
    formatCardNumber(e) {
      const el = e && e.target;
      const raw = String(el?.value || '').replace(/\D/g, '').slice(0, 16);
      let formatted;
      // Amex (34, 37) usa grupo 4-6-5
      if (/^3[47]/.test(raw)) {
        formatted = raw.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*$/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join(' ')
        );
      } else {
        formatted = raw.match(/.{1,4}/g)?.join(' ') || '';
      }
      this.pay.cardNumber = formatted;
      if (el) el.value = formatted;
    },
    formatCardExpiry(e) {
      const el = e && e.target;
      const raw = String(el?.value || '').replace(/\D/g, '').slice(0, 4);
      let formatted = raw;
      if (raw.length >= 3) formatted = raw.slice(0, 2) + '/' + raw.slice(2);
      else if (raw.length === 2) formatted = raw + '/';
      this.pay.exp = formatted;
      if (el) el.value = formatted;
    },
    // Detección simple de brand por los primeros dígitos del PAN.
    get cardBrand() {
      const n = String(this.pay.cardNumber || '').replace(/\s/g, '');
      if (/^4/.test(n)) return 'visa';
      if (/^(5[1-5]|2[2-7])/.test(n)) return 'mc';
      if (/^3[47]/.test(n)) return 'amex';
      return '';
    },

    // ---- submit handlers --------------------------------------------------
    submitDetails() {
      if (!this.detailsValid) return;
      // Guarda perfil por email en store `profiles`.
      const email = (this.buyer.email || '').trim().toLowerCase();
      if (!email) return;
      this.$store.profiles.save(email, {
        firstName:   this.buyer.firstName,
        lastName:    this.buyer.lastName,
        phone:       this.buyer.phone,
        phonePrefix: this.buyer.phonePrefix,
        idDoc:       this.buyer.idDoc,
      });
      // Marca al usuario como "conocido" (útil para auth flow).
      const session = this.$store.session;
      if (!session.knownUsers.includes(email)) session.knownUsers.push(email);
      this.gotoStep('payment');
    },

    submitPayment() {
      if (this.paying) return;
      if (!this.payValid) return;
      this.paying = true;
      // Si es tarjeta nueva + checkbox "guardar" + user logueado → persistir.
      // Solo guardamos info no-sensible (brand + last4 + exp + holder).
      // El CVV NUNCA se guarda (PCI DSS).
      if (this.cardMode === 'new'
          && this.pay.saveCard
          && this.$store.session && this.$store.session.isAuthed) {
        const email = this.$store.session.email;
        const raw = String(this.pay.cardNumber || '').replace(/\s/g, '');
        this.$store.profiles.addCard(email, {
          brand: this.cardBrand || 'visa',
          last4: raw.slice(-4),
          exp: this.pay.exp,
          holderName: this.pay.holder,
        });
      }
      // Simula latencia de pago.
      setTimeout(() => {
        // Genera orderRef tipo VIBES-XXXX-YYYY.
        const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase();
        const ref = 'VIBES-' + rand() + '-' + rand();
        this.orderRef = ref;
        this.$store.cart.orderRef = ref;

        // Guarda ticket(s) en el perfil del comprador (mock).
        const email = (this.buyer.email || '').trim().toLowerCase();
        if (email) {
          const eventId = this.$store.cart.eventId;
          const ev = eventId ? (window.EVENT_DATA || {})[eventId] : null;
          const plainTitle = ev ? String(ev.title || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
          this.$store.profiles.addTicket(email, {
            orderRef: ref,
            eventId,
            eventTitle: plainTitle,
            date: ev ? ev.date : '',
            venue: ev ? ev.venue : '',
            items: JSON.parse(JSON.stringify(this.$store.cart.tickets || [])),
            total: this.$store.cart.total,
            purchasedAt: new Date().toISOString(),
          });
        }

        // Limpia countdown pero conserva tickets/orderRef para mostrar success.
        this.$store.cart.countdownEndsAt = null;
        this.paying = false;
        this.gotoStep('success');
      }, 900);
    },
  }));

  // NOTA: los stubs previos (`countdown`, `buyerForm`, `paymentForm`) se
  // removieron en el audit-fix: el countdown vive dentro de checkoutPage y
  // los forms del checkout también.

  // -------- PHONE PREFIX DROPDOWN ---------------------------------------
  // Dropdown custom para el prefijo telefónico del buyer form. Reemplaza
  // al <select> nativo para poder mostrar la bandera SVG junto al dial
  // code. Se bindea contra buyer.phonePrefix del checkoutPage padre vía
  // Alpine scope walk — no necesita props: busca directamente `buyer` y
  // `PHONE_COUNTRIES` (del global) para render y persist.
  //
  // El formato de buyer.phonePrefix se mantiene como "CR +506" para no
  // romper consumers (renderTickets, email template, etc.).
  Alpine.data('phonePrefixDropdown', () => ({
    open: false,
    countries: window.PHONE_COUNTRIES || [],
    // Parsea el valor actual "CR +506" → { code, dial, name }.
    get selected() {
      const raw = (this.buyer && this.buyer.phonePrefix) || '';
      // El primer token es el código ISO (CR, SV, etc.), el resto es el dial.
      const [code] = raw.split(/\s+/);
      const found = this.countries.find(c => c.code === code);
      if (found) return found;
      // Fallback: primer elemento del catálogo.
      return this.countries[0] || { code: 'CR', name: 'Costa Rica', dial: '+506' };
    },
    get selectedDial() {
      return this.selected.dial || '';
    },
    get selectedFlagHtml() {
      return this.flagFor(this.selected.code);
    },
    flagFor(code) {
      return (window.flagSvg && window.flagSvg(code)) || '';
    },
    pick(c) {
      if (!c) return;
      // Persistimos como "CODE +DIAL" (mismo formato histórico del select).
      this.buyer.phonePrefix = c.code + ' ' + c.dial;
      this.open = false;
    },
  }));

  // -------- AUTH PAGE ----------------------------------------------------
  // Flujo email-first (matchea prototipo líneas 9430-9530):
  //   1) step='email'  → input de email + botón "Continuar"
  //   2) step='otp'    → 6 dígitos de verificación (cualquier secuencia vale
  //                      en demo, igual que el prototipo)
  //   3) step='name'   → solo para usuarios nuevos (no estaban en knownUsers)
  //                      pide first/last name y termina guardando el perfil.
  // Al finalizar hace $store.session.login(email) y redirige a `redirect`
  // (leído de la URL) o a index.html como fallback.
  //
  // ?mode= no se usa para forzar flow — el step inicial siempre es 'email'
  // y decidimos si el usuario es nuevo o viejo al enviar el email
  // (consultando $store.session.knownUsers).
  Alpine.data('authPage', () => ({
    step: 'email',                 // 'email' | 'otp' | 'name'
    email: '',
    otp: ['', '', '', '', '', ''], // 6 inputs independientes
    firstName: '',
    lastName: '',
    isNewUser: false,              // se setea cuando submit email-step
    error: '',                     // mensaje inline (OTP inválido, etc.)
    busy: false,                   // disable durante "verificación" (mock)
    resendCountdown: 0,            // segundos hasta poder reenviar código
    resendTimerId: null,           // interval id para cleanup
    redirect: 'index.html',        // destino post-login (desde ?redirect=)

    init() {
      // Leemos ?redirect= para volver al origen. Ej:
      //   auth.html?redirect=checkout → después de login vuelve al checkout.
      // Solo aceptamos redirects relativos (empiezan con letra o /, sin ://)
      // para evitar open-redirect vulnerabilities si algún día se pasa por
      // URL pública.
      try {
        const params = new URLSearchParams(location.search);
        const r = (params.get('redirect') || '').trim();
        if (r && /^[a-zA-Z0-9_\-./?&=#%]+$/.test(r) && !r.includes('://')) {
          // Soporta "checkout", "checkout.html", "account.html?tab=favs", etc.
          this.redirect = r.endsWith('.html') || r.includes('.html?')
            ? r
            : r + '.html';
        }
      } catch {}

      // Si ya hay sesión, saltamos directo al redirect.
      if (this.$store.session && this.$store.session.isAuthed) {
        location.href = this.redirect;
      }
    },

    // Paso 1: enviar email → decide login vs signup.
    submitEmail() {
      const email = (this.email || '').trim().toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.error = 'Ingresá un email válido';
        return;
      }
      this.email = email;
      this.error = '';
      // Conocido = login flow. Desconocido = signup (pide nombre después del OTP).
      this.isNewUser = !this.$store.session.isKnown(email);
      this.step = 'otp';
      this.otp = ['', '', '', '', '', ''];
      this.startResendTimer();
      // Auto-focus al primer input del OTP.
      this.$nextTick(() => {
        const first = document.querySelector('[data-otp-idx="0"]');
        if (first) first.focus();
      });
    },

    // Handler de cada input OTP: numeric-only, auto-advance, auto-submit al 6°.
    onOtpInput(idx, e) {
      const v = String(e.target.value || '').replace(/\D/g, '').slice(0, 1);
      this.otp[idx] = v;
      this.error = '';
      // Avanzar al siguiente
      if (v && idx < 5) {
        const next = document.querySelector('[data-otp-idx="' + (idx + 1) + '"]');
        if (next) next.focus();
      }
      // Si se completó el último, intentamos submit
      if (idx === 5 && v && this.otp.every(d => d)) {
        this.submitOtp();
      }
    },
    // Backspace en input vacío → retroceder al anterior.
    onOtpKeydown(idx, e) {
      if (e.key === 'Backspace' && !this.otp[idx] && idx > 0) {
        const prev = document.querySelector('[data-otp-idx="' + (idx - 1) + '"]');
        if (prev) prev.focus();
      }
    },
    // Pegar un código completo (6 dígitos) — los distribuye en los inputs.
    onOtpPaste(e) {
      const raw = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      const digits = raw.replace(/\D/g, '').slice(0, 6).split('');
      if (digits.length === 0) return;
      e.preventDefault();
      for (let i = 0; i < 6; i++) this.otp[i] = digits[i] || '';
      this.error = '';
      const idx = Math.min(digits.length, 5);
      this.$nextTick(() => {
        const el = document.querySelector('[data-otp-idx="' + idx + '"]');
        if (el) el.focus();
      });
      if (digits.length === 6) this.submitOtp();
    },

    // Paso 2: validar OTP. Demo: cualquier secuencia de 6 dígitos vale
    // (matchea prototipo línea 9497 "Demo: podés ingresar cualquier secuencia").
    submitOtp() {
      if (this.busy) return;
      const code = this.otp.join('');
      if (!/^\d{6}$/.test(code)) {
        this.error = 'Código incompleto. Ingresá los 6 dígitos.';
        return;
      }
      this.busy = true;
      this.error = '';
      // Simulamos latencia de verificación (~700ms)
      setTimeout(() => {
        this.busy = false;
        this.stopResendTimer();
        if (this.isNewUser) {
          // Pasar a paso 3 (nombre)
          this.step = 'name';
          this.$nextTick(() => {
            const first = document.querySelector('#signup-first-name');
            if (first) first.focus();
          });
        } else {
          // Usuario conocido → login directo y redirigir
          this.doLoginAndRedirect();
        }
      }, 700);
    },

    // Paso 3 (solo signup): completar nombre y loguear.
    submitName() {
      const fn = (this.firstName || '').trim();
      const ln = (this.lastName || '').trim();
      if (!fn || !ln) {
        this.error = 'Ingresá tu nombre y apellido.';
        return;
      }
      // Guardamos en $store.profiles para que checkout pre-llene luego.
      this.$store.profiles.save(this.email, {
        firstName: fn,
        lastName:  ln,
      });
      this.doLoginAndRedirect();
    },

    // Persiste sesión y navega al redirect.
    doLoginAndRedirect() {
      this.$store.session.login(this.email);
      // Pequeño delay para que el usuario vea el "tick" de éxito.
      setTimeout(() => { location.href = this.redirect; }, 200);
    },

    // Volver al paso 1 (cambiar email).
    backToEmail() {
      this.step = 'email';
      this.otp = ['', '', '', '', '', ''];
      this.error = '';
      this.stopResendTimer();
    },

    // Reenviar OTP: resetea inputs + muestra toast. Bloqueado durante 30s.
    resendOtp() {
      if (this.resendCountdown > 0) return;
      this.otp = ['', '', '', '', '', ''];
      this.error = '';
      this.startResendTimer();
      this.$nextTick(() => {
        const first = document.querySelector('[data-otp-idx="0"]');
        if (first) first.focus();
      });
    },
    startResendTimer() {
      this.stopResendTimer();
      this.resendCountdown = 30;
      this.resendTimerId = setInterval(() => {
        this.resendCountdown--;
        if (this.resendCountdown <= 0) this.stopResendTimer();
      }, 1000);
    },
    stopResendTimer() {
      if (this.resendTimerId) {
        clearInterval(this.resendTimerId);
        this.resendTimerId = null;
      }
      this.resendCountdown = 0;
    },

    // Google mock: stub que simula login directo con un email "plantilla"
    // (matchea `openGoogleMock` del prototipo, línea 9444).
    loginWithGoogle() {
      if (this.busy) return;
      this.busy = true;
      setTimeout(() => {
        const mockEmail = 'demo.google@vibe.app';
        this.email = mockEmail;
        const known = this.$store.session.isKnown(mockEmail);
        this.$store.session.login(mockEmail);
        if (!known) {
          // Perfil placeholder para nuevo usuario con Google
          this.$store.profiles.save(mockEmail, {
            firstName: 'Demo',
            lastName:  'Google',
          });
        }
        location.href = this.redirect;
      }, 500);
    },
  }));

  // -------- CREATOR AUTH PAGE ---------------------------------------------
  // Login/signup del flow de creadores. Similar a authPage pero:
  //  - Badge "✦ Creadores" en todos los steps
  //  - Step signup pide "Nombre de empresa" además de first/last name
  //  - Post-signup va al step 'redirect' (honest demo boundary), no al sitio
  //  - Login existente (email conocido como isCreator) también va a 'redirect'
  //  - Marca $store.session.isCreator = true al loguear
  //
  // El flow de OTP es idéntico al de authPage (paridad visual y UX).
  Alpine.data('creatorAuthPage', () => ({
    step: 'email',                       // 'email' | 'otp' | 'signup' | 'redirect'
    email: '',
    otp: ['', '', '', '', '', ''],
    company: '',                          // nombre de empresa/productora
    firstName: '',
    lastName: '',
    isNewUser: false,
    error: '',
    busy: false,
    resendCountdown: 0,
    resendTimerId: null,

    init() {
      // Si ya hay sesión de creador activa, salto directo al step 'redirect'
      // (simula que vamos al panel). Si es sesión de asistente, la dejamos
      // entrar normal — puede estar creando su perfil de creador.
      if (this.$store.session && this.$store.session.isAuthed && this.$store.session.isCreator) {
        this.step = 'redirect';
        this._populateFromSession();
      }
    },

    _populateFromSession() {
      const p = this.$store.profiles.get(this.$store.session.email) || {};
      this.email = this.$store.session.email || this.email;
      this.company = p.company || '';
      this.firstName = p.firstName || '';
      this.lastName = p.lastName || '';
    },

    // --- Paso 1: email ---
    submitEmail() {
      this.error = '';
      const em = (this.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        this.error = 'Ingresá un email válido.';
        return;
      }
      this.email = em;
      this.isNewUser = !this.$store.session.isKnown(em);
      this.step = 'otp';
      this.$nextTick(() => this._focusFirstOtp());
      this.startResendTimer(30);
    },

    // --- OTP handlers (iguales que authPage) ---
    onOtpInput(idx, e) {
      const v = (e.target.value || '').replace(/\D/g, '').slice(-1);
      this.otp[idx] = v;
      e.target.value = v;
      if (v && idx < 5) {
        const next = document.querySelector('[data-cotp-idx="' + (idx + 1) + '"]');
        if (next) next.focus();
      }
    },
    onOtpKeydown(idx, e) {
      if (e.key === 'Backspace' && !this.otp[idx] && idx > 0) {
        const prev = document.querySelector('[data-cotp-idx="' + (idx - 1) + '"]');
        if (prev) prev.focus();
      }
    },
    onOtpPaste(e) {
      const txt = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (!txt) return;
      e.preventDefault();
      for (let i = 0; i < 6; i++) this.otp[i] = txt[i] || '';
      // Llenar los inputs manualmente (porque no usamos x-model).
      document.querySelectorAll('[data-cotp-idx]').forEach((el, i) => {
        el.value = this.otp[i] || '';
      });
      const filled = txt.length;
      const targetIdx = Math.min(filled, 5);
      const target = document.querySelector('[data-cotp-idx="' + targetIdx + '"]');
      if (target) target.focus();
    },
    _focusFirstOtp() {
      const el = document.querySelector('[data-cotp-idx="0"]');
      if (el) el.focus();
    },

    // --- Paso 2: verificar OTP ---
    submitOtp() {
      this.error = '';
      const code = this.otp.join('');
      if (code.length !== 6) {
        this.error = 'Ingresá los 6 dígitos.';
        return;
      }
      this.busy = true;
      setTimeout(() => {
        this.busy = false;
        if (this.isNewUser) {
          // Va a completar perfil.
          this.step = 'signup';
        } else {
          // Login directo: logueamos como creador y vamos a 'redirect'.
          this._loginAsCreator();
          this._populateFromSession();
          this.step = 'redirect';
        }
        this.stopResendTimer();
      }, 700);
    },

    backToEmail() {
      this.stopResendTimer();
      this.step = 'email';
      this.otp = ['', '', '', '', '', ''];
      this.error = '';
    },

    // --- Resend ---
    resendOtp() {
      if (this.resendCountdown > 0) return;
      this.startResendTimer(30);
    },
    startResendTimer(sec) {
      this.stopResendTimer();
      this.resendCountdown = sec;
      this.resendTimerId = setInterval(() => {
        this.resendCountdown = Math.max(0, this.resendCountdown - 1);
        if (this.resendCountdown === 0) this.stopResendTimer();
      }, 1000);
    },
    stopResendTimer() {
      if (this.resendTimerId) { clearInterval(this.resendTimerId); this.resendTimerId = null; }
    },

    // --- Paso 3: completar signup ---
    submitSignup() {
      this.error = '';
      if (!this.company.trim() || !this.firstName.trim() || !this.lastName.trim()) {
        this.error = 'Completá todos los campos.';
        return;
      }
      // Guardo perfil del creador + login como creador.
      this.$store.profiles.save(this.email, {
        firstName: this.firstName.trim(),
        lastName:  this.lastName.trim(),
        company:   this.company.trim(),
        isCreator: true,
      });
      this._loginAsCreator();
      this.step = 'redirect';
    },

    // --- Helper: login flag isCreator=true ---
    _loginAsCreator() {
      this.$store.session.login(this.email, { isCreator: true });
    },

    // --- Google mock (idéntico patrón a authPage pero marca isCreator) ---
    loginWithGoogle() {
      this.busy = true;
      setTimeout(() => {
        const mockEmail = 'demo.creator@vibe.app';
        this.email = mockEmail;
        const known = this.$store.session.isKnown(mockEmail);
        this._loginAsCreator();
        if (!known) {
          this.$store.profiles.save(mockEmail, {
            firstName: 'Demo',
            lastName:  'Creador',
            company:   'Productora Demo',
            isCreator: true,
          });
        }
        this._populateFromSession();
        this.step = 'redirect';
        this.busy = false;
      }, 500);
    },
  }));

  // -------- ACCOUNT PAGE --------------------------------------------------
  // Mi cuenta: tickets + favoritos. Requiere sesión; si no hay sesión,
  // redirige a auth.html?redirect=account.html.
  //
  // UI: 2 tabs (tickets | favs), cada tab tiene 2 subtabs (upcoming | past).
  // Los tickets vienen de $store.profiles (si hay) o de un mock (returning user).
  // Los favoritos vienen de $store.favorites.ids + EVENT_DATA.
  //
  // URL query: ?tab=tickets|favs para deep-link desde mobile menu.
  Alpine.data('accountPage', () => ({
    // --- Estado reactivo (no persiste, vive solo en la página) ---
    tab:            'tickets',          // 'tickets' | 'favs'
    ticketsSubtab:  'upcoming',         // 'upcoming' | 'past'
    favsSubtab:     'upcoming',         // 'upcoming' | 'past'
    dropdownOpen:   false,              // dropdown del avatar (header)

    // Handler referenciado (lo guardamos para poder removerlo en destroy()).
    _onDocClick: null,

    init() {
      // 1) Gate: si no hay sesión, mandá al login con redirect de vuelta.
      if (!this.$store.session.isAuthed) {
        // redirect codificado para que auth.html vuelva acá después del login
        location.href = 'auth.html?redirect=' + encodeURIComponent('account.html');
        return;
      }

      // 2) Tab inicial desde URL (?tab=tickets|favs). Default: tickets.
      //    También leemos el hash (#section-favoritos) que usa el redirect
      //    post-auth cuando el guest guardó un favorito antes de loguearse.
      try {
        const params = new URLSearchParams(location.search);
        const t = params.get('tab');
        if (t === 'favs' || t === 'tickets') this.tab = t;
        // Hash toma precedencia sobre ?tab — más específico y viene del
        // flow del prompt de favoritos.
        if (location.hash === '#section-favoritos') this.tab = 'favs';
      } catch {}

      // 3) Cerrar dropdown al click afuera. Guardamos la función en this._onDocClick
      //    para poder removerla en destroy() (evita memory leak si Alpine re-monta).
      this._onDocClick = (e) => {
        // Si el click no fue dentro del wrap, cerrar.
        const wrap = this.$refs.avatarWrap;
        if (this.dropdownOpen && wrap && !wrap.contains(e.target)) {
          this.dropdownOpen = false;
        }
      };
      document.addEventListener('click', this._onDocClick);

      // 4) Cerrar menú móvil al cambiar de tab (navegación explícita).
      //    El menú se abre desde el header; acá solo garantizamos cierre.
      //    (No ejecutamos nada — el link del mobile menu ya setea tab por URL.)
    },

    // Cleanup: Alpine llama destroy() cuando el scope se desmonta (ej. navegando
    // SPA-style con wire:morph o similares). Removemos el listener global.
    destroy() {
      if (this._onDocClick) {
        document.removeEventListener('click', this._onDocClick);
        this._onDocClick = null;
      }
    },

    // ---- Tabs / subtabs ----
    switchTab(t) {
      if (t !== 'tickets' && t !== 'favs') return;
      this.tab = t;
      // Actualizamos URL para que refresh o compartir conserve la tab.
      try {
        const url = new URL(location.href);
        url.searchParams.set('tab', t);
        history.replaceState({}, '', url.toString());
      } catch {}
    },
    switchTicketsSubtab(s) {
      if (s === 'upcoming' || s === 'past') this.ticketsSubtab = s;
    },
    switchFavsSubtab(s) {
      if (s === 'upcoming' || s === 'past') this.favsSubtab = s;
    },

    // ---- Dropdown del avatar ----
    toggleDropdown() { this.dropdownOpen = !this.dropdownOpen; },
    closeDropdown()  { this.dropdownOpen = false; },

    // ---- Logout ----
    logout() {
      this.$store.session.logout();
      // Limpio carrito: no tiene sentido arrastrarlo a otra sesión.
      if (this.$store.cart && typeof this.$store.cart.clear === 'function') {
        this.$store.cart.clear();
      }
      location.href = 'index.html';
    },

    // ---- Getters: usuario actual ----
    get email() { return this.$store.session.email || ''; },
    get profile() {
      return this.$store.profiles.get(this.email) || {};
    },
    get firstName() { return this.profile.firstName || 'Amigo'; },
    get lastName()  { return this.profile.lastName  || ''; },
    get fullName() {
      const ln = this.lastName ? (' ' + this.lastName) : '';
      return this.firstName + ln;
    },
    get initials() {
      const f = (this.firstName || 'U').charAt(0).toUpperCase();
      const l = (this.lastName  || '').charAt(0).toUpperCase();
      return (f + l) || 'U';
    },
    get greeting() {
      // Saludo según hora local del browser — matchea prototipo ~línea 11164.
      const h = new Date().getHours();
      if (h < 12) return 'Buenos días';
      if (h < 19) return 'Buenas tardes';
      return 'Buenas noches';
    },

    // ---- Getters: tickets ----
    // Un ticket se guarda en profile.tickets (array). Si no hay, caemos a mock.
    // Formato esperado (de checkout success):
    //   { id, eventKey, kicker, title, dateLabel, venue, section, seat, qty,
    //     orderRef, artBg (CSS class), isPast? }
    get userTickets() {
      const fromProfile = Array.isArray(this.profile.tickets) ? this.profile.tickets : [];
      if (fromProfile.length > 0) return fromProfile;
      // Mock para returning user (matchea getMockTickets del prototipo).
      return this._mockTickets();
    },
    get upcomingTickets() {
      return this.userTickets.filter(t => !t.isPast);
    },
    get pastTickets() {
      return this.userTickets.filter(t => !!t.isPast);
    },

    // ---- Getters: favoritos ----
    // Los favs son IDs en $store.favorites.ids que mapean a EVENT_DATA.
    // "Upcoming" = evento existe en catálogo (vigente). "Past" = ID
    // guardado pero el evento ya no está en el catálogo (histórico).
    get favoriteEvents() {
      const ids = this.$store.favorites.ids || [];
      const data = window.EVENT_DATA || {};
      return ids.map(id => ({ id, event: data[id] || null }));
    },
    get upcomingFavs() {
      return this.favoriteEvents.filter(f => !!f.event);
    },
    get pastFavs() {
      // Favs cuyo evento ya no existe en catálogo — típicamente pasados.
      return this.favoriteEvents.filter(f => !f.event);
    },

    // ---- Helpers para tarjetas de favoritos (mismo patrón que similarEvents) ----
    cardTitle(ev) {
      // Strip de <em>/<br> del título (event titles traen HTML).
      return String(ev?.title || '').replace(/<br\s*\/?>/gi, ' ').replace(/<\/?em>/gi, '').trim();
    },
    formatFavDate(ev) {
      return String(ev?.date || '').toUpperCase();
    },

    // ---- Mock tickets (solo para returning users sin tickets reales) ----
    _mockTickets() {
      return [
        {
          id: 'tk-001',
          eventKey: 'yatra',
          artBg: 'bg-yatra',
          kicker: 'ENTRE TANTA GENTE TOUR',
          title: 'Sebastián Yatra',
          dateLabel: 'Sáb 15 Jun · 8:30 PM',
          venue: 'Estadio Nacional',
          section: 'Platinum',
          seat: 'A — Fila 12',
          qty: 2,
          orderRef: 'VIBES-20260615-SY',
          isPast: false,
        },
        {
          id: 'tk-002',
          eventKey: 'tristito',
          artBg: 'bg-tristito',
          kicker: 'IMPERIAL PRESENTA',
          title: 'Reggaetón Tristito',
          dateLabel: 'Sáb 2 May · 8:00 PM',
          venue: 'Finca La Glorita, Liberia',
          section: 'General',
          seat: null,
          qty: 2,
          orderRef: 'VIBES-20260502-RT',
          isPast: false,
        },
        {
          id: 'tk-p01',
          eventKey: 'depresion',
          artBg: 'bg-depresion',
          kicker: 'WORLD TOUR 2026',
          title: 'Depresión Sonora',
          dateLabel: 'Sáb 18 Abr · 8:30 PM',
          venue: 'Amon Solar, San José',
          section: 'General',
          seat: null,
          qty: 1,
          orderRef: 'VIBES-20260418-DS',
          isPast: true,
        },
      ];
    },
  }));
});
