/* Guía CDMX — lógica de la interfaz.
   Todo el contenido vive en js/data/*.js (objeto global GUIA). */
(function () {
  'use strict';

  var G = window.GUIA || {};
  var IMG = 'assets/img/';
  var TZ = 'America/Mexico_City';
  var OFFSET = '-06:00'; // CDMX no tiene horario de verano desde 2022
  var DAYS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do'];
  var DAY_NAMES = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  var LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  var LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────── Utilidades ───────────── */
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible */ } }
  };
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function mapsSearch(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function mapsDir(q, mode) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q) + '&travelmode=' + (mode || 'walking'); }

  /* Distancia aproximada caminando (línea recta × 1.3) */
  function walk(a, b) {
    if (!a || !b) return null;
    var R = 6371000, toR = Math.PI / 180;
    var dLat = (b[0] - a[0]) * toR, dLon = (b[1] - a[1]) * toR;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var m = 2 * R * Math.asin(Math.sqrt(h)) * 1.3;
    var min = Math.max(1, Math.round(m / 75));
    var txt = m < 1000 ? (Math.round(m / 10) * 10) + ' m' : (m / 1000).toFixed(1).replace('.0', '') + ' km';
    return { m: m, txt: txt + ' · ' + min + ' min a pie' };
  }

  /* ───────────── Imágenes ───────────── */
  function imgDims(name) {
    var c = (G.creditos || {})[name] || {};
    var w = c.w || 1200, h = c.h || 800, mx = Math.max(w, h);
    var k = mx > 640 ? 640 / mx : 1;
    return { w: w, h: h, sw: Math.round(w * k) };
  }
  function img(name, alt, opt) {
    opt = opt || {};
    var d = imgDims(name);
    var sizes = opt.sizes || '(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw';
    return '<img src="' + IMG + name + '-sm.webp" srcset="' + IMG + name + '-sm.webp ' + d.sw + 'w, ' + IMG + name + '.webp ' + d.w + 'w" sizes="' + sizes +
      '" width="' + d.w + '" height="' + d.h + '" alt="' + esc(alt) + '"' + (opt.eager ? '' : ' loading="lazy" decoding="async"') + '>';
  }
  function credit(name) {
    var c = (G.creditos || {})[name];
    return c ? 'Foto: ' + c.a + ' · ' + c.l : '';
  }

  /* ───────────── Tiempo (zona CDMX) ───────────── */
  var simDelta = 0;
  (function () {
    // Para probar: ?ahora=2026-10-17T12:00 (hora CDMX)
    var m = /[?&]ahora=([0-9T:\-]+)/.exec(location.search);
    if (m) { var d = new Date(m[1] + ':00' + OFFSET); if (!isNaN(d)) simDelta = d - Date.now(); }
  })();
  function now() { return new Date(Date.now() + simDelta); }
  function cdmx(s) { return new Date(s + ':00' + OFFSET); }
  var fmtParts = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  var WD = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  function partsCDMX(date) {
    var o = {};
    fmtParts.formatToParts(date).forEach(function (p) { o[p.type] = p.value; });
    var hh = +o.hour % 24;
    return { wd: WD[o.weekday], min: hh * 60 + (+o.minute) };
  }
  var fmtHM = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  var fmtDay = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, weekday: 'short', day: 'numeric' });
  function hm(d) { return fmtHM.format(d); }
  function hmMin(min) { min = ((min % 1440) + 1440) % 1440; return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0'); }
  function dur(ms) {
    var m = Math.round(ms / 60000);
    if (m < 1) return 'menos de 1 min';
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    if (h < 24) return h + ' h' + (r ? ' ' + r + ' min' : '');
    var d = Math.floor(h / 24), hr = h % 24;
    return d + (d === 1 ? ' día' : ' días') + (hr ? ' ' + hr + ' h' : '');
  }

  /* Horarios "lu-sa 08:00-18:30; do 08:30-18:30" */
  var horasCache = {};
  function parseHoras(s) {
    if (!s) return null;
    if (s === '24h') return 'always';
    if (horasCache[s]) return horasCache[s];
    var week = [[], [], [], [], [], [], []];
    s.split(';').forEach(function (part) {
      var m = part.trim().match(/^([a-z]{2})(?:-([a-z]{2}))?\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
      if (!m) return;
      var a = DAYS.indexOf(m[1]), b = m[2] ? DAYS.indexOf(m[2]) : a;
      if (a < 0 || b < 0) return;
      var o = (+m[3]) * 60 + (+m[4]), c = (+m[5]) * 60 + (+m[6]);
      if (c <= o) c += 1440;
      for (var i = a; ; i = (i + 1) % 7) { week[i].push([o, c]); if (i === b) break; }
    });
    horasCache[s] = week;
    return week;
  }
  function openStatus(horas, date) {
    var w = parseHoras(horas);
    if (!w) return { k: 'unk', t: 'Horario por confirmar' };
    if (w === 'always') return { k: 'open', t: 'Abierto 24 h' };
    var p = partsCDMX(date || now()), i, r;
    for (i = 0; i < w[p.wd].length; i++) { r = w[p.wd][i]; if (p.min >= r[0] && p.min < r[1]) return { k: 'open', t: 'Abierto · cierra ' + hmMin(r[1]) }; }
    var y = (p.wd + 6) % 7;
    for (i = 0; i < w[y].length; i++) { r = w[y][i]; if (r[1] > 1440 && p.min < r[1] - 1440) return { k: 'open', t: 'Abierto · cierra ' + hmMin(r[1]) }; }
    for (var d = 0; d < 7; d++) {
      var day = (p.wd + d) % 7;
      var ranges = w[day].slice().sort(function (x, z) { return x[0] - z[0]; });
      for (i = 0; i < ranges.length; i++) {
        if (d > 0 || ranges[i][0] > p.min) {
          var when = d === 0 ? '' : d === 1 ? 'mañana ' : 'el ' + DAY_NAMES[day] + ' ';
          return { k: 'closed', t: 'Cerrado · abre ' + when + hmMin(ranges[i][0]) };
        }
      }
    }
    return { k: 'closed', t: 'Cerrado' };
  }
  function statusBadge(horas) {
    var s = openStatus(horas);
    return '<span class="badge badge-' + s.k + '" data-horas="' + esc(horas || '') + '">' + esc(s.t) + '</span>';
  }
  function refreshBadges() {
    $$('[data-horas]').forEach(function (b) {
      var s = openStatus(b.getAttribute('data-horas') || null);
      b.className = 'badge badge-' + s.k; b.textContent = s.t;
    });
  }

  /* ───────────── Itinerario: datos aplanados ───────────── */
  var ALL = [];
  (G.itinerario || []).forEach(function (d) {
    d.items.forEach(function (it, i) { it._ini = cdmx(it.ini); it._fin = cdmx(it.fin); it._dia = d.id; it._key = d.id + '-' + i; ALL.push(it); });
  });
  ALL.sort(function (a, b) { return a._ini - b._ini; });
  function currentItem(t) { for (var i = 0; i < ALL.length; i++) if (t >= ALL[i]._ini && t < ALL[i]._fin) return ALL[i]; return null; }
  function nextItem(t, after) {
    for (var i = 0; i < ALL.length; i++) if (ALL[i]._ini > t && (!after || ALL[i]._ini > after._ini)) return ALL[i];
    return null;
  }
  function todayId(t) {
    var cur = currentItem(t);
    if (cur) return cur._dia;
    var nx = nextItem(t);
    return nx ? nx._dia : (G.itinerario.length ? G.itinerario[G.itinerario.length - 1].id : null);
  }

  /* Abre el destino de una actividad (ficha, sección…) */
  function goTo(lugar) {
    if (!lugar) return;
    if (G.lugares[lugar] || G.cercanos[lugar]) return openFicha(lugar);
    if (lugar === 'hotel') return scrollToId('hotel');
    if (lugar === 'cerca') return scrollToId('cerca');
    if (lugar.indexOf('comida-') === 0) { showFoodZone(lugar.slice(7)); return; }
  }
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* ───────────── Portada: cuenta regresiva ───────────── */
  var llegada = cdmx(G.viaje.llegada), fin = cdmx(G.viaje.fin);
  function renderCountdown() {
    var el = $('#countdown'); if (!el) return;
    var t = now();
    if (t < llegada) {
      var s = Math.max(0, Math.floor((llegada - t) / 1000));
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      var html = '<p class="cd-label">Llegamos a la Basílica (sáb 17 · 07:30) en</p>' +
        box(d, d === 1 ? 'día' : 'días') + box(h, 'horas') + box(m, 'min') + box(sec, 'seg');
      if (el._mode !== 'cd') { el.innerHTML = html; el._mode = 'cd'; }
      else {
        var nums = $$('.cd-num', el);
        [d, h, m, sec].forEach(function (v, i) { var txt = String(v).padStart(2, '0'); if (nums[i] && nums[i].textContent !== txt) nums[i].textContent = txt; });
      }
    } else if (t < fin) {
      var cur = currentItem(t) || nextItem(t);
      var label = !cur ? 'De regreso a casa' : cur._dia === 'sab' ? 'Día 1 · Sábado 17' : cur._dia === 'dom' ? 'Día 2 · Domingo 18' : cur._dia === 'lun' ? 'Llegando a casa' : 'En camino';
      var mode = 'day-' + label;
      if (el._mode !== mode) { el.innerHTML = '<span class="cd-day">🎉 ' + esc(label) + '</span>'; el._mode = mode; }
    } else if (el._mode !== 'end') {
      el.innerHTML = '<span class="cd-day">💖 ¡Gracias por viajar juntos!</span>'; el._mode = 'end';
    }
    function box(v, l) { return '<div class="cd-box"><span class="cd-num">' + String(v).padStart(2, '0') + '</span><span class="cd-lbl">' + l + '</span></div>'; }
  }

  /* ───────────── Tarjeta “Ahora / Lo que sigue” ───────────── */
  function renderNow() {
    var el = $('#now-card'); if (!el) return;
    var t = now(), cur = currentItem(t), nx = nextItem(t, cur);
    var rows = [];
    if (cur) {
      rows.push(row(cur, 'Ahora', 'Termina ≈ ' + hm(cur._fin) + ' · en ' + dur(cur._fin - t), true));
    } else if (!ALL.length || t < ALL[0]._ini) {
      rows.push('<button class="now-row" type="button" data-goto="checklist"><span class="now-ico">🧳</span><span><span class="now-tag">Antes del viaje</span>' +
        '<span class="now-title">Preparen la maleta</span><span class="now-meta">Revisen el checklist y guarden esta guía para usarla sin internet.</span></span></button>');
    } else if (t >= fin) {
      rows.push('<div class="now-row"><span class="now-ico">🏠</span><span><span class="now-tag">Viaje terminado</span><span class="now-title">¡Bienvenidos a casa!</span><span class="now-meta">Gracias por viajar juntos.</span></span></div>');
    }
    if (nx) rows.push(row(nx, 'Lo que sigue', fmtDay.format(nx._ini) + ' · ' + hm(nx._ini) + (nx.aprox ? ' aprox.' : '') + ' · en ' + dur(nx._ini - t), false));
    el.innerHTML = rows.join('<div class="now-sep" aria-hidden="true"></div>');
    function row(it, tag, meta, isNow) {
      return '<button class="now-row' + (isNow ? ' is-now' : '') + '" type="button"' + (it.lugar ? ' data-goto="' + it.lugar + '"' : ' data-goto-day="' + it._dia + '"') + '>' +
        '<span class="now-ico">' + it.icono + '</span><span><span class="now-tag">' + tag + '</span>' +
        '<span class="now-title">' + esc(it.titulo) + '</span><span class="now-meta">' + esc(meta) + '</span></span></button>';
    }
  }

  /* ───────────── Itinerario ───────────── */
  var selectedDay = null;
  function renderItinerary() {
    var tabs = $('#day-tabs'), panels = $('#day-panels');
    var today = todayId(now());
    selectedDay = selectedDay || (now() < ALL[0]._ini ? 'sab' : today);
    tabs.innerHTML = G.itinerario.map(function (d) {
      var sel = d.id === selectedDay;
      return '<button role="tab" id="tab-' + d.id + '" aria-controls="panel-' + d.id + '" aria-selected="' + sel + '"' + (sel ? '' : ' tabindex="-1"') +
        ' class="' + (d.id === today && now() >= ALL[0]._ini && now() < fin ? 'is-today' : '') + '" data-day="' + d.id + '">' + esc(d.corto) + '<small>' + esc(d.sub.split('·')[0]) + '</small></button>';
    }).join('');
    panels.innerHTML = G.itinerario.map(function (d) {
      return '<div role="tabpanel" id="panel-' + d.id + '" aria-labelledby="tab-' + d.id + '"' + (d.id === selectedDay ? '' : ' hidden') + '>' +
        '<div class="day-head"><h3>' + esc(d.titulo) + '</h3><p>' + esc(d.sub) + '</p></div>' +
        '<ol class="timeline">' + d.items.map(function (it) { return tlItem(it); }).join('') + '</ol>' + dayEvents(d.id) + '</div>';
    }).join('');
    markTimeline();
    tabsBehaviour(tabs, function (btn) { selectedDay = btn.getAttribute('data-day'); });
  }
  function dayEvents(day) {
    var list = ((G.eventos && G.eventos.lista) || []).filter(function (e) { return e.dia === day || (day === 'sab' && e.dia === 'ambos'); });
    if (!list.length) return '';
    return '<div class="day-events"><h4>🎉 Eventos y avisos de este día</h4><ul>' + list.map(function (e) {
      return '<li class="' + (e.tipo === 'aviso' ? 'is-aviso' : '') + '"><button class="link-btn" type="button" data-event="' + e.id + '">' + esc(e.nombre) + '</button><small>' + esc(e.cuando) + '</small></li>';
    }).join('') + '</ul></div>';
  }
  function tlItem(it) {
    var lugar = it.lugar && G.lugares[it.lugar];
    var hasImg = !!lugar;
    var action = it.lugar ? '<div class="btn-row">' + (lugar ? '<button class="btn btn-sm" type="button" data-goto="' + it.lugar + '">Ver ficha completa</button>' :
      '<button class="btn btn-sm btn-sec" type="button" data-goto="' + it.lugar + '">' + (it.lugar === 'hotel' ? 'Ver hotel' : it.lugar === 'cerca' ? 'Ver mapa y ruta' : 'Dónde comer') + '</button>') + '</div>' : '';
    return '<li class="tl-item reveal" data-key="' + it._key + '"><span class="tl-dot" aria-hidden="true">' + it.icono + '</span>' +
      '<div class="tl-card' + (hasImg ? ' has-place' : '') + '">' +
      (hasImg ? '<button class="tl-img card-img" type="button" data-goto="' + it.lugar + '" aria-label="Abrir ficha de ' + esc(lugar.nombre) + '">' + img(lugar.fotos[0][0], lugar.fotos[0][1], { sizes: '(min-width: 640px) 200px, 100vw' }) + '</button>' : '') +
      '<div class="tl-body"><div class="tl-time">' + (it.aprox ? '≈ ' : '') + hm(it._ini) + ' – ' + hm(it._fin) + '<span class="tl-state"></span></div>' +
      '<h4 class="tl-title">' + esc(it.titulo) + '</h4>' + (it.dur ? '<p class="tl-dur">⏱️ ' + esc(it.dur) + '</p>' : '') +
      '<p class="tl-desc">' + md(it.desc) + '</p>' + action + '</div></div></li>';
  }
  function markTimeline() {
    var t = now();
    $$('.tl-item').forEach(function (li) {
      var it = ALL.filter(function (x) { return x._key === li.getAttribute('data-key'); })[0];
      if (!it) return;
      var isNow = t >= it._ini && t < it._fin, past = t >= it._fin;
      li.classList.toggle('is-now', isNow); li.classList.toggle('is-past', past);
      var st = $('.tl-state', li);
      if (st) st.innerHTML = isNow ? ' <span class="badge badge-open">Ahora</span>' : '';
    });
  }

  /* Pestañas accesibles (flechas izquierda/derecha) */
  function tabsBehaviour(list, onSelect) {
    var tabs = $$('[role="tab"]', list);
    function select(btn, focus) {
      tabs.forEach(function (b) {
        var on = b === btn;
        b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
        var p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = !on;
      });
      if (focus) btn.focus();
      if (onSelect) onSelect(btn);
      observeReveal();
    }
    tabs.forEach(function (b, i) {
      b.addEventListener('click', function () { select(b); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          select(n, true);
        }
      });
    });
    list._select = select;
  }

  /* ───────────── Lugares del itinerario (tarjetas) ───────────── */
  var DAY_OF = { basilica: 'Sáb 17 · mañana', xochimilco: 'Sáb 17 · mediodía', chapultepec: 'Dom 18 · mañana', teotihuacan: 'Dom 18 · mediodía' };
  function renderPlaces() {
    $('#place-grid').innerHTML = Object.keys(G.lugares).map(function (id) {
      var L = G.lugares[id];
      return '<button class="place-card reveal c-' + L.color + '" type="button" data-goto="' + id + '">' +
        img(L.fotos[0][0], L.fotos[0][1], { sizes: '(min-width: 960px) 25vw, (min-width: 640px) 50vw, 100vw' }) +
        '<span class="pc-body"><span class="pc-day">' + DAY_OF[id] + '</span><h3>' + esc(L.nombre) + '</h3><p>' + esc(L.subtitulo) + '</p>' +
        '<span class="pc-more">Abrir ficha →</span></span></button>';
    }).join('');
  }

  /* ───────────── Hotel ───────────── */
  function renderHotel() {
    var H = G.hotel;
    $('#hotel-box').innerHTML =
      '<article class="hotel-card reveal"><div class="hc-img">' + img(H.foto[0], H.foto[1], { sizes: '(min-width: 960px) 55vw, 100vw' }) + '</div>' +
      '<div class="hc-body"><p style="margin:0 0 4px;font-weight:650">' + esc(H.direccion) + '</p><p class="small-note">' + esc(H.cerca) + '</p>' +
      '<div class="facts"><div class="fact"><b>Check-in</b><span>' + H.checkin + '</span></div><div class="fact"><b>Check-out</b><span>' + H.checkout + '</span></div>' +
      '<div class="fact"><b>Teléfono</b><span><a href="tel:' + H.telefono.replace(/\s/g, '') + '">' + H.telefono + '</a></span></div><div class="fact"><b>Metro</b><span>Juárez / Bellas Artes</span></div></div>' +
      '<div class="btn-row"><a class="btn" href="' + mapsDir(H.maps, 'walking') + '" target="_blank" rel="noopener">🧭 Cómo regresar al hotel</a>' +
      '<a class="btn btn-sec" href="' + mapsSearch(H.maps) + '" target="_blank" rel="noopener">Abrir en Google Maps</a></div>' +
      '<p class="small-note" style="margin-top:12px">' + esc(H.nota) + ' ' + esc(H.telefonoNota) + ' Metro: ' + esc(H.metro) + '</p></div></article>' +
      '<div class="map-box reveal"><div class="map" id="map-hotel" role="region" aria-label="Mapa del hotel"></div><p class="map-msg" id="map-hotel-msg" hidden></p></div>';
  }

  /* ───────────── Cerca del hotel ───────────── */
  var CATS = {
    imperdible: { n: 'Imperdibles', s: 'Imperdible', c: '#E4007C', e: '★' },
    museo: { n: 'Museos', s: 'Museo', c: '#1B4F9C', e: '🏛' },
    comida: { n: 'Comida', s: 'Comida', c: '#F2A900', e: '🍴' },
    mirador: { n: 'Miradores', s: 'Mirador', c: '#0F8B6E', e: '👁' },
    noche: { n: 'Noche', s: 'Noche', c: '#6B3FA0', e: '🌙' },
    eventos: { n: 'Eventos', s: 'Evento', c: '#E86A17', e: '🎉' }
  };
  var cercaFilter = 'todos';
  function renderCerca() {
    var chips = [['todos', 'Todos', null]].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k].n, CATS[k].c]; })).concat([['ruta', 'Ruta a pie', '#E4007C'], ['rutab', 'Ruta con lluvia', '#1B4F9C']]);
    $('#cerca-filtros').innerHTML = chips.map(function (c) {
      return '<button class="chip" type="button" aria-pressed="' + (c[0] === cercaFilter) + '" data-cat="' + c[0] + '">' + (c[2] ? '<span class="dot" style="background:' + c[2] + '"></span>' : '') + c[1] + '</button>';
    }).join('');
    $$('#cerca-filtros .chip').forEach(function (b) {
      b.addEventListener('click', function () {
        setCercaFilter(b.getAttribute('data-cat'));
      });
    });
    // Ruta
    var R = G.ruta;
    $('#ruta-titulo').textContent = R.titulo;
    $('#ruta-dur').textContent = R.duracion;
    $('#ruta-lista').innerHTML = R.paradas.map(function (p) {
      var link = p.id ? ' <button class="link-btn" type="button" data-goto="' + p.id + '">ficha</button>' : p.comida ? ' <button class="link-btn" type="button" data-venue="' + p.comida + '">ver</button>' : '';
      return '<li><time>' + p.hora + '</time><span>' + md(p.txt) + link + '</span></li>';
    }).join('');
    // Tarjetas
    var hotel = G.hotel.coords;
    var items = Object.keys(G.cercanos).map(function (id) { var x = G.cercanos[id]; x.id = id; x._d = walk(hotel, x.coords); return x; });
    items.sort(function (a, b) { return a._d.m - b._d.m; });
    $('#cerca-grid').innerHTML = items.map(function (x) {
      return '<article class="card reveal" data-cat="' + x.cat + '">' +
        '<button class="card-img" type="button" data-goto="' + x.id + '" aria-label="Abrir ficha de ' + esc(x.nombre) + '">' + img(x.fotos[0][0], x.fotos[0][1]) + statusBadge(x.horas) + '</button>' +
        '<div class="card-body"><div class="card-meta"><span class="badge" style="background:' + CATS[x.cat].c + ';color:#fff">' + CATS[x.cat].s + '</span><span>' + x._d.txt + '</span></div>' +
        '<h3>' + esc(x.nombre) + '</h3>' +
        '<p class="kv"><b>Horario:</b> ' + md(x.horario) + '</p><p class="kv"><b>Costo:</b> ' + md(x.costo) + '</p>' +
        '<p class="card-dato">' + md(x.dato) + '</p>' +
        '<div class="card-foot"><button class="btn btn-sm" type="button" data-goto="' + x.id + '">Ver ficha</button>' +
        '<a class="btn btn-sm btn-sec" href="' + mapsSearch(x.maps) + '" target="_blank" rel="noopener">Google Maps</a></div></div></article>';
    }).join('');
  }
  function filterCercaCards() {
    $$('#cerca-grid .card').forEach(function (c) {
      var cat = c.getAttribute('data-cat');
      c.hidden = !(cercaFilter === 'todos' || cercaFilter === 'ruta' || cercaFilter === 'rutab' || cercaFilter === cat);
    });
    var note = $('#cerca-note');
    if (!note) { note = document.createElement('p'); note.id = 'cerca-note'; note.className = 'zone-note'; $('#cerca-grid').parentNode.insertBefore(note, $('#cerca-grid')); }
    var msgs = {
      eventos: 'Los eventos están en el mapa (naranja). Detalles en <a href="#eventos">Eventos del fin de semana</a>.',
      comida: 'Los restaurantes están en el mapa (amarillo). Detalles en <a href="#comida">Qué y dónde comer</a>.',
      rutab: 'Ruta techada en azul. Paradas y horarios en <a href="#planb">Plan B si llueve</a>.'
    };
    note.hidden = !msgs[cercaFilter];
    note.innerHTML = msgs[cercaFilter] || '';
  }
  function setCercaFilter(f) {
    cercaFilter = f;
    $$('#cerca-filtros .chip').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-cat') === f); });
    if (f === 'ruta') $('#ruta').open = true;
    filterCercaCards(); updateCercaMap();
  }

  /* ───────────── Mapas (Leaflet bajo demanda) ───────────── */
  var leafletP = null;
  function loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (leafletP) return leafletP;
    leafletP = new Promise(function (res, rej) {
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = LEAFLET_CSS; document.head.appendChild(css);
      var s = document.createElement('script'); s.src = LEAFLET_JS; s.async = true;
      s.onload = function () { window.L ? res(window.L) : rej(); };
      s.onerror = function () { leafletP = null; rej(); };
      document.head.appendChild(s);
    });
    return leafletP;
  }
  function mapFail(msgId) {
    var m = document.getElementById(msgId); if (!m) return;
    m.hidden = false;
    m.innerHTML = '🗺️ El mapa necesita conexión a internet.<br><small>Las tarjetas de abajo y los botones de Google Maps siguen funcionando.</small>';
  }
  function baseMap(L, el, center, zoom) {
    var map = L.map(el, { scrollWheelZoom: false, tap: true }).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
  }
  function pin(L, cls, emoji) {
    return L.divIcon({ className: '', html: '<div class="mk ' + cls + '"><span>' + emoji + '</span></div>', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] });
  }
  var cercaMap = null, cercaLayers = {}, routeLayer = null, routeBLayer = null;
  function initCercaMap() {
    var el = $('#map-cerca'); if (!el || el._init) return; el._init = true;
    loadLeaflet().then(function (L) {
      var map = baseMap(L, el, G.hotel.coords, 15);
      cercaMap = map;
      L.marker(G.hotel.coords, { icon: L.divIcon({ className: '', html: '<div class="mk mk-hotel"><span>🏨</span></div>', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -34] }), zIndexOffset: 1000 })
        .addTo(map).bindPopup('<b>' + esc(G.hotel.nombre) + '</b><br>' + esc(G.hotel.direccion));
      Object.keys(CATS).forEach(function (k) { cercaLayers[k] = L.layerGroup().addTo(map); });
      Object.keys(G.cercanos).forEach(function (id) {
        var x = G.cercanos[id];
        L.marker(x.coords, { icon: pin(L, 'mk-' + x.cat, CATS[x.cat].e), title: x.nombre }).addTo(cercaLayers[x.cat])
          .bindPopup('<b>' + esc(x.nombre) + '</b><br>' + esc(walk(G.hotel.coords, x.coords).txt) + '<br><button class="pop-btn" data-goto="' + id + '">Ver ficha</button>');
      });
      G.establecimientos.filter(function (v) { return v.zona === 'centro'; }).forEach(function (v) {
        L.marker(v.coords, { icon: pin(L, 'mk-comida', '🍴'), title: v.nombre }).addTo(cercaLayers.comida)
          .bindPopup('<b>' + esc(v.nombre) + '</b><br>' + esc(v.pedir.split('.')[0]) + '<br>' + esc(walk(G.hotel.coords, v.coords).txt) + '<br><button class="pop-btn" data-venue="' + v.id + '">Ver en Comida</button>');
      });
      routeLayer = L.layerGroup();
      L.polyline(G.ruta.linea, { color: '#E4007C', weight: 5, opacity: .85, dashArray: '2 10', lineCap: 'round' }).addTo(routeLayer);
      var n = 0;
      G.ruta.paradas.forEach(function (p) {
        var c = p.id ? G.cercanos[p.id].coords : null;
        if (!c && p.comida) { var v = G.establecimientos.filter(function (e) { return e.id === p.comida; })[0]; c = v && v.coords; }
        n++;
        if (c && n < G.ruta.paradas.length) L.marker(c, { icon: L.divIcon({ className: '', html: '<div class="mk mk-num"><span>' + n + '</span></div>', iconSize: [26, 26], iconAnchor: [13, 13] }), zIndexOffset: 500 }).addTo(routeLayer);
      });
      routeLayer.addTo(map);
      routeBLayer = L.layerGroup();
      L.polyline(G.planB.ruta.linea, { color: '#1B4F9C', weight: 5, opacity: .85, dashArray: '2 10', lineCap: 'round' }).addTo(routeBLayer);
      (G.eventos.lista || []).forEach(function (ev) {
        if (ev.linea) L.polyline(ev.linea, { color: '#E86A17', weight: 6, opacity: .55 }).addTo(cercaLayers.eventos).bindPopup('<b>' + esc(ev.nombre) + '</b><br>Ruta del desfile · ' + esc(ev.cuando));
        if (!ev.coords) return;
        L.marker(ev.coords, { icon: pin(L, 'mk-eventos', ev.tipo === 'aviso' ? '⚠️' : '🎉'), title: ev.nombre }).addTo(cercaLayers.eventos)
          .bindPopup('<b>' + esc(ev.nombre) + '</b><br>' + esc(ev.cuando) + '<br><button class="pop-btn" data-event="' + ev.id + '">Ver detalles</button>');
      });
      updateCercaMap();
    }).catch(function () { mapFail('map-cerca-msg'); });
  }
  function updateCercaMap() {
    if (!cercaMap) return;
    Object.keys(cercaLayers).forEach(function (k) {
      var route = cercaFilter === 'ruta' || cercaFilter === 'rutab';
      var show = (cercaFilter === 'todos' && k !== 'eventos') || cercaFilter === k || (route && k !== 'comida' && k !== 'eventos');
      if (show) cercaLayers[k].addTo(cercaMap); else cercaMap.removeLayer(cercaLayers[k]);
    });
    if (cercaFilter === 'todos' || cercaFilter === 'ruta') routeLayer.addTo(cercaMap); else cercaMap.removeLayer(routeLayer);
    if (cercaFilter === 'rutab') routeBLayer.addTo(cercaMap); else cercaMap.removeLayer(routeBLayer);
    if (cercaFilter === 'ruta') cercaMap.fitBounds(G.ruta.linea, { padding: [20, 20] });
    if (cercaFilter === 'rutab') cercaMap.fitBounds(G.planB.ruta.linea, { padding: [20, 20] });
    if (cercaFilter === 'eventos') cercaMap.fitBounds([[19.4410, -99.1300], [19.4260, -99.1690]], { padding: [10, 10] });
  }
  function initHotelMap() {
    var el = $('#map-hotel'); if (!el || el._init) return; el._init = true;
    loadLeaflet().then(function (L) {
      var map = baseMap(L, el, G.hotel.coords, 16);
      L.marker(G.hotel.coords, { icon: L.divIcon({ className: '', html: '<div class="mk mk-hotel"><span>🏨</span></div>', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -34] }) })
        .addTo(map).bindPopup('<b>' + esc(G.hotel.nombre) + '</b><br>' + esc(G.hotel.direccion)).openPopup();
      ['alameda', 'bellasartes', 'artepopular'].forEach(function (id) {
        var x = G.cercanos[id];
        L.marker(x.coords, { icon: pin(L, 'mk-' + x.cat, CATS[x.cat].e) }).addTo(map).bindPopup('<b>' + esc(x.nombre) + '</b><br><button class="pop-btn" data-goto="' + id + '">Ver ficha</button>');
      });
    }).catch(function () { mapFail('map-hotel-msg'); });
  }
  function initBasilicaMap() {
    var el = $('#map-basilica'); if (!el || el._init) return; el._init = true;
    loadLeaflet().then(function (L) {
      var B = G.lugares.basilica;
      var map = baseMap(L, el, B.coords, 16);
      L.marker(B.coords, { icon: pin(L, 'mk-imperdible', '⛪'), zIndexOffset: 1000 }).addTo(map).bindPopup('<b>Basílica de Guadalupe</b>');
      G.establecimientos.filter(function (v) { return v.zona === 'basilica'; }).forEach(function (v) {
        L.marker(v.coords, { icon: pin(L, 'mk-comida', '🍴') }).addTo(map)
          .bindPopup('<b>' + esc(v.nombre) + '</b><br>' + esc(v.horario) + '<br><a href="' + mapsSearch(v.maps) + '" target="_blank" rel="noopener">Google Maps</a>');
      });
    }).catch(function () { mapFail('map-basilica-msg'); });
  }

  /* ───────────── Gastronomía ───────────── */
  var TIPOS = { fonda: 'Fonda', puesto: 'Puesto', mercado: 'Mercado', cafe: 'Café', restaurante: 'Restaurante', cantina: 'Cantina', panaderia: 'Panadería', dulceria: 'Dulcería' };
  var TAGS = { temprano: 'Abre temprano', economico: 'Económico', tradicional: 'Tradicional', historico: 'Histórico', vegetariano: 'Opción vegetariana', '24h': '24 horas' };
  var food = { zona: 'todas', tipo: 'todos', precio: 'todos', tags: [], abierto: false };
  var VENUES = G.establecimientos || [];
  var ZONE_ORIGIN = { basilica: function () { return G.lugares.basilica.coords; }, centro: function () { return G.hotel.coords; } };

  function renderFoodFilters() {
    var zonas = [['todas', 'Todas']].concat(Object.keys(G.comidaZonas).map(function (k) { return [k, G.comidaZonas[k].nombre.replace('Cerca de la ', '').replace(' (cerca del hotel)', '')]; }));
    var tipos = [['todos', 'Todos']].concat(Object.keys(TIPOS).filter(function (t) { return VENUES.some(function (v) { return v.tipo === t; }); }).map(function (t) { return [t, TIPOS[t]]; }));
    var precios = [['todos', 'Todos'], ['$', '$'], ['$$', '$$'], ['$$$', '$$$']];
    function group(key, label, opts) {
      return '<p class="filter-label">' + label + '</p><div class="chips" role="group" aria-label="' + label + '">' + opts.map(function (o) {
        return '<button class="chip" type="button" data-f="' + key + '" data-v="' + o[0] + '" aria-pressed="' + (food[key] === o[0]) + '">' + esc(o[1]) + '</button>';
      }).join('') + '</div>';
    }
    $('#food-filtros').innerHTML =
      '<div class="chips"><button class="chip" type="button" id="f-open" aria-pressed="false"><span class="dot" style="background:var(--verde)"></span>Abierto ahora</button></div>' +
      group('zona', 'Zona', zonas) + group('tipo', 'Tipo', tipos) + group('precio', 'Precio', precios) +
      '<p class="filter-label">Etiquetas</p><div class="chips" role="group" aria-label="Etiquetas">' + Object.keys(TAGS).map(function (k) {
        return '<button class="chip" type="button" data-tag="' + k + '" aria-pressed="false">' + TAGS[k] + '</button>';
      }).join('') + '</div>';
    $('#food-filtros').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      if (b.id === 'f-open') { food.abierto = !food.abierto; b.setAttribute('aria-pressed', food.abierto); }
      else if (b.hasAttribute('data-tag')) {
        var t = b.getAttribute('data-tag'), i = food.tags.indexOf(t);
        if (i >= 0) food.tags.splice(i, 1); else food.tags.push(t);
        b.setAttribute('aria-pressed', i < 0);
      } else {
        var f = b.getAttribute('data-f'); food[f] = b.getAttribute('data-v');
        $$('.chip[data-f="' + f + '"]', $('#food-filtros')).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      }
      renderVenues();
    });
  }
  function venueMatch(v) {
    if (food.zona !== 'todas' && v.zona !== food.zona) return false;
    if (food.tipo !== 'todos' && v.tipo !== food.tipo) return false;
    if (food.precio !== 'todos' && v.precio.split('–').indexOf(food.precio) < 0) return false;
    for (var i = 0; i < food.tags.length; i++) if ((v.tags || []).indexOf(food.tags[i]) < 0) return false;
    if (food.abierto && openStatus(v.horas).k !== 'open') return false;
    return true;
  }
  function venueCard(v) {
    var origin = ZONE_ORIGIN[v.zona] ? ZONE_ORIGIN[v.zona]() : null;
    var d = origin && !v.aprox ? walk(origin, v.coords) : null;
    var media = v.foto ? '<div class="card-img">' + img(v.foto, v.nombre) + statusBadge(v.horas) + '</div>' :
      '<div class="card-img card-ico"><span aria-hidden="true">' + (v.icono || '🍽️') + '</span>' + statusBadge(v.horas) + '</div>';
    return '<article class="card venue reveal" id="v-' + v.id + '">' + media +
      '<div class="card-body"><div class="card-meta"><span class="badge">' + TIPOS[v.tipo] + '</span><span class="price">' + esc(v.precio) + '</span>' +
      (d ? '<span>' + (v.zona === 'basilica' ? 'desde la Basílica: ' : '') + d.txt + '</span>' : '') + '</div>' +
      '<h3>' + esc(v.nombre) + '</h3>' +
      '<p class="kv"><b>Qué pedir:</b> ' + md(v.pedir) + '</p>' +
      '<p class="kv"><b>Horario:</b> ' + md(v.horario) + '</p>' +
      (v.tiempo ? '<p class="kv"><b>Tiempo para comer:</b> ' + esc(v.tiempo) + '</p>' : '') +
      '<p class="kv"><b>Dirección:</b> ' + esc(v.direccion) + (v.aprox ? ' <span class="badge badge-aprox">ubicación aprox.</span>' : '') + '</p>' +
      (v.historia ? '<p class="card-txt dish-hist">' + md(v.historia) + '</p>' : '') +
      ((v.tags || []).length ? '<div class="card-meta">' + v.tags.map(function (t) { return '<span class="tag">' + TAGS[t] + '</span>'; }).join('') + '</div>' : '') +
      '<div class="card-foot"><a class="btn btn-sm" href="' + mapsSearch(v.maps) + '" target="_blank" rel="noopener">Google Maps</a>' +
      (v.lugar ? '<button class="btn btn-sm btn-sec" type="button" data-goto="' + v.lugar + '">Ver lugar</button>' : '') +
      (v.fuente ? '<a class="link-btn" style="font-size:.8rem" href="' + v.fuente[1] + '" target="_blank" rel="noopener">Fuente</a>' : '') + '</div></div></article>';
  }
  function renderVenues() {
    var html = Object.keys(G.comidaZonas).map(function (z) {
      if (food.zona !== 'todas' && food.zona !== z) return '';
      var Z = G.comidaZonas[z];
      var list = VENUES.filter(function (v) { return v.zona === z && venueMatch(v); });
      return '<section class="zone" id="zona-' + z + '"><div class="zone-head"><h3>' + esc(Z.nombre) + '</h3><p>' + esc(Z.sub) + '</p></div>' +
        '<p class="zone-note">' + md(Z.nota) + '</p>' +
        (z === 'basilica' ? '<div class="map-box mini-map-wrap"><div class="map map-sm" id="map-basilica" role="region" aria-label="Mapa de desayunos cerca de la Basílica"></div><p class="map-msg" id="map-basilica-msg" hidden></p></div>' : '') +
        (list.length ? '<div class="card-grid">' + list.map(venueCard).join('') + '</div>' : '<p class="empty">Ningún lugar coincide con los filtros en esta zona.</p>') + '</section>';
    }).join('');
    $('#food-zonas').innerHTML = html;
    observeReveal();
    if ($('#map-basilica')) lazyInit($('#map-basilica'), initBasilicaMap);
  }
  function renderDishes() {
    var byId = {}; VENUES.forEach(function (v) { byId[v.id] = v; });
    $('#dish-grid').innerHTML = G.platillos.map(function (p) {
      var pica = p.pica ? '<span class="pica" aria-label="Picor ' + p.pica + ' de 3">' + '🌶️'.repeat(p.pica) + '</span>' : '<span>No pica</span>';
      var where = (p.donde || []).filter(function (id) { return byId[id]; }).map(function (id) {
        return '<button class="link-btn" type="button" data-venue="' + id + '">' + esc(byId[id].nombre.replace(/ \(.*\)/, '')) + '</button>';
      }).join(' · ');
      return '<article class="card dish reveal" id="d-' + p.id + '">' +
        (p.foto ? '<button class="card-img" type="button" data-lb-single="' + p.foto + '" data-alt="' + esc(p.alt) + '" aria-label="Ampliar foto de ' + esc(p.nombre) + '">' + img(p.foto, p.alt) + '</button>' :
          '<div class="card-img card-ico"><span aria-hidden="true">' + p.icono + '</span></div>') +
        '<div class="card-body"><h3>' + esc(p.nombre) + '</h3><div class="card-meta">' + pica + '</div>' +
        '<p class="card-txt">' + md(p.que) + '</p>' +
        '<p class="dish-hist clamp">' + md(p.historia) + '</p><button class="link-btn more-btn" type="button" aria-expanded="false">Leer historia completa</button>' +
        '<p class="kv"><b>Cómo pedirlo:</b> ' + md(p.pedir) + '</p>' +
        (where ? '<p class="dish-where"><b>Dónde probarlo:</b> ' + where + '</p>' : '') + '</div></article>';
    }).join('');
    $('#dish-grid').addEventListener('click', function (e) {
      var b = e.target.closest('.more-btn'); if (!b) return;
      var h = b.previousElementSibling; var open = h.classList.toggle('clamp');
      b.setAttribute('aria-expanded', !open); b.textContent = open ? 'Leer historia completa' : 'Mostrar menos';
    });
  }
  function renderFoodTips() {
    $('#food-tips').innerHTML = G.comidaTips.map(function (t) { return '<div class="tip reveal"><h3>' + esc(t[0]) + '</h3><p>' + md(t[1]) + '</p></div>'; }).join('');
  }
  var foodTabs;
  function selectFoodTab(id) { var b = document.getElementById(id); if (b && foodTabs && foodTabs._select) foodTabs._select(b); }
  function showFoodZone(z) {
    food.zona = z; food.tipo = 'todos'; food.precio = 'todos'; food.tags = []; food.abierto = false;
    renderFoodFilters(); renderVenues(); selectFoodTab('ft-donde');
    setTimeout(function () { scrollToId('zona-' + z); }, 60);
  }
  function showVenue(id) {
    closeFicha(true);
    var v = VENUES.filter(function (x) { return x.id === id; })[0]; if (!v) return;
    food.zona = 'todas'; food.tipo = 'todos'; food.precio = 'todos'; food.tags = []; food.abierto = false;
    renderFoodFilters(); renderVenues(); selectFoodTab('ft-donde');
    setTimeout(function () {
      var el = document.getElementById('v-' + id); if (!el) return;
      el.classList.add('is-in');
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      el.animate && el.animate([{ boxShadow: '0 0 0 0 rgba(228,0,124,.0)' }, { boxShadow: '0 0 0 6px rgba(228,0,124,.45)' }, { boxShadow: '0 0 0 0 rgba(228,0,124,.0)' }], { duration: 1600, iterations: 1 });
    }, 80);
  }

  /* ───────────── Ficha de lugar ───────────── */
  var fichaOpenedByUs = false, lastFocus = null;
  function openFicha(id) {
    if (location.hash !== '#ficha=' + id) { fichaOpenedByUs = true; location.hash = 'ficha=' + id; }
    else renderFicha(id);
  }
  function renderFicha(id) {
    var L = G.lugares[id], isMain = !!L;
    if (!L) L = G.cercanos[id];
    if (!L) return;
    lastFocus = lastFocus || document.activeElement;
    var panel = $('#ficha-panel');
    var color = L.color || 'rosa';
    var toc = [];
    function sec(key, title, body) { if (!body) return ''; toc.push([key, title]); return '<section class="f-sec" id="f-' + key + '"><h3>' + title + '</h3>' + body + '</section>'; }

    // Lo esencial
    var ess = (L.esencial || [
      ['Horario', L.horario], ['Costo', L.costo], ['Tiempo', L.estancia], ['Dirección', L.direccion]
    ].concat(L.coords ? [['Desde el hotel', walk(G.hotel.coords, L.coords).txt]] : []));
    if (isMain && L.direccion) ess = ess.concat([['Dirección', L.direccion]]);
    var essHtml = '<div class="essentials">' + ess.filter(function (e) { return e[1]; }).map(function (e) { return '<div class="ess"><b>' + esc(e[0]) + '</b><span>' + md(e[1]) + '</span></div>'; }).join('') + '</div>' +
      (L.aviso ? '<p class="alert">' + md(L.aviso) + '</p>' : '') +
      '<div class="btn-row" style="margin-top:12px"><a class="btn" href="' + mapsSearch(L.maps) + '" target="_blank" rel="noopener">📍 Abrir en Google Maps</a>' +
      (!isMain ? '<a class="btn btn-sec" href="' + mapsDir(L.maps, 'walking') + '" target="_blank" rel="noopener">🚶 Cómo llegar a pie</a>' : '') + '</div>';

    var hist = (L.historia || []).map(function (h) { return '<h4>' + esc(h.h) + '</h4>' + h.p.map(function (p) { return '<p>' + md(p) + '</p>'; }).join(''); }).join('');
    var tl = L.lineaTiempo && L.lineaTiempo.length ? '<ol class="mini-tl">' + L.lineaTiempo.map(function (t) { return '<li><b>' + esc(t[0]) + '</b><span>' + md(t[1]) + '</span></li>'; }).join('') + '</ol>' : '';
    var arq = L.arquitectura && L.arquitectura.length ? '<ul class="bullets">' + L.arquitectura.map(function (a) { return '<li>' + md(a) + '</li>'; }).join('') + '</ul>' : '';
    var ley = L.leyendas && L.leyendas.length ? L.leyendas.map(function (l) { return '<div class="legend"><h4>' + esc(l.h) + '</h4><p>' + md(l.p) + '</p></div>'; }).join('') : '';
    var cur = L.curiosos && L.curiosos.length ? '<ol class="facts-list">' + L.curiosos.map(function (c) { return '<li>' + md(c) + '</li>'; }).join('') + '</ol>' : '';
    var rec = L.recorrido ? '<ol class="steps">' + L.recorrido.map(function (r) { return '<li><time>' + esc(r[0]) + '</time><span>' + md(r[1]) + '</span></li>'; }).join('') + '</ol>' :
      (L.queVer ? '<ul class="bullets">' + L.queVer.map(function (q) { return '<li>' + md(q) + '</li>'; }).join('') + '</ul>' : '');
    var tips = (L.tips && L.tips.length ? '<ul class="bullets">' + L.tips.map(function (t) { return '<li>' + md(t) + '</li>'; }).join('') + '</ul>' : '') +
      (L.comer && L.comer.length ? '<h4>Qué comer</h4><ul class="bullets">' + L.comer.map(function (t) { return '<li>' + md(t) + '</li>'; }).join('') + '</ul>' +
        '<p style="margin-top:10px"><button class="btn btn-sm btn-sec" type="button" data-foodzone="' + (id === 'teotihuacan' ? 'teotihuacan' : id) + '">Ver dónde comer</button></p>' : '');
    var src = L.fuentes && L.fuentes.length ? '<ul class="sources">' + L.fuentes.map(function (f) { return '<li><a href="' + f[1] + '" target="_blank" rel="noopener">' + esc(f[0]) + '</a></li>'; }).join('') + '</ul>' : '';

    var body = sec('esencial', 'Lo esencial', essHtml) + sec('historia', 'Historia', hist) + sec('linea', 'Línea de tiempo', tl) +
      sec('arquitectura', isMain ? 'Arquitectura y cómo es' : 'Cómo es el lugar', arq) + sec('leyendas', 'Leyendas y tradiciones', ley) +
      sec('curiosos', 'Datos curiosos', cur) + sec('recorrido', isMain ? 'Qué no te puedes perder' : 'Qué ver', rec) +
      sec('tips', 'Tips prácticos', tips) + sec('fuentes', 'Fuentes', src);

    var slides = L.fotos.map(function (f, i) {
      return '<button class="g-slide" type="button" data-lb="' + i + '" aria-label="Ampliar foto ' + (i + 1) + ': ' + esc(f[1]) + '">' + img(f[0], f[1], { sizes: '(min-width: 960px) 900px, 100vw', eager: i === 0 }) +
        '<span class="g-credit">' + esc(credit(f[0])) + '</span></button>';
    }).join('');
    var catLabel = isMain ? DAY_OF[id] : CATS[L.cat].s;

    panel.className = 'ficha-panel f-' + color;
    panel.innerHTML =
      '<button class="f-close" type="button" data-close-ficha aria-label="Cerrar ficha"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button class="f-close f-share" type="button" data-share-ficha="' + id + '" aria-label="Compartir esta ficha"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<div class="gallery"><div class="g-track">' + slides + '</div>' +
      (L.fotos.length > 1 ? '<div class="g-dots" aria-hidden="true">' + L.fotos.map(function (f, i) { return '<i' + (i ? '' : ' class="on"') + '></i>'; }).join('') + '</div>' +
        '<button class="g-nav g-prev" type="button" aria-label="Foto anterior">‹</button><button class="g-nav g-next" type="button" aria-label="Foto siguiente">›</button>' : '') + '</div>' +
      '<div class="f-head"><div class="f-title-card"><p class="kicker">' + esc(catLabel) + '</p><h2 id="ficha-title">' + esc(L.nombre) + '</h2>' +
      (L.subtitulo ? '<p class="f-sub">' + esc(L.subtitulo) + '</p>' : '') +
      (L.resumen ? '<p class="f-resumen">' + md(L.resumen) + '</p>' : (L.dato ? '<p class="f-resumen">✨ ' + md(L.dato) + '</p>' : '')) +
      '<div class="card-meta">' + (L.horas !== undefined ? statusBadge(L.horas) : '') + (!isMain && L.coords ? '<span>' + walk(G.hotel.coords, L.coords).txt + ' desde el hotel</span>' : '') + '</div></div></div>' +
      '<div class="f-body"><nav class="f-toc" aria-label="Secciones de la ficha">' + toc.map(function (t) { return '<a href="#f-' + t[0] + '" data-toc>' + t[1] + '</a>'; }).join('') + '</nav>' + body + '</div>';

    var f = $('#ficha');
    f.hidden = false; document.body.classList.add('no-scroll');
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
    setupGallery(panel, L.fotos);
    document.title = L.nombre + ' · Guía CDMX';
  }
  function closeFicha(silent) {
    var f = $('#ficha'); if (f.hidden) return;
    if (/^#ficha=/.test(location.hash)) {
      if (fichaOpenedByUs && !silent) { fichaOpenedByUs = false; history.back(); return; }
      history.replaceState(null, '', location.pathname + location.search);
    }
    hideFicha();
  }
  function hideFicha() {
    var f = $('#ficha'); if (f.hidden) return;
    f.hidden = true; document.body.classList.remove('no-scroll');
    document.title = 'Guía CDMX · 17–19 oct 2026';
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { } }
    lastFocus = null;
  }
  function onHash() {
    var m = /^#ficha=([\w-]+)/.exec(location.hash);
    if (m) renderFicha(m[1]); else { fichaOpenedByUs = false; hideFicha(); }
  }

  /* Carrusel de la ficha */
  function setupGallery(root, fotos) {
    var track = $('.g-track', root), dots = $$('.g-dots i', root);
    if (!track) return;
    var raf = 0;
    track.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
      });
    }, { passive: true });
    var prev = $('.g-prev', root), next = $('.g-next', root);
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }); });
    $$('.g-slide', root).forEach(function (s) {
      s.addEventListener('click', function () { openLightbox(fotos, +s.getAttribute('data-lb')); });
    });
  }

  /* ───────────── Visor de fotos (lightbox) ───────────── */
  var lbFotos = [];
  function openLightbox(fotos, start) {
    lbFotos = fotos;
    var lb = $('#lightbox'), track = $('#lb-track');
    track.innerHTML = fotos.map(function (f) {
      return '<div class="lb-slide"><img src="' + IMG + f[0] + '.webp" alt="' + esc(f[1]) + '" loading="lazy" decoding="async"></div>';
    }).join('');
    lb.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () { track.scrollLeft = track.clientWidth * (start || 0); updateCap(); });
    $$('.lb-nav', lb).forEach(function (b) { b.hidden = fotos.length < 2; });
    $('.lb-close', lb).focus();
  }
  function updateCap() {
    var track = $('#lb-track'), i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    var f = lbFotos[i]; if (!f) return;
    var c = (G.creditos || {})[f[0]];
    $('#lb-cap').innerHTML = esc(f[1]) + (lbFotos.length > 1 ? ' <span style="opacity:.6">(' + (i + 1) + '/' + lbFotos.length + ')</span>' : '') +
      (c ? '<br><small>Foto: ' + esc(c.a) + ' · <a href="' + c.u + '" target="_blank" rel="noopener">' + esc(c.l) + ' · Wikimedia Commons</a></small>' : '');
  }
  function closeLightbox() {
    var lb = $('#lightbox'); if (lb.hidden) return;
    lb.hidden = true;
    if ($('#ficha').hidden) document.body.classList.remove('no-scroll');
  }

  /* ───────────── Clima (Open-Meteo) ───────────── */
  var WCODE = { 0: ['☀️', 'Despejado'], 1: ['🌤️', 'Mayormente despejado'], 2: ['⛅', 'Parcialmente nublado'], 3: ['☁️', 'Nublado'], 45: ['🌫️', 'Niebla'], 48: ['🌫️', 'Niebla'],
    51: ['🌦️', 'Llovizna'], 53: ['🌦️', 'Llovizna'], 55: ['🌧️', 'Llovizna intensa'], 61: ['🌦️', 'Lluvia ligera'], 63: ['🌧️', 'Lluvia'], 65: ['🌧️', 'Lluvia fuerte'],
    80: ['🌦️', 'Chubascos'], 81: ['🌧️', 'Chubascos'], 82: ['⛈️', 'Chubascos fuertes'], 95: ['⛈️', 'Tormenta'], 96: ['⛈️', 'Tormenta con granizo'], 99: ['⛈️', 'Tormenta con granizo'] };
  function wc(c) { return WCODE[c] || WCODE[Math.floor(c / 10) * 10] || ['🌡️', '']; }
  var LOCS = [{ n: 'CDMX', lat: 19.43, lon: -99.13 }, { n: 'Teotihuacán', lat: 19.69, lon: -98.84 }];
  var wLoc = 0;
  function renderWeather() {
    var box = $('#weather');
    var wear = '<div class="w-card"><h3 style="font-size:1.1rem">Qué ponerse</h3><div class="w-wear">' +
      '<div>🧥 <b>Mañana:</b> fresco, chamarra o sudadera.</div><div>👕 <b>Mediodía:</b> templado; en Teotihuacán, sol fuerte: gorra y bloqueador.</div>' +
      '<div>☔ <b>Tarde:</b> probable lluvia: impermeable o paraguas.</div><div>👟 <b>Siempre:</b> calzado cómodo y cerrado.</div></div></div>';
    var cached = store.get('guia-clima', null);
    box.innerHTML = '<div class="w-card" id="w-live"><p class="small-note">Cargando pronóstico…</p></div>' + wear;
    if (cached) drawWeather(cached, true);
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + LOCS.map(function (l) { return l.lat; }).join(',') + '&longitude=' + LOCS.map(function (l) { return l.lon; }).join(',') +
      '&hourly=temperature_2m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code' +
      '&timezone=America%2FMexico_City&start_date=2026-10-17&end_date=2026-10-18';
    if (!navigator.onLine && !cached) return staticWeather();
    fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (j) {
      var data = { t: Date.now(), locs: Array.isArray(j) ? j : [j] };
      if (!data.locs[0] || !data.locs[0].hourly) throw new Error('sin datos');
      store.set('guia-clima', data);
      drawWeather(data, false);
    }).catch(function () { if (!cached) staticWeather(); });
  }
  function drawWeather(data, fromCache) {
    var live = $('#w-live'); if (!live) return;
    var loc = data.locs[wLoc] || data.locs[0];
    var days = ['2026-10-17', '2026-10-18'], names = ['Sábado 17', 'Domingo 18'];
    var html = '<div class="chips w-loc" role="group" aria-label="Lugar">' + LOCS.map(function (l, i) {
      return data.locs[i] ? '<button class="chip" type="button" data-wloc="' + i + '" aria-pressed="' + (i === wLoc) + '">' + l.n + '</button>' : '';
    }).join('') + '</div>';
    days.forEach(function (day, di) {
      var dIdx = loc.daily.time.indexOf(day);
      var head = dIdx >= 0 ? wc(loc.daily.weather_code[dIdx])[0] + ' ' + Math.round(loc.daily.temperature_2m_min[dIdx]) + '° / ' + Math.round(loc.daily.temperature_2m_max[dIdx]) + '° · lluvia hasta ' + (loc.daily.precipitation_probability_max[dIdx] == null ? '–' : loc.daily.precipitation_probability_max[dIdx] + ' %') : '';
      var hours = '';
      loc.hourly.time.forEach(function (t, i) {
        if (t.indexOf(day) !== 0) return;
        var h = +t.slice(11, 13); if (h < 6) return;
        var p = loc.hourly.precipitation_probability[i];
        hours += '<div class="w-h' + (p >= 50 ? ' rain-hi' : '') + '"><span>' + t.slice(11, 16) + '</span><span class="w-ico" title="' + wc(loc.hourly.weather_code[i])[1] + '">' + wc(loc.hourly.weather_code[i])[0] + '</span><b>' + Math.round(loc.hourly.temperature_2m[i]) + '°</b><span class="w-rain">💧' + (p == null ? '–' : p + '%') + '</span></div>';
      });
      html += '<div class="w-day"><h3>' + names[di] + ' <small>' + head + '</small></h3><div class="w-strip">' + (hours || '<p class="small-note">Sin datos por hora todavía.</p>') + '</div></div>';
    });
    var ago = Math.round((Date.now() - data.t) / 60000);
    html += '<p class="small-note" style="margin:6px 0 0">Fuente: Open-Meteo · ' + (fromCache ? 'guardado hace ' + dur(ago * 60000) + ' (sin conexión se muestra lo último guardado)' : 'actualizado ahora') + '.</p>';
    live.innerHTML = html;
    rainAlert(data);
    $$('[data-wloc]', live).forEach(function (b) { b.addEventListener('click', function () { wLoc = +b.getAttribute('data-wloc'); drawWeather(data, fromCache); }); });
  }
  function staticWeather() {
    var live = $('#w-live'); if (!live) return;
    live.innerHTML = '<div class="w-static"><h3 style="font-size:1.1rem;margin:0">🌦️ Pronóstico general (sin conexión)</h3><p style="margin:0">' + md(G.climaRespaldo.texto) + '</p><p class="small-note" style="margin:0">' + md(G.climaRespaldo.consejo) + '</p></div>';
  }

  /* ───────────── Checklist ───────────── */
  function renderChecklist() {
    var saved = store.get('guia-check', {});
    var total = 0;
    var html = '<div class="check-top"><p id="check-count"></p><button class="btn btn-sm btn-sec" type="button" id="check-reset">Reiniciar</button></div>' +
      '<div class="progress" role="progressbar" aria-label="Progreso de la maleta" aria-valuemin="0" aria-valuemax="100" id="check-bar"><span></span></div>';
    G.checklist.forEach(function (g, gi) {
      html += '<h3>' + esc(g.grupo) + '</h3><ul>' + g.items.map(function (it, ii) {
        var k = gi + '-' + ii; total++;
        return '<li><label><input type="checkbox" data-k="' + k + '"' + (saved[k] ? ' checked' : '') + '><span>' + esc(it) + '</span></label></li>';
      }).join('') + '</ul>';
    });
    var box = $('#check-box'); box.innerHTML = html;
    function update() {
      var done = $$('input[type=checkbox]', box).filter(function (c) { return c.checked; }).length;
      var pct = Math.round(done / total * 100);
      $('#check-count').textContent = done === total ? '¡Listo para viajar! 🎉 ' + done + '/' + total : done + ' de ' + total + ' listos';
      $('#check-bar span').style.width = pct + '%';
      $('#check-bar').setAttribute('aria-valuenow', pct);
    }
    box.addEventListener('change', function (e) {
      var c = e.target; if (!c.matches('input[type=checkbox]')) return;
      var s = store.get('guia-check', {}); if (c.checked) s[c.getAttribute('data-k')] = 1; else delete s[c.getAttribute('data-k')];
      store.set('guia-check', s); update();
    });
    $('#check-reset').addEventListener('click', function () {
      if (!confirm('¿Desmarcar toda la lista?')) return;
      store.set('guia-check', {}); $$('input[type=checkbox]', box).forEach(function (c) { c.checked = false; }); update();
    });
    update();
  }

  /* ───────────── Recomendaciones y contactos ───────────── */
  function renderReco() {
    var R = G.recomendaciones;
    $('#reco-box').innerHTML = '<div class="reco-orig reveal"><h3>📋 Del itinerario original</h3><ul>' + R.originales.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="reco-grid">' + R.extra.map(function (r) { return '<div class="reco reveal"><span class="ri" aria-hidden="true">' + r[0] + '</span><div><h3>' + esc(r[1]) + '</h3><p>' + md(r[2]) + '</p></div></div>'; }).join('') + '</div>';
  }
  function renderContacts() {
    var mine = store.get('guia-contactos', {});
    var html = '<div class="contacts">' + G.contactos.map(function (c, i) {
      return '<div class="contact' + (i === 0 ? ' sos' : '') + '"><div><b>' + esc(c.nombre) + '</b><span class="tel">' + esc(c.tel) + '</span>' + (c.nota ? '<small>' + esc(c.nota) + '</small>' : '') + '</div>' +
        '<a class="call" href="tel:' + c.tel.replace(/\s/g, '') + '" aria-label="Llamar a ' + esc(c.nombre) + '">📞</a></div>';
    }).join('') + '</div>';
    var fields = [['guia', 'Guía del tour'], ['coord', 'Coordinador(a)'], ['emerg', 'Contacto de emergencia']];
    html += '<div class="editable"><h3>✏️ Mis contactos del viaje</h3><p class="small-note" style="margin:0">Escríbanlos aquí; se guardan solo en este teléfono.</p>' +
      fields.map(function (f) {
        var v = mine[f[0]] || {};
        return '<div class="field"><label for="c-' + f[0] + '-n">' + f[1] + '</label><div class="field-row">' +
          '<input type="text" id="c-' + f[0] + '-n" data-c="' + f[0] + '" data-p="n" placeholder="Nombre" value="' + esc(v.n || '') + '" autocomplete="off">' +
          '<input type="tel" id="c-' + f[0] + '-t" data-c="' + f[0] + '" data-p="t" placeholder="Teléfono" value="' + esc(v.t || '') + '" inputmode="tel" autocomplete="off" aria-label="Teléfono de ' + f[1] + '"></div>' +
          '<a class="btn btn-sm btn-sec call-mine" data-call="' + f[0] + '" href="#"' + (v.t ? '' : ' hidden') + '>📞 Llamar</a></div>';
      }).join('') + '</div>';
    var box = $('#contact-box'); box.innerHTML = html;
    function sync(key) {
      var c = store.get('guia-contactos', {})[key] || {};
      var a = $('[data-call="' + key + '"]', box);
      if (a) { a.hidden = !c.t; a.href = 'tel:' + (c.t || '').replace(/[^\d+]/g, ''); a.textContent = '📞 Llamar' + (c.n ? ' a ' + c.n : ''); }
    }
    box.addEventListener('input', function (e) {
      var i = e.target; if (!i.hasAttribute('data-c')) return;
      var s = store.get('guia-contactos', {}); var k = i.getAttribute('data-c');
      s[k] = s[k] || {}; s[k][i.getAttribute('data-p')] = i.value.trim(); store.set('guia-contactos', s); sync(k);
    });
    fields.forEach(function (f) { sync(f[0]); });
  }

  /* ───────────── Offline y créditos ───────────── */
  function allImages() {
    var names = Object.keys(G.creditos || {});
    var out = [];
    names.forEach(function (n) { out.push(IMG + n + '-sm.webp', IMG + n + '.webp'); });
    return out;
  }
  function renderOffline() {
    var box = $('#offline-box');
    var file = location.protocol === 'file:';
    box.innerHTML = '<p class="offline-status" id="off-status">' + (file ? '📂 Abierto como archivo local' : ('serviceWorker' in navigator ? '⏳ Preparando modo sin internet…' : '⚠️ Este navegador no permite modo sin internet')) + '</p>' +
      '<p class="small-note">' + (file ? 'El modo sin internet funciona cuando la guía se abre desde GitHub Pages (https). Abierta como archivo, todo lo demás funciona igual.' :
        'Al abrirla con internet, la guía se guarda en el teléfono. Para tener también todas las fotos de las fichas sin señal, toquen el botón (≈ 17 MB, mejor con Wi-Fi).') + '</p>' +
      (file ? '' : '<div class="btn-row"><button class="btn btn-azul" type="button" id="btn-offline">📥 Guardar todas las fotos</button></div><p class="small-note" id="off-progress" style="margin:0"></p>') +
      '<p class="small-note" style="margin:0">💡 Tip: en el menú del navegador elijan <b>“Agregar a pantalla de inicio”</b> para abrirla como app.</p>';
    var btn = $('#btn-offline');
    if (btn) btn.addEventListener('click', function () {
      if (!('caches' in window)) { toast('Este navegador no permite guardar fotos'); return; }
      var list = allImages(), done = 0, fail = 0, prog = $('#off-progress');
      btn.disabled = true;
      caches.open('guia-img-v1').then(function (cache) {
        var i = 0;
        function nextBatch() {
          var batch = list.slice(i, i + 6); i += 6;
          if (!batch.length) {
            btn.disabled = false;
            prog.textContent = fail ? 'Listo con ' + fail + ' fotos pendientes (revisen la conexión y vuelvan a intentar).' : '✅ ¡Todas las fotos guardadas! (' + done + ')';
            store.set('guia-fotos-ok', !fail); return;
          }
          return Promise.all(batch.map(function (u) {
            return cache.match(u).then(function (hit) { return hit || cache.add(u); }).then(function () { done++; }, function () { fail++; });
          })).then(function () { prog.textContent = 'Guardando… ' + Math.round((done + fail) / list.length * 100) + ' %'; return nextBatch(); });
        }
        return nextBatch();
      }).catch(function () { btn.disabled = false; toast('No se pudieron guardar las fotos'); });
    });
    if (store.get('guia-fotos-ok', false) && $('#off-progress')) $('#off-progress').textContent = '✅ Fotos guardadas en este teléfono.';
    // créditos
    var C = G.creditos || {};
    $('#credit-list').innerHTML = Object.keys(C).sort().map(function (k) {
      var c = C[k];
      return '<li><b>' + esc(k) + '</b>: ' + esc(c.a) + ' · <a href="' + c.u + '" target="_blank" rel="noopener">' + esc(c.l) + '</a>' + (c.lu ? ' (<a href="' + c.lu + '" target="_blank" rel="noopener">licencia</a>)' : '') + '</li>';
    }).join('') + '<li>Mapas: © colaboradores de OpenStreetMap. Clima: Open-Meteo.</li>';
  }
  function registerSW() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      var st = $('#off-status');
      function ready() { if (st) st.innerHTML = '✅ Guía guardada para usar sin internet'; }
      if (reg.active) ready();
      navigator.serviceWorker.ready.then(ready);
      // Guarda en segundo plano las fotos pequeñas de las tarjetas
      navigator.serviceWorker.ready.then(function (r) {
        var idle = window.requestIdleCallback || function (f) { setTimeout(f, 2500); };
        idle(function () {
          var sm = Object.keys(G.creditos || {}).map(function (n) { return IMG + n + '-sm.webp'; });
          if (r.active) r.active.postMessage({ type: 'precache-sm', urls: sm });
        });
      });
    }).catch(function () {
      var st = $('#off-status'); if (st) st.textContent = '⚠️ No se pudo activar el modo sin internet';
    });
  }

  /* ───────────── Plan B si llueve ───────────── */
  function findVenue(id) { return VENUES.filter(function (v) { return v.id === id; })[0]; }
  function routeHTML(paradas) {
    return paradas.map(function (p) {
      var link = p.id ? ' <button class="link-btn" type="button" data-goto="' + p.id + '">ficha</button>' :
        p.comida ? ' <button class="link-btn" type="button" data-venue="' + p.comida + '">ver</button>' :
        p.pb ? ' <button class="link-btn" type="button" data-pb="' + p.pb + '">ver</button>' : '';
      return '<li><time>' + p.hora + '</time><span>' + md(p.txt) + link + '</span></li>';
    }).join('');
  }
  function renderPlanB() {
    var P = G.planB; if (!P) return;
    $('#pb-intro').textContent = P.intro;
    $('#pb-grid').innerHTML = P.techados.map(function (o) {
      var x, media, title, meta, body, foot, id;
      if (o.ref) {
        x = G.cercanos[o.ref]; id = o.ref;
        media = '<button class="card-img" type="button" data-goto="' + o.ref + '" aria-label="Abrir ficha de ' + esc(x.nombre) + '">' + img(x.fotos[0][0], x.fotos[0][1]) + statusBadge(x.horas) + '</button>';
        title = x.nombre; meta = CATS[x.cat].s + ' · ' + walk(G.hotel.coords, x.coords).txt;
        body = '<p class="kv"><b>Horario:</b> ' + md(x.horario) + '</p><p class="kv"><b>Costo:</b> ' + md(x.costo) + '</p>';
        foot = '<button class="btn btn-sm" type="button" data-goto="' + o.ref + '">Ver ficha</button><a class="btn btn-sm btn-sec" href="' + mapsSearch(x.maps) + '" target="_blank" rel="noopener">Google Maps</a>';
      } else if (o.venue) {
        x = findVenue(o.venue); id = o.venue;
        media = x.foto ? '<div class="card-img">' + img(x.foto, x.nombre) + statusBadge(x.horas) + '</div>' : '<div class="card-img card-ico"><span aria-hidden="true">' + (x.icono || '🍽️') + '</span>' + statusBadge(x.horas) + '</div>';
        title = x.nombre; meta = TIPOS[x.tipo] + ' · ' + walk(G.hotel.coords, x.coords).txt;
        body = '<p class="kv"><b>Horario:</b> ' + md(x.horario) + '</p>';
        foot = '<button class="btn btn-sm" type="button" data-venue="' + o.venue + '">Ver en Comida</button><a class="btn btn-sm btn-sec" href="' + mapsSearch(x.maps) + '" target="_blank" rel="noopener">Google Maps</a>';
      } else if (o.ref2) {
        x = G.compras.cerca.filter(function (c) { return c.id === o.ref2; })[0]; id = o.ref2;
        media = '<div class="card-img">' + img(x.foto, x.nombre) + statusBadge(x.horas) + '</div>';
        title = x.nombre; meta = x.tipo + ' · ' + walk(G.hotel.coords, x.coords).txt;
        body = '<p class="kv"><b>Horario:</b> ' + md(x.horario) + '</p>';
        foot = '<button class="btn btn-sm" type="button" data-shop="' + o.ref2 + '">Ver en Compras</button><a class="btn btn-sm btn-sec" href="' + mapsSearch(x.maps) + '" target="_blank" rel="noopener">Google Maps</a>';
      } else {
        x = o; id = o.id;
        media = o.foto ? '<div class="card-img">' + img(o.foto, o.nombre) + (o.horas !== undefined ? statusBadge(o.horas) : '') + '</div>' :
          '<div class="card-img card-ico"><span aria-hidden="true">' + (o.icono || '☔') + '</span>' + (o.horas !== undefined ? statusBadge(o.horas) : '') + '</div>';
        title = o.nombre; meta = o.tipo + (o.coords ? ' · ' + walk(G.hotel.coords, o.coords).txt : '');
        body = (o.horario ? '<p class="kv"><b>Horario:</b> ' + md(o.horario) + '</p>' : '') + (o.costo ? '<p class="kv"><b>Costo:</b> ' + md(o.costo) + '</p>' : '') + '<p class="card-txt">' + md(o.txt) + '</p>';
        foot = (o.maps ? '<a class="btn btn-sm" href="' + mapsSearch(o.maps) + '" target="_blank" rel="noopener">Google Maps</a>' : '') +
          (o.links || []).map(function (l) { return '<a class="btn btn-sm btn-sec" href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>'; }).join('') +
          (o.fuente ? '<a class="link-btn" style="font-size:.8rem" href="' + o.fuente[1] + '" target="_blank" rel="noopener">Fuente</a>' : '');
      }
      return '<article class="card reveal" id="pb-' + id + '">' + media + '<div class="card-body"><div class="card-meta"><span class="badge badge-techo">☂️ Techado</span><span>' + esc(meta) + '</span></div>' +
        '<h3>' + esc(title) + '</h3>' + body + (o.nota ? '<p class="card-dato pb-nota">' + md(o.nota) + '</p>' : '') + '<div class="card-foot">' + foot + '</div></div></article>';
    }).join('');
    $('#pb-ruta-titulo').textContent = P.ruta.titulo;
    $('#pb-ruta-dur').textContent = P.ruta.duracion;
    $('#pb-ruta-lista').innerHTML = routeHTML(P.ruta.paradas);
    $('#pb-lugares').innerHTML = P.porLugar.map(function (l) {
      var L = G.lugares[l.lugar];
      return '<article class="pb-place reveal c-' + L.color + '"><div class="pb-place-head"><span class="pb-ico" aria-hidden="true">' + l.icono + '</span><h4>' + esc(l.titulo) + '</h4>' +
        '<button class="link-btn" type="button" data-goto="' + l.lugar + '">ficha</button></div><ul>' + l.txt.map(function (t) { return '<li>' + md(t) + '</li>'; }).join('') + '</ul>' +
        (l.fuente ? '<p class="small-note" style="margin:6px 0 0">Fuente: <a href="' + l.fuente[1] + '" target="_blank" rel="noopener">' + esc(l.fuente[0]) + '</a></p>' : '') + '</article>';
    }).join('');
    $('#pb-tips').innerHTML = P.tips.map(function (r) { return '<div class="reco reveal"><span class="ri" aria-hidden="true">' + r[0] + '</span><div><h3>' + esc(r[1]) + '</h3><p>' + md(r[2]) + '</p></div></div>'; }).join('');
  }

  /* Aviso de lluvia en la portada (Open-Meteo) */
  var fmtYMD = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  function rainAlert(data) {
    var el = $('#rain-alert'); if (!el || !data || !data.locs || !data.locs[0]) return;
    var t = now(), today = fmtYMD.format(t);
    var base = data.locs[0];
    var day = base.hourly.time.some(function (x) { return x.indexOf(today) === 0; }) ? today : (t < llegada ? '2026-10-17' : null);
    if (!day) { el.hidden = true; return; }
    // El domingo por la tarde el grupo está en Teotihuacán
    var useTeo = day === '2026-10-18' && data.locs[1];
    var L = useTeo ? data.locs[1] : base, max = 0, hourMax = '';
    L.hourly.time.forEach(function (x, i) {
      if (x.indexOf(day) !== 0) return;
      var h = +x.slice(11, 13), p = L.hourly.precipitation_probability[i];
      if (h >= 13 && h <= 20 && p != null && p > max) { max = p; hourMax = x.slice(11, 16); }
    });
    if (max < (G.planB ? G.planB.umbral : 50)) { el.hidden = true; return; }
    var when = day === today ? 'esta tarde' : 'el sábado por la tarde';
    el.innerHTML = '<span class="ra-ico" aria-hidden="true">🌧️</span><span class="ra-txt"><b>Probabilidad de lluvia de ' + max + ' % ' + when + '</b>' +
      '<small>' + (useTeo ? 'Teotihuacán' : 'Ciudad de México') + ' · máximo hacia las ' + hourMax + ' · Open-Meteo</small></span>' +
      '<a class="btn btn-sm btn-azul" href="#planb">Ver Plan B</a>';
    el.hidden = false;
  }

  /* ───────────── Eventos del fin de semana ───────────── */
  function renderEventos() {
    var E = G.eventos; if (!E) return;
    $('#ev-nota').textContent = E.nota;
    var avisos = E.lista.filter(function (e) { return e.tipo === 'aviso'; });
    var evs = E.lista.filter(function (e) { return e.tipo !== 'aviso'; });
    function fuentes(e) { return '<p class="small-note ev-src">Fuente' + (e.fuentes.length > 1 ? 's' : '') + ': ' + e.fuentes.map(function (f) { return '<a href="' + f[1] + '" target="_blank" rel="noopener">' + esc(f[0]) + '</a>'; }).join(' · ') + '</p>'; }
    function dist(e) { return e.coords ? walk(G.hotel.coords, e.coords).txt + ' del hotel' : ''; }
    $('#ev-avisos').innerHTML = avisos.map(function (e) {
      return '<article class="ev-aviso reveal" id="ev-' + e.id + '"><div class="ev-aviso-head"><span aria-hidden="true">⚠️</span><div><span class="badge badge-aviso">Aviso · ' + (e.dia === 'sab' ? 'Sáb 17' : 'Dom 18') + '</span><h3>' + esc(e.nombre) + '</h3></div></div>' +
        '<p class="kv"><b>Cuándo:</b> ' + esc(e.cuando) + '</p><p class="kv"><b>Dónde:</b> ' + esc(e.lugar) + '</p><p class="card-txt">' + md(e.desc) + '</p>' + fuentes(e) +
        '<div class="card-foot"><button class="btn btn-sm btn-sec" type="button" data-mapfilter="eventos">🗺️ Ver en el mapa</button></div></article>';
    }).join('');
    $('#ev-grid').innerHTML = evs.map(function (e) {
      var dia = e.dia === 'sab' ? 'Sáb 17' : e.dia === 'dom' ? 'Dom 18' : 'Sáb y dom';
      return '<article class="card ev-card reveal" id="ev-' + e.id + '">' +
        (e.foto ? '<button class="card-img" type="button" data-lb-single="' + e.foto + '" data-alt="' + esc(e.nombre) + '" aria-label="Ampliar foto de ' + esc(e.nombre) + '">' + img(e.foto, e.nombre) + '<span class="badge ev-day">' + dia + '</span></button>' : '') +
        '<div class="card-body"><div class="card-meta">' + (e.oficial ? '<span class="badge badge-open">Fuente oficial</span>' : '<span class="badge badge-aprox">Confirmar</span>') + '<span>' + esc(dist(e)) + '</span></div>' +
        '<h3>' + esc(e.nombre) + '</h3><p class="kv"><b>Cuándo:</b> ' + esc(e.cuando) + '</p><p class="kv"><b>Dónde:</b> ' + esc(e.lugar) + '</p><p class="kv"><b>Costo:</b> ' + esc(e.costo) + '</p>' +
        '<p class="card-txt">' + md(e.desc) + '</p>' + fuentes(e) +
        '<div class="card-foot"><button class="btn btn-sm" type="button" data-mapfilter="eventos">Ver en el mapa</button>' +
        (e.coords ? '<a class="btn btn-sm btn-sec" href="' + mapsSearch(e.lugar.split('→')[0].split('(')[0].trim() + ', Ciudad de México') + '" target="_blank" rel="noopener">Google Maps</a>' : '') + '</div></div></article>';
    }).join('');
    $('#ev-carteleras').innerHTML = '<h3>📅 Carteleras oficiales para revisar el mismo día</h3><ul>' + E.carteleras.map(function (c) { return '<li><a href="' + c[1] + '" target="_blank" rel="noopener">' + esc(c[0]) + '</a></li>'; }).join('') + '</ul>';
  }
  function showCard(id) {
    var el = document.getElementById(id); if (!el) return;
    el.classList.add('is-in');
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    if (el.animate) el.animate([{ boxShadow: '0 0 0 0 rgba(228,0,124,0)' }, { boxShadow: '0 0 0 6px rgba(228,0,124,.45)' }, { boxShadow: '0 0 0 0 rgba(228,0,124,0)' }], { duration: 1600 });
  }

  /* ───────────── Compras y recuerdos ───────────── */
  var shopTabs;
  function renderCompras() {
    var C = G.compras; if (!C) return;
    $('#co-nota').textContent = C.precioNota;
    $('#co-lugares').innerHTML = C.porLugar.map(function (p) {
      var L = G.lugares[p.lugar];
      return '<article class="pb-place reveal c-' + L.color + '"><div class="pb-place-head"><span class="pb-ico" aria-hidden="true">' + p.icono + '</span><h4>' + esc(p.titulo) + '</h4>' +
        '<button class="link-btn" type="button" data-goto="' + p.lugar + '">ficha</button></div>' +
        '<table class="shop-table"><tbody>' + p.items.map(function (i) { return '<tr><td>' + esc(i[0]) + '</td><td class="price">' + esc(i[1]) + '</td></tr>'; }).join('') + '</tbody></table>' +
        '<p class="kv"><b>Dónde:</b> ' + md(p.donde) + '</p><p class="card-dato">' + md(p.tip) + '</p></article>';
    }).join('');
    $('#co-cerca').innerHTML = C.cerca.map(function (x) {
      var fotos = x.fotos || [[x.foto, x.nombre]];
      return '<article class="card reveal" id="co-' + x.id + '">' +
        '<button class="card-img" type="button" data-lb-gal="' + x.id + '" aria-label="Ampliar fotos de ' + esc(x.nombre) + '">' + img(fotos[0][0], fotos[0][1]) + statusBadge(x.horas) + '</button>' +
        '<div class="card-body"><div class="card-meta"><span class="badge">' + esc(x.tipo) + '</span><span>' + walk(G.hotel.coords, x.coords).txt + '</span></div>' +
        '<h3>' + esc(x.nombre) + '</h3><p class="kv"><b>Qué comprar:</b> ' + md(x.comprar) + '</p><p class="kv"><b>Horario:</b> ' + md(x.horario) + '</p><p class="kv"><b>Dirección:</b> ' + esc(x.direccion) + '</p>' +
        (x.historia ? '<p class="card-txt dish-hist">' + md(x.historia) + '</p>' : '') +
        ((x.tags || []).length ? '<div class="card-meta">' + x.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
        '<div class="card-foot"><a class="btn btn-sm" href="' + mapsSearch(x.maps) + '" target="_blank" rel="noopener">Google Maps</a>' +
        (x.ref ? '<button class="btn btn-sm btn-sec" type="button" data-goto="' + x.ref + '">Ver museo</button>' : '') +
        (x.venue ? '<button class="btn btn-sm btn-sec" type="button" data-venue="' + x.venue + '">Ver en Comida</button>' : '') +
        (x.fuente ? '<a class="link-btn" style="font-size:.8rem" href="' + x.fuente[1] + '" target="_blank" rel="noopener">Fuente</a>' : '') + '</div></div></article>';
    }).join('');
    $$('#co-cerca [data-lb-gal]').forEach(function (b) {
      var x = C.cerca.filter(function (c) { return c.id === b.getAttribute('data-lb-gal'); })[0];
      b.addEventListener('click', function () { openLightbox(x.fotos || [[x.foto, x.nombre]], 0); });
    });
    $('#co-arte').innerHTML = C.artesanias.map(function (a) {
      return '<article class="card dish reveal" id="art-' + a.id + '">' +
        (a.foto ? '<button class="card-img" type="button" data-lb-single="' + a.foto + '" data-alt="' + esc(a.nombre) + '" aria-label="Ampliar foto de ' + esc(a.nombre) + '">' + img(a.foto, a.nombre) + '</button>' :
          '<div class="card-img card-ico"><span aria-hidden="true">' + a.icono + '</span></div>') +
        '<div class="card-body"><h3>' + esc(a.nombre) + '</h3><div class="card-meta"><span>📍 ' + esc(a.origen) + '</span></div>' +
        '<p class="card-txt">' + md(a.txt) + '</p><p class="card-dato">' + md(a.tip) + '</p></div></article>';
    }).join('');
    $('#co-tips').innerHTML = C.tips.map(function (r) { return '<div class="reco reveal"><span class="ri" aria-hidden="true">' + r[0] + '</span><div><h3>' + esc(r[1]) + '</h3><p>' + md(r[2]) + '</p></div></div>'; }).join('');
    renderRecuerdos();
  }

  /* Lista de recuerdos (localStorage) */
  function renderRecuerdos() {
    var box = $('#rec-box');
    box.innerHTML = '<div class="check-top"><p id="rec-count"></p><button class="btn btn-sm btn-sec" type="button" id="rec-clear">Borrar comprados</button></div>' +
      '<div class="progress" role="progressbar" aria-label="Recuerdos comprados" aria-valuemin="0" aria-valuemax="100" id="rec-bar"><span></span></div>' +
      '<p class="small-note" id="rec-money" style="margin:4px 0 0"></p>' +
      '<form class="rec-form" id="rec-form" autocomplete="off"><div class="field"><label for="rec-para">¿Para quién?</label><input type="text" id="rec-para" placeholder="Ej. Mamá" maxlength="40"></div>' +
      '<div class="field"><label for="rec-que">¿Qué?</label><input type="text" id="rec-que" placeholder="Ej. Rosario o alegrías" maxlength="80" required></div>' +
      '<div class="field"><label for="rec-pres">Presupuesto ($, opcional)</label><input type="tel" id="rec-pres" inputmode="numeric" placeholder="Ej. 150" maxlength="7"></div>' +
      '<button class="btn" type="submit">＋ Agregar</button></form><ul class="rec-list" id="rec-list"></ul>';
    function load() { var l = store.get('guia-recuerdos', []); return Array.isArray(l) ? l : []; }
    function draw() {
      var list = load(), done = list.filter(function (r) { return r.ok; }).length;
      var total = list.reduce(function (s, r) { return s + (+r.p || 0); }, 0);
      var spent = list.reduce(function (s, r) { return s + (r.ok ? (+r.p || 0) : 0); }, 0);
      $('#rec-count').textContent = list.length ? done + ' de ' + list.length + ' comprados' : 'Aún no hay recuerdos en la lista';
      var pct = list.length ? Math.round(done / list.length * 100) : 0;
      $('#rec-bar span').style.width = pct + '%'; $('#rec-bar').setAttribute('aria-valuenow', pct);
      $('#rec-money').textContent = total ? 'Presupuesto: $' + total.toLocaleString('es-MX') + ' · ya comprado: $' + spent.toLocaleString('es-MX') : '';
      $('#rec-list').innerHTML = list.length ? list.map(function (r, i) {
        return '<li><label><input type="checkbox" data-i="' + i + '"' + (r.ok ? ' checked' : '') + '><span><b>' + esc(r.q) + '</b>' + (r.para ? ' <small>para ' + esc(r.para) + '</small>' : '') + (r.p ? ' <small class="price">$' + esc(r.p) + '</small>' : '') + '</span></label>' +
          '<button class="icon-btn rec-del" type="button" data-del="' + i + '" aria-label="Quitar ' + esc(r.q) + '">✕</button></li>';
      }).join('') : '<li class="empty">Ideas: rosario de la Basílica, alegrías de Xochimilco, obsidiana de Teotihuacán, dulces de la Dulcería de Celaya.</li>';
    }
    $('#rec-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#rec-que').value.trim(); if (!q) return;
      var list = load(); list.push({ para: $('#rec-para').value.trim(), q: q, p: $('#rec-pres').value.replace(/[^\d]/g, ''), ok: false });
      store.set('guia-recuerdos', list); $('#rec-que').value = ''; $('#rec-pres').value = ''; $('#rec-que').focus(); draw();
    });
    box.addEventListener('change', function (e) {
      var c = e.target; if (!c.hasAttribute('data-i')) return;
      var list = load(); if (list[+c.getAttribute('data-i')]) list[+c.getAttribute('data-i')].ok = c.checked; store.set('guia-recuerdos', list); draw();
    });
    box.addEventListener('click', function (e) {
      var d = e.target.closest('[data-del]');
      if (d) { var list = load(); list.splice(+d.getAttribute('data-del'), 1); store.set('guia-recuerdos', list); draw(); return; }
      if (e.target.id === 'rec-clear') { store.set('guia-recuerdos', load().filter(function (r) { return !r.ok; })); draw(); }
    });
    draw();
  }

  /* ───────────── Tema, compartir, navegación ───────────── */
  function initTheme() {
    $('#btn-theme').addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var sysDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = cur ? cur === 'dark' : sysDark;
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('guia-tema', next); } catch (e) { }
      toast(next === 'dark' ? 'Modo oscuro' : 'Modo claro');
    });
  }
  function share(id) {
    var base = location.href.split('#')[0].replace(/[?&]ahora=[^&]*/, '');
    var L = id && (G.lugares[id] || G.cercanos[id]);
    var data = { title: L ? L.nombre + ' · Guía CDMX' : 'Guía del viaje a la CDMX', text: L ? (L.subtitulo || L.dato || '') : 'Itinerario, lugares, comida y mapa del viaje (17–19 oct 2026)', url: base + (id ? '#ficha=' + id : '') };
    if (navigator.share) { navigator.share(data).catch(function () { }); return; }
    var done = function () { toast('Enlace copiado'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(data.url).then(done, function () { prompt('Copia el enlace:', data.url); });
    else prompt('Copia el enlace:', data.url);
  }
  function initSheet() {
    var sheet = $('#mas-sheet');
    $('#btn-mas').addEventListener('click', function () { sheet.hidden = false; var a = $('.sheet-grid a', sheet); if (a) a.focus(); });
    sheet.addEventListener('click', function (e) {
      var c = e.target.closest('[data-close]'); if (!c) return;
      sheet.hidden = true;
      if (c.hasAttribute('data-share')) share();
    });
  }
  function initNavSpy() {
    if (!('IntersectionObserver' in window)) return;
    var map = { inicio: 'inicio', itinerario: 'itinerario', lugares: 'lugares', cerca: 'lugares', hotel: 'mas', comida: 'comida', planb: 'mas', eventos: 'mas', compras: 'mas', clima: 'mas', checklist: 'mas', recomendaciones: 'mas', contactos: 'mas', creditos: 'mas' };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id, key = map[id];
        $$('.bottomnav [data-nav], #btn-mas').forEach(function (a) { a.classList.toggle('is-active', (a.getAttribute('data-nav') || 'mas') === key); });
        $$('.topnav a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* Barra superior transparente mientras se ve la portada */
  function initTopbar() {
    var bar = $('#topbar'), hero = $('#inicio');
    function upd() { bar.classList.toggle('on-hero', window.scrollY < hero.offsetHeight - bar.offsetHeight - 40); }
    window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  }

  /* Aparición al hacer scroll */
  var revealIO = ('IntersectionObserver' in window && !reduceMotion) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function observeReveal() {
    $$('.reveal:not(.is-in)').forEach(function (el) { if (revealIO) revealIO.observe(el); else el.classList.add('is-in'); });
  }
  function lazyInit(el, fn) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); fn(); } }, { rootMargin: '400px' });
    io.observe(el);
  }

  /* Delegación de clics global */
  function initClicks() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-goto],[data-goto-day],[data-venue],[data-foodzone],[data-close-ficha],[data-share-ficha],[data-lb-single],[data-close-lb],#btn-share,[data-toc],[data-event],[data-mapfilter],[data-pb],[data-shop]');
      if (!t) return;
      if (t.hasAttribute('data-event')) { closeFicha(true); return showCard('ev-' + t.getAttribute('data-event')); }
      if (t.hasAttribute('data-pb')) { closeFicha(true); return showCard('pb-' + t.getAttribute('data-pb')); }
      if (t.hasAttribute('data-shop')) { closeFicha(true); var sb = document.getElementById('ct-cerca'); if (sb && shopTabs && shopTabs._select) shopTabs._select(sb); return showCard('co-' + t.getAttribute('data-shop')); }
      if (t.hasAttribute('data-mapfilter')) { closeFicha(true); setCercaFilter(t.getAttribute('data-mapfilter')); return scrollToId('cerca'); }
      if (t.hasAttribute('data-toc')) {
        e.preventDefault();
        var target = $(t.getAttribute('href'), $('#ficha-panel'));
        if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (t.id === 'btn-share') return share();
      if (t.hasAttribute('data-close-ficha')) return closeFicha();
      if (t.hasAttribute('data-close-lb')) return closeLightbox();
      if (t.hasAttribute('data-share-ficha')) return share(t.getAttribute('data-share-ficha'));
      if (t.hasAttribute('data-lb-single')) return openLightbox([[t.getAttribute('data-lb-single'), t.getAttribute('data-alt')]], 0);
      if (t.hasAttribute('data-venue')) { e.preventDefault(); return showVenue(t.getAttribute('data-venue')); }
      if (t.hasAttribute('data-foodzone')) { var z = t.getAttribute('data-foodzone'); closeFicha(true); return showFoodZone(G.comidaZonas[z] ? z : 'centro'); }
      if (t.hasAttribute('data-goto-day')) {
        var b = document.getElementById('tab-' + t.getAttribute('data-goto-day'));
        if (b) { $('#day-tabs')._select(b); scrollToId('itinerario'); }
        return;
      }
      var g = t.getAttribute('data-goto');
      if (g === 'checklist') return scrollToId('checklist');
      if (G.lugares[g] || G.cercanos[g]) { e.preventDefault(); if (!$('#ficha').hidden) closeFicha(true); return openFicha(g); }
      closeFicha(true); goTo(g);
    });
    // Lightbox: navegación
    var track = $('#lb-track'), raf = 0;
    track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(updateCap); }, { passive: true });
    $('.lb-prev').addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }); });
    $('.lb-next').addEventListener('click', function () { track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }); });
    $('#lightbox').addEventListener('click', function (e) { if (e.target.classList.contains('lb-slide')) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!$('#lightbox').hidden) return closeLightbox();
        if (!$('#ficha').hidden) return closeFicha();
        if (!$('#mas-sheet').hidden) { $('#mas-sheet').hidden = true; return; }
      }
      if (!$('#lightbox').hidden && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        track.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
      }
    });
    window.addEventListener('hashchange', onHash);
  }

  /* ───────────── Arranque ───────────── */
  function init() {
    renderCountdown(); renderNow(); renderItinerary(); renderPlaces(); renderHotel(); renderCerca();
    renderFoodFilters(); renderVenues(); renderDishes(); renderFoodTips();
    foodTabs = $('.tabs-food'); tabsBehaviour(foodTabs);
    renderPlanB(); renderEventos(); renderCompras();
    shopTabs = $('.tabs-shop'); tabsBehaviour(shopTabs);
    renderWeather(); renderChecklist(); renderReco(); renderContacts(); renderOffline();
    initTheme(); initSheet(); initClicks(); initNavSpy(); observeReveal();
    lazyInit($('#map-cerca'), initCercaMap);
    lazyInit($('#map-hotel'), initHotelMap);
    initTopbar();
    setInterval(renderCountdown, 1000);
    setInterval(function () { renderNow(); markTimeline(); refreshBadges(); }, 30000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { renderNow(); markTimeline(); refreshBadges(); } });
    window.addEventListener('online', function () { toast('Conexión recuperada'); });
    window.addEventListener('offline', function () { toast('Sin conexión: la guía sigue funcionando'); });
    onHash();
    registerSW();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
