import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ChatbotForBusiness from "@/pages/ChatbotForBusiness";
import TelegramBotForSales from "@/pages/TelegramBotForSales";
import Blog from "@/pages/Blog";
import BlogPostSalesScenarios from "@/pages/BlogPostSalesScenarios";
import BlogPostTelegramLeads from "@/pages/BlogPostTelegramLeads";
import BlogPostCrmIntegration from "@/pages/BlogPostCrmIntegration";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/chatbot-dlya-biznesa"} component={ChatbotForBusiness} />
      <Route path={"/telegram-bot-dlya-prodazh"} component={TelegramBotForSales} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/kak-chat-bot-uvelichivaet-prodazhi"} component={BlogPostSalesScenarios} />
      <Route path={"/blog/telegram-bot-dlya-zayavok"} component={BlogPostTelegramLeads} />
      <Route path={"/blog/integraciya-chat-bota-s-crm"} component={BlogPostCrmIntegration} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
