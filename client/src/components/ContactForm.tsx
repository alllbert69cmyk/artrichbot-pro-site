import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Пожалуйста, введите ваше имя");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Пожалуйста, введите вашу почту");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Пожалуйста, введите корректный email");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Пожалуйста, введите сообщение");
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast.error("Сообщение должно быть не менее 10 символов");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Имитация отправки формы (в реальном приложении здесь был бы API запрос)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Создаём mailto ссылку для отправки письма
      const mailtoLink = `mailto:alllbert0692@bk.ru?subject=Новая заявка от ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
        `Имя: ${formData.name}\nПочта: ${formData.email}\n\nСообщение:\n${formData.message}`
      )}`;

      // Открываем почтовый клиент
      window.location.href = mailtoLink;

      // Показываем успешное сообщение
      toast.success("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");

      // Очищаем форму
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSubmitted(true);

      // Скрываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error("Произошла ошибка при отправке формы. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Ваше имя
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Иван Иванов"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white/5 border-white/10 focus:border-purple-500 transition"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Ваша почта
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ivan@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white/5 border-white/10 focus:border-purple-500 transition"
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Ваше сообщение
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Расскажите о вашем проекте и целях..."
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            className="bg-white/5 border-white/10 focus:border-purple-500 transition resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {formData.message.length} / 1000 символов
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Отправка...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Отправить заявку
            </>
          )}
        </Button>

        {/* Success Message */}
        {submitted && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-sm text-green-400">
              Спасибо! Ваша заявка успешно отправлена.
            </p>
          </div>
        )}
      </form>

      {/* Info Box */}
      <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300">
          <p className="font-medium mb-1">Быстрый ответ</p>
          <p>
            Мы обычно отвечаем на заявки в течение 2-4 часов. Вы также можете написать нам напрямую в Telegram: <strong>@ArtRich92</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
