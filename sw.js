// Numele cache-ului - Schimbă 'v4' în 'v5' data viitoare când modifici ceva în index sau style
const cacheName = 'sebes-alearga-v4';

// Fișierele pe care aplicația le salvează pentru a merge offline
const assets = [
  './',
  'index.html',
  'manifest.json',
  'style.css'
];

// 1. Instalarea: Salvează fișierele în memoria telefonului
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('SW: Arhivare fișiere în cache');
      return cache.addAll(assets);
    })
  );
  // Forțează Service Worker-ul nou să devină activ imediat
  self.skipWaiting();
});

// 2. Activarea: Șterge vechile versiuni (v1, v2, v3) ca să facă loc celei noi
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('SW: Ștergere cache vechi:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Permite SW-ului să preia controlul paginii imediat
  return self.clients.claim();
});

// 3. Fetch: Încearcă să încarce din cache, dacă nu, cere de pe internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});