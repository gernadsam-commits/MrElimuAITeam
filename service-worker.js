const CACHE_NAME = 'mr-elimu-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/quiz.html',
  '/progress.html',
  '/404.html',
  '/images/logo.png' // Add any images you use
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/404.html'))
  );
});