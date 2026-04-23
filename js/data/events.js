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
  yoga: {
    eventType: 'recurring',
    kicker: 'FLOW STUDIO · CLASES SEMANALES',
    title: 'Yoga Sunset<br><em>en la playa.</em>',
    desc: '<p><strong>Yoga Sunset</strong> es una experiencia semanal de vinyasa flow al aire libre, con vista al atardecer del Pacífico. Incluye mat, música en vivo y té chai al finalizar la clase.</p><p>Clases para todos los niveles. Duración 75 minutos.</p>',
    // Schedule por mes. Cada mes es un objeto con key = día del mes -> array de clases.
    // month: 0=Enero ... 11=Diciembre
    scheduleByMonth: {
      '2026-3': { // Abril 2026
        '2':  [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '4':  [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '6':  [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'last' } ],
        '9':  [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '11': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '13': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '16': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '18': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'soldout' } ],
        '20': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '23': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '25': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '27': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow + Live Music', teacher: 'Especial', price: '$22', status: 'last' } ],
        '30': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ]
      },
      '2026-4': { // Mayo 2026
        '2':  [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '5':  [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '7':  [ { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '9':  [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '12': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '14': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '16': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'last' } ],
        '19': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '21': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '23': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '26': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '28': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '30': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ]
      },
      '2026-5': { // Junio 2026
        '2':  [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '4':  [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '6':  [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '9':  [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ],
        '11': [ { time: '5:30 PM', name: 'Power Yoga', teacher: 'Daniel', price: '$12', status: 'available' } ],
        '13': [ { time: '7:00 AM', name: 'Morning Flow', teacher: 'Marcela', price: '$15', status: 'available' }, { time: '5:30 PM', name: 'Sunset Flow', teacher: 'Daniel', price: '$15', status: 'available' } ],
        '16': [ { time: '5:30 PM', name: 'Vinyasa Flow', teacher: 'Marcela', price: '$12', status: 'available' } ]
      }
    },
    // Rango navegable
    calMinMonth: '2026-3',
    calMaxMonth: '2026-5',
    lineup: [
      { name: 'Marcela Ramírez', main: true },
      { name: 'Daniel Quesada' }
    ],
    orgAvatar: 'FS',
    orgName: 'Flow Studio CR',
    price: '$12.00',
    bg: 'art-yoga',
    info: [
      ['Qué traer', 'Ropa cómoda y botella de agua'],
      ['Duración', '75 minutos'],
      ['Nivel', 'Todos los niveles'],
      ['Pagos', 'Tarjeta, SINPE, efectivo'],
      ['Reembolsos', 'Hasta 6h antes']
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
    desc: '<p><strong>Feid</strong> trae el <em>Ferxxo World Tour 2026</em> a Costa Rica. El artista colombiano detrás de hits como "Classy 101", "Luna" y "Yandel 150" hace parada obligada en San José.</p><p>La preventa abre pronto para miembros VIBE. Guardalo en favoritos para no perdértelo.</p>',
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

