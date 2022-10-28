const cacheVersionName = ['staticCache-v1']

// tilføj eventlistener og fetch
self.addEventListener('fetch', (event) => {

  event.respondWith(caches.open(cacheVersionName).then((response) => {
    // Først gå til cachen
    return response.match(event.request.url).then((cachedResponse) => {
      // Hvis der er et noget i cachen, returner det
      if (cachedResponse) {
        console.log("cached response" + cachedResponse)

        return cachedResponse;
      }

      // Hvis der ikke er et cached response, gå til netværket
      return fetch(event.request).then((fetchedResponse) => {
        // Tilføj fetched response til cahce for senere besøg
        response.put(event.request, fetchedResponse.clone());

        // Returner netrespons
        console.log("fetched response" + fetchedResponse)
        return fetchedResponse;
      });
    });
  }));
});

                    // PRECACHING
/* 
let staticUrlsToCache = ["assets/images/mig.jpg", "assets/style.scss",];

self.addEventListener('install', event => {
    console.log('installing...')

    event.waitUntil(
        // opret cache til static elemtn, hvis man bruger cashes.open åpå en cache navn der eksisterer, så pårettes cachen automatisk 
        caches.open(cacheVersionName[0])
        
        .then(cache => 
            cache.addAll(staticUrlsToCache))
    )
})

self.addEventListener('fetch', event => {
    return
})  
                    // WEB ONLY //


                    // CACHE ONLY //

// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

// Assets to precache
const precachedAssets = [
  '/possum1.jpg',
  '/possum2.jpg',
  '/possum3.jpg',
  '/possum4.jpg'
];

self.addEventListener('install', (event) => {
  // Precache assets on install
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(precachedAssets);
  }));
});

self.addEventListener('fetch', (event) => {
  // Is this one of our precached assets?
  const url = new URL(event.request.url);
  const isPrecachedRequest = precachedAssets.includes(url.pathname);

  if (isPrecachedRequest) {
    // Grab the precached asset from the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request.url);
    }));
  } else {
    // Go to the network
    return;
  }
});

                // CACHE FIRST FALLBACK TO WEB

// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});

                    // WEB FALLBACK TO CACHE

// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('fetch', (event) => {
  // Check if this is a navigation request
  if (event.request.mode === 'navigate') {
    // Open the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());

        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
  } else {
    return;
  }
});


//activate
self.addEventListener('activate', (event) => {
//find alle cache keys og fortsøæt ,med en array med cache navne
    event.waitUntil(caches.keys().then((keys) => {
        //slet cahce navne, der ikke
        return Promise.all(keys.map((key) => {
            if (!cacheVersionName.includes(key)) {
                return caches.delete(key)
            }
        }))
    }))
})

//fetch
self.addEventListener("fetch", (event) => {
    console.log("handling getch event for". event.request.url)

    event.respondWith(
        caches.open(cacheVersionName[0]).then((cache) => {
            if (response) {

                console.log("Found response in cache", response)

                return response
            }
        })
    )
}) */