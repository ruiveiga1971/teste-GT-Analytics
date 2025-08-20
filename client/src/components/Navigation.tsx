import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language } = useLanguage();

  // Keep Portuguese navigation as default, only translate for other languages
  const navigationItems = [
    { href: "/", label: language === 'pt' ? "Início" : language === 'en' ? "Home" : "Inicio" },
    { href: "/servicos", label: language === 'pt' ? "Serviços" : language === 'en' ? "Services" : "Servicios" },
    { href: "/sobre", label: language === 'pt' ? "Sobre" : language === 'en' ? "About" : "Acerca" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span 
                className="text-2xl font-bold text-blue-800 cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
              >
                GT Analytics
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span 
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      isActiveLink(item.href)
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link href="/orcamento">
                <Button 
                  className="gt-primary hover:bg-blue-700 text-white mr-2"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {language === 'pt' ? "Simular Orçamento" : language === 'en' ? "Quote" : "Presupuesto"}
                </Button>
              </Link>
              <Link href="/contacto">
                <Button 
                  className="gt-accent hover:bg-orange-600 text-white mr-2"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {language === 'pt' ? "Contacto" : language === 'en' ? "Contact" : "Contacto"}
                </Button>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile menu button and language switcher */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className={`block px-3 py-2 font-medium cursor-pointer ${
                    isActiveLink(item.href)
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/orcamento">
              <span 
                className="block px-3 py-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {language === 'pt' ? "Simular Orçamento" : language === 'en' ? "Quote" : "Presupuesto"}
              </span>
            </Link>
            <Link href="/contacto">
              <span 
                className="block px-3 py-2 text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {language === 'pt' ? "Contacto" : language === 'en' ? "Contact" : "Contacto"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
