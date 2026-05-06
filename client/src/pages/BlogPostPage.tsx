import { blogPosts } from "@/generated/blogPosts";
import { useEffect } from "react";

type Props = {
  params: {
    slug: string;
  };
};

function markdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const html: string[] = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      html.push(`<h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">${line.slice(2)}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      html.push(`<h2 class="text-2xl md:text-3xl font-semibold mt-8 mb-4">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      html.push(`<h3 class="text-xl font-semibold mt-6 mb-3">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      html.push(`<li class="ml-5 list-disc text-[15px] text-white/70 leading-relaxed">${line.slice(2)}</li>`);
      continue;
    }
    if (line.trim().length === 0) {
      html.push("<div class='h-2'></div>");
      continue;
    }
    html.push(`<p class="text-[15px] text-white/70 leading-relaxed">${line}</p>`);
  }
  return html.join("\n");
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — ArtRichBot`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", post.summary || post.title);
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#06060b] text-white/90">
        <section className="container pt-24 pb-16">
          <div className="max-w-3xl mx-auto">
            <a href="/blog" className="text-[13px] text-white/45 hover:text-white transition-colors">
              ← В блог
            </a>
            <h1 className="text-3xl font-bold mt-6">Статья не найдена</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <article className="container pt-24 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <a href="/blog" className="text-[13px] text-white/45 hover:text-white transition-colors">
            ← В блог
          </a>
          <p className="text-[12px] text-white/35">{post.date}</p>
          <div
            className="space-y-2"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
          {post.source && (
            <p className="text-[14px] text-white/45 mt-8">
              Источник:{" "}
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/80 hover:text-purple-200 transition-colors underline"
              >
                {post.source}
              </a>
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
