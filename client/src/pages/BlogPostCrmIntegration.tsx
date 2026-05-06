import { useEffect } from "react";

export default function BlogPostCrmIntegration() {
  useEffect(() => {
    document.title = "Интеграция чат-бота с CRM: зачем и как — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Интеграция чат-бота с CRM: как избежать потери заявок, ускорить работу менеджеров и повысить конверсию продаж."
      );
    }

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Интеграция чат-бота с CRM: зачем нужна и как внедрить",
      author: { "@type": "Person", name: "Альберт" },
      publisher: { "@type": "Organization", name: "ArtRichBot" },
      datePublished: "2026-05-06",
      dateModified: "2026-05-06",
      mainEntityOfPage: "https://artrichbot.ru/blog/integraciya-chat-bota-s-crm",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-article-crm";
    script.text = JSON.stringify(articleSchema);
    document.head.appendChild(script);
    return () => document.getElementById("schema-article-crm")?.remove();
  }, []);

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <article className="container pt-24 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <a href="/blog" className="text-[13px] text-white/45 hover:text-white transition-colors">← В блог</a>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Интеграция чат-бота с CRM: зачем нужна и как внедрить</h1>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-7 space-y-4 text-[15px] text-white/70 leading-relaxed">
            <p>Без CRM интеграции чат-бот часто превращается в отдельный канал, который сложно контролировать.</p>
            <p>С интеграцией все обращения автоматически попадают в единую систему, менеджеры видят историю диалога и быстрее закрывают сделки.</p>
            <p><strong>Ключевые плюсы:</strong></p>
            <p>• заявки не теряются;</p>
            <p>• снижается время ответа клиенту;</p>
            <p>• проще считать конверсию по этапам;</p>
            <p>• можно запускать повторные касания по сегментам.</p>
            <p>Оптимальная схема: бот собирает данные → CRM создаёт сделку → менеджер получает задачу → аналитика фиксирует результат.</p>
          </div>
        </div>
      </article>
    </main>
  );
}
