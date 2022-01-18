const staticCacheName = 'site-static-v16';
const assets = [
    '/demnguockithi/',
    '/demnguockithi/index.html',
    '/demnguockithi/js/app.js',
    '/demnguockithi/js/quote.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/demnguockithi/images/background.mp4',
    "/demnguockithi/manifest.json",
    '/demnguockithi/images/favicon.png',
    '/demnguockithi/css/main.css',
    '/demnguockithi/images/background1.png',
    '/demnguockithi/images/background2.png',
    '/demnguockithi/images/background3.png',
    '/demnguockithi/images/background4.png',
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