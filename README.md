# Gerzhan | Scanner QRCode

[github.com/gerzhan/gerzhan-scanner-crcode_vite-sveltekit-pwa](https://github.com/gerzhan/gerzhan-scanner-crcode_vite-sveltekit-pwa)

## Порядок создания

### Генерация репозитория

```bash
$node --version
18.15.0
$npm create vite@latest
✔ Project name: … gerzhan-scanner-crcode_vite-sveltekit-pwa
✔ Select a framework: › Svelte
✔ Select a variant: › SvelteKit ↗
Need to install the following packages:
  create-svelte@5.0.5
Ok to proceed? (y) y

create-svelte version 5.0.5

┌  Welcome to SvelteKit!
│
◇  Which Svelte app template?
│  Skeleton project
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  Select additional options (use arrow keys/space bar)
│  Add ESLint for code linting, Add Prettier for code formatting, Add Playwright for browser testing, Add Vitest for unit testing
│
└  Your project is ready!
```

> NOTE: репозиторий сгененрирован с использованием [`create-svelte v5.0.5`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

- фиксация информации о версии NodeJs

```bash
$node --version > .nvmrc
```

### Настройка PWA

#### Простой способ

@see [Simple native-like App in SvelteKit!](https://www.youtube.com/watch?v=Enl4OPQ2OAM)

- создать файл `site.webmanifest` в директории `static` указав содержание согласно [developer.mozilla.org/ru/docs/Web/Manifest](https://developer.mozilla.org/ru/docs/Web/Manifest)
- добавить `app.html` файл путь до манифеста

```diff
+    <link rel="manifest" href="%sveltekit.assets%/site.webmanifest" />
```

- использовать [генератор манифеста](https://tools.crawlink.com/tools/pwa-icon-generator/) для генерации иконок
- или использовать [генератор favicon](https://realfavicongenerator.net/favicon_result?file_id=p1h7ijj2bk1vfg1r101kpkcjcq7o6) для генерации манифеста и иконок
- создать файл `src/service-worker.ts`
- используем `workbox-precachhing` для кэширования ресурсов для работы в offline режиме

```bash
$npm i -D workbox-precaching
```

- добавление в service-worker.ts кода формирвоания кэша

```typescript
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';
// NOTE: все файлы приложения сгенерированные SvelteKit
const precache_list = [...build, ...files, ...prerendered].map((file) => {
  return {
    url: file,
    reversion: version,
  };
});
// NOTE: формирование кэша файлов согласно путей/
precacheAndRoute(precache_list);
```

- добавление в `vite.config.ts` в описание окружения значение `producation` для корректной работы `workbox-precaching`

```diff
# vite.config.ts
+  define: {
+    'process.env.NODE_ENV': '"production"',
+  },
});
```

- добавление файла `+page.ts` с добавление параметра `export const prerender = true;`
- выполнить сборку приложения для фактического формирования фафлов для их последующего кэщирования и проверки

```bash
$npm run build
$npm run preview
```

#### Сложный способ - `!!НЕ РЕАЛИЗОВАН!!`

> @see https://vite-pwa-org.netlify.app/frameworks/sveltekit.html

- установка зависимости согласно инструкции

```bash
$npm install -D @vite-pwa/sveltekit
# NOTE: установка основного модуля
$npm install -D vite-plugin-pwa
```

- обновление `vite.config.ts`

```diff
+// @see https://github.com/vite-pwa/sveltekit#-usage
+import { SvelteKitPWA } from '@vite-pwa/sveltekit';

 export default defineConfig({
-  plugins: [sveltekit()],
+  plugins: [sveltekit(), SvelteKitPWA()],
   test: {
     include: ['src/**/*.{test,spec}.{js,ts}'],
   },
```

## Консольные команды запуска

```bash
# запуск в режиме разработки
$npm run dev
# сборка проекта для публикации
$npm run build
# запуск собранного проекта
$npm run preview
# форматирование всего кода
$npm run format
```

## Первоисточник

- [developer.mozilla.org - Progressive web apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Simple native-like App in SvelteKit!](https://www.youtube.com/watch?v=Enl4OPQ2OAM)
- SvelteKit: PWA and deployment on Netlify. [video](https://www.youtube.com/watch?v=JSWPWJtGGtQ)
- Официальная инструкция [vite-pwa-org + sveltekit](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html)
- [github.com/vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit)
- [github.com/vite-pwa/sveltekit/tree/main/examples/sveltekit-ts](https://github.com/vite-pwa/sveltekit/tree/main/examples/sveltekit-ts)
