/* 생물다양성 토론장 서비스 워커
   - 앱 파일을 캐시해 두 번째 방문부터는 인터넷이 느리거나 끊겨도 열립니다.
   - 개인정보는 저장하지 않습니다. 학생이 쓴 글은 캐시 대상이 아닙니다. */

const CACHE = 'bio-debate-v3';

const CORE = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-32.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE)
            .then(function (c) { return c.addAll(CORE); })
            .then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.map(function (k) {
                    return k === CACHE ? null : caches.delete(k);
                }));
            })
            .then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (e) {
    const req = e.request;
    if (req.method !== 'GET') return;

    // 페이지 이동: 네트워크 우선, 실패하면 캐시된 화면
    if (req.mode === 'navigate') {
        e.respondWith(
            fetch(req)
                .then(function (res) {
                    const copy = res.clone();
                    caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
                    return res;
                })
                .catch(function () {
                    return caches.match('./index.html');
                })
        );
        return;
    }

    // 그 밖의 자원(CSS·폰트·아이콘 등): 캐시 우선, 없으면 받아서 캐시
    e.respondWith(
        caches.match(req).then(function (hit) {
            if (hit) return hit;
            return fetch(req).then(function (res) {
                const copy = res.clone();
                caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
                return res;
            });
        })
    );
});
