"use client";
import { useState } from 'react';
import { WeatherData } from '../types/weather';
import { translations } from '@/../public/locales/translations';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async (city: string, lang: string = 'en') => {
    const t = translations[lang as keyof typeof translations] || translations.en;
    if (!city.trim()) {
      setError(t.enterCity);
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}&lang=${lang}`);
      const result = await response.json();

      if (result.success) {
        setWeatherData(result.data);
      } else {
        setError(result.error || t.fetchError);
      }
    } catch (err) {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError('');

  return {
    weatherData,
    loading,
    error,
    searchWeather,
    clearError
  };
};