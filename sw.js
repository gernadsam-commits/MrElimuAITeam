// sw.js
const CACHE_NAME = 'mr-elimu-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/color.html',
  '/typography.html',
  '/accessibility.html',
  '/routing.html',
  '/templates.html',
  '/seo.html'
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
    })
  );
});