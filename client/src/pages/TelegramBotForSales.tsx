import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const pageDescription =
  "Чат-бот Telegram для продаж: воронка, квалификация лидов, автоматические ответы и интеграции с CRM. Запуск за 3 дня.";

export default function TelegramBotForSales() {
  useEffect(() => {
    document.title = "Чат-бот Telegram для продаж — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", pageDescription);

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Разработка Telegram-ботов для продаж",
      name: "Чат-бот Telegram для продаж",
      provider: {
        "@type": "ProfessionalService",
        name: "ArtRichBot",
        url: "https://artrichbot.ru/",
      },
      areaServed: "RU",
      description: pageDescription,
      url: "https://artrichbot.ru/telegram-bot-dlya-prodazh",
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Для каких задач подходит Telegram-бот для продаж?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Telegram-бот подходит для сбора заявок, квалификации лидов, ответов на вопросы, автоворонки и передачи горячих клиентов менеджеру.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли внедрить аналитику в Telegram-бота?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, в Telegram-боте настраивается аналитика по этапам воронки, чтобы отслеживать конверсию и эффективность сценариев продаж.",
          },
        },
      ],
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: "https://artrichbot.ru/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Чат-бот Telegram для продаж",
          item: "https://artrichbot.ru/telegram-bot-dlya-prodazh",
        },
      ],
    };

    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "schema-service-telegram-sales";
    serviceScript.text = JSON.stringify(serviceSchema);
    document.head.appendChild(serviceScript);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "schema-faq-telegram-sales";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "schema-breadcrumb-telegram-sales";
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById("schema-service-telegram-sales")?.remove();
      document.getElementById("schema-faq-telegram-sales")?.remove();
      document.getElementById("schema-breadcrumb-telegram-sales")?.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#06060b] text-white/90">
      <section className="container pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <a href="/" className="text-[13px] text-white/45 hover:text-white transition-colors">
            ← На главную
          </a>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Чат-бот Telegram для продаж: автоматизация воронки
            </h1>
            <p className="text-lg text-white/55 leading-relaxed">
              Создаю Telegram-ботов, которые доводят клиента до целевого действия: заявка, бронь, покупка или запись.
              Бот работает по заранее продуманному сценарию и помогает увеличивать конверсию продаж.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <article className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-6 space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                Что делает Telegram-бот
              </h2>
              <ul className="space-y-2 text-[15px] text-white/60">
                <li>• Обрабатывает входящие сообщения без задержек</li>
                <li>• Уточняет потребности и сегментирует клиентов</li>
                <li>• Передаёт горячие лиды менеджеру</li>
                <li>• Отправляет напоминания и допродажи</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-6 space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Результат для бизнеса
              </h2>
              <ul className="space-y-2 text-[15px] text-white/60">
                <li>• Рост скорости обработки заявок</li>
                <li>• Увеличение конверсии на ключевых этапах</li>
                <li>• Экономия времени команды продаж</li>
                <li>• Прозрачная аналитика по воронке</li>
              </ul>
            </article>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-7 space-y-3">
            <h2 className="text-2xl font-semibold">Разработка Telegram-бота под ваш процесс</h2>
            <p className="text-[15px] text-white/60 leading-relaxed">
              Перед запуском настраиваю логику диалогов, обработку возражений, точки дожима и интеграции.
              Это позволяет использовать Telegram-бота как полноценный инструмент продаж, а не просто автоответчик.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0"
              onClick={() => window.open("https://t.me/ai_asist_helper_bot", "_blank")}
            >
              Рассчитать Telegram-бота
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="/chatbot-dlya-biznesa"
              className="inline-flex items-center text-[14px] text-white/60 hover:text-white transition-colors"
            >
              Чат-бот для бизнеса →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
