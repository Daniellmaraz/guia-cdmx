/* Service worker: guarda la guía para usarla sin internet.
   - Núcleo (HTML, CSS, JS, íconos, portada): se guarda al instalar.
   - Fotos: se guardan al verlas (y las pequeñas en segundo plano).
   - Fuentes y Leaflet (CDN): se guardan al usarlos.
   - Mapas (teselas OSM): red primero; si no hay red, lo que se haya visto. */
var VERSION = 'v2';
var CORE = 'guia-core-' + VERSION;
var IMGS = 'guia-img-v1';      // mismo nombre que usa el botón “Guardar todas las fotos”
var EXT = 'guia-ext-v1';
var TILES = 'guia-tiles-v1';

var CORE_FILES = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/data/viaje.js',
  'js/data/lugares.js',
  'js/data/cercanos.js',
  'js/data/comida.js',
  'js/data/extras.js',
  'js/data/creditos.js',
  'manifest.json',
  'assets/icons/icon.svg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/img/hero-sm.webp',
  'assets/img/hero.webp'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CORE).then(function (c) { return c.addAll(CORE_FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('guia-core-') === 0 && k !== CORE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Precarga de miniaturas pedida por la página */
self.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.type === 'precache-sm' && Array.isArray(d.urls)) {
    e.waitUntil(caches.open(IMGS).then(function (c) {
      return d.urls.reduce(function (p, u) {
        return p.then(function () { return c.match(u).then(function (hit) { return hit || c.add(u).catch(function () { }); }); });
      }, Promise.resolve());
    }));
  }
});

function trim(cacheName, max) {
  caches.open(cacheName).then(function (c) {
    c.keys().then(function (keys) { if (keys.length > max) c.delete(keys[0]).then(function () { trim(cacheName, max); }); });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Clima: siempre red (la página guarda el último pronóstico)
  if (url.hostname === 'api.open-meteo.com') return;

  // Teselas del mapa: red primero, caché de respaldo
  if (/tile\.openstreetmap\.org$/.test(url.hostname)) {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(TILES).then(function (c) { c.put(req, copy); trim(TILES, 400); });
      return res;
    }).catch(function () { return caches.match(req); }));
    return;
  }

  // Fuentes de Google y Leaflet: caché primero
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || url.hostname === 'unpkg.com') {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone(); caches.open(EXT).then(function (c) { c.put(req, copy); }); return res;
      });
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Fotos: caché primero
  if (url.pathname.indexOf('/assets/img/') >= 0) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(IMGS).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    }));
    return;
  }

  // Navegación (HTML): red primero para recibir actualizaciones; sin red, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone(); caches.open(CORE).then(function (c) { c.put('index.html', copy); }); return res;
    }).catch(function () { return caches.match('index.html').then(function (r) { return r || caches.match('./'); }); }));
    return;
  }

  // CSS / JS / íconos: caché y actualización en segundo plano
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CORE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  }));
});
