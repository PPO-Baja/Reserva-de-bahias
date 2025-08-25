const CACHE_NAME = 'mi-sitio-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://sites.google.com/view/bahias/inicio'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});