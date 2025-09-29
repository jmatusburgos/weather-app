"use client";

import React from 'react';
import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import WeatherInfo from './WeatherInfo';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import { useWeather } from '../hooks/useWeather';
import { translations } from '@/../public/locales/translations';

const WeatherApp: React.FC = () => {
  const [language, setLanguage] = React.useState('en');
  const { weatherData, loading, error, searchWeather, clearError } = useWeather();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
      padding: '32px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 10,
      }}>
        <LanguageSelector language={language} onLanguageChange={setLanguage} t={t} />
      </div>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: '48px',
            marginBottom: '16px',
            fontWeight: '400',
            letterSpacing: '-0.02em'
          }}>
            {t.title}
          </h1>
        </header>
        <SearchBar
          onSearch={(city) => searchWeather(city, language)}
          loading={loading}
          placeholder={t.searchPlaceholder}
          language={language}
        />

        {error && (
          <ErrorMessage 
            message={error} 
            onClose={clearError}
          />
        )}

        {loading && <LoadingSpinner />}

        {weatherData && !loading && (
          <WeatherInfo weatherData={weatherData} t={t} language={language} />
        )}

        {!weatherData && !loading && !error && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '18px'
          }}>
            {t.getStarted}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;