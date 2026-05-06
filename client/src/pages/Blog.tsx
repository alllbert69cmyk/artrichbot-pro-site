import { useEffect } from "react";
import { blogPosts } from "@/generated/blogPosts";

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
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-6 hover:border-purple-400/35 transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-white/55 text-[15px]">{post.summary || "Новая статья в блоге."}</p>
              </a>
            ))}
            {blogPosts.length === 0 && (
              <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-6 text-white/60 text-[15px]">
                Пока нет опубликованных статей. После merge файлов в `content/drafts` публикация появится здесь автоматически.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
