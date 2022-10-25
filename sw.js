const cacheVersionName = ['staticCache-v1']



let staticUrlsToCache = ["assets/images/mig.jpg", "assets/style.scss",];

self.addEventListener('install', event => {
    console.log('installing...')

    event.waitUntil(
        caches.open(cacheVersionName[0]).then(cache => cache.addAll(staticUrlsToCache))
    )
})

self.addEventListener('fetch', event => {
    return
})