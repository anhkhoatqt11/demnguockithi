if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/demnguockithi/sw.js')
        .then((reg) => console.log('Service Worker Register', reg))
        .catch((err) => console.log('Service Worker Not Register', err))
}