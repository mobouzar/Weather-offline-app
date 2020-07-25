CACHE_NAME = "version-1";
urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// install SW
self.addEventListener('install', ( event ) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

//lesten for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    );
});

//activate SW
self.addEventListener('activate', (event) => {
    cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((casheNames) => Promise.all(
                casheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    );
});