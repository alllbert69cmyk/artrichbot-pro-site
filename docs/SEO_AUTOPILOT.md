# SEO Autopilot (draft + approve)

Этот проект настроен на автоматическую генерацию SEO-черновиков статей через GitHub Actions.

## Что делает автоматика

- Берет официальные RSS-источники Яндекса.
- Анализирует свежие публикации.
- Генерирует 1 черновик статьи в вашем стиле.
- Создает Pull Request с файлами в `content/drafts/`.

## Где включить API-ключ

GitHub -> Repository -> Settings -> Secrets and variables -> Actions -> New repository secret

Рекомендуемый вариант (OpenRouter):
- Name: `OPENROUTER_API_KEY`
- Value: ваш OpenRouter API ключ

Опционально (fallback):
- Name: `OPENAI_API_KEY`
- Value: ваш OpenAI API ключ

## Как запустить вручную

GitHub -> Actions -> `SEO Draft Generator` -> `Run workflow`

## Модель

По умолчанию workflow использует:
- `AI_MODEL=anthropic/claude-3.5-sonnet`

Можно сменить модель, изменив `AI_MODEL` в файле `.github/workflows/seo-drafts.yml`.

## Как принимать статьи

1. Открыть PR `bot/seo-drafts`
2. Проверить факты, ссылки и тон
3. Нажать Merge
4. Дальше публикация в блог идет автоматически по расписанию (каждые 4 дня в 07:00 МСК)

## Как добавлять и редактировать draft правильно

1. Создавайте draft только в `content/drafts/` с расширением `.md`.
2. Обязательно добавляйте frontmatter:
   - `title`
   - `slug` (уникальный, латиница + дефисы)
   - `date` (`YYYY-MM-DD`)
   - `summary`
   - `source`
   - `status: "draft"`
3. Контент пишите в Markdown (`#`, `##`, списки, абзацы) без встроенного HTML/скриптов.
4. Для правки уже созданного черновика редактируйте тот же `.md`-файл, `slug` без причины не меняйте.
5. После merge в `main`:
   - workflow публикует статью в блог,
   - `status` автоматически становится `published`,
   - в `sitemap.xml` добавляется URL статьи.

## Автопубликация в блог + автодеплой на VPS

После merge workflow `Publish Drafts to Blog`:
- читает `content/drafts/*.md`,
- обновляет `client/src/generated/blogPosts.ts`,
- обновляет `client/public/sitemap.xml`,
- собирает production build,
- загружает статику на VPS в `/var/www/artrichbot`,
- перезагружает `nginx`.

Нужно добавить GitHub Secrets (Repository -> Settings -> Secrets and variables -> Actions):
- `VPS_HOST` — IP сервера (например `95.81.102.64`)
- `VPS_USER` — пользователь SSH (например `root`)
- `VPS_SSH_KEY` — приватный SSH-ключ (содержимое файла, начиная с `-----BEGIN ...-----`)
- `VPS_PORT` — порт SSH (обычно `22`)

## Важно

- Сейчас режим безопасный: `draft + manual approve`.
- Автопубликация без проверки отключена.
- Встроен контент-фильтр запрещенных тем: политика, война, выборы, 18+, наркотики, алкоголь, гемблинг и др.
- Если AI сгенерирует черновик с запрещенной тематикой, файл не создается, workflow завершается с ошибкой.
- Встроен white-list тематик: SEO, Яндекс.Вебмастер/Метрика, чат-боты, Telegram, CRM, лиды, воронка, конверсия, автоматизация продаж.
- Черновики вне этого списка автоматически отклоняются.
- Встроен SEO-скоринг статьи (минимальный порог качества): структура H1/H2, длина, ключевые фразы, блок "Источник", блок "Что сделать сегодня".
- Слабые черновики автоматически отбраковываются и попадают в отчет `content/state/draft-report-YYYY-MM-DD.json`.
- Встроен anti-duplicate фильтр:
  - блокирует точные дубликаты по slug/title,
  - блокирует похожие тексты по порогу сходства (near-duplicate).
