# SEO Autopilot (draft + approve)

Этот проект настроен на автоматическую генерацию SEO-черновиков статей через GitHub Actions.

## Что делает автоматика

- Берет официальные RSS-источники Яндекса.
- Анализирует свежие публикации.
- Генерирует 1-2 черновика статей в вашем стиле.
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
4. При необходимости перенести статью из `content/drafts` в блоговые страницы сайта

## Важно

- Сейчас режим безопасный: `draft + manual approve`.
- Автопубликация без проверки отключена.
