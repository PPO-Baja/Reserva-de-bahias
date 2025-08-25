const CACHE_NAME = 'bahias-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/icon-192.png',
  '/icon-512.png',
  // Agrega otras imágenes, CSS y archivos que quieras cachear
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando archivos estáticos');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve
        if (response) {
          return response;
        }

        // Si no está, lo solicita a la red
        return fetch(event.request);
      })
      .catch(() => {
        // En caso de fallo, puedes devolver una página sin conexión
        // return caches.match('/offline.html');
      })
  );
});


