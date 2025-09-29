"use client";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { translations } from '@/../public/locales/translations';

interface SearchBarProps {

  onSearch: (city: string, lang?: string) => void;
  loading?: boolean;
  placeholder?: string;
  language?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading = false, 
  placeholder = "Search for a place...",
  language = 'en'
}) => {

  const [city, setCity] = useState('');
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      onSearch(city, language);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSubmit(e);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ 
        display: 'flex', 
        gap: '12px',
        marginBottom: '32px',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
  {/* Icono lupa */}
  <div style={{
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#ffffffcc', 
    fontSize: '18px',
    pointerEvents: 'none' ,
    zIndex: 1
  }}>
    <FaSearch />
  </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={loading}
            data-testid="city-input"
            style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              fontSize: '16px',
              color: '#ffffff',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          data-testid="search-button"
          style={{
            padding: '16px 24px',
            backgroundColor: loading ? 'rgba(99, 102, 241, 0.5)' : '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '100px',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#5855eb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? t.searching : t.search}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;