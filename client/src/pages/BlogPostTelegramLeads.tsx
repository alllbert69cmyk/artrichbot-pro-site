import { useEffect } from "react";

export default function BlogPostTelegramLeads() {
  useEffect(() => {
    document.title = "Telegram-бот для заявок: структура и ошибки — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Как построить Telegram-бота для заявок: этапы воронки, структура диалогов и частые ошибки внедрения."
      );
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Telegram-бот для заявок: структура, этапы, ошибки",
      author: { "@type": "Person", name: "Альберт" },
      publisher: { "@type": "Organization", name: "ArtRichBot" },
      datePublished: "2026-05-06",
      dateModified: "2026-05-06",
      mainEntityOfPage: "https://artrichbot.ru/blog/telegram-bot-dlya-zayavok",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-article-telegram-leads";
    script.text = JSON.stringify(articleSchema);
    document.head.appendChild(script);
    return () => document.getElementById("schema-article-telegram-leads")?.remove();
  }, []);

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <article className="container pt-24 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <a href="/blog" className="text-[13px] text-white/45 hover:text-white transition-colors">← В блог</a>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Telegram-бот для заявок: структура, этапы, ошибки</h1>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-7 space-y-4 text-[15px] text-white/70 leading-relaxed">
            <p>Эффективный Telegram-бот для заявок не должен быть просто меню с кнопками — это мини-воронка продаж.</p>
            <p><strong>Этап 1:</strong> Приветствие + быстрый оффер + понятный следующий шаг.</p>
            <p><strong>Этап 2:</strong> 2–4 вопроса для квалификации, чтобы отсеять нецелевые обращения.</p>
            <p><strong>Этап 3:</strong> Фиксация контактов и автоматическая передача данных в CRM.</p>
            <p><strong>Этап 4:</strong> Дожим через напоминания, если клиент ушёл без заявки.</p>
            <p>Частая ошибка: пытаться уместить весь сайт в одного бота. Лучше — один чёткий сценарий под один целевой результат.</p>
          </div>
        </div>
      </article>
    </main>
  );
}
