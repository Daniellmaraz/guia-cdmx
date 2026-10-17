# Guía del viaje a la CDMX · 17–19 oct 2026

Guía personal del viaje en grupo (tour en autobús) desde Guadalajara a la Ciudad de México, hecha para consultarse **desde el celular**. HTML + CSS + JavaScript puros: sin frameworks, sin build y sin npm.

Incluye itinerario con “Ahora / Lo que sigue”, fichas completas de cada lugar (galería, historia, línea de tiempo, leyendas, datos curiosos y tips), mapa de lugares cerca del hotel con ruta a pie, guía de gastronomía con filtro “Abierto ahora”, **Plan B si llueve** (opciones techadas, ruta techada y aviso automático en la portada cuando el pronóstico marca ≥ 50 % de lluvia en la tarde), **eventos del fin de semana** con avisos de cierres viales, **compras y recuerdos** (con lista personal y presupuesto), clima (Open-Meteo), checklist y contactos. Después de la primera visita funciona **sin internet**, excepto el mapa y el clima.

## Publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta a un repositorio **público** de GitHub (por ejemplo, `guia-cdmx`).
2. En el repositorio, ve a **Settings → Pages**.
3. En **Source** elige *Deploy from a branch*, rama `main`, carpeta `/ (root)` y da clic en **Save**.
4. Espera 1–2 minutos. El sitio quedará en `https://USUARIO.github.io/NOMBRE-REPO/`.

Desde la terminal, en esta carpeta:

```bash
git init
git add .
git commit -m "Guía del viaje a la CDMX"
git branch -M main
git remote add origin https://github.com/USUARIO/guia-cdmx.git
git push -u origin main
```

Después, abre la guía una vez con internet en cada celular (idealmente con Wi-Fi) y toca **“Guardar todas las fotos”** en la sección *Acerca de esta guía*. Para abrirla como app, usa **“Agregar a pantalla de inicio”** en el menú del navegador.

## Abrirla en local

Basta con abrir `index.html` con doble clic: todo funciona menos el modo sin internet, porque el service worker requiere `https` o `localhost`. Para probarlo completo, sirve la carpeta con cualquier servidor estático, por ejemplo `python -m http.server`, y abre `http://localhost:8000`.

**Probar otra hora del viaje:** agrega `?ahora=2026-10-17T12:30` a la URL (hora de la CDMX) para ver cómo cambian la cuenta regresiva, la tarjeta “Ahora / Lo que sigue”, el itinerario y el filtro “Abierto ahora”.

## Editar el contenido

Todo el contenido está en `js/data/`, separado de la lógica, así que puedes cambiar textos sin tocar `app.js`:

| Archivo | Contenido |
|---|---|
| `viaje.js` | Fechas, itinerario por día, checklist, recomendaciones, contactos y clima de respaldo |
| `lugares.js` | Fichas de Basílica, Xochimilco, Chapultepec y Teotihuacán |
| `cercanos.js` | Hotel, lugares cerca del hotel y ruta a pie |
| `comida.js` | Platillos típicos, establecimientos por zona y tips para comer |
| `extras.js` | Plan B si llueve (opciones techadas, ruta techada, qué cambia en cada lugar, umbral del aviso), eventos y avisos del fin de semana, compras, artesanías y tips |
| `creditos.js` | Autor y licencia de cada foto (generado automáticamente) |

- En los textos puedes usar `**negritas**`.
- Los horarios usan el formato `"lu-sa 08:00-18:30; do 08:30-18:30"`; usa `"24h"` si abre todo el día o `null` si no está confirmado. Con este formato se calcula el filtro “Abierto ahora”.
- Las horas del itinerario son de la CDMX (UTC−6, sin horario de verano).
- Si cambias archivos, sube el valor de `VERSION` en `sw.js` para que los celulares descarguen la versión nueva.

## Estructura

```
index.html          Estructura de la página
css/styles.css      Estilos (claro/oscuro, mobile-first)
js/app.js           Lógica de la interfaz
js/data/*.js        Contenido
assets/img/         Fotos WebP (1200 px y miniatura de 640 px) + CREDITS.md
assets/icons/       Ícono SVG y PNG
sw.js               Service worker (modo sin internet)
manifest.json       “Agregar a pantalla de inicio”
```

## Fuentes y créditos

- **Fotos:** Wikimedia Commons, con licencias libres (CC BY, CC BY-SA, CC0 o dominio público). Autor, licencia y enlace de cada una en [`assets/img/CREDITS.md`](assets/img/CREDITS.md) y en la sección de créditos del sitio.
- **Datos prácticos:** horarios, precios y reglas se verificaron en octubre de 2026 con sitios oficiales (INAH, Turismo CDMX, Basílica) y medios. Lo que no se pudo confirmar está marcado como *“verificar”*. Cada ficha incluye sus fuentes.
- **Mapas:** © colaboradores de OpenStreetMap, con Leaflet 1.9.4. **Clima:** Open-Meteo.
