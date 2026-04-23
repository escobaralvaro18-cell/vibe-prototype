# Vibe — Prototipo

Plataforma de venta de entradas para eventos en Centroamérica.
Prototipo multi-página construido con Alpine.js + Tailwind v4 CDN + CSS puro.

## Stack

- **Alpine.js 3.14.1** (`@alpinejs/persist` para stores persistidos)
- **Tailwind v4 Play CDN** (tokens de theme con `@theme`)
- **Vanilla CSS** (`css/proto.css`) — portado del prototipo original
- **Vanilla JS ES6** — sin bundler, todo carga vía `<script defer>`

## Estructura

```
/
├── index.html           # Home — cartelera, carruseles, filtros por país
├── event.html           # Detalle de evento + countdown preventa
├── checkout.html        # Flujo cart → identity → details → payment → success
├── account.html         # Mi cuenta — tickets + favoritos
├── auth.html            # Login / signup passwordless
├── creator-auth.html    # Login / signup para creadores
├── creators.html        # Landing para creadores ("Publicá tu evento")
├── experiencias.html    # Experiencias (escapes / wellness)
├── css/
│   └── proto.css        # Estilos compartidos entre páginas
├── js/
│   ├── stores.js        # Alpine.store: cart, session, profiles, favorites, ui
│   ├── components.js    # Alpine.data: header, checkoutPage, eventPage, etc.
│   └── data/
│       ├── countries.js # COUNTRY_DATA + PHONE_COUNTRIES + flagSvg()
│       └── events.js    # EVENT_DATA — catálogo de eventos (seed)
└── README.md
```

## Correr localmente

Es un sitio estático, no necesita build. Abrí cualquier archivo `.html` directo
en el browser, o serví la carpeta con un static server:

```bash
# Python 3
python3 -m http.server 8000

# Node (si tenés npx)
npx serve .
```

Después andá a `http://localhost:8000`.

## Demo

Publicado en GitHub Pages: https://escobaralvaro18-cell.github.io/vibe-prototype/

## Features principales

- **Catálogo de eventos** filtrable por país (CR / SV / HN) + "Centroamérica"
- **Buscador global** con sugerencias, recientes, accent-insensitive
- **Detalle de evento** con seat picker (para Yatra), GA tiers, multi-date, recurring (yoga), preventa con countdown + código de acceso
- **Checkout** de 4 pasos: selección de entradas → identidad (guest o login) → datos del comprador + titulares → método de pago (nueva tarjeta o guardada) → confirmación
- **Cuentas persistidas** vía `localStorage` (Alpine $persist) — tickets, favoritos, perfil
- **Creadores**: landing, auth passwordless

## Notas

- No hay backend: todo es localStorage + mocks. Los pagos son simulados
  (setTimeout 900ms → "exitoso").
- Las tarjetas guardadas son mock; nunca se persiste CVV (PCI DSS).
- Para resetear el estado: abrí devtools → Application → Local Storage → borrá
  todo lo que empieza con `vibe_`.
