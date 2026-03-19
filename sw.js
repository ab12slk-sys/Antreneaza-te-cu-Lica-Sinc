self.addEventListener('install', event => {
  self.skipWaiting(); // <--- Această linie forțează activarea noii versiuni imediat
});
const cacheName = 'sebes-alearga-v3'; // <--- Schimbă cifra de fiecare dată când faci un update!
const assets = [
  'index.html',
  'manifest.json',
  // adaugă aici alte fișiere (imagini, css) pe care vrei să le salvezi offline
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
// sw.js - Versiunea 2 (Actualizată)
const cacheName = 'sebes-alearga-v3'; // <--- Schimbă cifra de fiecare dată când faci un update!
const assets = [
  'index.html',
  'manifest.json',
  'style.css', // <--- Am adaugat fișierul de design in cache
  // Dacă ai adăugat fonturi sau imagini, pune-le și pe ele aici
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(assets);
    })
  );
});

// Ștergerea vechiului cache (ca telefonul să vadă modificările)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
