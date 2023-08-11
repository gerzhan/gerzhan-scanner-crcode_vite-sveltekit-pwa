import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';
// NOTE: все файлы приложения сгенерированные SvelteKit
const precache_list = [...build, ...files, ...prerendered].map((file) => {
  return {
    url: file,
    reversion: version,
  };
});
// NOTE: формирование кэша файлов согласно путей
precacheAndRoute(precache_list);
