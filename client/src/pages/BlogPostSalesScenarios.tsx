import { useEffect } from "react";

export default function BlogPostSalesScenarios() {
  useEffect(() => {
    document.title = "Как чат-бот увеличивает продажи: 7 сценариев — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "7 сценариев, как чат-бот для бизнеса помогает увеличить продажи: квалификация лидов, дожим, реактивация и автоворонка."
      );
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Как чат-бот увеличивает продажи: 7 рабочих сценариев",
      author: { "@type": "Person", name: "Альберт" },
      publisher: { "@type": "Organization", name: "ArtRichBot" },
      datePublished: "2026-05-06",
      dateModified: "2026-05-06",
      mainEntityOfPage: "https://artrichbot.ru/blog/kak-chat-bot-uvelichivaet-prodazhi",
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://artrichbot.ru/" },
        { "@type": "ListItem", position: 2, name: "Блог", item: "https://artrichbot.ru/blog" },
        { "@type": "ListItem", position: 3, name: "Как чат-бот увеличивает продажи", item: "https://artrichbot.ru/blog/kak-chat-bot-uvelichivaet-prodazhi" },
      ],
    };
    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.id = "schema-article-sales";
    articleScript.text = JSON.stringify(articleSchema);
    document.head.appendChild(articleScript);
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "schema-breadcrumb-sales";
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);
    return () => {
      document.getElementById("schema-article-sales")?.remove();
      document.getElementById("schema-breadcrumb-sales")?.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <article className="container pt-24 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <a href="/blog" className="text-[13px] text-white/45 hover:text-white transition-colors">← В блог</a>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Как чат-бот увеличивает продажи: 7 рабочих сценариев</h1>
          <p className="text-white/55 text-lg">Разбираю практические сценарии, которые помогают бизнесу увеличивать продажи с помощью чат-бота.</p>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-7 space-y-4 text-[15px] text-white/70 leading-relaxed">
            <p><strong>1.</strong> Мгновенный ответ на входящий запрос — клиент не уходит к конкуренту.</p>
            <p><strong>2.</strong> Квалификация лида — бот задаёт вопросы и передаёт менеджеру только целевые обращения.</p>
            <p><strong>3.</strong> Дожим через напоминания — автоматические follow-up сообщения повышают конверсию.</p>
            <p><strong>4.</strong> Автоворонка в Telegram — бот ведёт клиента от интереса к покупке.</p>
            <p><strong>5.</strong> Сегментация базы — разные сценарии для разных типов клиентов.</p>
            <p><strong>6.</strong> Реактивация старых лидов — бот возвращает клиентов, которые ранее не купили.</p>
            <p><strong>7.</strong> Интеграция с CRM — все заявки сохраняются, менеджеры не теряют обращения.</p>
          </div>
        </div>
      </article>
    </main>
  );
}
