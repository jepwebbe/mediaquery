// Establish a cache name
const cacheVersionName = 'staticCache-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheVersionName).then((cache) => {
        
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});