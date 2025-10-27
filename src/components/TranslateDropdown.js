// src/TranslateDropdown.js
import React, { useState } from 'react';
// 1. Import the hook
import { useTranslation } from 'react-i18next';

// A simple globe icon SVG
const GlobeIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ color: '#4b5563' }}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const TranslateDropdown = () => {
  // 2. Get the i18n instance and t function
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' }
  ];

  const handleLanguageChange = (langCode) => {
    // 3. This is the magic line that changes the language
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'white', 
          border: '1px solid #d1d5db', 
          cursor: 'pointer', 
          padding: '8px', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        // 4. Use t() for the accessible label
        aria-label={t('translateIcon')}
      >
        <GlobeIcon />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 8px)',
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
          zIndex: 20,
          minWidth: '120px',
          border: '1px solid #e5e7eb'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
                // Highlight the currently active language
                backgroundColor: i18n.language === lang.code ? '#f3f4f6' : 'transparent',
                fontWeight: i18n.language === lang.code ? '600' : '400'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = i18n.language === lang.code ? '#f3f4f6' : '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = i18n.language === lang.code ? '#f3f4f6' : 'transparent'}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslateDropdown;