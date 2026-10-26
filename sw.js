/* Sổ bảo dưỡng xe - chỉ lưu bộ mã ứng dụng; KHÔNG đụng đến localStorage. */
const APP_CACHE='so-bao-duong-app-v2.0.0';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const CACHE_PREFIXES=['so-bao-duong-v','so-bao-duong-app-v'];
self.addEventListener('install',event=>{
  // Tải đủ bộ tệp trước khi kích hoạt; nếu thất bại, SW cũ vẫn hoạt động.
  event.waitUntil(caches.open(APP_CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(name=>name!==APP_CACHE&&CACHE_PREFIXES.some(prefix=>name.startsWith(prefix))).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
  const isNavigation=request.mode==='navigate';
  const isAsset=FILES.some(path=>new URL(path,self.registration.scope).pathname===url.pathname);
  if(!isNavigation&&!isAsset)return;
  if(isNavigation){
    // Online: thử mã mới nhất; Offline: dùng gói đã lưu an toàn.
    event.respondWith((async()=>{
      try{const response=await fetch(request,{cache:'no-store'});if(response.ok)return response;}catch(_){}
      const cache=await caches.open(APP_CACHE);
      return (await cache.match('./index.html'))||Response.error();
    })());
  }else{
    event.respondWith((async()=>{
      const cache=await caches.open(APP_CACHE);
      return (await cache.match(request,{ignoreSearch:true}))||fetch(request);
    })());
  }
});
