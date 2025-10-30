const CACHE_NAME = 'mr-elimu-cache-v1';
const FILES_TO_CACHE = [
  'index.html',
  'dashboard.html',
  'manifesto.html',
  'quiz.html',
  'style.css',
  'dashboard.js',
  'quiz.js',
  'manifest.json',
  'icon.png',
  // Add all module pages here
  'color.html',
  'typography.html',
  'accessibility.html',
  'routing.html',
  'templates.html',
  'seo.html'
];

// Install: Cache all core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: Serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});