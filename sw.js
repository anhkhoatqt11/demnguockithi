const staticCacheName = 'site-static-v9';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    'js/quote.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'images/background.mp4',
    "/manifest.json",
    'images/favicon.png',
    'css/main.css',
    'images/background.png'
];

self.addEventListener('install', evt => {
    //console.log('installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching all assets');
            cache.addAll(assets);
        })
    );

});

//active service worker
self.addEventListener('activate', evt => {
    //console.log('activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});