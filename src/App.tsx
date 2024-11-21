import React from 'react';
import { Calculator } from './components/Calculator';
import { LanguageSelector } from './components/LanguageSelector';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400">
              {t('title')}
            </h1>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <a
                href="https://www.uzhnu.edu.ua/uk/"
                className="transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://www.uzhnu.edu.ua/images/layout/UzNU_logo_new-header.png"
                  alt="UzhNU Logo"
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMzYjgyZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiPls8L3RleHQ+PC9zdmc+';
                  }}
                />
              </a>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Calculator />
        </main>
        
        <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-center text-gray-400">
            © {new Date().getFullYear()} {t('hover')}
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;