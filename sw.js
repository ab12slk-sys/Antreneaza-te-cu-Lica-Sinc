// sw.js - Versiunea 2 (Actualizată)
const cacheName = 'sebes-alearga-v2'; // <--- Am schimbat din v1 in v2
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