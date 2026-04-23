// ============================================================================
// Alpine stores globales — compartidos por todas las páginas de Vibe.
// Cada store usa $persist ($alpinejs/persist) para sobrevivir reloads.
//
// Keys en localStorage:
//   vibe_cart      — carrito activo (tickets seleccionados)
//   vibe_session   — usuario autenticado (email, token, isCreator)
//   vibe_profiles  — mapa email → perfil completo (consolida vibe_profile_<email>)
//   vibe_ui        — preferencias UI (país, menús, overlays)
//
// Migración one-shot: al inicializar, si detectamos keys legacy (vibe_profile_*,
// vibe_known_users, vibe_app_state) las importamos y las borramos.
// ============================================================================

document.addEventListener('alpine:init', () => {

  // ---- CART --------------------------------------------------------------
  // Carrito de tickets. Se llena en event.html, se lee en checkout.html.
  // `countdownEndsAt` es timestamp ms; la página checkout calcula el diff.
  Alpine.store('cart', {
    eventId:         Alpine.$persist(null).as('vibe_cart_eventId'),
    // Para eventos `multi-date`, guardá qué función eligió el usuario
    // (coincide con dates[i].id del evento). null para eventos single/recurring.
    selectedDateId:  Alpine.$persist(null).as('vibe_cart_selectedDateId'),
    tickets:         Alpine.$persist([]).as('vibe_cart_tickets'),
    feePct:          Alpine.$persist(0.05).as('vibe_cart_feePct'),
    couponCode:      Alpine.$persist(null).as('vibe_cart_couponCode'),
    couponDiscount:  Alpine.$persist(0).as('vibe_cart_couponDiscount'),
    orderRef:        Alpine.$persist(null).as('vibe_cart_orderRef'),
    countdownEndsAt: Alpine.$persist(null).as('vibe_cart_countdownEndsAt'),

    // Getters derivados (no se persisten, se recalculan).
    get subtotal() {
      return (this.tickets || []).reduce(
        (sum, t) => sum + (Number(t.price) || 0) * (Number(t.qty) || 0),
        0
      );
    },
    // IMPORTANTE: la comisión se calcula sobre el subtotal YA descontado, no
    // sobre el bruto. Matchea el cálculo del prototipo (línea 12198-12200):
    //   discountedSub = subtotal - descuento
    //   fee           = discountedSub * feePct
    //   total         = discountedSub + fee
    get _discountedSub() {
      return Math.max(0, this.subtotal - (this.couponDiscount || 0));
    },
    get fee()    { return this._discountedSub * this.feePct; },
    get total()  { return this._discountedSub + this.fee; },
    get qtyTotal() {
      return (this.tickets || []).reduce((n, t) => n + (Number(t.qty) || 0), 0);
    },

    // Helpers mutadores.
    addTicket(tier, qty) {
      if (!tier || !qty) return;
      const i = this.tickets.findIndex(t => t.tierId === tier.id);
      if (i >= 0) this.tickets[i].qty += qty;
      else this.tickets.push({
        tierId: tier.id, name: tier.name, price: tier.price, qty
      });
    },
    setEvent(eventId) {
      if (this.eventId !== eventId) {
        this.eventId = eventId;
        this.tickets = [];
        this.selectedDateId = null;
      }
    },
    clear() {
      this.eventId = null;
      this.selectedDateId = null;
      this.tickets = [];
      this.couponCode = null;
      this.couponDiscount = 0;
      this.orderRef = null;
      this.countdownEndsAt = null;
    },
  });

  // ---- SESSION -----------------------------------------------------------
  // Usuario autenticado. `knownUsers` es array de emails que ya existieron
  // (para saber si /auth?mode=login o /auth?mode=signup por email).
  Alpine.store('session', {
    email:      Alpine.$persist(null).as('vibe_session_email'),
    isCreator:  Alpine.$persist(false).as('vibe_session_isCreator'),
    authToken:  Alpine.$persist(null).as('vibe_session_authToken'),
    knownUsers: Alpine.$persist([]).as('vibe_session_knownUsers'),

    get isAuthed() { return !!this.email && !!this.authToken; },

    login(email, opts = {}) {
      this.email = email;
      this.authToken = opts.token || ('mock-' + Math.random().toString(36).slice(2));
      this.isCreator = !!opts.isCreator;
      if (!this.knownUsers.includes(email)) this.knownUsers.push(email);
      // Demo: siembra 2 tarjetas mock para poder probar el flujo de saved
      // cards en el paso de pago. Solo si el perfil existe y está vacío.
      try { Alpine.store('profiles').seedMockCards(email); } catch {}
    },
    logout() {
      this.email = null;
      this.authToken = null;
      this.isCreator = false;
    },
    isKnown(email) {
      return this.knownUsers.includes((email || '').toLowerCase());
    },
  });

  // ---- PROFILES ----------------------------------------------------------
  // Mapa email → { firstName, lastName, phone, idDoc, tickets: [], ... }
  // Consolida todos los keys vibe_profile_<email> del prototipo viejo.
  Alpine.store('profiles', {
    byEmail: Alpine.$persist({}).as('vibe_profiles_byEmail'),

    get(email) {
      if (!email) return null;
      return this.byEmail[email.toLowerCase()] || null;
    },
    save(email, partial) {
      if (!email) return;
      const key = email.toLowerCase();
      this.byEmail[key] = { ...(this.byEmail[key] || {}), ...partial };
    },
    addTicket(email, ticket) {
      if (!email) return;
      const key = email.toLowerCase();
      const p = this.byEmail[key] || {};
      p.tickets = [...(p.tickets || []), ticket];
      this.byEmail[key] = p;
    },

    // ---- SAVED CARDS ------------------------------------------------------
    // Tarjetas guardadas por perfil. En producción serían tokens; acá solo
    // guardamos brand + last4 + exp + holderName (info no-sensible) para
    // demo. El CVV NUNCA se persiste (se pide en cada compra — PCI DSS).
    getCards(email) {
      const p = this.get(email);
      return (p && Array.isArray(p.savedCards)) ? p.savedCards : [];
    },
    addCard(email, card) {
      if (!email || !card) return null;
      const key = email.toLowerCase();
      const p = this.byEmail[key] || {};
      const cards = Array.isArray(p.savedCards) ? [...p.savedCards] : [];
      const id = 'card_' + Math.random().toString(36).slice(2, 10);
      const entry = {
        id,
        brand: card.brand || 'visa',
        last4: card.last4 || '0000',
        exp: card.exp || '',
        holderName: card.holderName || '',
        isDefault: cards.length === 0, // primera tarjeta = default
      };
      cards.push(entry);
      p.savedCards = cards;
      this.byEmail[key] = p;
      return id;
    },
    removeCard(email, cardId) {
      if (!email || !cardId) return;
      const key = email.toLowerCase();
      const p = this.byEmail[key];
      if (!p || !Array.isArray(p.savedCards)) return;
      const wasDefault = p.savedCards.find(c => c.id === cardId)?.isDefault;
      p.savedCards = p.savedCards.filter(c => c.id !== cardId);
      // Si se removió la default, la primera que quede toma el flag.
      if (wasDefault && p.savedCards.length > 0) {
        p.savedCards[0].isDefault = true;
      }
      this.byEmail[key] = p;
    },
    // Seed mock de 2 tarjetas para demo, solo si el perfil existe y no
    // tiene ya tarjetas guardadas. Se llama desde session.login().
    seedMockCards(email) {
      if (!email) return;
      const existing = this.getCards(email);
      if (existing.length > 0) return;
      const key = email.toLowerCase();
      const p = this.byEmail[key] || {};
      p.savedCards = [
        { id: 'card_seed_visa', brand: 'visa', last4: '4242', exp: '12/27', holderName: '', isDefault: true },
        { id: 'card_seed_mc',   brand: 'mc',   last4: '0005', exp: '08/26', holderName: '', isDefault: false },
      ];
      this.byEmail[key] = p;
    },
  });

  // ---- FAVORITES ---------------------------------------------------------
  // Set de eventIds favoritos del usuario (♥ en las cards).
  // Persistente por browser. En el prototipo viejo vivía en `getMockFavorites()`,
  // acá es fuente de verdad única: toggle desde cards, lectura desde cuenta.
  Alpine.store('favorites', {
    ids: Alpine.$persist([]).as('vibe_favorites_ids'),

    has(eventId) {
      return !!eventId && this.ids.includes(eventId);
    },
    toggle(eventId) {
      if (!eventId) return;
      const i = this.ids.indexOf(eventId);
      if (i >= 0) this.ids.splice(i, 1);
      else this.ids.push(eventId);
    },
    add(eventId) {
      if (!eventId || this.ids.includes(eventId)) return;
      this.ids.push(eventId);
    },
    remove(eventId) {
      if (!eventId) return;
      const i = this.ids.indexOf(eventId);
      if (i >= 0) this.ids.splice(i, 1);
    },
    clear() { this.ids = []; },
    get count() { return this.ids.length; },
  });

  // ---- UI ----------------------------------------------------------------
  // Preferencias de UI (país activo, menú móvil, overlays de búsqueda).
  // `country = null` → sin filtro (Centroamérica, ve todos los países).
  // `country = 'CR' | 'SV' | 'HN'` → solo eventos de ese país.
  // Timer para skeleton (no persiste — solo en memoria).
  let _filterSkelTimer = null;

  Alpine.store('ui', {
    country:            Alpine.$persist(null).as('vibe_ui_country'),
    menuOpen:           false, // efímero — no persiste
    searchOverlayOpen:  false,

    // Acepta 'ALL' o null como "sin filtro" (Centroamérica).
    // Cualquier código válido (COUNTRY_CODES) se setea. Si cambia el valor,
    // dispara `flashFilterSkeleton` para mostrar el shimmer 850ms.
    setCountry(code) {
      const prev = this.country;
      let next;
      if (code === null || code === 'ALL') {
        next = null;
      } else if (window.COUNTRY_CODES && window.COUNTRY_CODES.includes(code)) {
        next = code;
      } else {
        return; // código no soportado, no-op
      }
      if (prev === next) return; // no cambió, no flash
      this.country = next;
      this.flashFilterSkeleton();
    },
    clearCountry() {
      if (this.country === null) return;
      this.country = null;
      this.flashFilterSkeleton();
    },
    // Muestra el skeleton shimmer sobre cards/secciones por 850ms.
    // Portado de `flashFilterSkeleton()` del prototipo (línea 10166).
    flashFilterSkeleton() {
      document.body.classList.add('vibe-loading-filter');
      if (_filterSkelTimer) clearTimeout(_filterSkelTimer);
      _filterSkelTimer = setTimeout(() => {
        document.body.classList.remove('vibe-loading-filter');
        _filterSkelTimer = null;
      }, 850);
    },
    toggleMenu()   { this.menuOpen = !this.menuOpen; },
    toggleSearch() { this.searchOverlayOpen = !this.searchOverlayOpen; },
  });

  // ---- MIGRACIÓN LEGACY (one-shot) ---------------------------------------
  // Ejecuta una sola vez por browser; después se autodesactiva.
  try {
    const MIG_KEY = 'vibe_migrated_v1';
    if (!localStorage.getItem(MIG_KEY)) {
      // 1) Perfiles: vibe_profile_<email> → store profiles.byEmail
      const profiles = Alpine.store('profiles');
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('vibe_profile_')) {
          try {
            const email = k.replace('vibe_profile_', '');
            const data = JSON.parse(localStorage.getItem(k));
            if (data) profiles.save(email, data);
            localStorage.removeItem(k);
          } catch {}
        }
      });
      // 2) Known users: vibe_known_users → store session.knownUsers
      try {
        const raw = localStorage.getItem('vibe_known_users');
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            const session = Alpine.store('session');
            list.forEach(e => {
              if (!session.knownUsers.includes(e)) session.knownUsers.push(e);
            });
          }
          localStorage.removeItem('vibe_known_users');
        }
      } catch {}
      // 3) App state viejo: vibe_app_state → ya no se usa (defaults fijos)
      localStorage.removeItem('vibe_app_state');

      localStorage.setItem(MIG_KEY, '1');
      console.info('[vibe] migración legacy completada');
    }
  } catch (e) {
    console.warn('[vibe] migración legacy falló:', e);
  }
});
