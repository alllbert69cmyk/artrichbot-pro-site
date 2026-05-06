import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DRAFTS_DIR = path.join(ROOT, "content", "drafts");
const STATE_DIR = path.join(ROOT, "content", "state");
const TODAY = new Date().toISOString().slice(0, 10);

const YANDEX_FEEDS = [
  "https://yandex.ru/blog/webmaster/rss.xml",
  "https://yandex.ru/blog/metrika/rss.xml",
];

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

function parseRssItems(xml, source) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items
    .map((m) => m[1])
    .map((itemXml) => {
      const title = (itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "").trim();
      const link = (itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "").trim();
      const description = stripHtml(itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "");
      const pubDate = (itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "").trim();
      return { title, link, description, pubDate, source };
    })
    .filter((item) => item.title && item.link);
}

async function fetchFeed(url) {
  const res = await fetch(url, { headers: { "user-agent": "artrichbot-seo-bot/1.0" } });
  if (!res.ok) {
    throw new Error(`Feed request failed: ${url} (${res.status})`);
  }
  return res.text();
}

function buildPrompt(items) {
  const sourcesText = items
    .map(
      (item, idx) =>
        `${idx + 1}) ${item.title}\nURL: ${item.link}\nДата: ${item.pubDate || "n/a"}\nКратко: ${item.description || "n/a"}`
    )
    .join("\n\n");

  return `Ты SEO-редактор блога сервиса разработки чат-ботов для бизнеса.

Задача:
1) Проанализируй источники ниже (официальные обновления Яндекса).
2) Выбери до 2 действительно полезных темы для бизнеса.
3) Напиши 2 черновика статей в стиле автора: "по делу, простым языком, с пользой для бизнеса, без воды".
4) Обязательно ссылайся на официальный источник в каждой статье.
5) Пиши как редактор-практик: короткие абзацы, сильные подзаголовки, без канцеляризмов.
6) Любые утверждения о цифрах и изменениях опирай только на источник из списка.

Формат ответа: строго JSON-массив объектов:
[
  {
    "title": "...",
    "slug": "...",
    "summary": "...",
    "keywords": ["...", "..."],
    "sourceUrl": "...",
    "contentMarkdown": "..."
  }
]

Требования к article contentMarkdown:
- 700-1200 слов
- структура: H1, 3-5 H2, вывод
- без выдуманных фактов
- практическая польза для владельца бизнеса
- естественно включи ключи: "разработка чат-ботов", "чат-бот для бизнеса", "чат-бот telegram для продаж"
- стиль: экспертный, человеческий, без переспама SEO-фраз
- добавь блок "Что сделать сегодня" в конце каждой статьи (3-5 шагов)
- обязательно укажи раздел "Источник" с прямой ссылкой на официальный материал

Источники:
${sourcesText}`;
}

async function generateWithAi(prompt) {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  if (!openRouterApiKey && !openAiApiKey) return null;

  // Priority: OpenRouter, fallback: OpenAI
  const useOpenRouter = Boolean(openRouterApiKey);
  const endpoint = useOpenRouter
    ? "https://openrouter.ai/api/v1/chat/completions"
    : "https://api.openai.com/v1/responses";
  const model = process.env.AI_MODEL || (useOpenRouter ? "anthropic/claude-3.5-sonnet" : "gpt-4.1-mini");

  const headers = useOpenRouter
    ? {
        "content-type": "application/json",
        authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://artrichbot.ru",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "ArtRichBot SEO Drafts",
      }
    : {
        "content-type": "application/json",
        authorization: `Bearer ${openAiApiKey}`,
      };

  const body = useOpenRouter
    ? {
        model,
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }],
      }
    : {
        model,
        input: prompt,
        temperature: 0.2,
      };

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`${useOpenRouter ? "OpenRouter" : "OpenAI"} error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  if (useOpenRouter) {
    return data?.choices?.[0]?.message?.content || "";
  }
  return data?.output_text || "";
}

function fallbackDrafts(items) {
  return items.slice(0, 2).map((item, idx) => ({
    title: `Разбор обновления Яндекса: ${item.title}`,
    slug: `yandex-update-${TODAY}-${idx + 1}`,
    summary: "Краткий разбор официального обновления Яндекса и его влияния на сайт бизнеса.",
    keywords: ["разработка чат-ботов", "чат-бот для бизнеса", "чат-бот telegram для продаж"],
    sourceUrl: item.link,
    contentMarkdown: `# ${item.title}

Источник: ${item.link}

## Что изменилось
${item.description || "В официальном источнике опубликовано обновление, которое влияет на работу сайта и аналитики."}

## Что это значит для бизнеса
Даже небольшие обновления Яндекса могут влиять на индексацию, отображение сайта в поиске и корректность метрик.

## Что сделать владельцу сайта
1. Проверить данные в Яндекс.Вебмастере и Метрике.
2. Убедиться, что sitemap и robots.txt доступны.
3. Обновить критичные страницы и отправить их на переобход.

## Как использовать это в стратегии продвижения
Регулярно отслеживайте официальные обновления Яндекса и быстро внедряйте рекомендации. Это помогает улучшать видимость сайта в поиске и стабильность SEO-результатов.

## Вывод
Официальные изменения важно не просто читать, а переводить в конкретные задачи по сайту и аналитике.`,
  }));
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

async function run() {
  await fs.mkdir(DRAFTS_DIR, { recursive: true });
  await fs.mkdir(STATE_DIR, { recursive: true });

  const allItems = [];
  for (const feedUrl of YANDEX_FEEDS) {
    try {
      const xml = await fetchFeed(feedUrl);
      allItems.push(...parseRssItems(xml, feedUrl));
    } catch (error) {
      console.warn(`[warn] feed skipped: ${feedUrl}: ${error.message}`);
    }
  }

  if (allItems.length === 0) {
    throw new Error("No feed items fetched from official sources.");
  }

  const uniqueItems = Array.from(new Map(allItems.map((i) => [i.link, i])).values()).slice(0, 8);
  const prompt = buildPrompt(uniqueItems);

  let drafts = null;
  const aiResponseText = await generateWithAi(prompt);
  if (aiResponseText) {
    drafts = safeJsonParse(aiResponseText);
  }
  if (!Array.isArray(drafts) || drafts.length === 0) {
    drafts = fallbackDrafts(uniqueItems);
  }

  const created = [];
  for (const draft of drafts.slice(0, 2)) {
    const slug = slugify(draft.slug || draft.title || `draft-${Date.now()}`);
    const filename = `${TODAY}-${slug}.md`;
    const outputPath = path.join(DRAFTS_DIR, filename);
    const markdown = `---
title: "${(draft.title || "").replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${TODAY}"
summary: "${(draft.summary || "").replace(/"/g, '\\"')}"
keywords: ${JSON.stringify(draft.keywords || [])}
source: "${draft.sourceUrl || ""}"
status: "draft"
---

${draft.contentMarkdown || ""}`;
    await fs.writeFile(outputPath, markdown, "utf8");
    created.push({ filename, slug, title: draft.title || slug, source: draft.sourceUrl || "" });
  }

  const reportPath = path.join(STATE_DIR, `draft-report-${TODAY}.json`);
  await fs.writeFile(reportPath, JSON.stringify({ date: TODAY, created }, null, 2), "utf8");
  console.log(`Created ${created.length} draft(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
