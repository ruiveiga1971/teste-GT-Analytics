import { Link } from "wouter";
import { Mail } from "lucide-react";
import { useLanguage } from "@/i18n/context";

export default function Footer() {
  const { language } = useLanguage();

  const content = {
    pt: {
      description: "Especialistas em análise estatística para dissertações e teses. Transformamos os seus dados em resultados claros e robustos.",
      quickLinks: "Links Rápidos",
      home: "Início",
      services: "Serviços",
      about: "Sobre",
      contact: "Contacto",
      contactTitle: "Contacto",
      confidentiality: "Confidencialidade garantida",
      copyright: "© 2024 GT Analytics. Todos os direitos reservados."
    },
    en: {
      description: "Specialists in statistical analysis for dissertations and theses. We transform your data into clear and robust results.",
      quickLinks: "Quick Links",
      home: "Home",
      services: "Services", 
      about: "About",
      contact: "Contact",
      contactTitle: "Contact",
      confidentiality: "Confidentiality guaranteed",
      copyright: "© 2024 GT Analytics. All rights reserved."
    },
    es: {
      description: "Especialistas en análisis estadístico para disertaciones y tesis. Transformamos sus datos en resultados claros y robustos.",
      quickLinks: "Enlaces Rápidos",
      home: "Inicio",
      services: "Servicios",
      about: "Acerca",
      contact: "Contacto",
      contactTitle: "Contacto",
      confidentiality: "Confidencialidad garantizada",
      copyright: "© 2024 GT Analytics. Todos los derechos reservados."
    }
  };

  const t = content[language];

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">GT Analytics</h3>
            <p className="text-slate-300 mb-4">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:gt.analytics.contact@gmail.com" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                    {t.home}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/servicos">
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                    {t.services}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                    {t.about}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                    {t.contact}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contactTitle}</h4>
            <div className="space-y-2 text-slate-300">
              <p>gt.analytics.contact@gmail.com</p>
              <p>{t.confidentiality}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-300">
{t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
