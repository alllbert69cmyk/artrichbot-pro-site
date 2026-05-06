import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";

export function AIAgentCTA() {
  const handleOpenBot = () => {
    // Открыть Telegram бота с параметром для AI-агента
    window.open("https://t.me/ArtRich92?start=pricing_calc", "_blank");
  };

  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Персональный расчет</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Узнайте точную стоимость вашего бота
              </h2>
              <p className="text-lg text-muted-foreground">
                Наш AI-агент задаст вам несколько вопросов и рассчитает оптимальную стоимость под ваши потребности
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: MessageCircle,
                  title: "Персональный подход",
                  desc: "AI-агент поймет ваши требования",
                },
                {
                  icon: Zap,
                  title: "Мгновенный расчет",
                  desc: "Получите смету за 2 минуты",
                },
                {
                  icon: ArrowRight,
                  title: "Без обязательств",
                  desc: "Просто узнайте цену",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary/20 mb-4">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleOpenBot}
                className="bg-gradient-primary hover:opacity-90 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
              >
                💬 Открыть AI-агента
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5"
              >
                Позвоните нам
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12 pt-8 border-t border-white/10">
              <div className="text-center text-sm">
                <div className="font-semibold text-green-400">✓ Быстро</div>
                <div className="text-xs text-muted-foreground">2-3 минуты</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center text-sm">
                <div className="font-semibold text-blue-400">✓ Бесплатно</div>
                <div className="text-xs text-muted-foreground">Без платежей</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center text-sm">
                <div className="font-semibold text-purple-400">✓ Точно</div>
                <div className="text-xs text-muted-foreground">Под ваши нужды</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
