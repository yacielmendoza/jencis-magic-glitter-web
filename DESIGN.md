# Jencis Magic Glitter — Guía de diseño y estrategia UX
**Rol:** UI/UX senior + front-end · **Entregable:** developer-ready · **Idiomas:** ES (principal) / EN

Este documento explica **cada decisión** del sitio y el *porqué* psicológico detrás de ella. El sitio es
estático (HTML/CSS/JS en un solo `index.html`, sin build) para que sea rápido, barato de hostear y fácil
de editar por la dueña. Todo el contenido y la marca viven en ese archivo.

---

## 1. Quién es el usuario (y por qué eso manda)
- **Negocio:** vasos *snow globe* personalizados, hechos a mano, en Big Spring, TX.
- **Clienta típica:** mujer local, mamá/joven, que descubre el producto en Instagram/TikTok o por recomendación,
  y navega **desde el teléfono**.
- **Meta única del sitio:** convertir esa visita en un **pedido por WhatsApp**. Todo lo demás es secundario.

**Principio rector:** *un objetivo, una acción.* La “ley de Hick” dice que a más opciones, más lenta la
decisión. Por eso hay **un solo CTA dominante** ("Ordenar / Encarga el tuyo") repetido en cada punto de
scroll, y todo lo demás sirve para reducir el miedo a pedir.

---

## 2. Arquitectura de información (sitemap)
Se eligió **one-page con navegación por anclas** en vez de multipágina. Para un catálogo pequeño y una sola
conversión, una sola página elimina la fricción de cargar y decidir entre páginas (menos *cognitive load*),
y en móvil el scroll es el gesto más natural.

```
Jencis Magic Glitter (index.html)
├─ Nav fija            → marca + enlaces + toggle idioma + CTA
├─ 1. Hero            → promesa + CTA + señales de confianza
├─ 2. Stats           → prueba social en números
├─ 3. La magia        → qué es un snow globe (educar = reducir duda)
├─ 4. Cómo pedir      → 3 pasos (desmitificar el proceso)
├─ 5. Catálogo        → tamaños y precios (transparencia)
├─ 6. Reseñas         → prueba social narrada
├─ 7. Ordenar         → formulario → WhatsApp (la conversión)
├─ 8. FAQ             → manejo de objeciones
├─ 9. Banda CTA final → última llamada
└─ Footer            → marca, redes, navegación, legal
   + WhatsApp flotante + barra CTA fija en móvil
```

**Orden = embudo psicológico:** *Atención (hero) → Interés (magia) → Deseo (catálogo + reseñas) →
Acción (ordenar) → Objeciones (FAQ) → Acción otra vez.* Cada bloque resuelve la pregunta que el visitante
se hace justo en ese momento.

---

## 3. Branding
Extraído directamente del logo para que web y producto se sientan una sola cosa (consistencia = confianza).

| Rol | Color | Hex | Psicología |
|---|---|---|---|
| Primario | Rosa magia | `#E23D9A` | Diversión, feminidad, juego — es la personalidad de la marca y el color de acción. |
| Secundario | Morado brillo | `#7A2FF2` | Creatividad, “magia”, un toque premium. Da autoridad a los títulos. |
| Acento | Dorado | `#E9B84A` | Lujo artesanal y detalle; señala calidad sin gritar. |
| Fondos | Rosa/lila claros | `#FCE6F1` / `#F4E9FC` | Aire, suavidad, para que el color de marca destaque. |
| Texto | Tinta morada | `#2E1A40` | Casi negro pero cálido: alto contraste sin dureza. |

- **Gradiente de marca** (`rosa → morado`) en CTAs y acentos: replica el degradado del glitter del vaso.
- El brillo dorado se usa **con moderación** (tags, estrellas): si todo brilla, nada brilla.

---

## 4. Tipografía
Sistema de 3 voces, con jerarquía clara (la jerarquía es lo que hace “legible” una página antes de leerla):

- **Poppins** (600–800) → titulares y UI. Geométrica, redondeada, moderna y muy legible en móvil.
- **Nunito** (400–700) → cuerpo. Humanista y amable; combina la calidez artesanal con buena lectura.
- **Sacramento** (script) → *eyebrows* decorativos (“hecho a mano con amor”). Evoca la caligrafía del
  logo y el hecho-a-mano — pero **solo en frases cortas**, nunca en cuerpo (el script largo cansa).

Tamaños **fluidos** con `clamp()` → escalan solos entre móvil y desktop sin *breakpoints* frágiles.
`max-width` en párrafos (~52–64ch) mantiene la línea en su rango legible.

---

## 5. Layout y sistema
- **Contenedor** `max-width: 1120px` centrado, *gutter* de 22px. Rejillas con `grid` que colapsan a 1
  columna en móvil (mobile-first real).
- **Tokens CSS** (`:root`) para color, sombra, radio y gradiente: un solo lugar para cambiar la marca.
- **Ritmo vertical** consistente (`section{padding:64px 0}`) → sensación de orden = confianza.
- **Tarjetas** con bordes suaves, radios generosos (18–26px) y sombras de color tenue: “suave, amable,
  hecho a mano”, coherente con el producto.
- **Alternancia de fondos** (crema / lila / rosa claro) para separar secciones sin líneas duras (agrupación
  por Gestalt: el fondo dice “esto es una sección nueva”).

---

## 6. Responsive
- **Hero art-directed:** el fondo de glitter cambia según el dispositivo para no recortar mal la imagen —
  `hero-mobile.webp` (vertical, base), `hero-tablet.webp` (cuadrado, ≥600px) y `hero-desktop.webp`
  (horizontal, ≥1000px). Un velo blanco radial (`::before`) sube el contraste del texto en el centro y deja
  ver el glitter en los bordes. El logo es PNG→**WebP transparente** (`logo.webp`), sin caja blanca.
- **Mobile-first:** el layout base es de 1 columna; los `@media (min-width…)` *añaden* columnas, no las quitan.
- Nav: los enlaces centrales se ocultan <900px (el CTA y el idioma siempre visibles); en móvil manda el scroll
  y la **barra CTA fija inferior**.
- Objetivos táctiles ≥44px (botones, inputs) — recomendación de accesibilidad móvil.
- Imágenes con `width`/`height` explícitos → **cero *layout shift*** (CLS) al cargar.
- El **hero reduce partículas** de glitter en pantallas chicas (rendimiento en móviles modestos).

---

## 7. Animaciones (con propósito, no adorno)
Toda animación **refuerza el mensaje “magia/brillo”** o **guía la atención**, y respeta a quien no las quiere.

| Animación | Qué hace | Por qué |
|---|---|---|
| Fondo glitter del hero | Imagen real de glitter, art-directed por dispositivo | Comunica el producto en un vistazo, sin peso de JS. |
| Brillo que cruza los CTA | Reflejo *shine* periódico | Atrae el ojo al botón de acción sin ser intrusivo. |
| Reveal al hacer scroll | Secciones aparecen con *fade-up* | Enfoca una idea a la vez; sensación premium. |
| Conteo de stats | Números suben de 0 a su valor | La *animación de progreso* aumenta el peso percibido de la prueba social. |
| Hover lift en tarjetas | Se elevan y crece la sombra | Feedback de que son interactivas/valiosas. |
| Acordeón FAQ | `+` gira a `×` | Señal clara de estado abierto/cerrado. |

**Accesibilidad:** todo está envuelto en `prefers-reduced-motion` — si el sistema pide menos movimiento,
las partículas y transiciones se desactivan y los números aparecen ya en su valor final.

---

## 8. Estrategia de conversión (el corazón)
El sitio está diseñado para mover a la visitante de “qué bonito” a “ya lo pedí”. Palancas usadas
(principios de Cialdini + UX):

1. **Prueba social** — franja de stats, ⭐⭐⭐⭐⭐, y 3 reseñas con nombre y ciudad. *“Otras como yo ya lo hicieron.”*
2. **Reducción de riesgo** — garantía anti-fugas, “sin pago por adelantado en el formulario”, “nada se guarda
   en el sitio”. Cada objeción de compra tiene su antídoto visible.
3. **Fricción mínima** — el formulario **solo exige el nombre**; el resto es opcional. Se envía por
   **WhatsApp**, el canal que la clienta ya usa y donde puede *conversar* (más humano que un carrito frío).
4. **Claridad de proceso** — “Cómo pedir” en 3 pasos elimina la incertidumbre (*“¿y luego qué pasa?”*).
5. **Transparencia de precio** — rangos claros; nada de “contáctanos para precio”, que genera desconfianza.
6. **CTA persistente** — botón en nav, hero, banda final, WhatsApp flotante y barra móvil: la acción está
   **siempre a un toque**, sin perseguirla.
7. **Ancla de precio** — el vaso “Favorito ⭐” marcado guía la mirada hacia la opción intermedia
   (efecto *decoy*/anclaje) y sube el ticket promedio.
8. **Escasez honesta** — se evita la escasez falsa; la confianza local vale más que un “¡solo hoy!”.

---

## 9. Accesibilidad
- Contraste AA en texto sobre fondos (tinta sobre crema/blanco; blanco sobre gradiente de marca).
- `:focus-visible` con contorno morado en **todo** lo interactivo (teclado).
- `alt` descriptivos, `aria-label` en íconos/botones sin texto, enlace *skip to content*.
- Semántica real: `nav`, `header`, `section`, `footer`, `details/summary` para el FAQ (funciona sin JS).
- Toggle de idioma actualiza `lang` del documento y los `aria-label`.

---

## 10. SEO y rendimiento
- `<title>` y `meta description` con keywords locales (“snow globe tumblers”, “Big Spring, TX”).
- **Open Graph** completo → el link se ve bien al compartirse en redes (donde vive la audiencia).
- **JSON-LD `LocalBusiness`** → elegible para resultados enriquecidos y mapas.
- Sin frameworks ni JS pesado: **una sola request de HTML**, fuentes con `preconnect`, imágenes `lazy`
  donde aplica y `fetchpriority=high` en el logo del hero.

### Deuda técnica recomendada (siguiente iteración)
- **Optimizar imágenes**: los fondos del hero y el logo ya son **WebP** (200–400 KB). Falta el favicon
  `icono.png` (~3 MB, 2048px): conviene bajarlo a ~256–512px. Es la optimización de velocidad pendiente.
- Sustituir los *placeholders* “📷 Foto real” por fotos reales de vasos (sube conversión fuerte).
- Cuando haya reseñas verificables, enlazarlas a la fuente (Facebook/Google) para más credibilidad.

---

## 11. Cómo editar (para la dueña / dev)
- **Todo** está en `index.html`. Marca (colores) en el bloque `:root`. Contactos en `const CONFIG`.
- Cada texto tiene su par `data-es` / `data-en`; para agregar contenido bilingüe, replica ambos atributos.
- Precios: edita los `.price` y las `<option>` del formulario.
- Deploy: `git push` → Netlify publica solo (ver `DEPLOY.md`).
