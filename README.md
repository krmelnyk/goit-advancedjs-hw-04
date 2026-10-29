# Пошук зображень

Навчальний застосунок на Vite: Axios, async/await, пагінація по 15 зображень,
SimpleLightbox, iziToast та кнопка Load more.

## Запуск

1. Встановіть залежності: `npm ci`.
2. Створіть `.env.local` у корені проєкту:

   ```dotenv
   VITE_PIXABAY_API_KEY=ваш_ключ_pixabay
   ```

   Отримати ключ можна у [документації Pixabay](https://pixabay.com/api/docs/).
3. Запустіть `npm run dev`.

`npm run build` створює папку `dist`, `npm run preview` дозволяє переглянути збірку.
Змінні `VITE_*` потрапляють у клієнтський код: ключ доступний у браузері.

## Структура

- `src/js/pixabay-api.js` — HTTP-запити та параметри Pixabay API.
- `src/js/render-functions.js` — галерея, SimpleLightbox, лоадер і кнопка.
- `src/main.js` — пошук, пагінація, обробка помилок, сповіщення й прокручування.
- `src/index.html`, `src/css/`, `src/img/` — розмітка, стилі та зображення.

Новий пошук очищає галерею й починається зі сторінки 1. Load more додає наступну
сторінку. Якщо запит завершується помилкою, повторна спроба не пропускає сторінку.
Кінець колекції визначається за `totalHits`.

## GitHub Pages і здача

У Settings → Secrets and variables → Actions додайте секрет
`VITE_PIXABAY_API_KEY`. Workflow передає його в процес збірки. У Settings → Pages
виберіть гілку `gh-pages`. Після push у `main` запускається збірка й публікація.

- Репозиторій: https://github.com/krmelnyk/goit-advancedjs-hw-04
- Очікувана адреса після успішної публікації: https://krmelnyk.github.io/goit-advancedjs-hw-04/

Для здачі також додайте ZIP із вихідними файлами. Не включайте `node_modules`,
`.git` або `.env.local`.
