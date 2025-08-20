import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '@/i18n/context';

// SVG flag components for better compatibility
const PortugalFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="inline-block">
    <rect width="8" height="15" fill="#006600"/>
    <rect x="8" width="12" height="15" fill="#FF0000"/>
  </svg>
);

const UKFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="inline-block">
    <rect width="20" height="15" fill="#012169"/>
    <path d="M0,0 L20,15 M20,0 L0,15" stroke="#FFFFFF" strokeWidth="2"/>
    <path d="M0,0 L20,15 M20,0 L0,15" stroke="#C8102E" strokeWidth="1"/>
    <rect x="8" y="0" width="4" height="15" fill="#FFFFFF"/>
    <rect x="0" y="6" width="20" height="3" fill="#FFFFFF"/>
    <rect x="9" y="0" width="2" height="15" fill="#C8102E"/>
    <rect x="0" y="7" width="20" height="1" fill="#C8102E"/>
  </svg>
);

const SpainFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" className="inline-block">
    <rect width="20" height="15" fill="#C60B1E"/>
    <rect x="0" y="3.75" width="20" height="7.5" fill="#FFC400"/>
  </svg>
);

const languages = [
  { code: 'pt' as Language, name: 'Português', flag: <PortugalFlag /> },
  { code: 'en' as Language, name: 'English', flag: <UKFlag /> },
  { code: 'es' as Language, name: 'Español', flag: <SpainFlag /> },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        data-testid="language-switcher-button"
      >
{currentLanguage?.flag}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              data-testid={`language-option-${lang.code}`}
            >
{lang.flag}
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}