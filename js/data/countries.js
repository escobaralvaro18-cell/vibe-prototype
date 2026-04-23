// ============================================================================
// COUNTRY_DATA — catálogo de países soportados (Centroamérica)
// Portado desde MVP_Phoenix_Project.html línea ~9976
// ============================================================================

window.COUNTRY_DATA = {
  CR: { name: 'Costa Rica',  short: 'CR', code: 'CR' },
  SV: { name: 'El Salvador', short: 'SV', code: 'SV' },
  HN: { name: 'Honduras',    short: 'HN', code: 'HN' },
};

window.COUNTRY_CODES = ['CR', 'SV', 'HN'];

// Markup SVG de banderas — se inyecta 1 vez por página como defs ocultos.
// `flagSvg(code)` devuelve un <svg><use href="#flag-cr"/></svg> reutilizable.
window.FLAG_DEFS_HTML = `
<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="flag-cr" viewBox="0 0 30 18">
      <rect width="30" height="18" fill="#002b7f"/>
      <rect y="3" width="30" height="12" fill="#ffffff"/>
      <rect y="6" width="30" height="6" fill="#ce1126"/>
    </symbol>
    <symbol id="flag-sv" viewBox="0 0 30 18">
      <rect width="30" height="6"  fill="#0047ab"/>
      <rect y="6" width="30" height="6" fill="#ffffff"/>
      <rect y="12" width="30" height="6" fill="#0047ab"/>
    </symbol>
    <symbol id="flag-hn" viewBox="0 0 30 18">
      <rect width="30" height="6"  fill="#0073cf"/>
      <rect y="6"  width="30" height="6" fill="#ffffff"/>
      <rect y="12" width="30" height="6" fill="#0073cf"/>
      <g fill="#0073cf">
        <circle cx="15"    cy="9"    r="0.9"/>
        <circle cx="11.5"  cy="9"    r="0.9"/>
        <circle cx="18.5"  cy="9"    r="0.9"/>
        <circle cx="13.25" cy="10.7" r="0.9"/>
        <circle cx="16.75" cy="10.7" r="0.9"/>
      </g>
    </symbol>
    <!-- Guatemala: azul / blanco / azul vertical (simplificado sin emblema) -->
    <symbol id="flag-gt" viewBox="0 0 30 18">
      <rect width="10" height="18" fill="#4997d0"/>
      <rect x="10" width="10" height="18" fill="#ffffff"/>
      <rect x="20" width="10" height="18" fill="#4997d0"/>
    </symbol>
    <!-- Nicaragua: azul / blanco / azul horizontal (simplificado sin emblema) -->
    <symbol id="flag-ni" viewBox="0 0 30 18">
      <rect width="30" height="6"  fill="#0067c6"/>
      <rect y="6"  width="30" height="6" fill="#ffffff"/>
      <rect y="12" width="30" height="6" fill="#0067c6"/>
    </symbol>
    <!-- Panamá: 4 cuadrantes (blanco / rojo / azul / blanco con 2 estrellas) -->
    <symbol id="flag-pa" viewBox="0 0 30 18">
      <rect width="15" height="9"  fill="#ffffff"/>
      <rect x="15" width="15" height="9"  fill="#da121a"/>
      <rect y="9"  width="15" height="9"  fill="#005aa7"/>
      <rect x="15" y="9" width="15" height="9" fill="#ffffff"/>
      <polygon fill="#005aa7" points="7.5,2 8.3,4.1 10.5,4.1 8.7,5.5 9.4,7.6 7.5,6.3 5.6,7.6 6.3,5.5 4.5,4.1 6.7,4.1"/>
      <polygon fill="#da121a" points="22.5,11 23.3,13.1 25.5,13.1 23.7,14.5 24.4,16.6 22.5,15.3 20.6,16.6 21.3,14.5 19.5,13.1 21.7,13.1"/>
    </symbol>
    <!-- México: verde / blanco / rojo vertical (simplificado sin águila) -->
    <symbol id="flag-mx" viewBox="0 0 30 18">
      <rect width="10" height="18" fill="#006847"/>
      <rect x="10" width="10" height="18" fill="#ffffff"/>
      <rect x="20" width="10" height="18" fill="#ce1126"/>
    </symbol>
    <!-- USA: 13 rayas + cantón azul (estrellas sugeridas por puntos) -->
    <symbol id="flag-us" viewBox="0 0 30 18">
      <rect width="30" height="18" fill="#ffffff"/>
      <g fill="#b22234">
        <rect y="0"     width="30" height="1.385"/>
        <rect y="2.77"  width="30" height="1.385"/>
        <rect y="5.54"  width="30" height="1.385"/>
        <rect y="8.31"  width="30" height="1.385"/>
        <rect y="11.08" width="30" height="1.385"/>
        <rect y="13.85" width="30" height="1.385"/>
        <rect y="16.62" width="30" height="1.385"/>
      </g>
      <rect width="12" height="9.7" fill="#3c3b6e"/>
      <g fill="#ffffff">
        <circle cx="2"  cy="1.8" r="0.4"/><circle cx="4" cy="1.8" r="0.4"/><circle cx="6" cy="1.8" r="0.4"/><circle cx="8" cy="1.8" r="0.4"/><circle cx="10" cy="1.8" r="0.4"/>
        <circle cx="3"  cy="3.4" r="0.4"/><circle cx="5" cy="3.4" r="0.4"/><circle cx="7" cy="3.4" r="0.4"/><circle cx="9" cy="3.4" r="0.4"/>
        <circle cx="2"  cy="5"   r="0.4"/><circle cx="4" cy="5"   r="0.4"/><circle cx="6" cy="5"   r="0.4"/><circle cx="8" cy="5"   r="0.4"/><circle cx="10" cy="5"   r="0.4"/>
        <circle cx="3"  cy="6.6" r="0.4"/><circle cx="5" cy="6.6" r="0.4"/><circle cx="7" cy="6.6" r="0.4"/><circle cx="9" cy="6.6" r="0.4"/>
        <circle cx="2"  cy="8.2" r="0.4"/><circle cx="4" cy="8.2" r="0.4"/><circle cx="6" cy="8.2" r="0.4"/><circle cx="8" cy="8.2" r="0.4"/><circle cx="10" cy="8.2" r="0.4"/>
      </g>
    </symbol>
  </defs>
</svg>`;

// Helper opcional (equivalente a flagSvg del prototipo original).
// Mapeo 2-letter ISO code → id del <symbol>. Expandido a los 8 países
// que aparecen en el selector de prefijo telefónico del checkout.
window.FLAG_ID_MAP = {
  CR: 'flag-cr', SV: 'flag-sv', HN: 'flag-hn',
  GT: 'flag-gt', NI: 'flag-ni', PA: 'flag-pa',
  MX: 'flag-mx', US: 'flag-us',
};
window.flagSvg = function (code, extraClass) {
  const id = window.FLAG_ID_MAP[code];
  if (!id) return '';
  const cls = extraClass ? 'flag-svg ' + extraClass : 'flag-svg';
  return '<svg class="' + cls + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
};

// Catálogo para el dropdown de prefijo telefónico. El valor que persiste en
// `buyer.phonePrefix` es "<CODE> +<DIAL>" (p. ej. "CR +506") — mantenemos
// ese formato para no romper consumers downstream (renderTickets, etc.).
window.PHONE_COUNTRIES = [
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'CR', name: 'Costa Rica',  dial: '+506' },
  { code: 'GT', name: 'Guatemala',   dial: '+502' },
  { code: 'HN', name: 'Honduras',    dial: '+504' },
  { code: 'NI', name: 'Nicaragua',   dial: '+505' },
  { code: 'PA', name: 'Panamá',      dial: '+507' },
  { code: 'MX', name: 'México',      dial: '+52'  },
  { code: 'US', name: 'Estados Unidos', dial: '+1' },
];
