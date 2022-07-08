
caches.has('site-static-v18').then(function(hasCache) {
    if (!hasCache) {
    } else {
        caches.delete("site-static-v18");
        alert("Bạn đang ở phiên bản cũ của Website. Reload để cập nhật thời gian mới nhất");
    }
  }).catch(function() {
    // Handle exception here.
  });

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then((reg) => console.log('Service Worker Register', reg))
//         .catch((err) => console.log('Service Worker Not Register', err))
// }