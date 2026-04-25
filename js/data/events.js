// ============================================================================
// EVENT_DATA — catálogo de eventos (portado verbatim desde MVP_Phoenix_Project.html
// líneas 11404-11823). Cada entrada describe: eventType, ticketMode, config,
// kicker, title (puede llevar HTML con <em>/<br>), fecha/hora/venue/city,
// descripción (HTML), lineup, organizador, precio mínimo, bg CSS class e info list.
// ============================================================================

window.EVENT_DATA = {
  yatra: {
    eventType: 'single',
    ticketMode: 'seated',
    seatedConfig: {
      sections: [
        { id: 'platinum',   name: 'Platinum',     price: 85, priceBefore: 95, color: '#c6f800', status: 'available', description: 'Primera fila · Meet & greet incluido' },
        { id: 'vip',        name: 'VIP',          price: 65, color: '#00aa5c', status: 'fewleft', description: 'Zona VIP con barra exclusiva' },
        { id: 'general',    name: 'General',      price: 45, color: '#2d9cdb', status: 'available', description: 'Acceso general al estadio' },
        { id: 'accessible', name: 'Discapacidad', price: 45, color: '#f59e0b', status: 'available', description: 'Zona accesible con acompañante' }
      ]
    },
    kicker: 'ENTRE TANTA GENTE TOUR',
    title: 'Sebastián<br><em>Yatra.</em>',
    date: 'Sáb 15 Jun',
    time: '8:30 PM',
    venue: 'Estadio Nacional',
    city: 'San José',
    desc: '<p>Sebastián Yatra llega a Costa Rica con su <strong>Entre Tanta Gente Tour</strong>, un show íntimo donde recorrerá sus mayores éxitos y los temas de su nuevo álbum.</p><p><strong>Apto para todas las edades.</strong> Puertas abren 2 horas antes del show. Zona familiar disponible.</p>',
    lineup: [
      { name: 'Sebastián Yatra', main: true },
      { name: 'Telonero: TBA' }
    ],
    orgAvatar: 'MC',
    orgName: 'Move Concerts CR',
    price: '$45.00',
    bg: 'bg-yatra',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '6:30 PM — inicio 8:30 PM'],
      ['Parqueo', 'Disponible en el venue'],
      ['Pagos', 'Efectivo, SINPE, tarjeta'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  alejandro: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'palco',    name: 'Palco Premium', price: 150, color: '#c6f800', status: 'soldout',   description: 'Palco privado · 6 personas · Menú' },
        { id: 'platinum', name: 'Platinum',      price: 120, color: '#c6f800', status: 'fewleft',   description: 'Primera fila con mesa' },
        { id: 'vip',      name: 'VIP',           price:  95, color: '#00aa5c', status: 'available', description: 'Butaca numerada zona A' },
        { id: 'general',  name: 'General',       price:  85, color: '#2d9cdb', status: 'available', description: 'Acceso general al recinto' }
      ]
    },
    kicker: 'DE REY A REY · HOMENAJE A VICENTE FERNÁNDEZ',
    title: 'Alejandro<br><em>Fernández.</em>',
    date: 'Vie 22 Ago',
    time: '9:00 PM',
    venue: 'Parque Viva',
    city: 'Alajuela',
    desc: '<p><strong>Alejandro Fernández</strong> presenta <em>De Rey a Rey</em>, un homenaje en vida a su padre Vicente Fernández. Una noche de mariachi, rancheras y los clásicos de la dinastía Fernández.</p><p>Show único en Costa Rica. Incluye banda mariachi en vivo de 14 elementos.</p>',
    lineup: [
      { name: 'Alejandro Fernández', main: true },
      { name: 'Mariachi Nuevo Tecalitlán' }
    ],
    orgAvatar: 'RP',
    orgName: 'RPM Entertainment',
    price: '$85.00',
    bg: 'bg-alejandro',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '7:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Incluido en el predio'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 72h antes']
    ]
  },
  arcangel: {
    eventType: 'single',
    ticketMode: 'ga',
    ageRestricted: 18,
    seatedConfig: {
      sections: [
        { id: 'vip-early', name: 'VIP Early Bird', price: 65, color: '#c6f800', status: 'soldout',   description: 'Acceso anticipado + Meet & greet' },
        { id: 'vip',       name: 'VIP',            price: 80, color: '#c6f800', status: 'fewleft',   description: 'Zona VIP con barra privada' },
        { id: 'palco',     name: 'Palco',          price: 70, color: '#00aa5c', status: 'available', description: 'Palco alto · vista completa' },
        { id: 'general-1', name: 'General F1',     price: 45, priceBefore: 55, color: '#2d9cdb', status: 'fewleft',   description: 'General — últimas unidades' },
        { id: 'general-2', name: 'General F2',     price: 55, color: '#2d9cdb', status: 'available', description: 'Acceso general al estadio' }
      ]
    },
    kicker: 'LA 8VA MARAVILLA · WORLD TOUR',
    title: 'Arcángel.<br><em>La 8va Maravilla.</em>',
    date: 'Sáb 28 Jun',
    time: '10:00 PM',
    venue: 'Estadio Saprissa',
    city: 'San José',
    desc: '<p><strong>Arcángel</strong> trae su <em>La 8va Maravilla World Tour</em> a Costa Rica. Una noche de reggaetón, trap y perreo con uno de los artistas más influyentes del género urbano.</p><p><strong>Evento para mayores de 18 años.</strong> Últimas entradas disponibles.</p>',
    lineup: [
      { name: 'Arcángel', main: true },
      { name: 'De La Ghetto' },
      { name: 'Ñengo Flow' }
    ],
    orgAvatar: 'LP',
    orgName: 'Live Promotions',
    price: '$55.00',
    bg: 'bg-arcangel',
    info: [
      ['Edad mínima', '18 años con identificación'],
      ['Puertas', '8:00 PM — inicio 10:00 PM'],
      ['Parqueo', 'Disponible · ₡3,000'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  beret: {
    eventType: 'multi-date',
    kicker: 'LO BELLO Y LO ROTO TOUR',
    title: 'Beret.<br><em>Lo Bello y Lo Roto.</em>',
    dates: [
      { id: 'b1', dayName: 'JUE', day: '12', month: 'JUN', venue: 'Teatro Melico Salazar', city: 'San José', time: '8:00 PM', price: '$38.00', status: 'available' },
      { id: 'b2', dayName: 'VIE', day: '13', month: 'JUN', venue: 'Teatro Melico Salazar', city: 'San José', time: '8:00 PM', price: '$38.00', status: 'last' },
      { id: 'b3', dayName: 'SÁB', day: '14', month: 'JUN', venue: 'Teatro Nacional', city: 'San José', time: '8:30 PM', price: '$48.00', status: 'available' },
      { id: 'b4', dayName: 'DOM', day: '15', month: 'JUN', venue: 'Teatro Nacional', city: 'San José', time: '7:00 PM', price: '$48.00', status: 'soldout' },
      { id: 'b5', dayName: 'MAR', day: '17', month: 'JUN', venue: 'Auditorio Municipal', city: 'Heredia', time: '8:00 PM', price: '$32.00', status: 'available' }
    ],
    desc: '<p><strong>Beret</strong> llega a Costa Rica con su gira <em>Lo Bello y Lo Roto</em>, un show acústico donde presenta los temas de su último álbum junto a sus grandes éxitos.</p><p>Show íntimo en teatro. Experiencia única acústica con banda en vivo.</p>',
    lineup: [
      { name: 'Beret', main: true }
    ],
    orgAvatar: 'NL',
    orgName: 'Nueva Luna Producciones',
    price: '$32.00',
    bg: 'bg-beret',
    info: [
      ['Edad mínima', 'Mayores de 12 años'],
      ['Puertas', '1 hora antes del show'],
      ['Parqueo', 'Según venue'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },

  karolg: {
    eventType: 'single',
    ticketMode: 'ga',
    ageRestricted: 16,
    seatedConfig: {
      sections: [
        { id: 'bichota',  name: 'Bichota Experience', price: 180, color: '#c6f800', status: 'soldout',   description: 'Meet & greet + soundcheck + merch' },
        { id: 'platinum', name: 'Platinum',           price: 140, color: '#c6f800', status: 'fewleft',   description: 'Primera fila · cancha preferencial' },
        { id: 'vip',      name: 'VIP',                price:  95, color: '#00aa5c', status: 'available', description: 'Cancha VIP con barra' },
        { id: 'general',  name: 'General',            price:  75, color: '#2d9cdb', status: 'available', description: 'Acceso general' },
        { id: 'grada',    name: 'Grada',              price:  55, color: '#2d9cdb', status: 'available', description: 'Grada numerada' }
      ]
    },
    kicker: 'MAÑANA SERÁ BONITO TOUR',
    title: 'Karol G.<br><em>Mañana Será Bonito.</em>',
    date: 'Vie 3 Oct',
    time: '9:00 PM',
    venue: 'Estadio Nacional',
    city: 'San José',
    desc: '<p><strong>Karol G</strong> trae su histórico <em>Mañana Será Bonito Tour</em> a Centroamérica por primera vez. Una noche con todos sus éxitos, producción 360° y bailarinas en escena.</p><p><strong>Mayores de 16 años (menores con un adulto).</strong> Puertas 6:00 PM. Zona VIP con meet-and-greet disponible.</p>',
    lineup: [
      { name: 'Karol G', main: true },
      { name: 'Feid (invitado especial)' }
    ],
    orgAvatar: 'MC',
    orgName: 'Move Concerts CR',
    price: '$75.00',
    bg: 'bg-karolg',
    info: [
      ['Edad mínima', '16 años (o acompañado)'],
      ['Puertas', '6:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Predio oficial disponible'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 72h antes']
    ]
  },
  maluma: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'platinum', name: 'Platinum', price: 120, color: '#c6f800', status: 'available', description: 'Primera fila · barra premium' },
        { id: 'vip',      name: 'VIP',      price:  85, color: '#00aa5c', status: 'fewleft',   description: 'Cancha VIP con meet & greet' },
        { id: 'general',  name: 'General',  price:  55, color: '#2d9cdb', status: 'available', description: 'Acceso general al recinto' },
        { id: 'grada',    name: 'Grada',    price:  40, color: '#2d9cdb', status: 'available', description: 'Grada superior numerada' }
      ]
    },
    kicker: '+PRETTY +DIRTY WORLD TOUR',
    title: 'Maluma.<br><em>Pretty / Dirty.</em>',
    date: 'Sáb 25 Oct',
    time: '9:00 PM',
    venue: 'Parque Viva',
    city: 'Alajuela',
    desc: '<p><strong>Maluma</strong> aterriza en Costa Rica con su <em>+Pretty +Dirty World Tour</em>, dos actos en una sola noche — lo romántico y lo perreo. Con banda en vivo y cuerpo de baile completo.</p><p>Apto para todas las edades. Zona familiar disponible.</p>',
    lineup: [
      { name: 'Maluma', main: true },
      { name: 'Telonero: TBA' }
    ],
    orgAvatar: 'RP',
    orgName: 'RPM Entertainment',
    price: '$55.00',
    bg: 'bg-maluma',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '7:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Incluido en el predio'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  camilo: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'familia',  name: 'Pack Familia (4)', price: 140, priceBefore: 160, color: '#c6f800', status: 'available', description: '4 entradas · zona familiar' },
        { id: 'platinum', name: 'Platinum',         price:  70, color: '#c6f800', status: 'available', description: 'Cancha preferencial' },
        { id: 'general',  name: 'General',          price:  40, color: '#2d9cdb', status: 'available', description: 'Acceso general' }
      ]
    },
    kicker: 'DE ADENTRO PA AFUERA TOUR',
    title: 'Camilo.<br><em>De Adentro Pa Afuera.</em>',
    date: 'Sáb 19 Jul',
    time: '8:30 PM',
    venue: 'Estadio Cuscatlán',
    city: 'San Salvador',
    desc: '<p><strong>Camilo</strong> llega a El Salvador con su gira familiar <em>De Adentro Pa Afuera Tour</em>. Un show íntimo y positivo para toda la familia, con banda en vivo y sorpresas de su álbum más personal.</p><p>Apto para todas las edades — show 100% familiar.</p>',
    lineup: [
      { name: 'Camilo', main: true },
      { name: 'Evaluna (invitada)' }
    ],
    orgAvatar: 'CP',
    orgName: 'Concerts & Partners SV',
    price: '$40.00',
    bg: 'bg-camilo',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '6:30 PM — inicio 8:30 PM'],
      ['Parqueo', 'Predio Estadio Cuscatlán'],
      ['Pagos', 'Tarjeta, Transfer365, efectivo'],
      ['Reembolsos', 'Hasta 72h antes']
    ]
  },
  morat: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'vip',     name: 'VIP',     price: 55, color: '#c6f800', status: 'available', description: 'Pista VIP al frente del escenario' },
        { id: 'general', name: 'General', price: 35, color: '#2d9cdb', status: 'available', description: 'Acceso general al gimnasio' }
      ]
    },
    kicker: 'CUARTO AZUL TOUR',
    title: 'Morat.<br><em>Cuarto Azul.</em>',
    date: 'Vie 29 Ago',
    time: '8:30 PM',
    venue: 'Gimnasio Nacional José Adolfo Pineda',
    city: 'San Salvador',
    desc: '<p><strong>Morat</strong> regresa a El Salvador con su <em>Cuarto Azul Tour</em>. Una noche de pop-folk con sus mayores éxitos y el material nuevo, en un formato acústico-eléctrico que es marca de la casa.</p><p>Apto para todas las edades. Todas las zonas son de pie.</p>',
    lineup: [
      { name: 'Morat', main: true }
    ],
    orgAvatar: 'CP',
    orgName: 'Concerts & Partners SV',
    price: '$35.00',
    bg: 'bg-morat',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '7:00 PM — inicio 8:30 PM'],
      ['Parqueo', 'Público · cercanías del Gimnasio'],
      ['Pagos', 'Tarjeta, Transfer365'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  manuelturizo: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'platinum', name: 'Platinum', price: 90, color: '#c6f800', status: 'fewleft',   description: 'Cancha preferencial · meet & greet' },
        { id: 'vip',      name: 'VIP',      price: 60, color: '#00aa5c', status: 'available', description: 'Zona VIP con barra' },
        { id: 'general',  name: 'General',  price: 38, color: '#2d9cdb', status: 'available', description: 'Acceso general al estadio' }
      ]
    },
    kicker: '201 TOUR',
    title: 'Manuel<br><em>Turizo.</em>',
    date: 'Sáb 13 Sep',
    time: '9:00 PM',
    venue: 'Estadio Nacional Chelato Uclés',
    city: 'Tegucigalpa',
    desc: '<p><strong>Manuel Turizo</strong> trae su <em>201 Tour</em> a Honduras por primera vez. Reggaetón romántico, pop urbano y todos los hits del álbum 2:01 en una noche pensada para cantar de principio a fin.</p><p>Apto para mayores de 14 años acompañados.</p>',
    lineup: [
      { name: 'Manuel Turizo', main: true }
    ],
    orgAvatar: 'HL',
    orgName: 'Honduras Live',
    price: '$38.00',
    bg: 'bg-manuelturizo',
    info: [
      ['Edad mínima', '14 años con adulto / 16+ solo'],
      ['Puertas', '7:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Público · cercanías del estadio'],
      ['Pagos', 'Tarjeta, Tengo, efectivo'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  tristito: {
    eventType: 'single',
    ticketMode: 'ga',
    ageRestricted: 18,
    // Tiers portados verbatim desde el prototipo (líneas 8751-8811)
    seatedConfig: {
      sections: [
        { id: 'gen-eb', name: 'General Early Bird', price: 11, color: '#2d9cdb', status: 'soldout',   description: 'Primera fase anticipada' },
        { id: 'gen-1',  name: 'General Fase 1',     price: 13, color: '#2d9cdb', status: 'soldout',   description: 'Acceso general' },
        { id: 'gen-2',  name: 'General Fase 2',     price: 17, priceBefore: 19, color: '#2d9cdb', status: 'fewleft',   description: 'Acceso general · Shot de bienvenida' },
        { id: 'vip-1',  name: 'VIP Fase 1',         price: 17, color: '#00aa5c', status: 'soldout',   description: 'VIP con barra exclusiva' },
        { id: 'vip-2',  name: 'VIP Fase 2',         price: 22, color: '#00aa5c', status: 'available', description: 'Barra VIP + zona + meet & greet' },
        { id: 'vip-3',  name: 'VIP Fase 3',         price: 28, color: '#c6f800', status: 'available', description: 'Última fase VIP' }
      ]
    },
    kicker: 'IMPERIAL PRESENTA · OLD SCHOOL',
    title: 'Reggaetón<br><em>Tristito.</em>',
    date: 'Sáb 2 May',
    time: '9:00 PM',
    venue: 'Finca La Glorita',
    city: 'Liberia',
    desc: '<p>Una noche de reggaetón de la vieja escuela. <strong>Imperial</strong> trae a <strong>Demphra</strong> como invitada desde La Factoría, junto a In Betwin, Smith, Casty y Chez.</p><p><strong>Evento para mayores de 18 años.</strong> Parqueo disponible en el predio. Tatuajes, micheladas y shots toda la noche.</p>',
    lineup: [
      { name: 'Demphra', main: true },
      { name: 'In Betwin' },
      { name: 'Smith' },
      { name: 'Casty' },
      { name: 'Chez' }
    ],
    orgAvatar: 'TP',
    orgName: 'Temazos Productions',
    price: '$11.00',
    bg: 'art-reggaeton',
    info: [
      ['Edad mínima', '18 años con identificación'],
      ['Puertas', '8:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'En el predio · ₡2,000'],
      ['Pagos', 'Efectivo, SINPE, tarjeta'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  // ============================================================
  // COMASAGUA — Primera "experiencia" (kind=experience, tour).
  // Reemplaza el yoga anterior como experiencia-modelo. Estructura
  // nueva: gallery, quickFacts, includes, bring, itinerary,
  // cancellation, host. Mantiene scheduleByMonth del modelo
  // recurring porque el calendario + slots picker ya funciona.
  // ============================================================
  // PATTERN_NOTE: Las experiencias/clases tienen un `pattern` que define en
  // qué días de la semana ocurren (0=Dom...6=Sáb, JS getDay()) y a qué hora.
  // El home (index.html) usa este pattern para calcular la próxima fecha
  // disponible y mostrarla en el card del carrusel ("SÁB 25 ABR · 7:00 AM"
  // en lugar del texto genérico "SÁB Y DOM · 7:00 AM"). Se actualiza al cargar.
  comasagua: {
    kind: 'experience',              // performance | experience
    experienceType: 'tour',          // class | tour | adventure | wellness
    eventType: 'recurring',          // reusa calendario para daily slots
    country: 'SV',
    pattern: { days: [5, 6, 0], time: '4:00 AM' }, // Vie/Sáb/Dom
    kicker: 'JIMNY TRIPS · POWERED BY SUZUKI',
    title: 'Sunrise en el<br><em>Peñón de Comasagua.</em>',
    category: 'Tours · Aventura',
    desc: '<p>Tour 4x4 en un <strong>Suzuki Jimny</strong> al mirador del Peñón de Comasagua. Vistas espectaculares de Surf City y La Libertad desde 1.400 msnm, naturaleza, aire fresco al amanecer, y fotos épicas en una experiencia de 5 horas.</p><p>Salida antes del amanecer para ver el sunrise desde el punto más alto. Incluye desayuno al volver del mirador.</p>',

    // Galería del hero carousel (3-5 fotos reales en lugar de gradient).
    gallery: [
      { src: 'assets/experiences/penon-sunrise.jpg', alt: 'Pareja en la cima del Peñón de Comasagua al amanecer, con vistas a la costa pacífica de El Salvador' },
      { src: 'assets/experiences/jimny-field.jpg',   alt: 'Dos Suzuki Jimny 4x4 en un campo de cultivo con las montañas de fondo — Jimny Trips powered by Suzuki' },
      { src: 'assets/experiences/jimny-border.jpg',  alt: 'Celebración en la cima junto a cartel de El Salvador, con dos Jimny 4x4 estacionados' }
    ],

    // Quick facts strip — lo crítico para decidir antes de scrollear.
    quickFacts: {
      duration: '5 horas',
      level: 'Principiante',
      groupMax: 8,
      language: 'Español / English',
      meetingPoint: 'Santa Tecla'
    },

    // Qué incluye — lista estructurada. Sin emojis (decisión de
     // branding: evitar iconos decorativos informales). El render usa
     // un checkmark SVG uniforme para todos los items. */
    includes: [
      'Transporte en Suzuki Jimny 4x4',
      'Experiencia de sunrise en el mirador',
      'Desayuno típico',
      'Fotos del tour'
    ],

    // Qué traer — lista de items del participante.
    bring: [
      'Ropa cómoda',
      'Tenis o calzado cerrado',
      'Gorra o sombrero',
      'Suéter ligero (hace fresco al amanecer)',
      'Protector solar',
      'Celular o cámara para fotos'
    ],

    // Itinerario — timeline visual para tours.
    itinerary: [
      { time: '4:00 AM', title: 'Salida',              note: 'Punto de encuentro en Santa Tecla' },
      { time: '6:00 AM', title: 'Llegada al Peñón',   note: 'Ascenso al mirador para el amanecer' },
      { time: '7:00 AM', title: 'Desayuno',            note: 'Desayuno típico con vista al amanecer' },
      { time: '9:00 AM', title: 'Regreso',             note: 'Vuelta al punto de encuentro' }
    ],

    // Ubicación — se renderea como mapa embed de Google Maps + textos.
    // `mapQuery` es lo que Google Maps busca (landmark o address); usar un
    // nombre reconocible funciona mejor que coordenadas crudas. El user
    // puede también abrirlo en una app dedicada con el link del final.
    location: {
      meetingPoint: 'Urb. La Montaña No 4, Santa Tecla, El Salvador',
      destination: 'Peñón de Comasagua, La Libertad, El Salvador',
      mapQuery: 'Peñón de Comasagua, El Salvador'
    },

    // Política de cancelación — decisión crítica de compra.
    cancellation: 'Cancelación gratis hasta 24 horas antes del tour',

    // Host — operador del tour, reemplaza al "organizer" con más detalle.
    host: {
      name: 'Jandi GO Tours',
      verified: true,
      badge: 'Operador verificado',
      avatar: 'J',
      short: 'Más de 200 tours guiados · Especialistas en 4x4'
    },

    // Reviews — rating promedio, total de reseñas, y 3 destacadas.
    // Si reviews.count === 0 mostramos el estado "Nuevo · sé el primero".
    reviews: {
      rating: 4.9,
      count: 42,
      distribution: { 5: 38, 4: 3, 3: 1, 2: 0, 1: 0 },
      highlights: [
        {
          name: 'Andrea M.',
          initial: 'A',
          date: 'Marzo 2026',
          rating: 5,
          text: 'Experiencia increíble de principio a fin. El sunrise desde el Peñón es algo que todo salvadoreño tiene que vivir. Jandi y su equipo manejan los Jimny con mucha experiencia — subís tranquilo aunque nunca hayas hecho 4x4. El desayuno arriba es la cereza del pastel.'
        },
        {
          name: 'Roberto S.',
          initial: 'R',
          date: 'Febrero 2026',
          rating: 5,
          text: 'Fuimos con mi novia y fue el mejor plan que hicimos en El Salvador. Organización impecable: puntuales, seguridad primero, y muchas paradas para fotos. La vista desde el mirador no la vas a encontrar en ningún tour comercial.'
        },
        {
          name: 'Carolina V.',
          initial: 'C',
          date: 'Enero 2026',
          rating: 4,
          text: 'Espectacular el recorrido y muy bien operado. Solo sugiero traer guantes si vas en diciembre-enero, hace más frío del que uno espera a las 4 AM. El desayuno y la compañía del grupo compensan todo. Volvemos seguro.'
        }
      ]
    },

    // Schedule — viernes, sábados y domingos disponibles cada mes.
    // Reutiliza la grid pattern del yoga pero con UN slot por día (4 AM).
    // Schedule por mes. Tours opera viernes/sábados/domingos (demo).
    // UN slot por día a las 4:00 AM (sunrise tour).
    scheduleByMonth: {
      '2026-3': { // Abril 2026
        '3':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '4':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'last' } ],
        '5':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'soldout' } ],
        '10': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '11': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '12': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '17': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '18': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'last' } ],
        '19': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '24': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '25': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '26': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ]
      },
      '2026-4': { // Mayo 2026
        '1':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '2':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '3':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '8':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '9':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '10': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '15': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '16': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'last' } ],
        '17': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '22': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '23': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '24': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '29': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '30': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '31': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ]
      },
      '2026-5': { // Junio 2026
        '5':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '6':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '7':  [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '12': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ],
        '13': [ { time: '4:00 AM', name: 'Sunrise Tour', teacher: 'Jandi Tours', price: '$45', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3',
    calMaxMonth: '2026-5',

    // Legacy fields (compatibilidad con componentes que ya leen event.orgAvatar,
    // event.orgName, event.price, event.bg, event.info). Para experiencias los
    // duplicamos desde host/quickFacts para no romper el render existente.
    orgAvatar: 'J',
    orgName: 'Jandi GO Tours',
    price: '$45.00',
    bg: 'art-comasagua',
    info: [
      ['Duración',           '5 horas'],
      ['Nivel',              'Principiante'],
      ['Capacidad',          'Máx 8 personas'],
      ['Operador',           'Jandi GO Tours'],
      ['Punto de encuentro', 'Urb. La Montaña, Santa Tecla']
    ]
  },
  badbunny: {
    eventType: 'single',
    ticketMode: 'ga',
    ageRestricted: 18,
    seatedConfig: {
      sections: [
        { id: 'conejo-fan', name: 'Conejo Fan Pack', price: 250, color: '#c6f800', status: 'soldout',   description: 'Soundcheck + Meet & greet + merch' },
        { id: 'platinum',   name: 'Platinum',        price: 180, color: '#c6f800', status: 'soldout',   description: 'Cancha preferencial' },
        { id: 'vip',        name: 'VIP',             price: 130, color: '#00aa5c', status: 'fewleft',   description: 'Cancha VIP con barra' },
        { id: 'cancha',     name: 'Cancha',          price:  95, color: '#2d9cdb', status: 'fewleft',   description: 'Acceso cancha general' },
        { id: 'grada',      name: 'Grada Alta',      price:  65, color: '#2d9cdb', status: 'available', description: 'Grada numerada' }
      ]
    },
    kicker: 'DEBÍ TIRAR MÁS FOTOS · WORLD TOUR',
    title: 'Bad<br><em>Bunny.</em>',
    date: 'Vie 7 Nov',
    time: '9:00 PM',
    venue: 'Estadio Nacional',
    city: 'San José',
    desc: '<p><strong>Bad Bunny</strong> llega a Costa Rica con su <em>Debí Tirar Más Fotos World Tour</em>. Una noche inolvidable de reggaetón, perreo y los hits que todo el país canta.</p><p><strong>Evento exclusivo para mayores de 18 años con identificación.</strong> Se venderán bebidas alcohólicas. Puertas abren 2 horas antes.</p>',
    lineup: [
      { name: 'Bad Bunny', main: true },
      { name: 'DJ Orma' },
      { name: 'Telonero: por confirmar' }
    ],
    orgAvatar: 'MC',
    orgName: 'Move Concerts CR',
    price: '$95.00',
    bg: 'bg-badbunny',
    info: [
      ['Edad mínima', '18 años con identificación obligatoria'],
      ['Puertas', '7:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Disponible · ₡5,000'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 72h antes']
    ]
  },
  feid: {
    eventType: 'single',
    ticketMode: 'ga',
    // Venta abre en ~4 días a partir de ahora (se calcula dinámicamente al cargar)
    salesStart: (function() {
      const d = new Date();
      d.setDate(d.getDate() + 4);
      d.setHours(12, 0, 0, 0);
      return d.toISOString();
    })(),
    seatedConfig: {
      sections: [
        { id: 'ferxxo',   name: 'Ferxxo Experience', price: 180, color: '#c6f800', status: 'available', description: 'Meet & greet + soundcheck (solo preventa)' },
        { id: 'platinum', name: 'Platinum',          price: 130, color: '#c6f800', status: 'available', description: 'Cancha preferencial' },
        { id: 'vip',      name: 'VIP',               price:  95, color: '#00aa5c', status: 'available', description: 'Cancha VIP con barra' },
        { id: 'general',  name: 'General',           price:  65, color: '#2d9cdb', status: 'available', description: 'Acceso general' }
      ]
    },
    kicker: 'FERXXO WORLD TOUR · 2026',
    title: 'Feid.<br><em>Ferxxo Tour.</em>',
    date: 'Sáb 18 Oct',
    time: '8:30 PM',
    venue: 'Parque Viva',
    city: 'San José',
    desc: '<p><strong>Feid</strong> trae el <em>Ferxxo World Tour 2026</em> a Costa Rica. El artista colombiano detrás de hits como "Classy 101", "Luna" y "Yandel 150" hace parada obligada en San José.</p><p>La preventa abre pronto para miembros VIBES. Guardalo en favoritos para no perdértelo.</p>',
    lineup: [
      { name: 'Feid', main: true },
      { name: 'Invitados por confirmar' }
    ],
    orgAvatar: 'LP',
    orgName: 'Live Promotions',
    price: '$65.00',
    bg: 'bg-feid',
    info: [
      ['Edad mínima', '12 años (menores con adulto)'],
      ['Puertas', '6:30 PM — inicio 8:30 PM'],
      ['Parqueo', 'Disponible · ₡3,500'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },
  // ========================================================================
  // DEPORTE — Partidos de fútbol locales (CR/SV/HN). Estructura clásica de
  // eventos `single + ga`, con tribunas como "secciones" del seatedConfig
  // (palco, sombra, sol, general). Imágenes Unsplash de estadios reales.
  // ========================================================================
  'clasico-cr': {
    eventType: 'single',
    ticketMode: 'ga',
    category: 'deporte', country: 'CR',
    seatedConfig: {
      sections: [
        { id: 'palco',    name: 'Palco Cabina',   price: 75, color: '#c6f800', status: 'fewleft',   description: 'Palco con bebidas y snacks incluidos' },
        { id: 'sombra-c', name: 'Sombra Centro',  price: 45, color: '#00aa5c', status: 'fewleft',   description: 'Vista preferencial al centro de la cancha' },
        { id: 'sombra',   name: 'Sombra',         price: 28, color: '#2d9cdb', status: 'available', description: 'Tribuna sombra cubierta' },
        { id: 'sol',      name: 'Sol',            price: 18, color: '#2d9cdb', status: 'available', description: 'Tribuna sol numerada' },
        { id: 'norte',    name: 'Sector Norte',   price: 22, color: '#2d9cdb', status: 'available', description: 'Barra Saprissa · ambiente caliente' }
      ]
    },
    kicker: 'LIGA PROMERICA · CLÁSICO MORADO',
    title: 'Saprissa vs<br><em>Alajuelense.</em>',
    date: 'Dom 24 May',
    time: '6:00 PM',
    venue: 'Estadio Ricardo Saprissa Aymá',
    city: 'San José',
    desc: '<p><strong>El Clásico del fútbol costarricense.</strong> Saprissa recibe a Alajuelense en una nueva edición del partido más esperado de la temporada. Más de 75 años de rivalidad en la cancha del Monstruo Morado.</p><p>Apto para todas las edades · Zona familiar disponible · Recomendamos llegar 1 hora antes.</p>',
    lineup: [
      { name: 'Deportivo Saprissa', main: true },
      { name: 'Liga Deportiva Alajuelense' }
    ],
    orgAvatar: 'DS',
    orgName: 'Deportivo Saprissa',
    price: '$18.00',
    bg: 'bg-clasico-cr',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '4:00 PM — inicio 6:00 PM'],
      ['Parqueo', 'Disponible · ₡3,500'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'No hay reembolsos en eventos deportivos']
    ]
  },

  'alianza-fas': {
    eventType: 'single',
    ticketMode: 'ga',
    category: 'deporte', country: 'SV',
    seatedConfig: {
      sections: [
        { id: 'palco',    name: 'Palco VIP',     price: 60, color: '#c6f800', status: 'fewleft',   description: 'Palco con catering · vista preferencial' },
        { id: 'platinum', name: 'Platea Centro', price: 35, color: '#00aa5c', status: 'available', description: 'Platea cubierta centro' },
        { id: 'platea',   name: 'Platea',        price: 22, color: '#2d9cdb', status: 'available', description: 'Platea cubierta lateral' },
        { id: 'general',  name: 'General',       price: 12, color: '#2d9cdb', status: 'available', description: 'Tribuna general · sol' }
      ]
    },
    kicker: 'PRIMERA DIVISIÓN · CLÁSICO DEL FÚTBOL',
    title: 'Alianza FC vs<br><em>FAS.</em>',
    date: 'Sáb 6 Jun',
    time: '5:00 PM',
    venue: 'Estadio Cuscatlán',
    city: 'San Salvador',
    desc: '<p><strong>El Clásico de El Salvador.</strong> Alianza FC y CD FAS protagonizan una nueva entrega de uno de los duelos más emblemáticos del fútbol salvadoreño. Más de 80 años de historia sobre la grama del Cuscatlán.</p><p>Show de medio tiempo con pirotecnia · Recomendamos llegar 1 hora antes.</p>',
    lineup: [
      { name: 'Alianza FC', main: true },
      { name: 'Club Deportivo FAS' }
    ],
    orgAvatar: 'AL',
    orgName: 'Alianza FC',
    price: '$12.00',
    bg: 'bg-alianza-fas',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '3:00 PM — inicio 5:00 PM'],
      ['Parqueo', 'Predio Estadio Cuscatlán'],
      ['Pagos', 'Tarjeta, Transfer365, efectivo'],
      ['Reembolsos', 'No hay reembolsos en eventos deportivos']
    ]
  },

  'olimpia-motagua': {
    eventType: 'single',
    ticketMode: 'ga',
    category: 'deporte', country: 'HN',
    seatedConfig: {
      sections: [
        { id: 'palco',        name: 'Palco',         price: 55, color: '#c6f800', status: 'fewleft',   description: 'Palco cubierto · vista al centro' },
        { id: 'sombra',       name: 'Sombra',        price: 25, color: '#00aa5c', status: 'available', description: 'Sombra cubierta' },
        { id: 'preferencial', name: 'Preferencial',  price: 15, color: '#2d9cdb', status: 'available', description: 'Preferencial · sol numerado' },
        { id: 'general',      name: 'General',       price:  8, color: '#2d9cdb', status: 'available', description: 'Tribuna general' }
      ]
    },
    kicker: 'LIGA NACIONAL · CLÁSICO CAPITALINO',
    title: 'Olimpia vs<br><em>Motagua.</em>',
    date: 'Dom 31 May',
    time: '4:00 PM',
    venue: 'Estadio Nacional Chelato Uclés',
    city: 'Tegucigalpa',
    desc: '<p><strong>El Clásico Capitalino.</strong> Olimpia y Motagua se enfrentan en el Estadio Nacional. La rivalidad más intensa del fútbol hondureño, ahora en una nueva temporada de la Liga Nacional.</p><p>Apto para todas las edades · Zona familiar disponible.</p>',
    lineup: [
      { name: 'Club Deportivo Olimpia', main: true },
      { name: 'Fútbol Club Motagua' }
    ],
    orgAvatar: 'OL',
    orgName: 'CD Olimpia',
    price: '$8.00',
    bg: 'bg-olimpia-motagua',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '2:00 PM — inicio 4:00 PM'],
      ['Parqueo', 'Disponible · cercanías del estadio'],
      ['Pagos', 'Tarjeta, Tengo, efectivo'],
      ['Reembolsos', 'No hay reembolsos en eventos deportivos']
    ]
  },

  // Piso 21 (HN) — agregado para cubrir el link del home que en el prototipo
  // quedaba huérfano. Datos razonables de show en Tegucigalpa.
  piso21: {
    eventType: 'single',
    ticketMode: 'ga',
    seatedConfig: {
      sections: [
        { id: 'platinum', name: 'Platinum', price: 70, color: '#c6f800', status: 'available', description: 'Primera fila · barra libre snacks' },
        { id: 'vip',      name: 'VIP',      price: 50, color: '#00aa5c', status: 'available', description: 'Cancha VIP con meet & greet' },
        { id: 'general',  name: 'General',  price: 28, color: '#2d9cdb', status: 'available', description: 'Acceso general' }
      ]
    },
    kicker: 'LATINOAMÉRICA TOUR',
    title: 'Piso<br><em>21.</em>',
    date: 'Vie 12 Sep',
    time: '9:00 PM',
    venue: 'Centro Cívico',
    city: 'Tegucigalpa',
    desc: '<p><strong>Piso 21</strong> aterriza en Honduras con su gira <em>Latinoamérica Tour</em>. Éxitos como <em>Me Llamas</em>, <em>Besándote</em> y los temas del nuevo álbum.</p><p>Apto para todas las edades. Zona VIP con barra libre de snacks.</p>',
    lineup: [
      { name: 'Piso 21', main: true },
      { name: 'DJ Set apertura' }
    ],
    orgAvatar: 'LN',
    orgName: 'LN Producciones',
    price: '$28.00',
    bg: 'bg-piso21',
    info: [
      ['Edad mínima', 'Todas las edades'],
      ['Puertas', '7:00 PM — inicio 9:00 PM'],
      ['Parqueo', 'Disponible'],
      ['Pagos', 'Tarjeta, transferencia'],
      ['Reembolsos', 'Hasta 48h antes']
    ]
  },

  // ========================================================================
  // EXPERIENCIAS DUMMY — catálogo para mostrar variedad por país (CR/SV/HN).
  // ========================================================================
  // Comparten la misma estructura que `comasagua` (el template modelo).
  // Cada una tiene gallery con foto real de Unsplash (1 imagen), datos
  // mínimos viables (quickFacts, includes, bring, host, cancellation,
  // scheduleByMonth básico). Sin itinerary ni location en las dummy para
  // mantener el archivo manejable — si se necesitan después, se agregan.
  // ========================================================================
  'surf-tamarindo': {
    kind: 'experience', experienceType: 'class', eventType: 'recurring',
    country: 'CR',
    pattern: { days: [6, 0], time: '7:00 AM' }, // Sáb/Dom
    kicker: 'PURA VIDA SURF · TAMARINDO',
    title: 'Surf lesson en<br><em>Playa Tamarindo.</em>',
    category: 'Clases · Deporte',
    desc: '<p>Clase de surf grupal con instructores certificados ISA. Todos los equipos incluidos (tabla, lycra, parafina). Ideal para principiantes que quieren pararse en su primera ola en una de las playas más icónicas del Pacífico costarricense.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=1600&q=75', alt: 'Persona surfeando una ola al atardecer en Playa Tamarindo' }
    ],
    quickFacts: { duration: '2 horas', level: 'Principiante', groupMax: 6, meetingPoint: 'Tamarindo' },
    includes: ['Tabla de surf y lycra', 'Instructor certificado ISA', 'Video de tus mejores olas', 'Agua y frutas'],
    bring: ['Traje de baño', 'Protector solar reef-safe', 'Toalla', 'Ganas de levantarte'],
    cancellation: 'Cancelación gratis hasta 12 horas antes',
    host: { name: 'Pura Vida Surf School', verified: true, avatar: 'P', short: 'Más de 10 años enseñando · Equipo ISA' },
    location: {
      meetingPoint: 'Pura Vida Surf School, Playa Tamarindo, Guanacaste',
      destination: 'Playa Tamarindo, Costa Rica',
      mapQuery: 'Playa Tamarindo, Guanacaste, Costa Rica'
    },
    scheduleByMonth: {
      '2026-3': {
        '4':  [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '5':  [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'last' } ],
        '11': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '12': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '18': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '19': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '25': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ],
        '26': [ { time: '7:00 AM', name: 'Morning Session', teacher: 'Pura Vida', price: '$55', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'P', orgName: 'Pura Vida Surf School',
    price: '$55.00', bg: 'art-surf-tamarindo',
    info: [
      ['Duración', '2 horas'], ['Nivel', 'Principiante'], ['Capacidad', 'Máx 6 personas'],
      ['Operador', 'Pura Vida Surf School'], ['Punto de encuentro', 'Playa Tamarindo']
    ]
  },

  'canopy-monteverde': {
    kind: 'experience', experienceType: 'adventure', eventType: 'recurring',
    country: 'CR',
    pattern: { days: [0, 1, 2, 3, 4, 5, 6], time: '9:00 AM' }, // diario
    kicker: 'SELVATURA · MONTEVERDE',
    title: 'Canopy tour en<br><em>Bosque Nuboso.</em>',
    category: 'Aventura',
    desc: '<p>Recorré el bosque nuboso de Monteverde por el aire: 14 cables de canopy, el más largo de 1 km. Vistas al océano Pacífico y al volcán Arenal desde los cables. Aptos todos los niveles con instrucciones de seguridad previas.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1600&q=75', alt: 'Bosque nuboso denso verde en Monteverde, Costa Rica' }
    ],
    quickFacts: { duration: '3 horas', level: 'Todos los niveles', groupMax: 12, meetingPoint: 'Monteverde' },
    includes: ['Arnés y casco', 'Guías bilingües', 'Transporte desde hotel', 'Galería de fotos digital'],
    bring: ['Zapatos cerrados', 'Ropa cómoda', 'Chaqueta ligera', 'Protector solar'],
    cancellation: 'Cancelación gratis hasta 24 horas antes',
    host: { name: 'Selvatura Park', verified: true, avatar: 'S', short: 'Parque privado · 250 hectáreas de bosque' },
    location: {
      meetingPoint: 'Selvatura Park, Monteverde, Puntarenas',
      destination: 'Reserva Biológica Bosque Nuboso Monteverde',
      mapQuery: 'Selvatura Park, Monteverde, Costa Rica'
    },
    scheduleByMonth: {
      '2026-3': {
        '3':  [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '5':  [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '10': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '12': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'last' } ],
        '17': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '19': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '24': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ],
        '26': [ { time: '9:00 AM', name: 'Tour matutino',  teacher: 'Selvatura', price: '$65', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'S', orgName: 'Selvatura Park',
    price: '$65.00', bg: 'art-canopy-monteverde',
    info: [
      ['Duración', '3 horas'], ['Nivel', 'Todos'], ['Capacidad', 'Máx 12 personas'],
      ['Operador', 'Selvatura Park'], ['Punto de encuentro', 'Monteverde']
    ]
  },

  'cafe-ataco': {
    kind: 'experience', experienceType: 'tour', eventType: 'recurring',
    country: 'SV',
    pattern: { days: [3, 5], time: '8:00 AM' }, // Mié/Vie
    kicker: 'RUTA DE LAS FLORES · ATACO',
    title: 'Ruta del café en<br><em>Concepción de Ataco.</em>',
    category: 'Tours · Cultura',
    desc: '<p>Tour guiado por una finca familiar de café de altura en la Ruta de las Flores. Ves todo el proceso desde la cereza hasta la taza: cosecha, beneficio, tostado y cata. Terminás con un desayuno típico salvadoreño en el cafetal.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=75', alt: 'Granos de café verdes y rojos en una rama' }
    ],
    quickFacts: { duration: '5 horas', level: 'Todos los niveles', groupMax: 10, meetingPoint: 'Ataco' },
    includes: ['Tour guiado por finca', 'Cata de 3 cafés de especialidad', 'Desayuno típico', 'Bolsa de café para llevar'],
    bring: ['Calzado cómodo', 'Ropa que pueda mancharse', 'Gorra o sombrero', 'Protector solar'],
    cancellation: 'Cancelación gratis hasta 24 horas antes',
    host: { name: 'Finca Santa Leticia', verified: true, avatar: 'F', short: 'Cafetal familiar · 3 generaciones' },
    location: {
      meetingPoint: 'Finca Santa Leticia, Concepción de Ataco, Ahuachapán',
      destination: 'Ruta de las Flores, El Salvador',
      mapQuery: 'Concepción de Ataco, Ahuachapán, El Salvador'
    },
    scheduleByMonth: {
      '2026-3': {
        '4':  [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '6':  [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '11': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '13': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'last' } ],
        '18': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '20': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '25': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ],
        '27': [ { time: '8:00 AM', name: 'Tour completo', teacher: 'Santa Leticia', price: '$40', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'F', orgName: 'Finca Santa Leticia',
    price: '$40.00', bg: 'art-cafe-ataco',
    info: [
      ['Duración', '5 horas'], ['Nivel', 'Todos'], ['Capacidad', 'Máx 10 personas'],
      ['Operador', 'Finca Santa Leticia'], ['Punto de encuentro', 'Concepción de Ataco']
    ]
  },

  'roatan-snorkel': {
    kind: 'experience', experienceType: 'adventure', eventType: 'recurring',
    country: 'HN',
    pattern: { days: [0, 1, 2, 3, 4, 5, 6], time: '9:00 AM' }, // diario
    kicker: 'BAY ISLANDS · ROATÁN',
    title: 'Snorkel en<br><em>arrecifes de Roatán.</em>',
    category: 'Aventura · Mar',
    desc: '<p>Expedición en bote a 3 puntos de snorkel del Mesoamerican Barrier Reef, el segundo arrecife más grande del mundo. Guías marinos certificados, equipo profesional, y aguas cristalinas llenas de vida marina: tortugas, rayas, bancos de peces tropicales.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=75', alt: 'Persona haciendo snorkel sobre arrecife de coral con peces tropicales' }
    ],
    quickFacts: { duration: '4 horas', level: 'Principiante', groupMax: 8, meetingPoint: 'West Bay' },
    includes: ['Máscara, snorkel y aletas', 'Bote con capitán y guía', 'Agua y fruta a bordo', 'Chaleco salvavidas'],
    bring: ['Traje de baño', 'Protector solar reef-safe', 'Toalla', 'Cámara acuática (opcional)'],
    cancellation: 'Cancelación gratis hasta 24 horas antes',
    host: { name: 'Roatán Marine Tours', verified: true, avatar: 'R', short: 'Guías PADI · Más de 15 años en el arrecife' },
    location: {
      meetingPoint: 'West Bay Beach, Roatán, Islas de la Bahía',
      destination: 'Mesoamerican Barrier Reef, Roatán',
      mapQuery: 'West Bay, Roatán, Honduras'
    },
    scheduleByMonth: {
      '2026-3': {
        '3':  [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '5':  [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '10': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'last' } ],
        '12': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '17': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '19': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '24': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ],
        '26': [ { time: '9:00 AM', name: 'Morning Dive', teacher: 'Marine Tours', price: '$75', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'R', orgName: 'Roatán Marine Tours',
    price: '$75.00', bg: 'art-roatan-snorkel',
    info: [
      ['Duración', '4 horas'], ['Nivel', 'Principiante'], ['Capacidad', 'Máx 8 personas'],
      ['Operador', 'Roatán Marine Tours'], ['Punto de encuentro', 'West Bay, Roatán']
    ]
  },

  'salsa-sansalvador': {
    kind: 'experience', experienceType: 'class', eventType: 'recurring',
    country: 'SV',
    pattern: { days: [1, 2, 3, 4], time: '7:00 PM' }, // Lun-Jue
    kicker: 'LATIN BEAT · SALSA & BACHATA',
    title: 'Clase abierta de<br><em>Salsa.</em>',
    category: 'Clases · Baile',
    desc: '<p>Clase abierta de salsa para todos los niveles en una academia del centro de San Salvador. 90 minutos con instructores certificados: calentamiento, técnica básica, giros y combinaciones para mover la cadera. No necesitás pareja — rotamos para que todos bailen.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1600&q=75', alt: 'Pareja bailando salsa en clase grupal' }
    ],
    quickFacts: { duration: '1h 30min', level: 'Todos los niveles', groupMax: 16, meetingPoint: 'San Salvador' },
    includes: ['Instructor certificado', 'Calentamiento dirigido', 'Combinaciones para llevar', 'Agua y snacks'],
    bring: ['Ropa cómoda', 'Zapatos de suela lisa', 'Toalla pequeña', 'Ganas de bailar'],
    cancellation: 'Cancelación gratis hasta 6 horas antes',
    host: { name: 'Latin Beat Academy', verified: true, avatar: 'L', short: 'Academia de baile · 8 años en SV' },
    location: {
      meetingPoint: 'Latin Beat Academy, Colonia Escalón, San Salvador',
      destination: 'San Salvador, El Salvador',
      mapQuery: 'Colonia Escalón, San Salvador, El Salvador'
    },
    scheduleByMonth: {
      '2026-3': {
        '5':  [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '7':  [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '12': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '14': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'last' } ],
        '19': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '21': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '26': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ],
        '28': [ { time: '7:00 PM', name: 'Clase abierta', teacher: 'Latin Beat', price: '$15', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'L', orgName: 'Latin Beat Academy',
    price: '$15.00', bg: 'art-salsa-sansalvador',
    info: [
      ['Duración', '1h 30min'], ['Nivel', 'Todos'], ['Capacidad', 'Máx 16 personas'],
      ['Operador', 'Latin Beat Academy'], ['Punto de encuentro', 'Colonia Escalón']
    ]
  },

  'cocina-tegus': {
    kind: 'experience', experienceType: 'class', eventType: 'recurring',
    country: 'HN',
    pattern: { days: [6, 0], time: '11:00 AM' }, // Sáb/Dom
    kicker: 'COCINA HONDUREÑA · TEGUCIGALPA',
    title: 'Clase de<br><em>Baleadas y Plato Típico.</em>',
    category: 'Clases · Cocina',
    desc: '<p>Aprendé a hacer baleadas, plato típico y catrachas en una clase práctica de cocina hondureña. Tres horas amasando tortillas a mano, frijoles desde cero y queso fresco rallado al estilo de la abuela. Te llevás las recetas para repetir en tu casa.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=75', alt: 'Mesa con tortillas hechas a mano y frijoles' }
    ],
    quickFacts: { duration: '3 horas', level: 'Principiante', groupMax: 8, meetingPoint: 'Tegucigalpa' },
    includes: ['Todos los ingredientes', 'Recetario impreso', 'Almuerzo de tu propia comida', 'Bebidas frescas'],
    bring: ['Delantal (opcional)', 'Ropa cómoda', 'Pelo amarrado', 'Apetito'],
    cancellation: 'Cancelación gratis hasta 24 horas antes',
    host: { name: 'Sazón Catracho', verified: true, avatar: 'S', short: 'Cocina hondureña · familiar y abierta' },
    location: {
      meetingPoint: 'Sazón Catracho, Colonia Palmira, Tegucigalpa',
      destination: 'Tegucigalpa, Honduras',
      mapQuery: 'Colonia Palmira, Tegucigalpa, Honduras'
    },
    scheduleByMonth: {
      '2026-3': {
        '4':  [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '7':  [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '11': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'last' } ],
        '14': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '18': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '21': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '25': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ],
        '28': [ { time: '11:00 AM', name: 'Clase práctica', teacher: 'Sazón Catracho', price: '$35', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'S', orgName: 'Sazón Catracho',
    price: '$35.00', bg: 'art-cocina-tegus',
    info: [
      ['Duración', '3 horas'], ['Nivel', 'Principiante'], ['Capacidad', 'Máx 8 personas'],
      ['Operador', 'Sazón Catracho'], ['Punto de encuentro', 'Colonia Palmira']
    ]
  },

  'copan-ruins': {
    kind: 'experience', experienceType: 'tour', eventType: 'recurring',
    country: 'HN',
    pattern: { days: [2, 3, 4, 5, 6, 0], time: '8:30 AM' }, // Mar-Dom
    kicker: 'PATRIMONIO UNESCO · COPÁN',
    title: 'Tour guiado a las<br><em>Ruinas de Copán.</em>',
    category: 'Tours · Historia',
    desc: '<p>Recorrido guiado de 4 horas por el sitio arqueológico maya de Copán, declarado Patrimonio de la Humanidad por UNESCO. Estelas, la Escalera Jeroglífica, el Campo de Pelota y los túneles de Rosalila. Guía bilingüe con formación arqueológica.</p>',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=75', alt: 'Pirámide maya en la selva — sitio arqueológico estilo Copán' }
    ],
    quickFacts: { duration: '4 horas', level: 'Todos los niveles', groupMax: 14, meetingPoint: 'Copán Ruinas' },
    includes: ['Entrada al sitio arqueológico', 'Guía bilingüe certificado', 'Acceso a los túneles', 'Agua embotellada'],
    bring: ['Zapatos cómodos para caminar', 'Gorra o sombrero', 'Protector solar', 'Repelente de insectos'],
    cancellation: 'Cancelación gratis hasta 48 horas antes',
    host: { name: 'Copán Heritage Tours', verified: true, avatar: 'C', short: 'Guías arqueólogos · Certificados por IHAH' },
    location: {
      meetingPoint: 'Centro de Copán Ruinas, Copán',
      destination: 'Sitio Arqueológico de Copán (UNESCO)',
      mapQuery: 'Ruinas de Copán, Honduras'
    },
    scheduleByMonth: {
      '2026-3': {
        '3':  [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '5':  [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '10': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '12': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '17': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'last' } ],
        '19': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '24': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ],
        '26': [ { time: '8:30 AM', name: 'Tour AM', teacher: 'Heritage Tours', price: '$50', status: 'available' } ]
      }
    },
    calMinMonth: '2026-3', calMaxMonth: '2026-3',
    orgAvatar: 'C', orgName: 'Copán Heritage Tours',
    price: '$50.00', bg: 'art-copan-ruins',
    info: [
      ['Duración', '4 horas'], ['Nivel', 'Todos'], ['Capacidad', 'Máx 14 personas'],
      ['Operador', 'Copán Heritage Tours'], ['Punto de encuentro', 'Centro de Copán Ruinas']
    ]
  }
};

// Fallback usado cuando un evento no define seatedConfig.sections. Es el
// set que el prototipo hardcodeaba en la página /tickets (tristito-style).
window.DEFAULT_SEATED_TIERS = [
  { id: 'gen-eb', name: 'General Early Bird', price: 11, color: '#2d9cdb', status: 'soldout',   description: 'Primera fase anticipada' },
  { id: 'gen-1',  name: 'General Fase 1',     price: 13, color: '#2d9cdb', status: 'soldout',   description: 'Acceso general' },
  { id: 'gen-2',  name: 'General Fase 2',     price: 17, priceBefore: 19, color: '#2d9cdb', status: 'fewleft',   description: 'Acceso general · Shot de bienvenida' },
  { id: 'vip-1',  name: 'VIP Fase 1',         price: 17, color: '#00aa5c', status: 'soldout',   description: 'VIP con barra exclusiva' },
  { id: 'vip-2',  name: 'VIP Fase 2',         price: 22, color: '#00aa5c', status: 'available', description: 'Barra VIP + zona + meet & greet' },
  { id: 'vip-3',  name: 'VIP Fase 3',         price: 28, color: '#c6f800', status: 'available', description: 'Última fase VIP' }
];

// Regla de validación del código de preventa (mock). El prototipo pedía
// mínimo 4 caracteres alfanuméricos y cualquier combinación válida desbloqueaba.
window.VALID_PRESALE_CODE_RE = /^[A-Za-z0-9]{4,}$/;

// ============================================================================
// VENUE MAP — generador determinístico de butacas para eventos `seated`.
// Portado desde MVP_Phoenix_Project.html / vibe_prototipo_v27 (buildVenueSVG).
// La función arma un "venue genérico" con escenario arriba, VIP a los lados,
// Platinum al frente centro, General al fondo y Discapacidad en las esquinas.
// El estado "sold" de cada butaca se deriva de un seed (eventId) para que
// el patrón sea estable entre reloads (no queremos asientos que cambien de
// estado al refrescar). Matchea el layout del prototipo (L14804-14884).
// ============================================================================
(function () {
  // Mulberry32: PRNG determinístico sembrado con un int32.
  function mulberry32(seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedFromString(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  const rowLetter = (n) => String.fromCharCode(65 + n);

  window.buildVenueSeats = function buildVenueSeats(eventId, sections) {
    const rnd = mulberry32(seedFromString(String(eventId || 'default')));
    // Precios mapeados por sección (si la sección existe en `sections`).
    const priceFor = (sid) => {
      const s = (sections || []).find(x => x.id === sid);
      return s ? Number(s.price) : 0;
    };
    const nameFor = (sid, fallback) => {
      const s = (sections || []).find(x => x.id === sid);
      return s ? s.name : fallback;
    };
    const hasSection = (sid) => (sections || []).some(x => x.id === sid);
    const sectionStatus = (sid) => {
      const s = (sections || []).find(x => x.id === sid);
      return s ? (s.status || 'available') : 'available';
    };
    const seats = [];

    // --- PLATINUM (centro-frente) — 3 filas × 14 butacas, filas A-C
    if (hasSection('platinum')) {
      const soldRate = sectionStatus('platinum') === 'soldout' ? 1
                      : sectionStatus('platinum') === 'fewleft' ? 0.65
                      : 0.25;
      for (let r = 0; r < 3; r++) {
        for (let s = 0; s < 14; s++) {
          seats.push({
            section: 'platinum',
            sectionName: nameFor('platinum', 'Platinum'),
            row: rowLetter(r), seat: s + 1,
            price: priceFor('platinum'),
            cx: 160 + s * 22, cy: 60 + r * 22,
            sold: rnd() < soldRate,
            id: 'platinum-' + rowLetter(r) + '-' + (s + 1),
          });
        }
      }
    }
    // --- VIP IZQUIERDA (3 × 6)
    if (hasSection('vip')) {
      const soldRate = sectionStatus('vip') === 'soldout' ? 1
                      : sectionStatus('vip') === 'fewleft' ? 0.6
                      : 0.2;
      for (let r = 0; r < 3; r++) {
        for (let s = 0; s < 6; s++) {
          seats.push({
            section: 'vip', sectionName: nameFor('vip', 'VIP'),
            row: rowLetter(r), seat: s + 1,
            price: priceFor('vip'),
            cx: 20 + s * 22, cy: 60 + r * 22,
            sold: rnd() < soldRate,
            id: 'vip-L-' + rowLetter(r) + '-' + (s + 1),
          });
        }
      }
      // --- VIP DERECHA (3 × 6)
      for (let r = 0; r < 3; r++) {
        for (let s = 0; s < 6; s++) {
          seats.push({
            section: 'vip', sectionName: nameFor('vip', 'VIP'),
            row: rowLetter(r), seat: s + 7,
            price: priceFor('vip'),
            cx: 490 + s * 22, cy: 60 + r * 22,
            sold: rnd() < soldRate,
            id: 'vip-R-' + rowLetter(r) + '-' + (s + 7),
          });
        }
      }
    }
    // --- GENERAL (atrás) — 6 filas × 22 butacas, filas D-I
    if (hasSection('general') || hasSection('general-1') || hasSection('general-2')) {
      const genSid = hasSection('general') ? 'general'
                   : hasSection('general-1') ? 'general-1' : 'general-2';
      const soldRate = sectionStatus(genSid) === 'soldout' ? 1
                      : sectionStatus(genSid) === 'fewleft' ? 0.5
                      : 0.15;
      for (let r = 0; r < 6; r++) {
        for (let s = 0; s < 22; s++) {
          seats.push({
            section: 'general', sectionName: nameFor(genSid, 'General'),
            row: rowLetter(r + 3), seat: s + 1,
            price: priceFor(genSid),
            cx: 50 + s * 22, cy: 160 + r * 22,
            sold: rnd() < soldRate,
            id: 'general-' + rowLetter(r + 3) + '-' + (s + 1),
          });
        }
      }
    }
    // --- DISCAPACIDAD (4 esquinas). Sólo si existe la sección `accessible`.
    if (hasSection('accessible')) {
      const p = priceFor('accessible');
      const n = nameFor('accessible', 'Discapacidad');
      seats.push({ section: 'accessible', sectionName: n, row: 'D', seat: 1,  price: p, cx: 25,  cy: 160, sold: false, id: 'accessible-D-1'  });
      seats.push({ section: 'accessible', sectionName: n, row: 'D', seat: 22, price: p, cx: 565, cy: 160, sold: false, id: 'accessible-D-22' });
      seats.push({ section: 'accessible', sectionName: n, row: 'I', seat: 1,  price: p, cx: 25,  cy: 270, sold: false, id: 'accessible-I-1'  });
      seats.push({ section: 'accessible', sectionName: n, row: 'I', seat: 22, price: p, cx: 565, cy: 270, sold: rnd() < 0.5, id: 'accessible-I-22' });
    }
    return seats;
  };

  // Config del venue (viewBox + labels) que el componente Alpine también
  // usa para posicionar los labels de zona sobre el SVG.
  window.VENUE_CONFIG = {
    viewBox: '0 0 600 310',
    labels: [
      { x: 70,  y: 50,  text: 'VIP' },
      { x: 220, y: 50,  text: 'PLATINUM' },
      { x: 510, y: 50,  text: 'VIP' },
      { x: 280, y: 150, text: 'GENERAL' },
    ],
  };
})();

