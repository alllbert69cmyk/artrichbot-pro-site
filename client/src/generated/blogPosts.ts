export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  source: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "test-auto-post",
    title: "Тест автопубликации: статья появилась автоматически",
    date: "2026-05-06",
    summary: "Проверка автопубликации из drafts в блог и деплоя на сервер.",
    source: "https://yandex.ru/blog/webmaster/",
    content: `
# Тест автопубликации

Это техническая тестовая статья для проверки цепочки.

## Что проверяем
- draft лежит в content/drafts
- workflow публикует статью в блог
- сайт на VPS обновляется автоматически

## Что сделать сегодня
1. Проверить карточку в блоге
2. Открыть URL статьи
3. Убедиться, что статус поменялся на published`,
  }
];
