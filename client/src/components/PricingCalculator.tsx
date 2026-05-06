import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { toast } from "sonner";

export function PricingCalculator() {
  const [botCount, setBotCount] = useState(1);
  const [dialogsPerMonth, setDialogsPerMonth] = useState(1000);
  const [features, setFeatures] = useState({
    aiAnswers: false,
    customization: false,
    support24: false,
    analytics: false,
  });

  // Расчет стоимости
  const basePrice = 5000;
  const pricePerBot = 3000;
  const pricePerThousandDialogs = 500;
  const featurePrice = {
    aiAnswers: 2000,
    customization: 3000,
    support24: 5000,
    analytics: 1500,
  };

  let totalPrice = basePrice + botCount * pricePerBot + (dialogsPerMonth / 1000) * pricePerThousandDialogs;

  Object.entries(features).forEach(([key, enabled]) => {
    if (enabled) {
      totalPrice += featurePrice[key as keyof typeof featurePrice];
    }
  });

  const handleFeatureToggle = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleGetQuote = () => {
    const message = `Мне нужна консультация по расчету стоимости:
- Количество ботов: ${botCount}
- Диалогов в месяц: ${dialogsPerMonth}
- AI ответы: ${features.aiAnswers ? "Да" : "Нет"}
- Кастомизация: ${features.customization ? "Да" : "Нет"}
- Поддержка 24/7: ${features.support24 ? "Да" : "Нет"}
- Аналитика: ${features.analytics ? "Да" : "Нет"}
- Примерная стоимость: ${totalPrice.toLocaleString("ru-RU")}₽`;

    window.location.href = `mailto:alllbert0692@bk.ru?subject=Запрос на расчет стоимости&body=${encodeURIComponent(message)}`;
    toast.success("Письмо готово к отправке!");
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Calculator */}
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold mb-4">
            Количество ботов: <span className="gradient-text">{botCount}</span>
          </label>
          <Slider
            value={[botCount]}
            onValueChange={(value) => setBotCount(value[0])}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1 бот</span>
            <span>20+ ботов</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-4">
            Диалогов в месяц: <span className="gradient-text">{dialogsPerMonth.toLocaleString("ru-RU")}</span>
          </label>
          <Slider
            value={[dialogsPerMonth]}
            onValueChange={(value) => setDialogsPerMonth(value[0])}
            min={1000}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1K диалогов</span>
            <span>100K+ диалогов</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-4">Дополнительные функции</label>
          <div className="space-y-3">
            {[
              { key: "aiAnswers", label: "AI-ответы", price: featurePrice.aiAnswers },
              { key: "customization", label: "Полная кастомизация", price: featurePrice.customization },
              { key: "support24", label: "Поддержка 24/7", price: featurePrice.support24 },
              { key: "analytics", label: "Продвинутая аналитика", price: featurePrice.analytics },
            ].map(({ key, label, price }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={features[key as keyof typeof features]}
                  onChange={() => handleFeatureToggle(key as keyof typeof features)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 cursor-pointer"
                />
                <span className="text-sm flex-1 group-hover:text-purple-400 transition">{label}</span>
                <span className="text-xs text-muted-foreground">+{price.toLocaleString("ru-RU")}₽</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Card */}
      <div className="sticky top-20">
        <Card className="glass border-purple-500/30 p-8 space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Примерная стоимость</p>
            <div className="text-5xl font-bold gradient-text">
              {totalPrice.toLocaleString("ru-RU")}₽
            </div>
            <p className="text-xs text-muted-foreground mt-2">в месяц</p>
          </div>

          <div className="space-y-3 py-6 border-t border-b border-white/10">
            <div className="flex justify-between text-sm">
              <span>Базовая стоимость</span>
              <span className="font-semibold">{basePrice.toLocaleString("ru-RU")}₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{botCount} бот(ов) × {pricePerBot.toLocaleString("ru-RU")}₽</span>
              <span className="font-semibold">{(botCount * pricePerBot).toLocaleString("ru-RU")}₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{(dialogsPerMonth / 1000).toFixed(1)}K диалогов × {pricePerThousandDialogs.toLocaleString("ru-RU")}₽</span>
              <span className="font-semibold">{((dialogsPerMonth / 1000) * pricePerThousandDialogs).toLocaleString("ru-RU")}₽</span>
            </div>
            {Object.entries(features).map(([key, enabled]) => {
              if (!enabled) return null;
              const price = featurePrice[key as keyof typeof featurePrice];
              const labels: Record<string, string> = {
                aiAnswers: "AI-ответы",
                customization: "Кастомизация",
                support24: "Поддержка 24/7",
                analytics: "Аналитика",
              };
              return (
                <div key={key} className="flex justify-between text-sm">
                  <span>{labels[key]}</span>
                  <span className="font-semibold text-green-400">+{price.toLocaleString("ru-RU")}₽</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              ✓ Это примерная стоимость. Финальная цена может отличаться в зависимости от ваших специфических требований.
            </p>
            <Button
              onClick={handleGetQuote}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Получить точный расчет
            </Button>
            <Button
              variant="outline"
              className="w-full border-white/20 hover:bg-white/5"
              onClick={() => {
                window.location.href = "https://t.me/ArtRich92";
              }}
            >
              Написать в Telegram
            </Button>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">ЧТО ВХОДИТ В СТОИМОСТЬ:</p>
            <ul className="space-y-2">
              {[
                "Разработка и настройка бота",
                "Интеграция с вашими системами",
                "Обучение команды",
                "Первый месяц поддержки",
                "Аналитика и отчеты",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
