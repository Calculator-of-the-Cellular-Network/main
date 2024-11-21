import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${i18n.language === 'en' ? 'text-blue-400' : 'text-gray-400'}`}>EN</span>
      <button
        onClick={toggleLanguage}
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        style={{ backgroundColor: i18n.language === 'uk' ? '#3b82f6' : '#374151' }}
        role="switch"
        aria-checked={i18n.language === 'uk'}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            i18n.language === 'uk' ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${i18n.language === 'uk' ? 'text-blue-400' : 'text-gray-400'}`}>UA</span>
    </div>
  );
}