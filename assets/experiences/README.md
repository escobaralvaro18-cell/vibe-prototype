# Imágenes de experiencias

Estas son las fotos que el proto espera para renderizar el hero carousel del detail page.

## Comasagua (Sunrise Tour 4x4)

Guardá las 3 fotos que me pasaste con estos nombres exactos:

- `penon-sunrise.jpg` — Pareja en la cima del Peñón al amanecer (foto con "PEÑÓN DE COMASAGUA" + coordenadas). Es la foto HERO — la que más impacta.
- `jimny-field.jpg` — Dos Jimny 4x4 en el campo con mountains, "Jimny Trips Powered by Suzuki".
- `jimny-border.jpg` — Celebración junto al cartel "El Salvador", dos Jimny estacionados.

El orden en que aparecen en el carousel está definido en `js/data/events.js` dentro del objeto `comasagua.gallery`. Si querés cambiar el orden, editá ese array.

## Fallback

Si por cualquier razón las fotos no cargan, el CSS tiene un gradient fallback que simula el sunrise (naranjo → azul oscuro). Eso vive en `css/proto.css` bajo `.art-comasagua`.

## Formato recomendado

- **Resolución**: al menos 1600x1000 (16:10). Más grande es mejor — el carousel usa `object-fit: cover`.
- **Peso**: comprimir a ~200-400KB cada una para que carguen rápido en mobile.
- **Formato**: JPG (mejor compresión para fotos).
