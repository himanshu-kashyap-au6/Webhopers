const CACHE_NAME = "Data visualization";
const urlsToCache = [ 'index.html', "mainfest.json", "noNet.html" ];

const self = this;

self.addEventListener('install', async (event) => {
    const cacheRequest = async () =>{
        const ReatApp = await caches.open(CACHE_NAME)
        await ReatApp.addAll(urlsToCache)
        console.log('Opened cache');
    }
    event.waitUntil(cacheRequest())
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('noNet.html'))
            })
    )
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});