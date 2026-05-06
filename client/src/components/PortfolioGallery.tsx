import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  botLink: string;
}

export function PortfolioGallery({ items, botLink }: PortfolioGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group glass rounded-xl overflow-hidden hover:border-purple-400/50 transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              {item.category}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

            {/* CTA Button */}
            <a href={botLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full group/btn border-purple-400/30 hover:border-purple-400 hover:bg-purple-500/10"
              >
                Создать похожее
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
