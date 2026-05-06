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

const BANNED_TOPIC_PATTERNS = [
  /\bвойн(а|ы|е|ой|у|ы)\b/iu,
  /\bполит(ика|ики|ический|ические|ических|ической)\b/iu,
  /\bвыбор(ы|ов|ный|ная)\b/iu,
  /\bсанкц(ия|ии|ий|ионный)\b/iu,
  /\bпрезидент\b/iu,
  /\bгосдум(а|ы|е)\b/iu,
  /\bмитинг(и|ов)?\b/iu,
  /\bпротест(ы|ов)?\b/iu,
  /\bэротик(а|и|ой)\b/iu,
  /\bсекс(уал|а|у|ом)?\b/iu,
  /\bпорн(о|ограф|уха)\b/iu,
  /\b18\+\b/iu,
  /\bнаркот(ик|ики|иков)\b/iu,
  /\bалкогол(ь|я|ем)\b/iu,
  /\bазарт(ные|ных)? игр(ы|а)\b/iu,
];

const ALLOWED_TOPIC_PATTERNS = [
  /\bseo\b/iu,
  /\bпоиск(овый|а|е|евая|овые)?\b/iu,
  /\bяндекс(а|у|ом)?\b/iu,
  /\bметрик(а|и|е|ой)\b/iu,
  /\bвебмастер(а|е|ом)?\b/iu,
  /\bчат-?бот(а|ы|ов|у|ом)?\b/iu,
  /\btelegram\b/iu,
  /\bcrm\b/iu,
  /\bлид(ы|ов|а)?\b/iu,
  /\bворонк(а|и|у|ой)\b/iu,
  /\bконверси(я|и|ю|ей)\b/iu,
  /\bавтоматизаци(я|и|ю|ей)\b/iu,
  /\bпродаж(а|и|у|ей)\b/iu,
  /\bаналитик(а|и|у|ой)\b/iu,
  /\bсайт(а|у|ом|ы)?\b/iu,
  /\bindексаци(я|и|ю|ей)\b/iu,
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
7) ЖЕСТКИЙ ЗАПРЕТ: не писать и не упоминать темы политики, войны, выборов, протестов, санкций, религии, секса/18+, наркотиков, алкоголя, гемблинга, трэш-контента.
8) Если источник затрагивает запрещенную тему — пропусти его и выбери другой.
9) Пиши только в рамках whitelist-тем: SEO, Яндекс.Вебмастер, Яндекс.Метрика, индексация, чат-боты, Telegram-боты, CRM, лиды, воронка, конверсия, автоматизация продаж.

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
- не допускай даже косвенного ухода в запрещенные темы

Источники:
${sourcesText}`;
}

function hasBannedTopic(text = "") {
  return BANNED_TOPIC_PATTERNS.some((pattern) => pattern.test(text));
}

function hasAllowedTopic(text = "") {
  return ALLOWED_TOPIC_PATTERNS.some((pattern) => pattern.test(text));
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
    const combinedText = [
      draft.title || "",
      draft.summary || "",
      draft.contentMarkdown || "",
      draft.sourceUrl || "",
    ].join("\n");

    if (hasBannedTopic(combinedText)) {
      console.warn(`[warn] Draft skipped by banned-topic filter: ${draft.title || "Untitled"}`);
      continue;
    }
    if (!hasAllowedTopic(combinedText)) {
      console.warn(`[warn] Draft skipped by whitelist filter: ${draft.title || "Untitled"}`);
      continue;
    }

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
  if (created.length === 0) {
    throw new Error("No safe drafts created: all candidates were filtered by banned-topic policy.");
  }
  console.log(`Created ${created.length} safe draft(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
