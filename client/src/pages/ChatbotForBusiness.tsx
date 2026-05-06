import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

const pageDescription =
  "Чат-бот для бизнеса под ключ: автоматизация заявок, продаж и поддержки. Интеграция с CRM, запуск за 3 дня.";

export default function ChatbotForBusiness() {
  useEffect(() => {
    document.title = "Чат-бот для бизнеса под ключ — ArtRichBot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", pageDescription);

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Разработка чат-ботов для бизнеса",
      name: "Чат-бот для бизнеса под ключ",
      provider: {
        "@type": "ProfessionalService",
        name: "ArtRichBot",
        url: "https://artrichbot.ru/",
      },
      areaServed: "RU",
      description: pageDescription,
      url: "https://artrichbot.ru/chatbot-dlya-biznesa",
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Сколько занимает разработка чат-бота для бизнеса?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Базовый запуск обычно занимает 3 рабочих дня. Для более сложных интеграций срок может увеличиться до 5 рабочих дней.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли подключить чат-бота к CRM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, чат-бот интегрируется с CRM и другими системами, чтобы передавать лиды и отслеживать воронку продаж.",
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
          name: "Чат-бот для бизнеса",
          item: "https://artrichbot.ru/chatbot-dlya-biznesa",
        },
      ],
    };

    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "schema-service-chatbot-business";
    serviceScript.text = JSON.stringify(serviceSchema);
    document.head.appendChild(serviceScript);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "schema-faq-chatbot-business";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "schema-breadcrumb-chatbot-business";
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById("schema-service-chatbot-business")?.remove();
      document.getElementById("schema-faq-chatbot-business")?.remove();
      document.getElementById("schema-breadcrumb-chatbot-business")?.remove();
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
              Чат-бот для бизнеса: разработка под ваши задачи
            </h1>
            <p className="text-lg text-white/55 leading-relaxed">
              Разрабатываю чат-ботов для бизнеса, которые принимают заявки 24/7, помогают отделу продаж
              и снижают нагрузку на сотрудников. Решение адаптируется под вашу нишу и воронку.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Квалификация лидов и сбор заявок",
              "Автоответы клиентам без задержек",
              "Интеграция с CRM и аналитикой",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-400" />
                  <p className="text-[14px] text-white/70">{item}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a12] p-7 space-y-4">
            <h2 className="text-2xl font-semibold">Что входит в разработку чат-бота для бизнеса</h2>
            <ul className="space-y-2 text-white/60 text-[15px] leading-relaxed">
              <li>• Анализ бизнес-процесса и построение сценариев диалогов</li>
              <li>• Настройка этапов воронки: от первого контакта до заявки</li>
              <li>• Подключение Telegram, WhatsApp, сайта и CRM</li>
              <li>• Тестирование, запуск и первичная оптимизация конверсии</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0"
              onClick={() => window.open("https://t.me/ai_asist_helper_bot", "_blank")}
            >
              <Bot className="w-4 h-4 mr-2" />
              Рассчитать стоимость бота
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="/telegram-bot-dlya-prodazh"
              className="inline-flex items-center text-[14px] text-white/60 hover:text-white transition-colors"
            >
              Telegram-бот для продаж →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
