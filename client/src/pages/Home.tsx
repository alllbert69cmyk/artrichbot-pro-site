import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Shield,
  Workflow,
  Rocket,
  Zap,
  Phone,
  Mail,
  ChevronDown,
  Bot,
  Clock,
  CheckCircle,
  Star,
  Users,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Возможности" },
  { href: "#process", label: "Процесс" },
  { href: "#about", label: "Обо мне" },
  { href: "#pricing", label: "Стоимость" },
  { href: "#contacts", label: "Контакты" },
];

const METRIKA_COUNTER_ID = 109086841;
type GoalName = "tg_click" | "wa_click" | "calc_click" | "contact_click";

function trackGoal(goal: GoalName) {
  if (typeof window !== "undefined" && typeof (window as any).ym === "function") {
    (window as any).ym(METRIKA_COUNTER_ID, "reachGoal", goal);
  }
}

function openTracked(url: string, goal: GoalName) {
  trackGoal(goal);
  window.open(url, "_blank");
}

/* ===================================================================
   DESIGN PHILOSOPHY: "Refined Minimalism"
   - Deep dark backgrounds with subtle depth
   - Limited color palette: purple (#7c3aed) + indigo (#6366f1) as accents
   - Massive whitespace between sections (py-28 to py-36)
   - Large, confident typography (text-5xl to text-7xl)
   - Subtle entrance animations (fade-up, scale)
   - One clear CTA per viewport
   - Social proof integrated naturally
   - Asymmetric layouts for visual interest
=================================================================== */

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Animated Counter
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// FAQ Item
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className={`rounded-xl border transition-all duration-300 mb-3 overflow-hidden ${
        open
          ? "border-purple-500/20 bg-white/[0.03]"
          : "border-white/[0.07] bg-white/[0.01] hover:border-white/[0.12]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-medium text-[16px] text-white/90 group-hover:text-white transition-colors pr-6">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
            open ? "rotate-180 text-purple-400" : "text-white/30"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-48" : "max-h-0"
        }`}
      >
        <p className="text-white/55 leading-relaxed text-[15px] px-6 pb-5">{answer}</p>
      </div>
    </motion.div>
  );
}

// Mobile menu overlay
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a0a12] border-l border-white/[0.06] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-bold">ArtRichBot</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center px-4 py-3.5 rounded-xl text-[15px] text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-4 pb-8">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 h-12 text-[14px] font-semibold"
                onClick={() => { openTracked("https://t.me/ArtRich92", "tg_click"); onClose(); }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Написать в Telegram
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Animated chat preview for Hero section
function HeroChatPreview() {
  const messages = [
    { from: "user", text: "Хочу автоматизировать приём заявок" },
    { from: "bot", text: "Отлично! Расскажите о вашем бизнесе — я подберу оптимальное решение 🤖" },
    { from: "user", text: "У меня интернет-магазин, ~200 заявок в день" },
    { from: "bot", text: "Понял! Для 200 заявок/день подойдёт AI-бот с CRM-интеграцией. Стоимость — от 15 000 ₽. Запуск за 3 дня ✅" },
  ];
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    messages.forEach((_, i) => {
      setTimeout(() => setVisible((prev) => [...prev, i]), i * 1200 + 400);
    });
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a12] shadow-2xl">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05] bg-[#0d0d16]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white/90">ArtRichBot</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-white/40">онлайн</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-3 min-h-[300px]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={visible.includes(i) ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                msg.from === "user"
                  ? "bg-purple-600/80 text-white rounded-br-sm"
                  : "bg-white/[0.06] text-white/80 rounded-bl-sm border border-white/[0.04]"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {visible.length === messages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-start"
          >
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/[0.04] flex gap-1 items-center">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: `${dot * 0.15}s`, animationDuration: "0.9s" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[12px] text-white/20 flex-1">Напишите сообщение...</span>
          <div className="w-7 h-7 rounded-lg bg-purple-600/60 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Process section left visual — SVG workflow diagram
function ProcessVisual() {
  const nodes = [
    { x: 80,  y: 60,  num: "01", label: "Консультация",   color: "#a78bfa" },
    { x: 220, y: 160, num: "02", label: "Проектирование", color: "#818cf8" },
    { x: 80,  y: 260, num: "03", label: "Разработка",     color: "#60a5fa" },
    { x: 220, y: 360, num: "04", label: "Запуск",         color: "#34d399" },
  ];
  const lines = [
    { x1: 80, y1: 80, x2: 220, y2: 145 },
    { x1: 220, y1: 175, x2: 80, y2: 245 },
    { x1: 80, y1: 275, x2: 220, y2: 345 },
  ];

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.05] bg-[#0a0a14] overflow-hidden" style={{ minHeight: 440 }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/[0.06] via-transparent to-indigo-600/[0.04]" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(167,139,250,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <svg
        viewBox="0 0 300 440"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connecting lines */}
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(167,139,250,0.25)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.3 + 0.4, ease: "easeOut" }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.25 + 0.2, ease: "easeOut" }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Outer ring */}
            <circle cx={node.x} cy={node.y} r="32" fill="none" stroke={node.color} strokeOpacity="0.15" strokeWidth="1" />
            {/* Inner circle */}
            <circle cx={node.x} cy={node.y} r="24" fill={node.color} fillOpacity="0.1" stroke={node.color} strokeOpacity="0.4" strokeWidth="1" />
            {/* Number */}
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="monospace"
              fill={node.color}
              fillOpacity="0.9"
            >
              {node.num}
            </text>
            {/* Label */}
            <text
              x={node.x === 80 ? node.x + 42 : node.x - 42}
              y={node.y + 1}
              textAnchor={node.x === 80 ? "start" : "end"}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="500"
              fontFamily="system-ui, sans-serif"
              fill="rgba(255,255,255,0.55)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Floating data packets on lines */}
        {lines.map((l, i) => (
          <motion.circle
            key={`packet-${i}`}
            r="3"
            fill={nodes[i].color}
            fillOpacity="0.7"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 1.5, delay: i * 0.5 + 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            style={{
              offsetPath: `path("M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}")`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Bottom label */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-white/40">Процесс запущен</span>
        </div>
      </div>
    </div>
  );
}

// Section wrapper with scroll animation
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowScrollTop(y > 500);

      // Определяем активную секцию
      const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060b] text-white/90 overflow-hidden">

      {/* === SCROLL PROGRESS BAR === */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* === MOBILE MENU === */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* === BACKGROUND AMBIENT === */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-600/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/[0.03] rounded-full blur-[150px]" />
      </div>

      {/* === NAVIGATION === */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#06060b]/80 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">ArtRichBot</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] transition-colors duration-200 relative ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-purple-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:flex bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-sm h-9 px-5 text-[13px] font-medium transition-all duration-200"
              onClick={() => openTracked("https://t.me/ArtRich92", "contact_click")}
            >
              Связаться
            </Button>
            {/* Burger button — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 min-h-[90vh] flex items-center">
        <div className="container relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={staggerItem}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/[0.08] border border-purple-500/[0.15]">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse-soft" />
                  <span className="text-[12px] font-medium text-purple-300/90 tracking-wide">
                    AI-автоматизация для бизнеса
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight"
              >
                Чат-боты, которые{" "}
                <span className="gradient-text">увеличивают продажи</span>{" "}
                на 80-120%
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg md:text-xl text-white/45 max-w-[520px] leading-relaxed"
              >
                Разрабатываю AI-ботов для любых соцсетей, мессенджеров и сайтов, которые обрабатывают заявки, 
                продают и поддерживают клиентов — без выходных и перерывов.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 h-13 px-8 text-[15px] font-semibold shadow-xl shadow-purple-600/20 hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => openTracked("https://t.me/ai_asist_helper_bot", "calc_click")}
                >
                  Получить расчёт бесплатно
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] text-white/80 h-13 px-8 text-[15px] font-medium transition-all duration-200"
                  onClick={() => openTracked("https://t.me/ArtRich92", "tg_click")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Написать в Telegram
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={staggerItem} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 border-2 border-[#06060b] flex items-center justify-center"
                    >
                      <Users className="w-3.5 h-3.5 text-purple-300/70" />
                    </div>
                  ))}
                </div>
                <div className="text-[13px] text-white/40">
                  <span className="text-white/70 font-medium">150+ проектов</span> — клиенты довольны на 98%
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-3xl blur-2xl" />
                <HeroChatPreview />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass px-4 py-3 rounded-xl animate-float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[12px] font-medium text-white/70">Бот онлайн 24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-10 border-t border-white/[0.04]"
          >
            {[
              { value: 150, suffix: "+", label: "проектов реализовано" },
              { value: 98, suffix: "%", label: "клиентов довольны" },
              { value: 24, suffix: "/7", label: "работа без перерывов" },
              { value: 3, suffix: " дня", label: "средний срок запуска" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[13px] text-white/35 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === PROBLEM SECTION === */}
      <Section className="section-padding section-zebra-light" id="problem">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
              Проблема
            </span>
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
              Вы теряете клиентов каждый день,{" "}
              <span className="text-white/40">пока не отвечаете на сообщения</span>
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Clock,
                stat: "67%",
                text: "клиентов уходят, если не получают ответ в течение 5 минут",
              },
              {
                icon: Users,
                stat: "40ч",
                text: "в месяц тратит менеджер на однотипные ответы и обработку заявок",
              },
              {
                icon: TrendingUp,
                stat: "3x",
                text: "больше лидов можно обработать с AI-ботом без найма сотрудников",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="card-premium p-7 text-center"
                >
                  <div className="w-11 h-11 mx-auto rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-purple-400/80" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{item.stat}</div>
                  <p className="text-[14px] text-white/40 leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* === FEATURES SECTION === */}
      <Section className="section-padding section-zebra-dark" id="features">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
              Возможности
            </span>
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
              Всё, что нужно для{" "}
              <span className="gradient-text">автоматизации продаж</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Комплексное решение, которое работает за вас
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              {
                icon: MessageCircle,
                title: "AI-ответы 24/7",
                desc: "Мгновенные персонализированные ответы клиентам в любое время суток",
                color: "text-purple-400",
                bg: "bg-purple-500/[0.08]",
                border: "border-purple-500/[0.12]",
              },
              {
                icon: TrendingUp,
                title: "Рост конверсии",
                desc: "Автоматическая квалификация лидов и увеличение продаж на 80-120%",
                color: "text-emerald-400",
                bg: "bg-emerald-500/[0.08]",
                border: "border-emerald-500/[0.12]",
              },
              {
                icon: Workflow,
                title: "Интеграция с CRM",
                desc: "Bitrix24, AmoCRM, Google Sheets и другие системы — всё подключу",
                color: "text-blue-400",
                bg: "bg-blue-500/[0.08]",
                border: "border-blue-500/[0.12]",
              },
              {
                icon: Shield,
                title: "Безопасность данных",
                desc: "Шифрование, соответствие GDPR, хранение на ваших серверах",
                color: "text-amber-400",
                bg: "bg-amber-500/[0.08]",
                border: "border-amber-500/[0.12]",
              },
              {
                icon: Rocket,
                title: "Запуск за 3 дня",
                desc: "От идеи до работающего бота — без кода и сложных настроек",
                color: "text-rose-400",
                bg: "bg-rose-500/[0.08]",
                border: "border-rose-500/[0.12]",
              },
              {
                icon: BarChart3,
                title: "Аналитика и отчёты",
                desc: "Детальные метрики: конверсии, диалоги, удовлетворённость клиентов",
                color: "text-cyan-400",
                bg: "bg-cyan-500/[0.08]",
                border: "border-cyan-500/[0.12]",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="card-premium p-7 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-2.5">{feature.title}</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* === SEO SERVICES BLOCK === */}
      <Section className="section-padding section-zebra-light" id="services">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-5">
              <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
                Услуги
              </span>
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
                Разработка чат-ботов под ключ для роста продаж
              </h2>
              <p className="text-white/45 text-lg leading-relaxed max-w-3xl mx-auto">
                Запускаю чат-ботов, которые автоматизируют продажи, обработку заявок и поддержку клиентов.
                Основной фокус — коммерческий результат: больше заявок, выше конверсия и меньше ручной рутины.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <article className="card-premium p-7">
                <h3 className="text-[18px] font-semibold text-white mb-3">
                  Чат-бот для бизнеса
                </h3>
                <p className="text-[14px] text-white/45 leading-relaxed">
                  Проектирую сценарии под ваш бизнес-процесс: квалификация лидов, ответы на частые вопросы,
                  прогрев и передача горячих клиентов в отдел продаж.
                </p>
              </article>

              <article className="card-premium p-7">
                <h3 className="text-[18px] font-semibold text-white mb-3">
                  Чат-бот Telegram для продаж
                </h3>
                <p className="text-[14px] text-white/45 leading-relaxed">
                  Создаю Telegram-ботов для воронок, автопродаж и консультаций. Подключаю формы, CRM и аналитику,
                  чтобы отслеживать каждую заявку и повышать конверсию.
                </p>
              </article>

              <article className="card-premium p-7">
                <h3 className="text-[18px] font-semibold text-white mb-3">
                  Интеграции и автоматизация
                </h3>
                <p className="text-[14px] text-white/45 leading-relaxed">
                  Интегрирую чат-ботов с CRM, таблицами и внешними сервисами. В результате заявки не теряются,
                  команда работает быстрее, а клиент получает ответ за секунды.
                </p>
              </article>
            </div>

            <p className="text-[14px] text-white/35 leading-relaxed">
              Если вам нужна разработка чат-ботов под ваш кейс, напишите мне в Telegram — подготовлю структуру
              решения, оценку сроков и запуск в течение 3 дней.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              <a href="/chatbot-dlya-biznesa" className="text-purple-300/75 hover:text-purple-200 transition-colors">
                Подробнее: чат-бот для бизнеса
              </a>
              <a href="/telegram-bot-dlya-prodazh" className="text-purple-300/75 hover:text-purple-200 transition-colors">
                Подробнее: чат-бот Telegram для продаж
              </a>
              <a href="/blog" className="text-purple-300/75 hover:text-purple-200 transition-colors">
                Читать блог о чат-ботах
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* === HOW IT WORKS === */}
      <Section className="section-padding section-zebra-dark" id="process">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
            {/* Left - Process Visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 bg-gradient-to-br from-purple-600/[0.06] to-indigo-600/[0.04] rounded-3xl blur-3xl" />
              <ProcessVisual />
            </div>

            {/* Right - Steps */}
            <div className="space-y-10">
              <div className="space-y-5">
                <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
                  Процесс
                </span>
                <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
                  От идеи до результата{" "}
                  <span className="text-white/40">за 4 шага</span>
                </h2>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-6"
              >
                {[
                  {
                    num: "01",
                    title: "Бесплатная консультация",
                    desc: "Обсуждаю ваши цели, аудиторию и задачи. Предлагаю оптимальное решение.",
                  },
                  {
                    num: "02",
                    title: "Проектирование сценариев",
                    desc: "Создаю диалоги, воронки продаж и сценарии обработки заявок.",
                  },
                  {
                    num: "03",
                    title: "Разработка и интеграция",
                    desc: "Подключаю к CRM, мессенджерам и вашим бизнес-системам.",
                  },
                  {
                    num: "04",
                    title: "Запуск и оптимизация",
                    desc: "Тестирую, запускаю и непрерывно улучшаю результаты.",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex gap-5 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-purple-500/20 group-hover:bg-purple-500/[0.05] transition-all duration-300">
                      <span className="text-[13px] font-bold text-purple-400/70 font-mono">
                        {step.num}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[16px] font-semibold text-white mb-1.5">{step.title}</h3>
                      <p className="text-[14px] text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* === SOCIAL PROOF / TESTIMONIALS === */}
      <Section className="section-padding section-zebra-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
              Отзывы
            </span>
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
              Что говорят <span className="gradient-text">мои клиенты</span>
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto"
          >
            {[
              {
                text: "Бот окупился за первую неделю. Конверсия из заявки в продажу выросла с 12% до 34%. Рекомендую однозначно.",
                name: "Алексей К.",
                role: "Интернет-магазин",
                stars: 5,
              },
              {
                text: "Раньше терял клиентов ночью и в выходные. Теперь бот обрабатывает 100% заявок мгновенно. Продажи выросли на 90%.",
                name: "Марина С.",
                role: "Онлайн-школа",
                stars: 5,
              },
              {
                text: "Профессиональный подход, быстрый запуск и отличная поддержка. Бот работает стабильно уже 8 месяцев без сбоев.",
                name: "Дмитрий В.",
                role: "Сервисная компания",
                stars: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card-premium p-7"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[15px] text-white/60 leading-relaxed mb-6">
                  "{review.text}"
                </p>
                <div>
                  <p className="text-[14px] font-medium text-white/80">{review.name}</p>
                  <p className="text-[12px] text-white/35 mt-0.5">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* === ABOUT ME === */}
      <Section className="section-padding section-zebra-dark" id="about">
        <div className="container">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center max-w-5xl mx-auto">

            {/* Left — Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow behind photo */}
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-600/10 to-indigo-600/8 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl">
                <img
                  src="/photo.png"
                  alt="Альберт — разработчик AI чат-ботов"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 480 }}
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060b]/40 via-transparent to-transparent" />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 glass px-4 py-3 rounded-xl animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white/90">5+ лет опыта</p>
                    <p className="text-[10px] text-white/40">в AI-автоматизации</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-7"
            >
              <motion.div variants={staggerItem}>
                <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
                  Обо мне
                </span>
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-2">
                <h2 className="text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight">
                  Привет, я <span className="gradient-text">Альберт</span>
                </h2>
                <p className="text-[15px] text-white/40 font-medium">Разработчик AI чат-ботов для бизнеса</p>
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-4 text-[15px] text-white/55 leading-relaxed">
                <p>
                  Занимаюсь разработкой умных чат-ботов уже <span className="text-white/80 font-medium">более 5 лет</span>. За это время реализовал <span className="text-white/80 font-medium">150+ проектов</span> для бизнесов разного масштаба — от небольших интернет-магазинов до крупных онлайн-школ и сервисных компаний.
                </p>
                <p>
                  Специализируюсь на создании ботов, которые реально приносят деньги: автоматизируют продажи, мгновенно обрабатывают заявки и поддерживают клиентов круглосуточно — без найма дополнительных сотрудников.
                </p>
                <p>
                  Работаю лично с каждым клиентом — без посредников и команды. Вы общаетесь напрямую со мной от первого звонка до запуска.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { value: "150+", label: "проектов" },
                  { value: "5+", label: "лет опыта" },
                  { value: "98%", label: "довольных клиентов" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-2xl font-bold text-white/90 tracking-tight">{s.value}</p>
                    <p className="text-[11px] text-white/35 mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Skills badges */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-2 pt-1">
                {["Telegram боты", "WhatsApp боты", "AI / GPT интеграция", "CRM интеграция", "Воронки продаж", "Автоматизация"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[12px] font-medium text-purple-300/70 bg-purple-500/[0.08] border border-purple-500/[0.12]">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={staggerItem}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 h-12 px-7 text-[14px] font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => openTracked("https://t.me/ArtRich92", "contact_click")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Написать напрямую
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* === AI AGENT CTA === */}
      <Section className="section-padding section-zebra-dark" id="pricing">
        <div className="container">
          <div className="max-w-3xl mx-auto relative">
            {/* Background glow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-purple-600/[0.08] via-indigo-600/[0.04] to-transparent rounded-[2rem] blur-2xl" />

            <div className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a12]/80 backdrop-blur-xl overflow-hidden">
              {/* Top gradient line */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <div className="p-10 md:p-14 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/[0.08] border border-purple-500/[0.12]">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[12px] font-medium text-purple-300/80">Персональный расчёт</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                  Узнайте стоимость вашего бота{" "}
                  <span className="text-white/40">за 2 минуты</span>
                </h2>

                <p className="text-white/40 text-[16px] max-w-md mx-auto leading-relaxed">
                  AI-агент задаст несколько вопросов о вашем бизнесе и рассчитает 
                  оптимальное решение под ваш бюджет
                </p>

                <div className="grid grid-cols-3 gap-6 py-4 max-w-sm mx-auto">
                  <div className="text-center">
                    <MessageCircle className="w-5 h-5 mx-auto text-purple-400/60 mb-2" />
                    <p className="text-[11px] text-white/40">Персональный подход</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-5 h-5 mx-auto text-blue-400/60 mb-2" />
                    <p className="text-[11px] text-white/40">Ответ за 2 мин</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-5 h-5 mx-auto text-emerald-400/60 mb-2" />
                    <p className="text-[11px] text-white/40">Без обязательств</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 h-13 px-10 text-[15px] font-semibold shadow-xl shadow-purple-600/25 hover:shadow-purple-500/35 transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => openTracked("https://t.me/ai_asist_helper_bot", "calc_click")}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Рассчитать стоимость
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-[12px] text-white/25">
                  Бесплатно • Без спама • Ответ мгновенно
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* === GUARANTEES === */}
      <Section className="section-padding section-zebra-light">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Shield,
                title: "Гарантия 30 дней",
                desc: "Верну деньги, если бот не принесёт результат",
              },
              {
                icon: Rocket,
                title: "Запуск за 3 дня",
                desc: "Или даю скидку 20% за каждый день задержки",
              },
              {
                icon: Users,
                title: "Поддержка 24/7",
                desc: "Всегда на связи — решаю вопросы в течение часа",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="text-center p-7 rounded-2xl border border-white/[0.04] bg-white/[0.01]"
                >
                  <div className="w-11 h-11 mx-auto rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.12] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-emerald-400/80" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-[14px] text-white/40">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* === FAQ === */}
      <Section className="section-padding section-zebra-light" id="faq">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-14">
            <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
              FAQ
            </span>
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
              Частые вопросы
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-2xl mx-auto"
          >
            {[
              {
                q: "За сколько дней запустится бот?",
                a: "Стандартный срок — 3 рабочих дня. Это включает консультацию, проектирование сценариев, разработку и тестирование. Для более сложных проектов срок может быть до 5 рабочих дней.",
              },
              {
                q: "Какие интеграции поддерживаются?",
                a: "Bitrix24, AmoCRM, Airtable, Google Sheets, 1C, Telegram, WhatsApp, Instagram, VK и многие другие платформы. Если нужна нестандартная интеграция — реализую.",
              },
              {
                q: "Нужны ли мне технические знания?",
                a: "Нет. Я беру всю техническую часть на себя — от разработки до настройки и запуска. Вы получаете готовое решение с понятной панелью управления.",
              },
              {
                q: "Какой результат я получу?",
                a: "В среднем клиенты получают 80-120% увеличение продаж и экономят 40+ часов в месяц на обработке заявок и поддержке клиентов.",
              },
              {
                q: "Есть ли гарантия результата?",
                a: "Да. 30-дневная гарантия возврата денег. Если бот не принесёт измеримый результат в первый месяц — верну всю сумму без вопросов.",
              },
              {
                q: "Сколько стоит разработка бота?",
                a: "Стоимость зависит от сложности проекта и набора функций. Напишите моему AI-агенту в Telegram — он рассчитает точную стоимость за 2 минуты.",
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* === CONTACTS === */}
      <Section className="section-padding section-zebra-light" id="contacts">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-14">
            <span className="text-[12px] font-semibold text-purple-400/80 tracking-[0.15em] uppercase">
              Контакты
            </span>
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-tight tracking-tight">
              Свяжитесь со мной
            </h2>
            <p className="text-white/40 text-lg">
              Выберите удобный способ — отвечу в течение 15 минут
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {[
              {
                icon: MessageCircle,
                title: "Telegram",
                value: "@ArtRich92",
                href: "https://t.me/ArtRich92",
                color: "text-blue-400",
                bg: "bg-blue-500/[0.08]",
                border: "border-blue-500/[0.12]",
                hoverBorder: "hover:border-blue-500/25",
              },
              {
                icon: Phone,
                title: "Телефон",
                value: "+7 909 600-77-76",
                href: "tel:+79096007776",
                color: "text-emerald-400",
                bg: "bg-emerald-500/[0.08]",
                border: "border-emerald-500/[0.12]",
                hoverBorder: "hover:border-emerald-500/25",
              },
              {
                icon: Mail,
                title: "Email",
                value: "alllbert0692@bk.ru",
                href: "mailto:alllbert0692@bk.ru",
                color: "text-purple-400",
                bg: "bg-purple-500/[0.08]",
                border: "border-purple-500/[0.12]",
                hoverBorder: "hover:border-purple-500/25",
              },
            ].map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={i}
                  variants={staggerItem}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    if (contact.href.includes("t.me")) trackGoal("tg_click");
                    else if (contact.href.includes("wa.me")) trackGoal("wa_click");
                    else trackGoal("contact_click");
                  }}
                  className={`card-premium p-7 text-center group ${contact.hoverBorder}`}
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-xl ${contact.bg} border ${contact.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 ${contact.color}`} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-1.5">{contact.title}</h3>
                  <p className="text-[13px] text-white/40">{contact.value}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* === FINAL CTA === */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              Готовы автоматизировать продажи?
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto">
              Получите бесплатную консультацию и узнайте, как AI-бот увеличит вашу прибыль
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 h-13 px-10 text-[15px] font-semibold shadow-xl shadow-purple-600/20 hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => openTracked("https://t.me/ai_asist_helper_bot", "calc_click")}
            >
              Начать бесплатно
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Section>

      {/* === FLOATING ACTION BUTTONS === */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">

        {/* Scroll to top — появляется после скролла 500px */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] hover:border-white/[0.25] backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 shadow-lg"
              aria-label="Наверх"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/79096007776"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackGoal("wa_click")}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.35, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1fba59] flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all duration-200"
          aria-label="Написать в WhatsApp"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>

        {/* Telegram — основная кнопка */}
        <motion.a
          href="https://t.me/ArtRich92"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackGoal("tg_click")}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.35, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 px-4 h-12 rounded-full bg-[#229ED9] hover:bg-[#1a8bbf] shadow-lg shadow-[#229ED9]/30 hover:shadow-[#229ED9]/50 transition-all duration-200"
          aria-label="Написать в Telegram"
        >
          <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.496.882z"/>
          </svg>
          <span className="text-[13px] font-semibold text-white whitespace-nowrap">Написать</span>
        </motion.a>

      </div>

      {/* === FOOTER === */}
      <footer className="border-t border-white/[0.04] py-14">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-bold">ArtRichBot</span>
              </div>
              <p className="text-[13px] text-white/30 leading-relaxed max-w-[200px]">
                Разрабатываю умные AI-боты для автоматизации продаж и поддержки клиентов
              </p>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white/60 mb-4">Навигация</h4>
              <ul className="space-y-2.5">
                <li><a href="#features" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Возможности</a></li>
                <li><a href="#process" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Процесс</a></li>
                <li><a href="#about" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Обо мне</a></li>
                <li><a href="#pricing" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Стоимость</a></li>
                <li><a href="#contacts" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white/60 mb-4">Контакты</h4>
              <ul className="space-y-2.5">
                <li><a href="https://t.me/ArtRich92" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal("tg_click")} className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Telegram</a></li>
                <li><a href="tel:+79096007776" onClick={() => trackGoal("contact_click")} className="text-[13px] text-white/30 hover:text-white/60 transition-colors">+7 909 600-77-76</a></li>
                <li><a href="mailto:alllbert0692@bk.ru" onClick={() => trackGoal("contact_click")} className="text-[13px] text-white/30 hover:text-white/60 transition-colors">alllbert0692@bk.ru</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-white/60 mb-4">Мессенджеры</h4>
              <ul className="space-y-2.5">
                <li><a href="https://t.me/ArtRich92" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal("tg_click")} className="text-[13px] text-white/30 hover:text-white/60 transition-colors">Telegram</a></li>
                <li><a href="https://wa.me/79096007776" target="_blank" rel="noopener noreferrer" onClick={() => trackGoal("wa_click")} className="text-[13px] text-white/30 hover:text-white/60 transition-colors">WhatsApp*</a></li>
              </ul>
            </div>
          </div>

          <div className="divider mb-8" />

          {/* Disclaimer */}
          <p className="text-[11px] text-white/15 leading-relaxed mb-6 max-w-2xl">
            * WhatsApp, Instagram, Facebook — продукты компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации. Мессенджер WhatsApp доступен для использования на территории РФ.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-white/20">
              &copy; 2026 ArtRichBot. Все права защищены.
            </p>
            <p className="text-[12px] text-white/20">
              Разработка AI-ботов для бизнеса
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
