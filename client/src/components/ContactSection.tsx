import { MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
  color: string;
}

interface ContactSectionProps {
  contacts: ContactInfo[];
}

export function ContactSection({ contacts }: ContactSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {contacts.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group glass rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
        >
          <div className={`w-12 h-12 rounded-lg ${contact.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            {contact.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{contact.label}</h3>
          <p className="text-sm text-muted-foreground mb-4 break-all">{contact.value}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-purple-400/30 hover:border-purple-400 hover:bg-purple-500/10"
          >
            Написать
          </Button>
        </a>
      ))}
    </div>
  );
}
