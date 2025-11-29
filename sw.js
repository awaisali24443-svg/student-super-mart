
const CACHE_NAME = 'student-super-mart-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './shop.html',
  './product.html',
  './checkout.html',
  './success.html',
  './admin.html',
  './login.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force activation
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch Event: Network First for HTML/JS (freshness), Cache First for Images
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // 1. Image Strategy: Cache First, fall back to Network
  if (requestUrl.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
             return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
           // Optional: Return a placeholder image if offline
        });
      })
    );
    return;
  }

  // 2. Default Strategy: Network First, fall back to Cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Update the cache with the fresh version
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      })
      .catch(() => {
        // Network failed, try to serve from cache
        console.log('[Service Worker] Network unavailable, serving from cache');
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback logic could go here
        });
      })
  );
});