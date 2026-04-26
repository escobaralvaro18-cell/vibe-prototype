# Auditoría — Flujo de Checkout (Eventos + Experiencias)

**Fecha:** 26 abril 2026
**Scope:** `checkout.html` (1612 líneas) + `components.js` (componente `checkoutPage`)
**Resumen:** El checkout es **fundamentalmente event-céntrico**. La arquitectura soporta ambos tipos pero la mayoría del copy asume "concierto con entradas físicas", lo que se rompe para experiencias (tours, retreats, clases recurrentes).

---

## TL;DR — Top 5 cambios de mayor impacto

1. **Success hero P0:** "¡Entradas aseguradas!" → "¡Reserva confirmada!" (rompe para experiencias)
2. **"Titulares de las entradas"** → "Asistentes" (formal/legal vs neutro y universal)
3. **Email microcopy:** "Te enviamos las entradas" → "Te enviamos la confirmación" (~8 lugares)
4. **Back links:** "Volver a entradas" → "Volver a selección" (consistencia entre tipos)
5. **Account CTA "Ver mis entradas"** → "Ver mi reserva" o renombrar tab a "Mis accesos"

---

## Severity breakdown

| Sev | Cant | Resumen |
|---|---|---|
| **P0** | 1 | Hero de success rompe para experiencias |
| **P1** | 10 | "Titulares", back links, email copy, success notices, payment heading |
| **P2** | 6 | Venue context, "Acceso general", empty cart, share message, account CTA |

---

## Step 1 — CART

### 1.1 Heading "Elegí tus entradas" (P1)
- **Línea:** 203–204
- **Problema:** Incluso con toggle isSeated, ambas variantes asumen entradas. Para una clase semanal de salsa, "entradas" suena raro — son cupos.
- **Fix:** Variante para experiencias → "Elegí tu acceso" o "Elegí tu cupo". O genérico "Elegí tu acceso" para todos.

### 1.2 GA description "Acceso general al evento · sin asiento asignado" (P2)
- **Línea:** components.js 1713
- **Problema:** "asiento" no aplica a tours ni clases.
- **Fix:** Para experiencias → "Acceso general a la actividad · cupos limitados".

### 1.3 Empty cart "Todavía no elegiste entradas" (P2)
- **Línea:** 133
- **Fix:** "Aún no elegiste tu acceso" (neutral).

### 1.4 Venue en card del cart (P2)
- **Línea:** 245, components.js 1631
- **Problema:** Para retreat de 4 días no hay un solo "venue". Para clase recurrente, lo importante es fecha+hora, no venue.
- **Fix:** Conditional render — eventos: venue; experiencias: `location.destination`; clases: fecha+hora.

---

## Step 2a — IDENTITY

### 2.1 Back link "Volver a entradas" / "Volver al evento" (P1)
- **Línea:** 412–414
- **Fix:** Unificar a "Volver a selección" — funciona para ambos.

### 2.2 Reservation card "Te enviaremos las entradas al correo" (P1)
- **Línea:** 465
- **Fix:** "Te enviaremos la confirmación de tu acceso al correo".

---

## Step 2b — DETAILS

### 2b.1 Hint "Te mandamos las entradas acá" (P1)
- **Línea:** 607
- **Fix:** "Te mandamos la confirmación acá".

### 2b.2 Heading "Titulares de las entradas" (P1) ⭐
- **Línea:** 723
- **Problema:** "Titular" es término legal/formal asumiendo posesión de entrada. Para clase o tour, "asistente" o "participante" es más natural.
- **Fix:** "Asistentes" (neutral, universal).

### 2b.3 ID helper "Se verificará al ingresar al evento (+18)" (P2)
- **Línea:** 700–702
- **Problema:** Asume "puerta de venue". Para clase online no aplica.
- **Fix:** Eventos con venue → mantener; experiencias → "Se verificará al momento de la confirmación".

### 2b.4 Attendee email hint "Le mandaremos su entrada directamente" (P1)
- **Línea:** 791
- **Fix:** "Le mandaremos el acceso y detalles a este correo".

---

## Step 3 — PAYMENT

### 3.1 Heading "Pagá tus entradas" (P1)
- **Línea:** 831
- **Fix:** "Completá tu pago" o "Pagá tu reserva" (genérico).

(Resto del step funciona bien — Comisión Vibes, trust signals, cupón son product-agnostic ✓)

---

## Step 4 — SUCCESS

### 4.1 Hero "¡Entradas aseguradas!" (P0) ⭐⭐⭐
- **Línea:** 1147
- **Problema:** **Rompe para experiencias.** Tours/clases no venden "entradas". El triunfalismo de "aseguradas" asume escasez de concierto. Para clase de yoga con 5 spots libres, el tono está mal calibrado.
- **Fix:** "¡Reserva *confirmada!*" — funciona para los dos.

### 4.2 Hero subtitle guest "Enviamos tu entrada a [email]" (P1)
- **Línea:** 1150
- **Fix:** "Enviamos la confirmación de tu reserva a [email]".

### 4.3 Kicker "VIBES · EVENTO" (P1)
- **Línea:** 1164
- **Problema:** Hard-coded fallback. Experiencias deberían mostrar "VIBES · EXPERIENCIA" o "VIBES · CLASE".
- **Fix:** Render dinámico desde `EVENT_DATA.kind`.

### 4.4 Notice logged-in "Tus entradas ya están en Mi Cuenta" (P2)
- **Línea:** 1194
- **Fix:** "Tu acceso ya está en Mi Cuenta".

### 4.5 Notice guest "Te enviamos las entradas por email" (P1)
- **Línea:** 1205
- **Fix:** "Te enviamos los detalles de tu reserva por email".

### 4.6 CTA "Ver mis entradas" (P1) ⭐
- **Línea:** 1215
- **Problema:** Asume tab "Mis tickets" en account. Riesgo: link a tab que no muestra reserva de experiencia.
- **Fix:** Renombrar tab account a "Mis accesos" (umbrella) **O** dynamic copy según kind.

### 4.7 CTA guest "Crear cuenta para no perder tus entradas" (P2)
- **Línea:** 1221
- **Fix:** "Crear cuenta para guardar tu acceso" (neutral).

### 4.8 Share message "Voy a [evento], ¿vas?" (P2)
- **Línea:** 1236
- **Problema:** Funciona para concierto. Suena raro para "Clase de Salsa cada Miércoles".
- **Fix:** Conditional para clases recurrentes → "¿Te copas una clase de salsa?" o más genérico "Te invito a [event]".

---

## Issues transversales

### Inconsistencia terminológica

| Término | Uso actual | Issue |
|---|---|---|
| **entradas** | Throughout | Ok eventos, rompe experiencias. Sobrecargado. |
| **evento** | Labels, breadcrumbs | Ok como genérico ✓ |
| **titular** | Details step (asistentes) | ❌ Formal/legal — usar "asistente" |
| **asiento** | Seat picker | Ok eventos seated, oculto en GA/exp ✓ |
| **venue** | Cart context | ❌ Engaña en tours/clases |
| **función** | Comments código | Interno, no user-facing ✓ |

### Brand voice

1. **Tone "event-triumphant"** — "¡Entradas aseguradas!" asume escasez; mal para clase principiantes con cupos libres.
2. **Microcopy asume one-time attendance** — "al ingresar al evento", "sin asiento asignado" todos asumen evento discreto, no recurrente.
3. **Email framing 100% ticket-specific** — debe diversificar a "confirmación" / "acceso" / "detalles de reserva".

---

## Plan de implementación recomendado

### Fase 1 — Wins rápidos (~3hrs total)
1. ✅ Renombrar success hero "¡Entradas aseguradas!" → "¡Reserva confirmada!" (1hr, alto impacto)
2. ✅ Cambiar "Titulares de entradas" → "Asistentes" (30min, atraviesa todo el step)
3. ✅ Unificar back links a "Volver a selección" (20min)
4. ✅ Audit de email copy: ~8 reemplazos "entradas" → "acceso/reserva/confirmación" (1hr)

### Fase 2 — Layer de datos (~1 día)
1. Asegurar `EVENT_DATA.kind` ('event' | 'experience' | 'class') en todos los registros
2. Agregar lógica condicional en `checkoutPage`:
   - `productNoun()` → "entrada" | "cupo" | "acceso"
   - `successHeading()` → según kind
   - `accountCTAHref()` → según kind
3. Render condicional venue vs location vs date+time

### Fase 3 — Refactor account (~v2)
1. Audit `account.html` — tab "Mis tickets" debe incluir experiencias o forkearse
2. Considerar "Mis accesos" como umbrella term, o tabs separadas (Eventos / Experiencias / Clases)
3. Success flow visualmente diferente para experiencias (menos ticket-booth, más activity)

---

## Anexo — Findings que NO son issues (validados)

- ✓ Trust row "No guardamos tu tarjeta" — universal
- ✓ "¿Tenés un cupón?" — universal
- ✓ OTP flow — product-agnostic
- ✓ "Ir al pago" CTA — neutral
- ✓ "¿Cómo querés continuar?" identity heading — neutral
- ✓ "Es para mí / otra persona" radio — universal
- ✓ Comisión Vibes 5% — universal
