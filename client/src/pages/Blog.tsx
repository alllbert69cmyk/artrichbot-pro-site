import { useEffect } from "react";

const posts = [
  {
    href: "/blog/kak-chat-bot-uvelichivaet-prodazhi",
    title: "Как чат-бот увеличивает продажи: 7 рабочих сценариев",
    excerpt: "Практические сценарии, которые повышают конверсию заявки в оплату.",
  },
  {
    href: "/blog/telegram-bot-dlya-zayavok",
    title: "Telegram-бот для заявок: структура, этапы, ошибки",
    excerpt: "Как выстроить бота так, чтобы он не просто отвечал, а собирал лиды.",
  },
  {
    href: "/blog/integraciya-chat-bota-s-crm",
    title: "Интеграция чат-бота с CRM: зачем нужна и как внедрить",
    excerpt: "Разбираю, как связка бота и CRM влияет на скорость и качество продаж.",
  },
];

export default function Blog() {
  useEffect(() => {
    document.title = "Блог о чат-ботах и автоматизации продаж — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Блог о чат-ботах для бизнеса: продажи, Telegram-воронки, интеграции с CRM и практические рекомендации."
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <section className="container pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <a href="/" className="text-[13px] text-white/45 hover:text-white transition-colors">
            ← На главную
          </a>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Блог о чат-ботах для бизнеса
            </h1>
            <p className="text-lg text-white/55">
              Статьи о разработке чат-ботов, автоматизации продаж и интеграциях с CRM.
            </p>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <a
                key={post.href}
                href={post.href}
                className="block rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-6 hover:border-purple-400/35 transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-white/55 text-[15px]">{post.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
