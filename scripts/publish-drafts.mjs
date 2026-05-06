import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DRAFTS_DIR = path.join(ROOT, "content", "drafts");
const GENERATED_DIR = path.join(ROOT, "client", "src", "generated");
const GENERATED_POSTS_PATH = path.join(GENERATED_DIR, "blogPosts.ts");
const SITEMAP_PATH = path.join(ROOT, "client", "public", "sitemap.xml");

const STATIC_URLS = [
  "https://artrichbot.ru/",
  "https://artrichbot.ru/chatbot-dlya-biznesa",
  "https://artrichbot.ru/telegram-bot-dlya-prodazh",
  "https://artrichbot.ru/blog",
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const [, frontmatterRaw, body] = match;

  const data = {};
  for (const line of frontmatterRaw.split("\n")) {
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) continue;
    const key = rawKey.trim();
    const valueRaw = rest.join(":").trim();
    const unquoted = valueRaw.replace(/^"(.*)"$/, "$1");
    if (unquoted.startsWith("[") && unquoted.endsWith("]")) {
      try {
        data[key] = JSON.parse(unquoted);
        continue;
      } catch {
        // keep as string
      }
    }
    data[key] = unquoted;
  }
  return { data, body: body.trimEnd() };
}

function escapeTemplate(value = "") {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function toIsoDate(dateStr = "") {
  if (!dateStr) return new Date().toISOString().slice(0, 10);
  return dateStr.slice(0, 10);
}

function serializeFrontmatterValue(value) {
  if (Array.isArray(value)) return JSON.stringify(value);
  return `"${String(value ?? "").replace(/"/g, '\\"')}"`;
}

function toMarkdownWithFrontmatter(data, body) {
  const orderedKeys = ["title", "slug", "date", "summary", "keywords", "source", "status", "published_at"];
  const existingKeys = Object.keys(data);
  const keys = [...orderedKeys.filter((k) => existingKeys.includes(k)), ...existingKeys.filter((k) => !orderedKeys.includes(k))];
  const frontmatter = keys.map((key) => `${key}: ${serializeFrontmatterValue(data[key])}`).join("\n");
  return `---\n${frontmatter}\n---\n\n${body.trim()}\n`;
}

async function buildGeneratedPosts() {
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  await fs.mkdir(DRAFTS_DIR, { recursive: true });

  const files = (await fs.readdir(DRAFTS_DIR)).filter((f) => f.endsWith(".md")).sort();
  const posts = [];
  const today = new Date().toISOString().slice(0, 10);
  let newlyPublished = 0;

  for (const file of files) {
    const fullPath = path.join(DRAFTS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;

    const { data, body } = parsed;
    if (!data.slug || !data.title) continue;
    const status = String(data.status || "draft").toLowerCase();

    // Safety guard: publish each draft only once by flipping its status.
    if (status === "draft") {
      data.status = "published";
      data.published_at = today;
      newlyPublished += 1;
      await fs.writeFile(fullPath, toMarkdownWithFrontmatter(data, body), "utf8");
    } else if (status !== "published") {
      continue;
    }

    posts.push({
      slug: data.slug,
      title: data.title,
      date: toIsoDate(data.date),
      summary: data.summary || "",
      source: data.source || "",
      content: body,
    });
  }

  const uniqueBySlug = new Map();
  for (const post of posts) {
    if (!uniqueBySlug.has(post.slug)) uniqueBySlug.set(post.slug, post);
  }
  const normalizedPosts = Array.from(uniqueBySlug.values());

  // newest first
  normalizedPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  const fileContent = `export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  source: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
${normalizedPosts
  .map(
    (p) => `  {
    slug: "${escapeTemplate(p.slug)}",
    title: "${escapeTemplate(p.title)}",
    date: "${escapeTemplate(p.date)}",
    summary: "${escapeTemplate(p.summary)}",
    source: "${escapeTemplate(p.source)}",
    content: \`${escapeTemplate(p.content)}\`,
  }`
  )
  .join(",\n")}
];
`;

  await fs.writeFile(GENERATED_POSTS_PATH, fileContent, "utf8");
  return { posts: normalizedPosts, newlyPublished };
}

async function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const allUrls = [
    ...STATIC_URLS.map((url) => ({ url, priority: url === "https://artrichbot.ru/" ? "1.0" : "0.9", changefreq: "weekly" })),
    ...posts.map((p) => ({
      url: `https://artrichbot.ru/blog/${p.slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: p.date || today,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    ({ url, priority, changefreq, lastmod }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  await fs.writeFile(SITEMAP_PATH, xml, "utf8");
}

async function run() {
  const { posts, newlyPublished } = await buildGeneratedPosts();
  await buildSitemap(posts);
  console.log(`Published now: ${newlyPublished}. Total visible posts: ${posts.length}.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
